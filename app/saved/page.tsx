// app/saved/page.tsx
"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, Trash2, ArrowRight, Search, Play } from "lucide-react"; // Added Play icon
import Link from "next/link";

export default function SavedSearchesPage() {
  const [searches, setSearches] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("vc-saved-searches");
    if (saved) setSearches(JSON.parse(saved));
  }, []);

  const handleDelete = (id: string) => {
    const updated = searches.filter(s => s.id !== id);
    setSearches(updated);
    localStorage.setItem("vc-saved-searches", JSON.stringify(updated));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="border-b pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Saved Searches</h1>
        <p className="text-gray-500 mt-1">Quickly access your frequent thesis filters.</p>
      </div>

      {searches.length === 0 ? (
        <Card className="border-dashed border-2 border-gray-200 bg-gray-50/50">
          <CardContent className="flex flex-col items-center justify-center h-64 text-center space-y-4 pt-6">
            <div className="p-4 bg-blue-100 rounded-full">
              <Bookmark className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">No saved searches</h3>
              <p className="text-sm text-gray-500 max-w-sm mt-1">
                Go to the Discovery tab and click "Save" next to the search bar to keep your queries here.
              </p>
            </div>
            <Link href="/companies">
              <Button variant="outline" className="mt-2">Go to Discovery <ArrowRight className="w-4 h-4 ml-2"/></Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {searches.map(search => (
            <Card key={search.id} className="hover:shadow-md transition-shadow group flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">"{search.query}"</h3>
                  <p className="text-xs text-gray-500">Saved on {new Date(search.date).toLocaleDateString()}</p>
                </div>
              </div>
              
              {/* THE FIX: Added the Run Search button and grouped the actions */}
              <div className="flex items-center gap-2">
                 {/* This Link dynamically passes the query back to the Discovery page */}
                 <Link href={`/companies?q=${encodeURIComponent(search.query)}`}>
                   <Button variant="secondary" size="sm" className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold">
                     <Play className="w-3 h-3 mr-2" /> Run
                   </Button>
                 </Link>
                 <button onClick={() => handleDelete(search.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}