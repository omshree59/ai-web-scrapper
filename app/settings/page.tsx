// app/settings/page.tsx
"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KeyRound, CheckCircle2, ShieldAlert, Sparkles } from "lucide-react";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Check if they already have a key saved when the page loads
    const savedKey = localStorage.getItem("vc-api-key");
    if (savedKey) {
      setApiKey(savedKey);
      setIsSaved(true);
    }
  }, []);

  const handleSaveKey = () => {
    if (!apiKey.trim()) return;
    localStorage.setItem("vc-api-key", apiKey.trim());
    setIsSaved(true);
  };

  const handleClearKey = () => {
    localStorage.removeItem("vc-api-key");
    setApiKey("");
    setIsSaved(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      <div className="border-b border-slate-200/50 pb-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm">Workspace Settings</h1>
        <p className="text-slate-500 mt-2 font-medium">Manage your LLM providers, preferences, and workspace data.</p>
      </div>

      <Card className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <CardHeader className="bg-indigo-50/50 border-b border-indigo-100/50 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-100 text-indigo-700 rounded-xl shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-slate-900">AI Enrichment Provider (BYOK)</CardTitle>
              <CardDescription className="text-slate-500 mt-1">Connect your Bytez API key to power the AI scout.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          
          <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-4 flex gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800 leading-relaxed">
              <strong>Security Note:</strong> Your API key is never stored on our servers. It is kept entirely local to your browser using secure <code>localStorage</code>. It is only sent directly to our enrichment API route when you actively request a startup scan.
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-slate-400" /> Bytez API Key
            </label>
            <div className="flex max-w-xl gap-3">
              <Input 
                type="password"
                placeholder="sk-..." 
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setIsSaved(false); // If they start typing, it's no longer the saved state
                }}
                className="font-mono bg-white border-slate-200 shadow-sm"
              />
              <Button 
                onClick={handleSaveKey} 
                className={`transition-all shadow-sm ${isSaved ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white"}`}
              >
                {isSaved ? <><CheckCircle2 className="w-4 h-4 mr-2" /> Saved</> : "Save Key"}
              </Button>
            </div>
          </div>

          {isSaved && (
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm font-semibold text-emerald-600 flex items-center gap-1.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                API Connected & Ready
              </span>
              <button onClick={handleClearKey} className="text-sm text-red-500 font-semibold hover:underline">
                Remove Key
              </button>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}