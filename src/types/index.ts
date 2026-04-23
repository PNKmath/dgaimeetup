export type AIExperienceLevel = 'Beginner' | 'Intermediate' | 'Heavy' | 'Pro';

export interface TechTag {
  id: string;
  label: string;
  points: number;
  category: 'Model' | 'Concept' | 'Tools' | 'Expert';
}

export interface UserProfile {
  id: string;
  nickname: string;
  occupation: string;
  threadId: string; // 공유 가능한 쓰레드 ID
  isCompleted: boolean; // 카드 완료 여부
  keywords: string[]; // 3 Keywords for name tag
  selectedTechs: string[]; // List of tech IDs
  calculatedScore: number;
  aiExperienceLevel: AIExperienceLevel;
  achievement: string; // What I do/built with AI
  goal: string; // What I want to do/achieve today or in future
  createdAt: number;
}
