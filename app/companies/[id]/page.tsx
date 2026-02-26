// app/companies/[id]/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { mockCompanies } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, Globe, ChevronLeft, ListPlus, Check } from "lucide-react";
import Link from "next/link";

export default function CompanyProfile() {
  const params = useParams();
  const companyId = params?.id as string;
  const company = mockCompanies.find(c => c.id === companyId);
  
  const [loading, setLoading] = useState(false);
  const [enrichedData, setEnrichedData] = useState<any>(null);
  
  const [lists, setLists] = useState<any[]>([]);
  const [showListMenu, setShowListMenu] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved">("idle");

  useEffect(() => {
    const saved = localStorage.getItem("vc-lists");
    if (saved) setLists(JSON.parse(saved));
  }, []);

  // GLOBAL LOGGER HELPER
  const logActivity = (action: string, target: string, type: string) => {
    const activities = JSON.parse(localStorage.getItem("vc-activities") || "[]");
    const newActivity = { id: Date.now(), user: "You", avatar: "N", color: "bg-slate-800", action, target, time: Date.now(), type };
    localStorage.setItem("vc-activities", JSON.stringify([newActivity, ...activities].slice(0, 30))); // Keep last 30
    window.dispatchEvent(new Event("storage"));
  };

  const toggleSaveToList = (listId: string) => {
    let targetListName = "";
    let wasAdded = false;

    const updatedLists = lists.map(list => {
      if (list.id === listId) {
        targetListName = list.name;
        const savedCompanies = list.companies || [];
        const isAlreadySaved = savedCompanies.includes(company?.id);

        if (isAlreadySaved) {
          return { ...list, companies: savedCompanies.filter((cid: string) => cid !== company?.id), count: Math.max(0, list.count - 1) };
        } else {
          wasAdded = true;
          return { ...list, companies: [...savedCompanies, company?.id], count: list.count + 1 };
        }
      }
      return list;
    });

    setLists(updatedLists);
    localStorage.setItem("vc-lists", JSON.stringify(updatedLists));
    
    // LOG IT!
    if (wasAdded && company) logActivity("saved a company to", targetListName, "list");

    setSaveStatus("saved");
    setTimeout(() => {
      setSaveStatus("idle");
      setShowListMenu(false);
    }, 1500);
  };

  const handleEnrich = async () => {
    setLoading(true);
    
    const currentActive = parseInt(localStorage.getItem("vc-active-calls") || "0");
    localStorage.setItem("vc-active-calls", (currentActive + 1).toString());
    
    const currentStatuses = JSON.parse(localStorage.getItem("vc-company-statuses") || "{}");
    localStorage.setItem("vc-company-statuses", JSON.stringify({ ...currentStatuses, [companyId]: "running" }));
    window.dispatchEvent(new Event("storage")); 

    const currentMetrics = JSON.parse(localStorage.getItem("vc-metrics") || '{"pagesScraped":0,"dataPoints":0,"successCount":0,"failCount":0}');
    
    try {
      const userApiKey = localStorage.getItem("vc-api-key") || "";

      const res = await fetch('/api/enrich', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: company?.website, apiKey: userApiKey }),
      });

      if (res.status === 401) {
        alert("API Key missing! Please go to Settings to add your Bytez API key.");
        setLoading(false);
        const endingActive = parseInt(localStorage.getItem("vc-active-calls") || "1");
        localStorage.setItem("vc-active-calls", Math.max(0, endingActive - 1).toString());
        window.dispatchEvent(new Event("storage"));
        return; 
      }

      if (!res.ok) throw new Error("API Route failed");

      const data = await res.json();
      setEnrichedData(data);

      const pointsExtracted = (data.keywords?.length || 0) + (data.signals?.length || 0) + (data.whatTheyDo?.length || 0);
      
      localStorage.setItem("vc-metrics", JSON.stringify({
        ...currentMetrics,
        pagesScraped: currentMetrics.pagesScraped + 1,
        dataPoints: currentMetrics.dataPoints + pointsExtracted,
        successCount: currentMetrics.successCount + 1,
      }));
      
      const newStatuses = JSON.parse(localStorage.getItem("vc-company-statuses") || "{}");
      localStorage.setItem("vc-company-statuses", JSON.stringify({ ...newStatuses, [companyId]: "completed" }));

      const currentCompanyData = JSON.parse(localStorage.getItem("vc-company-data") || "{}");
      localStorage.setItem("vc-company-data", JSON.stringify({ ...currentCompanyData, [companyId]: pointsExtracted }));

      // LOG IT!
      if (company) logActivity("enriched a startup profile", company.name, "enrich");

    } catch (error) {
      console.error(error);
      alert("Failed to enrich. Check API logs.");
      
      localStorage.setItem("vc-metrics", JSON.stringify({
        ...currentMetrics,
        failCount: currentMetrics.failCount + 1
      }));
      
      const newStatuses = JSON.parse(localStorage.getItem("vc-company-statuses") || "{}");
      localStorage.setItem("vc-company-statuses", JSON.stringify({ ...newStatuses, [companyId]: "failed" }));
    }
    
    const endingActive = parseInt(localStorage.getItem("vc-active-calls") || "1");
    localStorage.setItem("vc-active-calls", Math.max(0, endingActive - 1).toString());
    window.dispatchEvent(new Event("storage"));
    
    setLoading(false);
  };

  if (!params) return null;
  if (!company) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <h2 className="text-2xl font-bold">Company not found</h2>
        <Link href="/companies"><Button variant="outline">Back to Discovery</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <Link href="/companies" className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Discovery
      </Link>

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">{company.name}</h1>
          <a href={`https://${company.website}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-600 hover:text-blue-800 mt-2 font-medium">
            <Globe className="w-4 h-4"/> {company.website}
          </a>
        </div>
        <div className="space-x-3 flex items-center">
          
          <div className="relative">
            <Button 
              variant="outline" 
              className={`shadow-sm transition-all duration-300 ${saveStatus === "saved" ? "bg-green-50 border-green-500 text-green-700" : ""}`}
              onClick={() => setShowListMenu(!showListMenu)}
            >
              {saveStatus === "saved" ? (
                <><Check className="w-4 h-4 mr-2" /> Saved!</>
              ) : (
                <><ListPlus className="w-4 h-4 mr-2" /> Save to List</>
              )}
            </Button>
            
            {showListMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50 p-2 animate-in fade-in zoom-in-95 duration-200">
                <div className="text-xs font-bold text-gray-400 mb-2 px-2 uppercase tracking-wider">Your Lists</div>
                {lists.length === 0 ? (
                  <div className="text-sm text-gray-500 px-2 pb-2">No lists created yet.</div>
                ) : (
                  lists.map(list => {
                    const isSaved = (list.companies || []).includes(company.id);
                    return (
                      <button
                        key={list.id}
                        onClick={() => toggleSaveToList(list.id)}
                        className="w-full text-left px-2 py-2 text-sm hover:bg-indigo-50 text-gray-700 rounded-md flex items-center justify-between transition-colors"
                      >
                        {list.name}
                        {isSaved && <Check className="w-4 h-4 text-green-600" />}
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </div>

          <Button onClick={handleEnrich} disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 shadow-md transition-all">
            <Sparkles className="w-4 h-4 mr-2" />
            {loading ? "Enriching via AI..." : "Enrich via AI"}
          </Button>
        </div>
      </div>

      <Card className="shadow-sm border-gray-200 bg-white/80 backdrop-blur-md">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
          <CardTitle className="text-slate-800">Company Overview</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-slate-600 mb-6 text-lg">{company.description}</p>
          <div className="flex gap-3">
            <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200 px-3 py-1 text-sm">{company.sector}</Badge>
            <Badge variant="outline" className="text-slate-600 px-3 py-1 text-sm">{company.stage}</Badge>
          </div>
        </CardContent>
      </Card>

      {loading && (
        <Card className="border-indigo-100 bg-indigo-50/30 shadow-inner mt-6">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-3 text-indigo-700 font-semibold text-lg">
              <Sparkles className="w-6 h-6 animate-pulse" /> AI is scanning public web data...
            </div>
            <div className="space-y-3">
              <Skeleton className="h-5 w-full bg-indigo-100/50" />
              <Skeleton className="h-5 w-5/6 bg-indigo-100/50" />
            </div>
          </CardContent>
        </Card>
      )}

      {enrichedData && !loading && (
        <Card className="border-indigo-200 shadow-md overflow-hidden mt-6 bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-indigo-50 border-b border-indigo-100 pb-4">
            <CardTitle className="text-indigo-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" /> AI Enriched Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <p className="text-slate-800 leading-relaxed font-medium">{enrichedData.summary}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                <h3 className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">What They Do</h3>
                <ul className="list-disc pl-5 text-sm space-y-2 text-slate-700 font-medium">{enrichedData.whatTheyDo?.map((item: string, i: number) => <li key={i}>{item}</li>)}</ul>
              </div>
              <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100">
                <h3 className="text-sm font-bold text-emerald-700 mb-3 uppercase tracking-wider">Signals</h3>
                <ul className="text-sm space-y-2 text-emerald-800 font-medium">{enrichedData.signals?.map((s: string, i: number) => <li key={i}>• {s}</li>)}</ul>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {enrichedData.keywords?.map((kw: string, i: number) => <Badge key={i} variant="secondary" className="bg-indigo-50 text-indigo-700 font-bold px-3 py-1 shadow-sm border-indigo-100/50">{kw}</Badge>)}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}