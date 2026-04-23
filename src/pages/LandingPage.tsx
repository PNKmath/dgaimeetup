import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Sparkles, ChevronRight, Share2 } from 'lucide-react';

export const LandingPage: React.FC<{ onJoin: () => void; onViewProjector: () => void }> = ({ onJoin, onViewProjector }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950 text-white overflow-hidden relative">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>

      <div className="max-w-md w-full z-10 space-y-12 text-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-widest animate-bounce">
            <Sparkles className="w-3 h-3" /> First Meetup in Daegu
          </div>
          <h1 className="text-5xl font-black tracking-tighter italic">
            AI <span className="text-cyan-400">NEXUS</span> HUB
          </h1>
          <p className="text-slate-400 text-lg">
            대구 AI 헤비유저들의 첫 만남.<br />
            당신이 누구인지 들려주세요.
          </p>
        </div>

        <Card className="border-slate-800 bg-slate-900/40 p-8 glass neon-cyan">
          <CardContent className="p-0 flex flex-col items-center gap-6">
            <div className="w-48 h-48 bg-white p-4 rounded-xl flex items-center justify-center">
              {/* Placeholder for QR Code */}
              <div className="text-slate-800 font-bold text-center">
                <Share2 className="w-12 h-12 mx-auto mb-2 text-slate-400" />
                <span className="text-xs">QR 코드를 스캔하세요</span>
              </div>
            </div>
            <Button 
              size="lg" 
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xl py-8 transition-all hover:scale-105"
              onClick={onJoin}
            >
              JOIN THE NUCLEUS <ChevronRight className="ml-2 w-6 h-6" />
            </Button>
          </CardContent>
        </Card>

        <div className="pt-8">
          <Button 
            variant="ghost" 
            className="text-slate-500 hover:text-cyan-400 text-xs tracking-widest uppercase font-bold"
            onClick={onViewProjector}
          >
            Switch to Projector Mode
          </Button>
        </div>
      </div>

      <footer className="absolute bottom-8 text-slate-600 text-[10px] font-mono tracking-widest uppercase">
        System Initialized: 2026.04.23 // Daegu_AI_Community
      </footer>
    </div>
  );
};
