// app/profile/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Building2, Briefcase, LogOut, CheckCircle2, Mail, ShieldAlert } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  // Added "email" to the state to show the Google-connected email
  const [userData, setUserData] = useState({ name: "", photo: "", company: "", position: "", email: "" });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("vc-user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("vc-user", JSON.stringify(userData));
    window.dispatchEvent(new Event("storage")); 
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem("vc-user");
    router.push("/login");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Header */}
      <div className="border-b border-slate-200/50 pb-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm">Workspace Profile</h1>
        <p className="text-slate-500 mt-2 font-medium">Manage your personal information, firm details, and account security.</p>
      </div>

      <div className="space-y-6">
        
        {/* MAIN UNIFIED PROFILE CARD */}
        <Card className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">
          
          {/* Top Gradient Banner */}
          <div className="h-32 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 relative">
            <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
          </div>

          <CardContent className="px-8 pb-8 pt-0">
            
            {/* Avatar & Action Row (Overlaps the banner) */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-12 mb-8">
              <div className="flex items-end gap-5">
                {/* Avatar */}
                <div className="relative">
                  {userData.photo ? (
                    <img 
                      src={userData.photo} 
                      alt="Profile" 
                      referrerPolicy="no-referrer" 
                      className="w-24 h-24 rounded-2xl shadow-xl ring-4 ring-white object-cover bg-white" 
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-xl ring-4 ring-white">
                      <User className="w-10 h-10" />
                    </div>
                  )}
                  {/* Online Status Dot */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-white"></div>
                </div>
                
                {/* Name & Role Text */}
                <div className="pb-1">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">{userData.name || "Guest User"}</h2>
                  <p className="text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
                    {userData.position || "Analyst"} <span className="text-slate-300">•</span> {userData.company || "VC Firm"}
                  </p>
                </div>
              </div>

              {/* Save Button now sits beautifully at the top right of the content area */}
              <Button 
                onClick={handleSave} 
                className={`px-6 py-5 rounded-xl font-bold shadow-lg transition-all hover:-translate-y-0.5 ${isSaved ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white"}`}
              >
                {isSaved ? <><CheckCircle2 className="w-4 h-4 mr-2" /> Details Saved</> : "Save Changes"}
              </Button>
            </div>

            <div className="h-px w-full bg-slate-100 mb-8"></div>

            {/* FORM GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Basic Info Column */}
              <div className="space-y-6">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-wider">Personal Information</h3>
                
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <User className="w-4 h-4 text-indigo-500" /> Full Name
                  </label>
                  <Input 
                    value={userData.name || ""}
                    onChange={(e) => setUserData({...userData, name: e.target.value})}
                    className="bg-slate-50 border-slate-200 shadow-sm h-11 rounded-xl focus-visible:ring-indigo-500"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" /> Email Address
                  </label>
                  <Input 
                    value={userData.email || "guest@vcscout.com"}
                    disabled
                    className="bg-slate-100/50 border-slate-200 text-slate-500 shadow-none h-11 rounded-xl cursor-not-allowed"
                  />
                  <p className="text-xs text-slate-400 font-medium">Your email is linked to your Google Account and cannot be changed here.</p>
                </div>
              </div>

              {/* Firm Info Column */}
              <div className="space-y-6">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-wider">Firm Details</h3>
                
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-indigo-500" /> VC Firm / Company
                  </label>
                  <Input 
                    placeholder="e.g. Sequoia Capital"
                    value={userData.company || ""}
                    onChange={(e) => setUserData({...userData, company: e.target.value})}
                    className="bg-slate-50 border-slate-200 shadow-sm h-11 rounded-xl focus-visible:ring-indigo-500"
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-indigo-500" /> Position
                  </label>
                  <Input 
                    placeholder="e.g. Partner, Analyst"
                    value={userData.position || ""}
                    onChange={(e) => setUserData({...userData, position: e.target.value})}
                    className="bg-slate-50 border-slate-200 shadow-sm h-11 rounded-xl focus-visible:ring-indigo-500"
                  />
                </div>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* DANGER ZONE / ACCOUNT ACTIONS */}
        <Card className="bg-white/40 border border-red-100 rounded-[2rem] shadow-sm overflow-hidden">
          <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center shrink-0">
                <ShieldAlert className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Account Security</h3>
                <p className="text-sm text-slate-500 font-medium">Securely sign out of your workspace session.</p>
              </div>
            </div>
            
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              className="w-full sm:w-auto px-6 py-5 rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-bold transition-all"
            >
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}