import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Sparkles, Target, Zap, Trophy, X, Settings, Maximize2, Minimize2 } from 'lucide-react';

export const ProjectorView: React.FC = () => {
  const { profiles } = useAppContext();
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const selectedProfile = profiles.find((p) => p.id === selectedProfileId) ?? null;
  const isFullscreen = typeof document !== 'undefined' && Boolean(document.fullscreenElement);

  const toggleFullscreen = async () => {
    if (typeof document === 'undefined') return;
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      return;
    }
    await document.exitFullscreen();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 pb-24 md:p-8 md:pb-28 overflow-hidden flex flex-col relative">
      <header className="flex justify-between items-center mb-6 md:mb-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-cyan-500 rounded-xl flex items-center justify-center neon-cyan rotate-3">
            <Zap className="text-black w-6 h-6 md:w-7 md:h-7 fill-current" />
          </div>
          <div>
            <h1 className="text-xl md:text-3xl font-black tracking-tight uppercase leading-none">
              Daegu AI <span className="text-cyan-400">Projector</span>
            </h1>
            <p className="text-slate-500 font-mono tracking-widest text-[10px] md:text-xs mt-1">LIVE CARD WALL</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-300 hover:text-white hover:border-cyan-500"
            onClick={() => setIsSettingsOpen((prev) => !prev)}
          >
            <Settings className="w-3.5 h-3.5" /> 설정
          </button>
          <Badge variant="secondary" className="text-[10px] md:text-xs">{profiles.length} CARDS</Badge>
        </div>
      </header>

      {isSettingsOpen && (
        <div className="absolute top-16 right-4 md:top-20 md:right-8 z-40 w-52 rounded-xl border border-slate-800 bg-slate-900/95 p-3 space-y-2">
          <div className="text-xs text-slate-300 font-semibold">프로젝터 설정</div>
          <button
            type="button"
            className="w-full inline-flex items-center justify-center gap-1 h-8 px-3 rounded-md bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            {isFullscreen ? '전체화면 해제' : '전체화면'}
          </button>
        </div>
      )}

      {profiles.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-slate-500 text-center px-6">
          아직 등록된 카드가 없습니다. 카톡방에 공유된 사이트에서 먼저 설문을 작성해 주세요.
        </div>
      ) : (
        <main className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {profiles.map((profile) => (
            <Card
              key={profile.id}
              className="border-slate-800 bg-slate-900/40 p-3 md:p-4 hover:border-cyan-500/60 cursor-pointer transition-all hover:-translate-y-0.5"
              onClick={() => setSelectedProfileId(profile.id)}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-sm md:text-base font-black leading-tight">{profile.nickname}</div>
                  <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wider">{profile.occupation}</div>
                </div>
                <Badge variant="outline" className="text-[10px]">{profile.aiExperienceLevel}</Badge>
              </div>

              <div className="mt-3 flex flex-wrap gap-1">
                {profile.keywords.slice(0, 3).map((k, i) => (
                  <span key={i} className="text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-1.5 py-0.5 rounded">
                    #{k}
                  </span>
                ))}
              </div>

              <div className="mt-3 text-[10px] md:text-xs text-slate-300 line-clamp-2">{profile.goal}</div>
            </Card>
          ))}
        </main>
      )}

      {selectedProfile && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm p-4 md:p-8 flex items-center justify-center"
          onClick={() => setSelectedProfileId(null)}
        >
          <Card
            className="w-full max-w-3xl border-cyan-500/40 bg-slate-950 p-5 md:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start gap-4">
              <div>
                <div className="text-3xl md:text-5xl font-black tracking-tight">{selectedProfile.nickname}</div>
                <div className="text-sm md:text-lg text-slate-400 mt-1">{selectedProfile.occupation}</div>
              </div>
              <button
                type="button"
                className="rounded-md border border-slate-700 p-1.5 text-slate-300 hover:text-white hover:border-cyan-500"
                onClick={() => setSelectedProfileId(null)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Badge variant="neonCyan">{selectedProfile.aiExperienceLevel}</Badge>
              <Badge variant="outline">SCORE {selectedProfile.calculatedScore}</Badge>
              <Badge variant="outline" className="max-w-full truncate">THREAD {selectedProfile.threadId}</Badge>
            </div>

            <div className="mt-5 grid md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="text-[11px] font-bold text-yellow-500 mb-2 flex items-center gap-1 uppercase tracking-wider">
                  <Trophy className="w-3.5 h-3.5" /> Achievement
                </p>
                <p className="text-sm md:text-base text-slate-200 leading-relaxed">{selectedProfile.achievement}</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="text-[11px] font-bold text-orange-500 mb-2 flex items-center gap-1 uppercase tracking-wider">
                  <Target className="w-3.5 h-3.5" /> Goal
                </p>
                <p className="text-sm md:text-base text-slate-200 leading-relaxed">{selectedProfile.goal}</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {selectedProfile.keywords.map((k, i) => (
                <span key={i} className="text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-2 py-1 rounded-md">
                  <Sparkles className="w-3 h-3 inline mr-1" />#{k}
                </span>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
