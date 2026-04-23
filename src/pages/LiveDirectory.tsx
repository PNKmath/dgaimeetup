import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import type { AIExperienceLevel } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Search, MessageSquare, Trophy, Target, Zap, Settings, Lock, Trash2, CheckCircle2 } from 'lucide-react';

export const LiveDirectory: React.FC = () => {
  const { profiles, toggleProfileCompleted, removeCompletedProfiles } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<AIExperienceLevel | 'All'>('All');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [isDeleteUnlocked, setIsDeleteUnlocked] = useState(false);

  const filteredProfiles = profiles.filter(p => {
    const content = `${p.nickname} ${p.occupation} ${p.threadId} ${p.keywords.join(' ')} ${p.achievement} ${p.goal}`.toLowerCase();
    const matchesSearch = content.includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'All' || p.aiExperienceLevel === filterLevel;
    return matchesSearch && matchesLevel;
  });

  const getLevelVariant = (level: AIExperienceLevel) => {
    switch (level) {
      case 'Pro': return 'neonPurple';
      case 'Heavy': return 'neonCyan';
      case 'Intermediate': return 'neonGreen';
      case 'Beginner': return 'outline';
    }
  };

  const completedCount = profiles.filter((p) => p.isCompleted).length;

  const unlockDeleteMode = () => {
    if (passwordInput === '9137') {
      setIsDeleteUnlocked(true);
      setPasswordInput('');
      return;
    }
    alert('비밀번호가 올바르지 않습니다.');
  };

  return (
    <div className="min-h-screen p-4 pb-24 max-w-4xl mx-auto space-y-6">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md pb-4 pt-2 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
            <Zap className="w-5 h-5 fill-cyan-400" /> AI NEXUS DIRECTORY
          </h1>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{profiles.length} Active Members</Badge>
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-300 hover:text-white hover:border-cyan-500"
              onClick={() => setIsSettingsOpen((prev) => !prev)}
            >
              <Settings className="w-3.5 h-3.5" /> 설정
            </button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="기술, 경험, 목표 키워드 검색..." 
            className="pl-10 bg-slate-900/50 border-slate-800"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['All', 'Beginner', 'Intermediate', 'Heavy', 'Pro'].map((level) => (
            <Badge
              key={level}
              variant={filterLevel === level ? 'neonCyan' : 'outline'}
              className="cursor-pointer whitespace-nowrap"
              onClick={() => setFilterLevel(level as any)}
            >
              {level}
            </Badge>
          ))}
        </div>

        {isSettingsOpen && (
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 space-y-3">
            <div className="text-xs text-slate-300 font-semibold">관리자 설정</div>
            {!isDeleteUnlocked ? (
              <div className="flex gap-2 items-center">
                <Input
                  type="password"
                  placeholder="비밀번호 입력"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="bg-slate-950/70 border-slate-700 h-8 text-xs"
                />
                <button
                  type="button"
                  onClick={unlockDeleteMode}
                  className="inline-flex items-center gap-1 h-8 px-3 rounded-md bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold"
                >
                  <Lock className="w-3.5 h-3.5" /> 해제
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="text-xs text-green-400">삭제 권한 활성화됨</div>
                <button
                  type="button"
                  disabled={completedCount === 0}
                  onClick={removeCompletedProfiles}
                  className="inline-flex items-center justify-center gap-1 h-8 px-3 rounded-md bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" /> 완료된 카드 삭제 ({completedCount})
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProfiles.map((profile) => (
          <Card key={profile.id} className="border-slate-800 hover:border-cyan-500/50 transition-all group relative overflow-hidden flex flex-col">
            <CardHeader className="p-5 pb-2">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-xl font-black group-hover:text-cyan-400 transition-colors">
                    {profile.nickname}
                  </CardTitle>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{profile.occupation}</p>
                  <p className="text-[10px] text-slate-400 font-mono break-all">
                    THREAD ID: <span className="text-cyan-300">{profile.threadId}</span>
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge variant={getLevelVariant(profile.aiExperienceLevel)}>
                    {profile.aiExperienceLevel}
                  </Badge>
                  {profile.isCompleted && (
                    <Badge variant="neonGreen" className="text-[10px]">
                      완료
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-5 pt-2 flex-1 flex flex-col space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {profile.keywords.map((k, i) => (
                  <span key={i} className="text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded">
                    #{k}
                  </span>
                ))}
              </div>
              
              <div className="space-y-3 flex-1">
                <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-800/50">
                  <p className="text-[10px] font-bold text-yellow-500 mb-1 flex items-center gap-1 uppercase tracking-tighter">
                    <Trophy className="w-3 h-3" /> Achievement
                  </p>
                  <p className="text-sm text-slate-300 leading-snug">{profile.achievement}</p>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-800/50">
                  <p className="text-[10px] font-bold text-orange-500 mb-1 flex items-center gap-1 uppercase tracking-tighter">
                    <Target className="w-3 h-3" /> Today's Goal
                  </p>
                  <p className="text-sm text-slate-300 leading-snug">{profile.goal}</p>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center border-t border-slate-800/50 mt-auto">
                <div className="text-[10px] font-mono text-slate-500">
                  SCORE: <span className="text-cyan-400 font-bold">{profile.calculatedScore} PTS</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className={`flex items-center gap-1 text-[10px] font-bold hover:underline ${profile.isCompleted ? 'text-green-400' : 'text-slate-400'}`}
                    onClick={() => toggleProfileCompleted(profile.id)}
                  >
                    <CheckCircle2 className="w-3 h-3" /> {profile.isCompleted ? '완료됨' : '완료 처리'}
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-1 text-[10px] font-bold text-cyan-400 hover:underline"
                    onClick={() => {
                      navigator.clipboard?.writeText(profile.threadId);
                    }}
                  >
                    <MessageSquare className="w-3 h-3" /> THREAD ID 복사
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredProfiles.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          매칭되는 참가자가 없습니다. 검색어를 바꿔보세요!
        </div>
      )}
    </div>
  );
};
