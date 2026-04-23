import React, { createContext, useContext, useState } from 'react';
import { UserProfile } from '../types';

interface AppContextType {
  profiles: UserProfile[];
  addProfile: (profile: Omit<UserProfile, 'id' | 'createdAt'>) => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const MOCK_PROFILES: UserProfile[] = [
  {
    id: '1',
    nickname: '대구수학강사',
    occupation: '수학 강사',
    keywords: ['수학강사', 'LLM로컬구동', '자동화진심'],
    selectedTechs: ['claude', 'prompt', 'context', 'ollama', 'claudecode'],
    calculatedScore: 48,
    aiExperienceLevel: 'Intermediate',
    achievement: 'Claude와 Cursor를 이용해 수학 문제 1만개를 유형별로 분류하는 자동화 툴을 만들었습니다.',
    goal: '로컬 환경에서 대규모 강의 데이터를 분석할 수 있는 에이전트 구축 방법을 배우고 싶습니다.',
    createdAt: Date.now() - 10000,
  },
  {
    id: '2',
    nickname: '에이전트마스터',
    occupation: '소프트웨어 엔지니어',
    keywords: ['에이전트', '하네스', '오픈소스'],
    selectedTechs: ['chatgpt', 'github', 'agents', 'harness', 'hermes', 'openclaw'],
    calculatedScore: 107,
    aiExperienceLevel: 'Pro',
    achievement: 'OpenClaw를 기반으로 우리 집 가전제품을 제어하는 멀티 에이전트 시스템을 구축했습니다.',
    goal: '하네스 엔지니어링을 통해 에이전트의 환각 현상을 0%에 가깝게 통제하는 노하우를 공유하고 싶습니다.',
    createdAt: Date.now() - 5000,
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<UserProfile[]>(MOCK_PROFILES);
  const [isLoading, setIsLoading] = useState(false);

  const addProfile = (profileData: Omit<UserProfile, 'id' | 'createdAt'>) => {
    const newProfile: UserProfile = {
      ...profileData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
    };
    setProfiles((prev) => [newProfile, ...prev]);
  };

  return (
    <AppContext.Provider value={{ profiles, addProfile, isLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
