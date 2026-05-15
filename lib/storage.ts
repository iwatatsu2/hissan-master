import { SaveData } from './types';

const STORAGE_KEY = 'hissan-master-save';

const today = () => new Date().toISOString().slice(0, 10);

const DEFAULT_DATA: SaveData = {
  coins: 30, // 初回ボーナス
  totalCorrect: 0,
  totalAttempts: 0,
  streak: 0,
  bestStreak: 0,
  collectedIds: [],
  todayCorrect: 0,
  todayAttempts: 0,
  todayDate: today(),
  bossStage: 1,
  bossDefeated: [],
};

export function loadData(): SaveData {
  if (typeof window === 'undefined') return DEFAULT_DATA;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_DATA;
    const data: SaveData = JSON.parse(raw);
    // 日付が変わったらリセット
    if (data.todayDate !== today()) {
      data.todayCorrect = 0;
      data.todayAttempts = 0;
      data.todayDate = today();
    }
    return data;
  } catch {
    return DEFAULT_DATA;
  }
}

export function saveData(data: SaveData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
