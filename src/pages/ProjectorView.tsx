import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Sparkles, Target, Zap, Users, Trophy } from 'lucide-react';

export const ProjectorView: React.FC = () => {
  const { profiles } = useAppContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (profiles.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % profiles.length);
    }, 12000); // 12 seconds per profile
    return () => clearInterval(interval);
  }, [profiles.length]);

  const current = profiles[currentIndex];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-12 overflow-hidden flex flex-col">
      <header className="flex justify-between items-center mb-16">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-cyan-500 rounded-2xl flex items-center justify-center neon-cyan rotate-3">
            <Zap className="text-black w-10 h-10 fill-current" />
          </div>
          <div>
            <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none">
              Daegu AI <span className="text-cyan-400">Enthusiast</span>
            </h1>
            <p className="text-slate-500 font-mono tracking-widest text-sm mt-1">SESSION_01: THE FIRST ENCOUNTER</p>
          </div>
        </div>
        <div className="flex gap-12 text-3xl font-mono">
          <div className="flex flex-col items-end">
            <span className="text-slate-500 text-xs uppercase font-bold tracking-widest">Attendees</span>
            <div className="text-cyan-400 font-black">{profiles.length}</div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-slate-500 text-xs uppercase font-bold tracking-widest">Status</span>
            <div className="text-green-400 font-black animate-pulse">LIVE</div>
          </div>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-12 gap-12">
        <div className="col-span-8">
          {current && (
            <Card className="h-full border-cyan-500/30 bg-slate-900/20 p-16 flex flex-col justify-center relative overflow-hidden glass">
              <div className="absolute -top-24 -right-24 p-8 opacity-5">
                <Zap className="w-96 h-96" />
              </div>
              
              <div className="relative z-10 space-y-12">
                <div className="flex items-center gap-4">
                  <Badge className="text-2xl px-6 py-1.5 uppercase font-black italic" variant="neonCyan">
                    {current.aiExperienceLevel}
                  </Badge>
                  <span className="text-slate-500 font-mono text-xl">SCORE: {current.calculatedScore} PTS</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-9xl font-black tracking-tighter leading-none">{current.nickname}</h3>
                  <p className="text-4xl text-slate-500 font-medium uppercase tracking-wide">{current.occupation}</p>
                </div>
                
                <div className="flex gap-4">
                  {current.keywords.map((k, i) => (
                    <span key={i} className="text-3xl font-bold bg-slate-800/80 text-cyan-300 px-8 py-3 rounded-2xl border border-cyan-500/20">
                      #{k}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="bg-slate-900/80 p-10 rounded-[2.5rem] border border-slate-800 flex flex-col">
                    <p className="text-2xl font-black text-yellow-500 mb-6 flex items-center gap-3 uppercase tracking-tighter">
                      <Trophy className="w-8 h-8" /> What I've Built
                    </p>
                    <p className="text-3xl leading-relaxed text-slate-200 font-medium">
                      {current.achievement}
                    </p>
                  </div>
                  <div className="bg-slate-900/80 p-10 rounded-[2.5rem] border border-slate-800 flex flex-col">
                    <p className="text-2xl font-black text-orange-500 mb-6 flex items-center gap-3 uppercase tracking-tighter">
                      <Target className="w-8 h-8" /> Today's Goal
                    </p>
                    <p className="text-3xl leading-relaxed text-slate-200 font-medium italic">
                      "{current.goal}"
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        <div className="col-span-4 flex flex-col gap-6">
          <h2 className="text-xl font-bold text-slate-500 uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5" /> Recent Arrivals
          </h2>
          <div className="space-y-4">
            {profiles.slice(0, 4).map((p, idx) => (
              <div 
                key={p.id} 
                className={`p-8 rounded-[2rem] border-2 transition-all duration-700 flex justify-between items-center ${
                  idx === currentIndex % 4 ? 'border-cyan-500 bg-cyan-500/10 scale-105 shadow-[0_0_30px_rgba(6,182,212,0.2)]' : 'border-slate-800 bg-slate-900/40 opacity-60'
                }`}
              >
                <div>
                  <div className="text-3xl font-black mb-1">{p.nickname}</div>
                  <div className="text-slate-500 font-bold uppercase text-sm tracking-widest">{p.occupation}</div>
                </div>
                <div className="text-right">
                   <div className="text-cyan-400 font-mono font-bold text-xl">{p.calculatedScore}</div>
                   <div className="text-[10px] text-slate-600 font-bold uppercase">PTS</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-auto p-12 border-4 border-dashed border-slate-900 rounded-[3rem] flex flex-col items-center justify-center text-center bg-slate-900/10">
            <div className="text-3xl font-black text-slate-700 mb-6 uppercase tracking-tighter">Scan to Join the Nexus</div>
            <div className="w-56 h-56 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent"></div>
               <span className="text-slate-800 font-black text-4xl">[ QR ]</span>
            </div>
            <p className="mt-6 text-slate-600 font-mono text-sm uppercase tracking-widest">nexus.daegu.ai</p>
          </div>
        </div>
      </main>
      
      <footer className="mt-16 pt-8 border-t border-slate-900 flex justify-between items-center text-slate-700 font-mono text-sm">
        <div className="flex gap-8">
          <span>#DAEGU_AI</span>
          <span>#HEAVY_USER_ONLY</span>
          <span>#AGENTIC_ERA</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
          SYSTEM_STABLE // CONNECTED_TO_NEXUS_V1
        </div>
      </footer>
    </div>
  );
};
