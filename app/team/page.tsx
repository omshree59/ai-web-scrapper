// app/team/page.tsx
"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, FolderPlus, ArrowUpRight, Users, Activity, Clock } from "lucide-react";
import Link from "next/link";

export default function TeamWorkspacePage() {
  const [activities, setActivities] = useState<any[]>([]);

  // Time formatter (e.g., "Just now", "2 mins ago")
  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  useEffect(() => {
    const loadActivities = () => {
      const saved = localStorage.getItem("vc-activities");
      if (saved) {
        setActivities(JSON.parse(saved));
      } else {
        // If completely empty, generate a couple of fake "teammate" actions so the board isn't blank!
        const initialSeed = [
          { id: 1, user: "Sarah Jenkins", avatar: "SJ", color: "bg-blue-600", action: "enriched a startup profile", target: "Anthropic", time: Date.now() - 1000 * 60 * 30, type: "enrich" },
          { id: 2, user: "David Chen", avatar: "DC", color: "bg-emerald-600", action: "created a new list", target: "Q3 DevTools", time: Date.now() - 1000 * 60 * 120, type: "folder" },
        ];
        setActivities(initialSeed);
        localStorage.setItem("vc-activities", JSON.stringify(initialSeed));
      }
    };

    loadActivities();
    window.addEventListener("storage", loadActivities);
    return () => window.removeEventListener("storage", loadActivities);
  }, []);

  const getIcon = (type: string) => {
    if (type === 'enrich') return <Sparkles className="w-4 h-4 text-indigo-500" />;
    if (type === 'list' || type === 'folder') return <FolderPlus className="w-4 h-4 text-emerald-500" />;
    return <Activity className="w-4 h-4 text-slate-500" />;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="border-b border-slate-200/50 pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm">Team Workspace</h1>
          <p className="text-slate-500 mt-2 font-medium">See what your partners and analysts are currently sourcing.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 px-3 py-1 font-bold border border-indigo-100">
            <Users className="w-4 h-4 mr-1.5" /> 4 Active Members
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: The Live Activity Feed */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100/50 pb-5">
              <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-500" /> Live Team Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100/60 max-h-[600px] overflow-y-auto">
                {activities.length === 0 ? (
                  <div className="p-12 text-center text-slate-500">No activity yet. Start discovering!</div>
                ) : (
                  activities.map((activity) => (
                    <div key={activity.id} className="p-6 hover:bg-white/50 transition-colors flex gap-4 items-start group">
                      
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-sm shrink-0 ${activity.color}`}>
                        {activity.avatar}
                      </div>
                      
                      <div className="flex-1 pt-1">
                        <p className="text-slate-800 font-medium">
                          <span className="font-bold">{activity.user}</span> {activity.action} <span className="font-bold text-indigo-700">{activity.target}</span>
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs font-semibold text-slate-400">
                          <span className="flex items-center gap-1 bg-white border border-slate-200 shadow-sm px-2 py-0.5 rounded-md">
                            {getIcon(activity.type)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> {formatTimeAgo(activity.time)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Team Stats & Quick Links */}
        <div className="space-y-6">
          <Card className="bg-indigo-600 border-indigo-500 rounded-[2rem] shadow-lg text-white overflow-hidden relative">
            <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-indigo-500 rounded-full blur-2xl opacity-50" />
            <CardHeader>
              <CardTitle className="text-lg font-bold text-white/90">Weekly Team Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center border-b border-indigo-500/50 pb-2">
                <span className="text-indigo-100 font-medium">Startups Enriched</span>
                <span className="font-extrabold text-2xl">142</span>
              </div>
              <div className="flex justify-between items-center border-b border-indigo-500/50 pb-2">
                <span className="text-indigo-100 font-medium">Lists Created</span>
                <span className="font-extrabold text-2xl">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-indigo-100 font-medium">New Searches</span>
                <span className="font-extrabold text-2xl">34</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[2rem] shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Trending in Workspace</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {["Supabase", "Cursor", "LangChain"].map((company) => (
                <Link key={company} href="/companies" className="flex items-center justify-between p-3 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 transition-all group">
                  <span className="font-bold text-slate-800">{company}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}