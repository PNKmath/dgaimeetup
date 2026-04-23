import React, { createContext, useContext, useEffect, useState } from 'react';
import type { AIExperienceLevel, UserProfile } from '../types';
import { isSupabaseEnabled, supabase } from '../lib/supabase';

interface AppContextType {
  profiles: UserProfile[];
  addProfile: (profile: Omit<UserProfile, 'id' | 'createdAt'>) => Promise<void>;
  toggleProfileCompleted: (profileId: string) => Promise<void>;
  removeCompletedProfiles: () => Promise<void>;
  isLoading: boolean;
}

type ProfileRow = {
  id: string;
  nickname: string;
  occupation: string;
  thread_id: string;
  is_completed: boolean;
  keywords: string[];
  selected_techs: string[];
  calculated_score: number;
  ai_experience_level: AIExperienceLevel;
  achievement: string;
  goal: string;
  created_at: number;
};

const AppContext = createContext<AppContextType | undefined>(undefined);
const STORAGE_KEY = 'ai_nexus_profiles_v1';
const MOCK_PROFILES: UserProfile[] = [];

const toProfile = (row: ProfileRow): UserProfile => ({
  id: row.id,
  nickname: row.nickname,
  occupation: row.occupation,
  threadId: row.thread_id,
  isCompleted: row.is_completed,
  keywords: row.keywords,
  selectedTechs: row.selected_techs,
  calculatedScore: row.calculated_score,
  aiExperienceLevel: row.ai_experience_level,
  achievement: row.achievement,
  goal: row.goal,
  createdAt: row.created_at,
});

const toRowInsert = (profile: Omit<UserProfile, 'id'> & { id: string }): ProfileRow => ({
  id: profile.id,
  nickname: profile.nickname,
  occupation: profile.occupation,
  thread_id: profile.threadId,
  is_completed: profile.isCompleted,
  keywords: profile.keywords,
  selected_techs: profile.selectedTechs,
  calculated_score: profile.calculatedScore,
  ai_experience_level: profile.aiExperienceLevel,
  achievement: profile.achievement,
  goal: profile.goal,
  created_at: profile.createdAt,
});

const normalizeProfile = (profile: any): UserProfile => ({
  id: String(profile?.id ?? Math.random().toString(36).slice(2, 11)),
  nickname: String(profile?.nickname ?? ''),
  occupation: String(profile?.occupation ?? ''),
  threadId: String(profile?.threadId ?? ''),
  isCompleted: Boolean(profile?.isCompleted ?? false),
  keywords: Array.isArray(profile?.keywords) ? profile.keywords.filter(Boolean) : [],
  selectedTechs: Array.isArray(profile?.selectedTechs) ? profile.selectedTechs.filter(Boolean) : [],
  calculatedScore: Number(profile?.calculatedScore ?? 0),
  aiExperienceLevel: (profile?.aiExperienceLevel ?? 'Beginner') as AIExperienceLevel,
  achievement: String(profile?.achievement ?? ''),
  goal: String(profile?.goal ?? ''),
  createdAt: Number(profile?.createdAt ?? Date.now()),
});

const loadProfilesFromLocal = (): UserProfile[] => {
  if (typeof window === 'undefined') return MOCK_PROFILES;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return MOCK_PROFILES;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return MOCK_PROFILES;
    return parsed.map(normalizeProfile);
  } catch {
    return MOCK_PROFILES;
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      if (!isSupabaseEnabled || !supabase) {
        setProfiles(loadProfilesFromLocal());
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase load failed, fallback to local:', error.message);
        setProfiles(loadProfilesFromLocal());
        setIsLoading(false);
        return;
      }

      setProfiles((data as ProfileRow[]).map(toProfile));
      setIsLoading(false);
    };

    void initialize();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
  }, [profiles]);

  const addProfile = async (profileData: Omit<UserProfile, 'id' | 'createdAt'>) => {
    const newProfile: UserProfile = {
      ...profileData,
      id: Math.random().toString(36).slice(2, 11),
      createdAt: Date.now(),
    };

    setProfiles((prev) => [newProfile, ...prev]);

    if (!isSupabaseEnabled || !supabase) return;

    const { error } = await supabase.from('profiles').insert(toRowInsert(newProfile));
    if (error) {
      console.error('Supabase insert failed:', error.message);
    }
  };

  const toggleProfileCompleted = async (profileId: string) => {
    let nextCompletedValue = false;

    setProfiles((prev) =>
      prev.map((profile) => {
        if (profile.id !== profileId) return profile;
        nextCompletedValue = !profile.isCompleted;
        return { ...profile, isCompleted: nextCompletedValue };
      })
    );

    if (!isSupabaseEnabled || !supabase) return;

    const { error } = await supabase
      .from('profiles')
      .update({ is_completed: nextCompletedValue })
      .eq('id', profileId);

    if (error) {
      console.error('Supabase update failed:', error.message);
    }
  };

  const removeCompletedProfiles = async () => {
    const completedIds = profiles.filter((profile) => profile.isCompleted).map((profile) => profile.id);
    setProfiles((prev) => prev.filter((profile) => !profile.isCompleted));

    if (!isSupabaseEnabled || !supabase || completedIds.length === 0) return;

    const { error } = await supabase.from('profiles').delete().in('id', completedIds);
    if (error) {
      console.error('Supabase delete failed:', error.message);
    }
  };

  return (
    <AppContext.Provider value={{ profiles, addProfile, toggleProfileCompleted, removeCompletedProfiles, isLoading }}>
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
