// lib/mock-data.ts

export interface Company {
  id: string;
  name: string;
  website: string;
  description: string;
  stage: string;
  sector: string;
  status: "Pending" | "Enriched" | "Failed";
}

export const mockCompanies: Company[] = [
  { id: "1", name: "Harmonic", website: "harmonic.ai", description: "Startup discovery platform for venture capital.", stage: "Series A", sector: "AI / Data", status: "Pending" },
  { id: "2", name: "Lovable", website: "lovable.dev", description: "AI-powered software creation platform.", stage: "Seed", sector: "AI / DevTools", status: "Pending" },
  { id: "3", name: "Anthropic", website: "anthropic.com", description: "AI safety and research company building Claude.", stage: "Series D", sector: "AI", status: "Pending" },
  { id: "4", name: "Supabase", website: "supabase.com", description: "Open source backend-as-a-service and Firebase alternative.", stage: "Series B", sector: "DevTools", status: "Pending" },
  { id: "5", name: "Linear", website: "linear.app", description: "The better way to build products.", stage: "Series B", sector: "DevTools", status: "Pending" },
  { id: "6", name: "Resend", website: "resend.com", description: "Email for developers.", stage: "Seed", sector: "DevTools", status: "Pending" },
  { id: "7", name: "LangChain", website: "langchain.com", description: "Framework for developing applications powered by language models.", stage: "Series A", sector: "AI / Data", status: "Pending" },
  { id: "8", name: "Pinecone", website: "pinecone.io", description: "Vector database for building highly scalable AI applications.", stage: "Series B", sector: "AI / Data", status: "Pending" },
  { id: "9", name: "Replicate", website: "replicate.com", description: "Cloud platform to run, tune, and deploy open-source AI models.", stage: "Series B", sector: "AI / ML", status: "Pending" },
  { id: "10", name: "Chroma", website: "trychroma.com", description: "The AI-native open-source embedding database.", stage: "Seed", sector: "AI / Data", status: "Pending" },
  { id: "11", name: "Modal", website: "modal.com", description: "Serverless compute platform for AI and data teams.", stage: "Series A", sector: "DevTools", status: "Pending" },
  { id: "12", name: "Raycast", website: "raycast.com", description: "Extendable, blazing-fast launcher for macOS.", stage: "Series A", sector: "Productivity", status: "Pending" },
  { id: "13", name: "ElevenLabs", website: "elevenlabs.io", description: "AI voice generator and text-to-speech software.", stage: "Series B", sector: "AI / Voice", status: "Pending" },
  { id: "14", name: "Braintrust", website: "braintrust.dev", description: "Enterprise-grade AI evaluations and prompt playground.", stage: "Seed", sector: "AI / DevTools", status: "Pending" },
  { id: "15", name: "Clerk", website: "clerk.com", description: "Complete user management UI and APIs for React.", stage: "Series B", sector: "DevTools", status: "Pending" },
  { id: "16", name: "Railway", website: "railway.app", description: "Infrastructure platform where you can provision and deploy easily.", stage: "Series A", sector: "DevTools", status: "Pending" },
  { id: "17", name: "Fly.io", website: "fly.io", description: "Deploy app servers close to your users globally.", stage: "Series C", sector: "Infrastructure", status: "Pending" },
  { id: "18", name: "Render", website: "render.com", description: "Unified cloud to build and run all your apps and websites.", stage: "Series B", sector: "Infrastructure", status: "Pending" },
  { id: "19", name: "PostHog", website: "posthog.com", description: "Open-source product operating system and analytics.", stage: "Series B", sector: "Data / Analytics", status: "Pending" },
  { id: "20", name: "Cal.com", website: "cal.com", description: "Open-source scheduling infrastructure for everyone.", stage: "Series A", sector: "Productivity", status: "Pending" },
  { id: "21", name: "Dub.co", website: "dub.co", description: "Open-source link management infrastructure for modern teams.", stage: "Seed", sector: "DevTools", status: "Pending" },
  { id: "22", name: "Loops", website: "loops.so", description: "Email platform designed specifically for modern SaaS companies.", stage: "Seed", sector: "B2B SaaS", status: "Pending" },
  { id: "23", name: "Framer", website: "framer.com", description: "Web builder for creative professionals and designers.", stage: "Series C", sector: "Design Tools", status: "Pending" },
  { id: "24", name: "Retool", website: "retool.com", description: "Build internal tools and business software remarkably fast.", stage: "Series C", sector: "DevTools", status: "Pending" },
  { id: "25", name: "Neon", website: "neon.tech", description: "Serverless Postgres database built for the cloud.", stage: "Series B", sector: "Data / Infrastructure", status: "Pending" },
  { id: "26", name: "PlanetScale", website: "planetscale.com", description: "The world's most advanced serverless MySQL database platform.", stage: "Series C", sector: "Data / Infrastructure", status: "Pending" },
  { id: "27", name: "Turso", website: "turso.tech", description: "Edge database based on libSQL for global latency reduction.", stage: "Seed", sector: "Data / Infrastructure", status: "Pending" },
  { id: "28", name: "Weaviate", website: "weaviate.io", description: "Open source vector search engine for scaling ML models.", stage: "Series B", sector: "AI / Data", status: "Pending" },
  { id: "29", name: "Qdrant", website: "qdrant.tech", description: "Vector Database for the next generation of AI applications.", stage: "Series A", sector: "AI / Data", status: "Pending" },
  { id: "30", name: "Together AI", website: "together.ai", description: "Cloud platform for building and running generative AI.", stage: "Series A", sector: "AI / ML", status: "Pending" },
  { id: "31", name: "Mistral AI", website: "mistral.ai", description: "Frontier AI research and open-weight models.", stage: "Series A", sector: "AI / ML", status: "Pending" },
  { id: "32", name: "Anyscale", website: "anyscale.com", description: "Scalable compute framework for AI and Python applications.", stage: "Series C", sector: "AI / Infrastructure", status: "Pending" },
  { id: "33", name: "Scale AI", website: "scale.com", description: "The data platform for artificial intelligence and LLM training.", stage: "Series E", sector: "AI / Data", status: "Pending" },
  { id: "34", name: "Cohere", website: "cohere.com", description: "Enterprise AI platform and custom large language models.", stage: "Series C", sector: "AI / ML", status: "Pending" },
  { id: "35", name: "CodeSandbox", website: "codesandbox.io", description: "Cloud development environment for rapid web prototyping.", stage: "Series A", sector: "DevTools", status: "Pending" },
  { id: "36", name: "Gitpod", website: "gitpod.io", description: "Always ready-to-code cloud development environments.", stage: "Series A", sector: "DevTools", status: "Pending" },
  { id: "37", name: "ngrok", website: "ngrok.com", description: "Unified ingress platform for developers and API testing.", stage: "Series A", sector: "DevTools", status: "Pending" },
  { id: "38", name: "Vanta", website: "vanta.com", description: "Automated security and compliance platform for fast-growing companies.", stage: "Series C", sector: "Cybersecurity", status: "Pending" },
  { id: "39", name: "Drata", website: "drata.com", description: "Continuous security and compliance automation platform.", stage: "Series C", sector: "Cybersecurity", status: "Pending" },
  { id: "40", name: "Snyk", website: "snyk.io", description: "Developer security platform for securing code and infrastructure.", stage: "Series G", sector: "Cybersecurity", status: "Pending" },
  { id: "41", name: "Appsmith", website: "appsmith.com", description: "Open-source framework to quickly build internal tools.", stage: "Series B", sector: "DevTools", status: "Pending" },
  { id: "42", name: "Bubble", website: "bubble.io", description: "The industry-leading visual programming and no-code platform.", stage: "Series A", sector: "NoCode", status: "Pending" },
  { id: "43", name: "Webflow", website: "webflow.com", description: "Create, collaborate on, and scale custom websites visually.", stage: "Series C", sector: "Design Tools", status: "Pending" },
  { id: "44", name: "Notion", website: "notion.so", description: "The connected workspace for your docs, projects, and knowledge.", stage: "Series C", sector: "Productivity", status: "Pending" },
  { id: "45", name: "Figma", website: "figma.com", description: "The collaborative interface design tool for modern product teams.", stage: "Series E", sector: "Design Tools", status: "Pending" },
  { id: "46", name: "Airtable", website: "airtable.com", description: "Low-code platform for building collaborative enterprise apps.", stage: "Series F", sector: "Productivity", status: "Pending" },
  { id: "47", name: "Miro", website: "miro.com", description: "The visual workspace for innovation, ideation, and team collaboration.", stage: "Series C", sector: "Productivity", status: "Pending" },
  { id: "48", name: "Stripe", website: "stripe.com", description: "Financial infrastructure for the internet.", stage: "Series I", sector: "Fintech", status: "Pending" },
  { id: "49", name: "Vercel", website: "vercel.com", description: "Frontend cloud platform for fast web deployments.", stage: "Series D", sector: "DevTools", status: "Pending" },
  { id: "50", name: "Cloud9", website: "cloud9.ai", description: "Next-generation personalized AI chatbot infrastructure.", stage: "Seed", sector: "AI Chatbots", status: "Pending" }
];