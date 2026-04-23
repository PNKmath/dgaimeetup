import { TechTag } from "../types";

export const TECH_TAGS: TechTag[] = [
  // Foundation (2-3pts)
  { id: 'chatgpt', label: 'ChatGPT', points: 2, category: 'Model' },
  { id: 'claude', label: 'Claude', points: 3, category: 'Model' },
  { id: 'gemini', label: 'Gemini', points: 3, category: 'Model' },
  { id: 'grok', label: 'Grok', points: 3, category: 'Model' },
  { id: 'kimi', label: 'Kimi', points: 3, category: 'Model' },
  
  // Concept (5-8pts)
  { id: 'prompt', label: '프롬프트 엔지니어링', points: 5, category: 'Concept' },
  { id: 'context', label: 'Context Window', points: 8, category: 'Concept' },
  { id: 'multimodal', label: 'Multimodality', points: 8, category: 'Concept' },
  { id: 'rag', label: 'RAG (검색 증강 생성)', points: 10, category: 'Concept' },
  
  // Tools & Workflows (10-12pts)
  { id: 'github', label: 'GitHub', points: 10, category: 'Tools' },
  { id: 'cursor', label: 'Cursor', points: 12, category: 'Tools' },
  { id: 'ollama', label: 'Ollama (Local LLM)', points: 12, category: 'Tools' },
  { id: 'sd_comfy', label: 'Stable Diffusion / ComfyUI', points: 12, category: 'Tools' },
  
  // Agentic & Harnessing (15-20pts)
  { id: 'agents', label: '에이전트(Agents)', points: 15, category: 'Expert' },
  { id: 'hooks_skills', label: 'Hooks / Skills', points: 15, category: 'Expert' },
  { id: 'harness', label: '하네스 엔지니어링', points: 20, category: 'Expert' },
  { id: 'claudecode', label: 'Claude Code / Gemini CLI', points: 20, category: 'Expert' },
  
  // Hot Repos & Master (25pts)
  { id: 'omc', label: 'oh-my-claudecode', points: 25, category: 'Expert' },
  { id: 'openclaw', label: 'OpenClaw', points: 25, category: 'Expert' },
  { id: 'hermes', label: 'Hermes Agents', points: 25, category: 'Expert' },
];

export const calculateLevel = (score: number) => {
  if (score >= 100) return 'Pro';       // 최고 난이도 툴 다수 사용
  if (score >= 50) return 'Heavy';      // 에이전트 및 하네스 이해
  if (score >= 15) return 'Intermediate'; // 기본 개념 및 툴 활용
  return 'Beginner';
};
