// app/signals/page.tsx
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Radio, DollarSign, Rocket, GitMerge, TrendingUp, Github, ArrowUpRight, Clock, Star } from "lucide-react";
import Link from "next/link";

export default function SignalsPage() {
  
  // Realistic mock data for the news feed
  const newsFeed = [
    {
      id: 1,
      type: "Funding",
      company: "LangChain",
      amount: "$25M",
      stage: "Series A",
      investors: "Sequoia Capital, Benchmark",
      title: "LangChain raises $25M to build the standard framework for LLM apps.",
      time: "12 mins ago",
      icon: <DollarSign className="w-5 h-5 text-emerald-600" />,
      color: "bg-emerald-100/50 border-emerald-200",
    },
    {
      id: 2,
      type: "Launch",
      company: "Supabase",
      amount: null,
      stage: null,
      investors: null,
      title: "Supabase announces 'Branching' - bringing Git-like workflows to Postgres databases.",
      time: "2 hours ago",
      icon: <Rocket className="w-5 h-5 text-indigo-600" />,
      color: "bg-indigo-100/50 border-indigo-200",
    },
    {
      id: 3,
      type: "M&A",
      company: "Figma",
      amount: "$20B",
      stage: "Acquisition",
      investors: "Adobe",
      title: "Adobe abandons $20B acquisition of Figma due to regulatory pressure.",
      time: "5 hours ago",
      icon: <GitMerge className="w-5 h-5 text-amber-600" />,
      color: "bg-amber-100/50 border-amber-200",
    },
    {
      id: 4,
      type: "Funding",
      company: "Resend",
      amount: "$3M",
      stage: "Seed",
      investors: "Y Combinator, Elad Gil",
      title: "Developer-first email API Resend secures $3M Seed funding.",
      time: "Yesterday",
      icon: <DollarSign className="w-5 h-5 text-emerald-600" />,
      color: "bg-emerald-100/50 border-emerald-200",
    }
  ];

  const trendingRepos = [
    { name: "shadcn/ui", desc: "Beautifully designed components built with Radix UI.", stars: "45.2k", lang: "TypeScript" },
    { name: "Significant-Gravitas/AutoGPT", desc: "An experimental open-source attempt to make GPT-4 fully autonomous.", stars: "158k", lang: "Python" },
    { name: "mckaywrigley/chatbot-ui", desc: "An open source ChatGPT UI.", stars: "22.1k", lang: "TypeScript" },
    { name: "huggingface/candle", desc: "Minimalist ML framework for Rust.", stars: "11.4k", lang: "Rust" }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="border-b border-slate-200/50 pb-6 flex justify-between items-end">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm">Market Signals</h1>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-600 border border-red-200 text-xs font-bold uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Live
            </span>
          </div>
          <p className="text-slate-500 font-medium">Real-time funding events, product launches, and open-source momentum.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: The Main News Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Radio className="w-5 h-5 text-indigo-500" /> Latest Announcements
            </h2>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-white border-slate-200 cursor-pointer hover:bg-slate-50">All</Badge>
              <Badge variant="secondary" className="bg-transparent border-transparent text-slate-500 cursor-pointer hover:bg-slate-100">Funding Only</Badge>
            </div>
          </div>

          <div className="space-y-4">
            {newsFeed.map((news) => (
              <Card key={news.id} className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-md transition-all group overflow-hidden">
                <CardContent className="p-6 flex gap-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${news.color}`}>
                    {news.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-lg">{news.company}</span>
                        <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none rounded-md px-2 py-0.5 text-xs">
                          {news.type}
                        </Badge>
                        {news.stage && (
                          <Badge variant="outline" className="text-indigo-600 border-indigo-200 bg-indigo-50 rounded-md px-2 py-0.5 text-xs">
                            {news.stage}
                          </Badge>
                        )}
                      </div>
                      <span className="flex items-center gap-1 text-xs font-semibold text-slate-400">
                        <Clock className="w-3.5 h-3.5" /> {news.time}
                      </span>
                    </div>
                    
                    <p className="text-slate-700 font-medium leading-relaxed mt-2">{news.title}</p>
                    
                    {news.investors && (
                      <div className="mt-4 flex items-center gap-2 text-sm">
                        <span className="font-bold text-slate-500">Lead Investors:</span>
                        <span className="text-slate-700 font-medium">{news.investors}</span>
                      </div>
                    )}
                    
                    <div className="mt-5 flex gap-3">
                      <Link href="/companies">
                        <Button variant="outline" size="sm" className="h-8 text-xs font-bold border-slate-200 shadow-sm">
                          Search Database
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: Trending Repos & Widgets */}
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800 rounded-[2rem] shadow-xl text-white overflow-hidden relative">
            <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-30" />
            <div className="absolute bottom-[-10%] left-[-10%] w-32 h-32 bg-cyan-500 rounded-full blur-3xl opacity-20" />
            
            <CardHeader className="pb-2 border-b border-slate-800/80 z-10 relative">
              <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                <Github className="w-5 h-5 text-slate-300" /> Trending Open Source
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-5 z-10 relative">
              {trendingRepos.map((repo) => (
                <div key={repo.name} className="group cursor-pointer">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-indigo-300 group-hover:text-indigo-200 transition-colors flex items-center gap-1">
                      {repo.name} <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {repo.stars}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-2 line-clamp-2">{repo.desc}</p>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${repo.lang === 'TypeScript' ? 'bg-blue-400' : repo.lang === 'Python' ? 'bg-yellow-400' : 'bg-orange-500'}`} />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{repo.lang}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[2rem] shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" /> Sector Momentum
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm font-bold mb-1.5">
                  <span className="text-slate-700">AI Infrastructure</span>
                  <span className="text-emerald-600">+42%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full w-[85%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-bold mb-1.5">
                  <span className="text-slate-700">Developer Tools</span>
                  <span className="text-emerald-600">+18%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-[60%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-bold mb-1.5">
                  <span className="text-slate-700">Web3 / Crypto</span>
                  <span className="text-red-500">-12%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-slate-300 h-2 rounded-full w-[25%]"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}