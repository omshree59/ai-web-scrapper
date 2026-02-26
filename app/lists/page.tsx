// app/lists/page.tsx
"use client";
import { useState, useEffect } from "react";
import { mockCompanies } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FolderGit2, Plus, ArrowRight, Trash2, X, ChevronLeft, Building2 } from "lucide-react";
import Link from "next/link";

export default function ListsPage() {
  const [lists, setLists] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [selectedList, setSelectedList] = useState<any | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("vc-lists");
    if (saved) setLists(JSON.parse(saved));
  }, []);

  const handleCreateList = () => {
    if (!newListName.trim()) return;
    const newList = { id: Date.now().toString(), name: newListName, count: 0, companies: [] };
    const updatedLists = [...lists, newList];
    
    setLists(updatedLists);
    localStorage.setItem("vc-lists", JSON.stringify(updatedLists));
    
    // LOG IT!
    const activities = JSON.parse(localStorage.getItem("vc-activities") || "[]");
    const newActivity = { id: Date.now(), user: "You", avatar: "N", color: "bg-slate-800", action: "created a new list", target: newListName, time: Date.now(), type: "folder" };
    localStorage.setItem("vc-activities", JSON.stringify([newActivity, ...activities].slice(0, 30)));
    window.dispatchEvent(new Event("storage"));

    setNewListName("");
    setIsCreating(false);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); 
    const updatedLists = lists.filter(l => l.id !== id);
    setLists(updatedLists);
    localStorage.setItem("vc-lists", JSON.stringify(updatedLists));
    if (selectedList?.id === id) setSelectedList(null);
  };

  const handleRemoveFromList = (companyId: string) => {
    if (!selectedList) return;
    const updatedCompanies = selectedList.companies.filter((id: string) => id !== companyId);
    const updatedList = { ...selectedList, companies: updatedCompanies, count: updatedCompanies.length };
    
    const updatedAllLists = lists.map(l => l.id === selectedList.id ? updatedList : l);
    
    setSelectedList(updatedList);
    setLists(updatedAllLists);
    localStorage.setItem("vc-lists", JSON.stringify(updatedAllLists));
  };

  if (selectedList) {
    const savedCompanies = mockCompanies.filter(c => (selectedList.companies || []).includes(c.id));

    return (
      <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
        <button onClick={() => setSelectedList(null)} className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to All Lists
        </button>

        <div className="flex justify-between items-end border-b pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg"><FolderGit2 className="w-6 h-6" /></div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{selectedList.name}</h1>
            </div>
            <p className="text-gray-500">{selectedList.count} companies saved in this list.</p>
          </div>
          <Button variant="outline"><ArrowRight className="w-4 h-4 mr-2"/> Export CSV</Button>
        </div>

        {savedCompanies.length === 0 ? (
          <div className="text-center py-12 bg-white/50 rounded-lg border border-dashed">
            <p className="text-gray-500 mb-4">This list is empty.</p>
            <Link href="/companies"><Button>Find Companies</Button></Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {savedCompanies.map(company => (
              <Card key={company.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gray-50 rounded-md border"><Building2 className="w-5 h-5 text-gray-500"/></div>
                    <div>
                      <h3 className="font-bold text-lg">{company.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700">{company.sector}</Badge>
                        <span className="text-sm text-gray-500">{company.stage}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => handleRemoveFromList(company.id)} className="text-sm text-red-500 hover:underline">Remove</button>
                    <Link href={`/companies/${company.id}`}>
                      <Button variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100">View Profile</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Lists</h1>
          <p className="text-gray-500 mt-1">Manage and export your curated startup lists.</p>
        </div>
        {!isCreating && (
          <Button onClick={() => setIsCreating(true)} className="bg-indigo-600 hover:bg-indigo-700 shadow-md">
            <Plus className="w-4 h-4 mr-2" /> Create New List
          </Button>
        )}
      </div>

      {isCreating && (
        <Card className="border-indigo-200 shadow-sm bg-indigo-50/30">
          <CardContent className="p-4 flex items-center gap-3">
            <Input 
              autoFocus
              placeholder="e.g., Q3 AI Infrastructure..." 
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateList()}
              className="max-w-md bg-white"
            />
            <Button onClick={handleCreateList} className="bg-indigo-600 hover:bg-indigo-700">Save</Button>
            <Button variant="ghost" onClick={() => setIsCreating(false)}><X className="w-4 h-4"/></Button>
          </CardContent>
        </Card>
      )}

      {lists.length === 0 ? (
        <Card className="border-dashed border-2 border-gray-200 bg-white/50">
          <CardContent className="flex flex-col items-center justify-center h-64 text-center space-y-4 pt-6">
            <div className="p-4 bg-indigo-100 rounded-full">
              <FolderGit2 className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">No lists created yet</h3>
              <p className="text-sm text-gray-500 max-w-sm mt-1">Create a list to start saving interesting companies.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lists.map(list => (
            <Card 
              key={list.id} 
              onClick={() => setSelectedList(list)}
              className="hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group relative bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <FolderGit2 className="w-5 h-5" />
                  </div>
                  <button onClick={(e) => handleDelete(e, list.id)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">{list.name}</h3>
                <p className="text-sm text-gray-500">{list.count} companies saved</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}