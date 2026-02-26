// app/api/enrich/route.ts
import { NextResponse } from 'next/server';
import Bytez from "bytez.js";

export async function POST(req: Request) {
  try {
    const { url, apiKey } = await req.json();
    console.log(`\n=== ENRICHING: ${url} ===`);

    // 1. Scrape the website FIRST (we only need to do this once, regardless of which AI key we use)
    const scrapeRes = await fetch(`https://r.jina.ai/https://${url}`);
    const markdownText = await scrapeRes.text();
    
    // Anti-Bot Detection
    const lowerText = markdownText.toLowerCase();
    if (
      scrapeRes.status === 403 || 
      lowerText.includes("403 forbidden") || 
      lowerText.includes("security service that verifies users are not bots") ||
      lowerText.includes("cloudflare") ||
      lowerText.includes("captcha")
    ) {
      throw new Error("Target website actively blocked the scraper (Bot Protection/403).");
    }
    
    const prompt = `
      Analyze this website: ${markdownText.substring(0, 4500)}
      Return EXACTLY this JSON and nothing else:
      {
        "summary": "1 sentence.",
        "whatTheyDo": ["bullet1", "bullet2"],
        "keywords": ["tag1", "tag2"],
        "signals": ["signal1"]
      }
    `;

    // 2. Build our "Waterfall" array of API Keys. 
    // Priority: Frontend User Key -> Primary Env Key -> Fallback Env Key
    const keysToTry = [
      apiKey, 
      process.env.BYTEZ_API_KEY, 
      process.env.BYTEZ_API_KEY_FALLBACK
    ].filter(Boolean) as string[]; // The .filter(Boolean) automatically removes any empty/missing keys!

    if (keysToTry.length === 0) {
      return NextResponse.json({ error: "Missing API Key. Please add it in Settings." }, { status: 401 });
    }

    let lastModelError: any = null;

    // 3. The Failover Loop: Try each key. If one fails, seamlessly move to the next!
    for (const currentKey of keysToTry) {
      try {
        console.log(`Attempting AI generation with key ending in ...${currentKey.slice(-4)}`);
        
        const sdk = new Bytez(currentKey);
        const model = sdk.model("meta-llama/Meta-Llama-3-8B-Instruct");

        const { error, output } = await model.run([
          { role: "system", content: "You output strict JSON only. No markdown." },
          { role: "user", content: prompt }
        ]);

        if (error) throw new Error("Bytez error: " + JSON.stringify(error));

        let textToParse = "";
        if (typeof output === 'string') textToParse = output;
        else if (Array.isArray(output) && output.length > 0) textToParse = output[0].generated_text || output[0].message?.content || JSON.stringify(output);
        else if (typeof output === 'object') textToParse = (output as any).generated_text || (output as any).content || JSON.stringify(output);

        const jsonMatch = textToParse.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("No { brackets } found in the AI response");

        const extractedData = JSON.parse(jsonMatch[0]);

        // SUCCESS! Return the data and exit the function entirely
        return NextResponse.json({
          summary: extractedData.summary || extractedData.Summary || "Successfully analyzed, but the AI forgot the summary field.",
          whatTheyDo: extractedData.whatTheyDo || extractedData.WhatTheyDo || ["Successfully analyzed, but feature list is missing."],
          keywords: extractedData.keywords || extractedData.Keywords || ["Tech", "Startup"],
          signals: extractedData.signals || extractedData.Signals || ["Active Website"],
          sources: [{ url: `https://${url}`, timestamp: new Date().toISOString() }]
        });

      } catch (err: any) {
        // If the key fails (e.g., out of credits), log a warning and let the loop continue to the next key!
        console.warn(`Key ...${currentKey.slice(-4)} failed. Swapping to backup key...`);
        lastModelError = err;
      }
    }

    // 4. If the code reaches here, it means the loop finished and ALL keys failed
    throw new Error(`All API keys exhausted. Last error: ${lastModelError?.message}`);

  } catch (error: any) {
    console.error("✖ API CRASHED:", error);
    
    const isBotBlocked = error.message?.includes("Bot Protection");

    return NextResponse.json({
      summary: isBotBlocked 
        ? "Scraping Failed: This website is heavily guarded by Cloudflare or anti-bot protection." 
        : "System Fallback: The AI encountered an error or timed out.",
      whatTheyDo: isBotBlocked ? ["Protected by CAPTCHA", "Bot traffic blocked"] : ["Error caught successfully"],
      keywords: ["Scrape Failed", isBotBlocked ? "403 Forbidden" : "Error"],
      signals: [isBotBlocked ? "High Security Website" : "Failed extraction"],
      sources: [{ url: `https://${url}`, timestamp: new Date().toISOString() }]
    });
  }
}