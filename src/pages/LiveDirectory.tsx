import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import type { AIExperienceLevel } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Search, MessageSquare, Trophy, Target, Zap } from 'lucide-react';

export const LiveDirectory: React.FC = () => {
  const { profiles } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<AIExperienceLevel | 'All'>('All');

  const filteredProfiles = profiles.filter(p => {
    const content = `${p.nickname} ${p.occupation} ${p.keywords.join(' ')} ${p.achievement} ${p.goal}`.toLowerCase();
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

  return (
    <div className="min-h-screen p-4 pb-24 max-w-4xl mx-auto space-y-6">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md pb-4 pt-2 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
            <Zap className="w-5 h-5 fill-cyan-400" /> AI NEXUS DIRECTORY
          </h1>
          <Badge variant="secondary">{profiles.length} Active Members</Badge>
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
                </div>
                <Badge variant={getLevelVariant(profile.aiExperienceLevel)}>
                  {profile.aiExperienceLevel}
                </Badge>
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
                <button className="flex items-center gap-1 text-[10px] font-bold text-cyan-400 hover:underline">
                  <MessageSquare className="w-3 h-3" /> CONNECT
                </button>
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
