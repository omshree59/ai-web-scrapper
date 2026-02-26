// app/companies/page.tsx
"use client";
import { useState, useEffect } from "react";
import { mockCompanies } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronRight, Check, X, Zap, Globe, Database, Layers, Activity, CheckCircle2, RefreshCw, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function CompaniesPage() {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>(["DevTools", "AI"]);
  
  // Real-time states
  const [metrics, setMetrics] = useState({ pagesScraped: 0, dataPoints: 0, successCount: 0, failCount: 0 });
  const [activeCalls, setActiveCalls] = useState(0);
  const [companyStatuses, setCompanyStatuses] = useState<Record<string, string>>({});
  const [companyDataPoints, setCompanyDataPoints] = useState<Record<string, number>>({});

  useEffect(() => {
    const syncData = () => {
      const savedMetrics = localStorage.getItem("vc-metrics");
      if (savedMetrics) setMetrics(JSON.parse(savedMetrics));
      
      setActiveCalls(parseInt(localStorage.getItem("vc-active-calls") || "0"));
      
      const savedStatuses = localStorage.getItem("vc-company-statuses");
      if (savedStatuses) setCompanyStatuses(JSON.parse(savedStatuses));

      const savedDataPoints = localStorage.getItem("vc-company-data");
      if (savedDataPoints) setCompanyDataPoints(JSON.parse(savedDataPoints));
    };

    syncData();
    window.addEventListener("storage", syncData);
    return () => window.removeEventListener("storage", syncData);
  }, []);

  const totalAttempts = metrics.successCount + metrics.failCount;
  const successRate = totalAttempts === 0 ? 100 : Math.round((metrics.successCount / totalAttempts) * 100);

  // FORMATTER: Converts raw data points into realistic MB/GB sizes
  const formatDataSize = (points: number) => {
    if (!points || points === 0) return "--";
    // For realism: pretend every extracted point required processing ~345 MB of raw web data
    const totalMB = points * 345.8; 
    if (totalMB >= 1024) {
      return (totalMB / 1024).toFixed(2) + " GB";
    }
    return totalMB.toFixed(1) + " MB";
  };

  const handleAddFilter = (tag: string) => {
    if (!activeFilters.includes(tag)) setActiveFilters([...activeFilters, tag]);
  };

  const handleRemoveFilter = (tagToRemove: string) => {
    setActiveFilters(activeFilters.filter(tag => tag !== tagToRemove));
  };

  const handleClearFilters = () => {
    setActiveFilters([]);
    setSearch("");
  };

  const filtered = mockCompanies.filter((c) => {
    const matchesSearch = search === "" || 
      c.name.toLowerCase().includes(search.toLowerCase()) || 
      c.sector.toLowerCase().includes(search.toLowerCase());

    const matchesTags = activeFilters.length === 0 || activeFilters.some(filterTag => 
      c.sector.toLowerCase().includes(filterTag.toLowerCase()) || 
      c.stage.toLowerCase().includes(filterTag.toLowerCase())
    );

    return matchesSearch && matchesTags;
  });

  // NEW: Dynamically fetches logos based on the company's website!
  const renderLogo = (website: string, name: string) => {
    return (
      <img 
        src={`https://www.google.com/s2/favicons?domain=${website}&sz=128`} 
        alt={`${name} logo`}
        className="w-8 h-8 object-contain rounded-md"
        onError={(e) => {
          // If a logo fails to load, generate a beautiful fallback avatar with their initial
          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${name}&background=e0e7ff&color=4338ca&rounded=true&bold=true`;
        }}
      />
    );
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "completed": return { label: "Completed", color: "text-emerald-700 bg-emerald-50 border-emerald-200", icon: <CheckCircle2 className="w-3.5 h-3.5" />, dot: "bg-emerald-500" };
      case "running": return { label: "Running", color: "text-blue-700 bg-blue-50 border-blue-200", icon: <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />, dot: "bg-blue-500" };
      case "failed": return { label: "Failed", color: "text-red-700 bg-red-50 border-red-200", icon: <AlertCircle className="w-3.5 h-3.5" />, dot: "bg-red-500" };
      default: return { label: "Pending", color: "text-amber-700 bg-amber-50 border-amber-200", icon: <Clock className="w-3.5 h-3.5" />, dot: "bg-amber-500" };
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm">Discovery</h1>
        <div className="relative w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input 
            placeholder="Search companies or sectors..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 h-12 bg-white/70 border-white rounded-full shadow-sm focus-visible:ring-indigo-500/30 backdrop-blur-md font-medium text-base"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "Pages Scraped", value: metrics.pagesScraped.toString(), icon: <Layers className="w-4 h-4 text-indigo-500" /> },
          // UPDATED: Now uses formatDataSize for the top dashboard metric
          { title: "Data Collected", value: metrics.dataPoints > 0 ? formatDataSize(metrics.dataPoints) : "0 MB", icon: <Database className="w-4 h-4 text-blue-500" /> },
          { title: "Active API Calls", value: activeCalls.toString(), icon: <Activity className="w-4 h-4 text-amber-500" /> },
          { title: "Scrape Success Rate", value: `${successRate}%`, icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" /> }
        ].map((metric, i) => (
          <div key={i} className="bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl p-5 shadow-sm flex flex-col gap-2 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-wider text-xs">
              {metric.icon} {metric.title}
            </div>
            <div className="text-3xl font-black text-slate-900 drop-shadow-sm">{metric.value}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 min-h-[32px]">
          {activeFilters.length > 0 && (
            <div className="flex items-center gap-1.5 bg-white/80 border border-white/60 rounded-full p-1 shadow-sm backdrop-blur-sm">
              {activeFilters.map((filter, index) => (
                <Badge 
                  key={filter} 
                  variant="secondary" 
                  onClick={() => handleRemoveFilter(filter)}
                  className={`rounded-full px-3 py-1 flex items-center gap-1.5 font-bold border-none cursor-pointer transition-colors
                    ${index === 0 ? "bg-indigo-50 text-indigo-700 hover:bg-indigo-100" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}
                  `}
                >
                  {index === 0 && <Check className="w-3 h-3"/>}
                  {filter} 
                  <X className="w-3 h-3 ml-1 opacity-50 hover:opacity-100"/>
                </Badge>
              ))}
            </div>
          )}
          
          {(activeFilters.length > 0 || search !== "") && (
            <button onClick={handleClearFilters} className="text-sm font-bold text-slate-400 hover:text-slate-700 transition-colors">
              Clear Filters
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1.5 text-indigo-600 font-bold bg-indigo-50/80 px-3 py-1 rounded-full shadow-sm border border-indigo-100/50 backdrop-blur-sm">
            <Zap className="w-4 h-4 fill-indigo-600 text-indigo-600"/> Trending Now:
          </div>
          {["AI", "DevTools", "Seed", "Series A"].map((tag) => (
            <Badge 
              key={tag}
              variant="secondary" 
              onClick={() => handleAddFilter(tag)}
              className="bg-white/60 text-slate-700 rounded-full hover:bg-white shadow-sm border border-white px-3 py-1 cursor-pointer font-bold transition-all hover:-translate-y-0.5 backdrop-blur-sm"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-slate-200/50">
              <TableHead className="text-slate-400 font-bold uppercase tracking-wider text-xs pt-6 pb-4 pl-8">Company</TableHead>
              <TableHead className="text-slate-400 font-bold uppercase tracking-wider text-xs pt-6 pb-4">Status</TableHead>
              <TableHead className="text-slate-400 font-bold uppercase tracking-wider text-xs pt-6 pb-4">Sector</TableHead>
              <TableHead className="text-slate-400 font-bold uppercase tracking-wider text-xs pt-6 pb-4">Stage</TableHead>
              <TableHead className="text-slate-400 font-bold uppercase tracking-wider text-xs pt-6 pb-4">Data Collected</TableHead>
              <TableHead className="text-right text-slate-400 font-bold uppercase tracking-wider text-xs pt-6 pb-4 pr-8">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-40 text-center text-slate-500 font-medium text-lg">
                  No startups match your specific filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((company) => {
                const statusInfo = getStatusBadge(companyStatuses[company.id] || "pending");
                const dataPoints = companyDataPoints[company.id];
                
                return (
                  <TableRow key={company.id} className="hover:bg-white/80 border-slate-200/50 transition-colors group">
                    <TableCell className="pl-8 py-5">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                          {renderLogo(company.website, company.name)}
                        </div>
                        <div className="flex flex-col">
                          <div className="text-slate-900 font-extrabold text-lg">{company.name}</div>
                          <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 font-semibold text-sm mt-0.5 hover:underline decoration-indigo-300 underline-offset-2 transition-all w-fit">
                            <Globe className="w-3.5 h-3.5" />
                            {company.website}
                          </a>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${statusInfo.color}`}>
                        {statusInfo.icon}
                        {statusInfo.label}
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge variant="secondary" className="bg-slate-100/80 text-slate-700 hover:bg-slate-200 border-none rounded-lg px-3 py-1 font-bold shadow-sm">
                        {company.sector}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-700 font-bold">{company.stage}</TableCell>

                    {/* UPDATED: Data Collected Column now shows MB or GB */}
                    <TableCell>
                      <div className="flex items-center gap-2 text-slate-600 font-bold text-sm">
                        <Database className="w-4 h-4 text-blue-500" />
                        {dataPoints ? formatDataSize(dataPoints) : "--"}
                      </div>
                    </TableCell>

                    <TableCell className="text-right pr-8">
                      <Link href={`/companies/${company.id}`} className="inline-flex items-center gap-1 text-indigo-600 bg-white hover:bg-indigo-50 hover:text-indigo-800 px-5 py-2.5 rounded-full text-sm font-bold transition-all border border-indigo-100 shadow-sm group-hover:shadow-md hover:-translate-y-0.5">
                        View Profile <ChevronRight className="w-4 h-4" />
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}