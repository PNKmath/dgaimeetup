import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import type { AIExperienceLevel } from '../types';
import { TECH_TAGS, calculateLevel } from '../lib/constants';
import { Button } from '../components/ui/button';
import { Input, Textarea } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Sparkles, Target, Briefcase, Zap, ShieldCheck, Trophy } from 'lucide-react';

const ACHIEVEMENT_SUGGESTIONS = ["업무 자동화 구축", "AI 앱 서비스 출시", "Cursor로 코딩 혁신", "LLM 로컬 서버 구동", "Prompt 최적화"];
const GOAL_SUGGESTIONS = ["협업 파트너 찾기", "에이전트 노하우 공유", "수익화 전략 토론", "최신 모델 성능 비교", "인사이트 공유"];

export const OnboardingForm: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { addProfile } = useAppContext();
  const [formData, setFormData] = useState({
    nickname: '',
    occupation: '',
    threadId: '',
    keywords: ['', '', ''],
    selectedTechs: [] as string[],
    achievement: '',
    goal: '',
  });

  const currentScore = useMemo(() => {
    return formData.selectedTechs.reduce((acc, techId) => {
      const tech = TECH_TAGS.find(t => t.id === techId);
      return acc + (tech?.points || 0);
    }, 0);
  }, [formData.selectedTechs]);

  const currentLevel = useMemo(() => calculateLevel(currentScore), [currentScore]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.selectedTechs.length === 0) {
      alert('최소 하나 이상의 기술 키워드를 선택해주세요!');
      return;
    }
    await addProfile({
      ...formData,
      isCompleted: false,
      keywords: formData.keywords.filter(k => k.trim() !== ''),
      calculatedScore: currentScore,
      aiExperienceLevel: currentLevel as AIExperienceLevel,
    });
    onComplete();
  };

  const toggleTech = (techId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedTechs: prev.selectedTechs.includes(techId)
        ? prev.selectedTechs.filter(id => id !== techId)
        : [...prev.selectedTechs, techId]
    }));
  };

  const updateKeyword = (index: number, value: string) => {
    const newKeywords = [...formData.keywords];
    newKeywords[index] = value;
    setFormData({ ...formData, keywords: newKeywords });
  };

  const getLevelColor = (level: string) => {
    switch(level) {
      case 'Pro': return 'text-purple-400 border-purple-400';
      case 'Heavy': return 'text-cyan-400 border-cyan-400';
      case 'Intermediate': return 'text-green-400 border-green-400';
      default: return 'text-slate-400 border-slate-400';
    }
  };

  return (
    <div className="min-h-screen p-4 pb-32 max-w-xl mx-auto">
      <Card className="border-cyan-500/30">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Zap className="text-cyan-400 w-10 h-10 animate-pulse" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            AI Meetup Onboarding
          </CardTitle>
          <CardDescription>
            각 문항 아래 가이드를 참고해서 편하게 작성하세요. 기술 스택을 체크하면 AI 레벨이 자동 측정됩니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Real-time Level Display */}
            <div className={`p-6 rounded-2xl border-2 bg-slate-900/50 text-center transition-all duration-500 ${getLevelColor(currentLevel)}`}>
              <div className="text-sm uppercase tracking-widest font-bold mb-1">Your AI Rank</div>
              <div className="text-4xl font-black mb-2 tracking-tighter">{currentLevel}</div>
              <div className="text-xs opacity-70">Current Score: {currentScore} pts</div>
            </div>

            <div className="space-y-4">
              <Label className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-cyan-400" /> 기본 정보</Label>
              <p className="text-xs text-slate-400 leading-relaxed">
                닉네임은 다른 참가자가 바로 알아볼 수 있게 적어주세요. 직업/역할은 지금 하고 있는 일을 한 줄로 적으면 됩니다.
              </p>
              <Input 
                placeholder="닉네임 (예: 대구빌더)" 
                required 
                value={formData.nickname}
                onChange={e => setFormData({...formData, nickname: e.target.value})}
                className="bg-slate-900/50"
              />
              <Input 
                placeholder="어떤 일을 하시나요? (예: 서비스 기획자, 개발자)" 
                required 
                value={formData.occupation}
                onChange={e => setFormData({...formData, occupation: e.target.value})}
                className="bg-slate-900/50"
              />
              <p className="text-xs text-slate-400 leading-relaxed">
                서로 연결할 수 있도록 쓰레드 ID를 남겨주세요. 예: telegram:-1001234567890:17585
              </p>
              <Input 
                placeholder="공유할 쓰레드 ID (예: discord:#ai-meetup 또는 telegram:-1001234567890:17585)" 
                required 
                value={formData.threadId}
                onChange={e => setFormData({...formData, threadId: e.target.value})}
                className="bg-slate-900/50"
              />
            </div>

            <div className="space-y-4">
              <Label className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-purple-400" /> 지식 및 기술 체크</Label>
              <p className="text-xs text-slate-400 leading-relaxed">
                "잘한다"보다 "실제로 써봤다" 기준으로 선택해 주세요. 모르면 비워둬도 괜찮고, 해당되는 태그만 고르면 됩니다.
              </p>
              <div className="space-y-4">
                {(['Model', 'Concept', 'Tools', 'Expert'] as const).map(cat => (
                  <div key={cat} className="space-y-2">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{cat}s</div>
                    <div className="flex flex-wrap gap-2">
                      {TECH_TAGS.filter(t => t.category === cat).map(tech => (
                        <Badge
                          key={tech.id}
                          variant={formData.selectedTechs.includes(tech.id) ? 'neonCyan' : 'outline'}
                          className="cursor-pointer py-1.5 px-3"
                          onClick={() => toggleTech(tech.id)}
                        >
                          {tech.label} (+{tech.points})
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label className="flex items-center gap-2"><Trophy className="w-4 h-4 text-yellow-400" /> AI로 이룬 것 (현재 하는 일)</Label>
              <p className="text-xs text-slate-400 leading-relaxed">
                완성된 결과가 아니어도 좋아요. 지금 진행 중인 자동화/실험/프로젝트를 구체적으로 한두 문장으로 적어주세요.
              </p>
              <Textarea 
                placeholder="예: LLM으로 업무 자동화 툴 구축" 
                required
                value={formData.achievement}
                onChange={e => setFormData({...formData, achievement: e.target.value})}
                className="bg-slate-900/50"
              />
              <div className="flex flex-wrap gap-1">
                {ACHIEVEMENT_SUGGESTIONS.map(s => (
                  <button 
                    key={s} type="button" 
                    className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded-md hover:text-white"
                    onClick={() => setFormData({...formData, achievement: s})}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label className="flex items-center gap-2"><Target className="w-4 h-4 text-orange-400" /> AI로 하고 싶은 것 (오늘의 목표)</Label>
              <p className="text-xs text-slate-400 leading-relaxed">
                오늘 이 자리에서 얻고 싶은 도움이나 연결을 적어주세요. "누구에게 어떤 도움을 받고 싶은지"를 쓰면 매칭에 유리합니다.
              </p>
              <Textarea 
                placeholder="예: 에이전트 구축 노하우 배우기" 
                required
                value={formData.goal}
                onChange={e => setFormData({...formData, goal: e.target.value})}
                className="bg-slate-900/50"
              />
              <div className="flex flex-wrap gap-1">
                {GOAL_SUGGESTIONS.map(s => (
                  <button 
                    key={s} type="button" 
                    className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded-md hover:text-white"
                    onClick={() => setFormData({...formData, goal: s})}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-cyan-400" /> 명찰 키워드 3개</Label>
              <p className="text-xs text-slate-400 leading-relaxed">
                명찰에 보여줄 키워드입니다. 본인을 설명하는 단어(관심사/강점/도메인)를 짧게 적어주세요.
              </p>
              <div className="grid grid-cols-3 gap-2">
                {formData.keywords.map((k, i) => (
                  <Input 
                    key={i}
                    placeholder={`#키워드${i+1}`}
                    value={k}
                    onChange={e => updateKeyword(i, e.target.value)}
                    className="bg-slate-900/50 text-xs text-center"
                  />
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-black py-8 text-lg">
              분석 완료 및 입장하기
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
