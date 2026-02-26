// component/Sidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, List, Bookmark, Settings, Users, Radio, User, ChevronRight } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [userData, setUserData] = useState<{name: string, photo: string, position?: string} | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("vc-user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, [pathname]);

  if (pathname === "/login") return null;

  const isActive = (path: string) => pathname.includes(path);

  const mainLinks = [
    { name: "Discovery", path: "/companies", icon: Search },
    { name: "My Lists", path: "/lists", icon: List },
    { name: "Saved Searches", path: "/saved", icon: Bookmark },
    { name: "Market Signals", path: "/signals", icon: Radio },
    { name: "Team Workspace", path: "/team", icon: Users },
  ];

  return (
    <aside className="w-[280px] bg-white/80 backdrop-blur-3xl flex flex-col z-10 border-r border-slate-200/60 shadow-[8px_0_30px_rgba(0,0,0,0.03)] justify-between h-screen shrink-0">
      
      <div>
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3 text-indigo-700">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center shadow-md">
              <Search className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 drop-shadow-sm">VC Scout</h1>
          </div>
        </div>
        
        <div className="px-4 py-2 space-y-8">
          <nav className="space-y-1.5">
            <div className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3 px-3">Main Menu</div>
            {mainLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link key={link.name} href={link.path} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${active ? "bg-indigo-600 text-white font-bold shadow-md shadow-indigo-200 hover:-translate-y-0.5" : "hover:bg-slate-100/80 text-slate-500 hover:text-slate-900 font-semibold"}`}>
                  <Icon className={`w-4 h-4 ${active ? "stroke-[2.5]" : ""}`} /> {link.name}
                </Link>
              );
            })}
          </nav>

          <nav className="space-y-1.5">
            <div className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3 px-3">System</div>
            <Link href="/settings" className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${isActive("/settings") ? "bg-indigo-600 text-white font-bold shadow-md shadow-indigo-200 hover:-translate-y-0.5" : "hover:bg-slate-100/80 text-slate-500 hover:text-slate-900 font-semibold"}`}>
              <Settings className="w-4 h-4" /> Settings
            </Link>
          </nav>
        </div>
      </div>

      {/* UPDATED PROFILE SECTION - Now links to /profile instead of logging out! */}
      <div className="p-4 border-t border-slate-200/60 bg-slate-50/50 mt-auto">
        <Link href="/profile" className={`w-full flex items-center justify-between p-3 rounded-xl hover:bg-white border hover:border-slate-200 hover:shadow-sm transition-all group cursor-pointer text-left ${isActive("/profile") ? "bg-white border-slate-200 shadow-sm ring-1 ring-indigo-500/20" : "border-transparent"}`}>
          <div className="flex items-center gap-3 overflow-hidden">
            {/* The referrerPolicy="no-referrer" fixes the Google image block! */}
            {userData?.photo ? (
              <img src={userData.photo} alt="Profile" referrerPolicy="no-referrer" onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${userData.name}&background=e0e7ff&color=4338ca`; }} className="w-10 h-10 rounded-full shadow-inner ring-2 ring-white object-cover shrink-0" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-inner ring-2 ring-white shrink-0">
                <User className="w-5 h-5" />
              </div>
            )}
            
            <div className="flex flex-col truncate">
              <span className="text-sm font-bold text-slate-900 leading-none truncate">{userData?.name || "Scout Partner"}</span>
              <span className="text-xs text-slate-500 font-medium mt-1 truncate">{userData?.position || "Logged In"}</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors shrink-0" />
        </Link>
      </div>

    </aside>
  );
}