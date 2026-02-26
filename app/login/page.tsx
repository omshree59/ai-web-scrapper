// app/login/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, googleProvider, db } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Search, Loader2, Database, Sparkles, Rocket, ShieldCheck, UserCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [slide, setSlide] = useState(0);
  const [authenticating, setAuthenticating] = useState(false);

  useEffect(() => {
    if (slide < 4) {
      const timer = setTimeout(() => {
        setSlide((prev) => prev + 1);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [slide]);

  const handleGoogleLogin = async () => {
    setAuthenticating(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        lastLogin: serverTimestamp(),
        role: "scout",
      }, { merge: true });

      localStorage.setItem("vc-user", JSON.stringify({
        name: user.displayName,
        photo: user.photoURL,
        company: "",
        position: ""
      }));

      router.push("/companies");
    } catch (error) {
      console.error("Firebase Login Failed:", error);
      alert("Login failed. Check console for details.");
      setAuthenticating(false); 
    }
  };

  // NEW: Guest Login Logic
  const handleGuestLogin = () => {
    setAuthenticating(true);
    setTimeout(() => {
      localStorage.setItem("vc-user", JSON.stringify({
        name: "Guest Explorer",
        photo: "",
        company: "Independent",
        position: "Guest Analyst"
      }));
      router.push("/companies");
    }, 1000); // Small fake delay for realistic UX
  };

  const trustedFunds = [
    { name: "Sequoia", domain: "sequoiacap.com" },
    { name: "a16z", domain: "a16z.com" },
    { name: "Y Combinator", domain: "ycombinator.com" },
    { name: "Benchmark", domain: "benchmark.com" }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-transparent blur-[100px] pointer-events-none z-0 animate-pulse duration-10000" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tl from-blue-600/20 via-cyan-500/10 to-transparent blur-[120px] pointer-events-none z-0 animate-pulse delay-1000 duration-7000" />
      <div className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] rounded-full bg-gradient-to-tr from-fuchsia-600/20 to-transparent blur-[90px] pointer-events-none z-0 animate-pulse delay-700" />

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl p-8 h-screen text-center">

        <div className={`absolute transition-all duration-1000 cubic-bezier(0.25, 1, 0.5, 1) w-full ${slide === 0 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95 pointer-events-none"}`}>
          <Rocket className="w-20 h-20 text-indigo-400 mx-auto mb-6 drop-shadow-[0_0_30px_rgba(99,102,241,0.6)]" />
          <h1 className="text-5xl font-black mb-4 tracking-tight">Discover the Next Unicorn</h1>
          <p className="text-xl text-slate-400 font-medium">The automated sourcing pipeline built for modern venture capital.</p>
        </div>

        <div className={`absolute transition-all duration-1000 cubic-bezier(0.25, 1, 0.5, 1) w-full ${slide === 1 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95 pointer-events-none"}`}>
          <Database className="w-20 h-20 text-cyan-400 mx-auto mb-6 drop-shadow-[0_0_30px_rgba(34,211,238,0.6)]" />
          <h1 className="text-5xl font-black mb-4 tracking-tight">Deep Web Intelligence</h1>
          <p className="text-xl text-slate-400 font-medium">Scraping and analyzing thousands of real-time market signals.</p>
        </div>

        <div className={`absolute transition-all duration-1000 cubic-bezier(0.25, 1, 0.5, 1) w-full ${slide === 2 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95 pointer-events-none"}`}>
          <Sparkles className="w-20 h-20 text-purple-400 mx-auto mb-6 drop-shadow-[0_0_30px_rgba(192,132,252,0.6)]" />
          <h1 className="text-5xl font-black mb-4 tracking-tight">AI-Powered Precision</h1>
          <p className="text-xl text-slate-400 font-medium">Transforming noisy startup websites into structured JSON insights.</p>
        </div>

        <div className={`absolute transition-all duration-1000 cubic-bezier(0.25, 1, 0.5, 1) w-full ${slide === 3 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95 pointer-events-none"}`}>
          <ShieldCheck className="w-16 h-16 text-emerald-400 mx-auto mb-6 drop-shadow-[0_0_30px_rgba(52,211,153,0.6)]" />
          <h1 className="text-4xl font-black mb-8 tracking-tight">Trusted by Leading Funds</h1>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {trustedFunds.map((fund) => (
              <div key={fund.name} className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl backdrop-blur-md shadow-xl">
                <img src={`https://www.google.com/s2/favicons?domain=${fund.domain}&sz=64`} alt={fund.name} className="w-8 h-8 rounded-full grayscale opacity-80" />
                <span className="text-lg font-bold text-slate-300">{fund.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`w-full max-w-md absolute transition-all duration-1000 delay-300 ${slide === 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"}`}>
          <div className="bg-slate-900/60 backdrop-blur-3xl border border-slate-700/50 rounded-[2.5rem] shadow-2xl p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(99,102,241,0.5)] mx-auto mb-6 relative z-10">
              <Search className="w-10 h-10 text-white stroke-[2.5]" />
            </div>
            
            <h2 className="text-3xl font-black text-white mb-2 relative z-10">VC Scout</h2>
            <p className="text-sm text-slate-400 font-medium mb-8 relative z-10">Sign in to access your intelligence dashboard and team workspace.</p>

            {authenticating ? (
              <div className="flex flex-col items-center justify-center py-4 text-indigo-400 relative z-10">
                <Loader2 className="w-8 h-8 animate-spin mb-3" />
                <p className="font-bold text-sm tracking-wide">Authenticating securely...</p>
              </div>
            ) : (
              <div className="relative z-10 space-y-4">
                <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 px-6 py-4 rounded-2xl font-black text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </button>

                <div className="flex items-center gap-3 opacity-60">
                  <div className="h-px bg-slate-500 flex-1"></div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Or</span>
                  <div className="h-px bg-slate-500 flex-1"></div>
                </div>

                <button onClick={handleGuestLogin} className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600 px-6 py-3.5 rounded-2xl font-bold transition-all shadow-md">
                  <UserCircle2 className="w-5 h-5 text-slate-400" />
                  Continue as Guest
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}