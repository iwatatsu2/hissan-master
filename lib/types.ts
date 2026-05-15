export type Rarity = '★' | '★★' | '★★★' | '★★★★';

export interface Character {
  id: number;
  emoji: string;
  name: string;
  rarity: Rarity;
  line: string; // セリフ
  color: string; // カード背景グラデーション
}

export interface SaveData {
  coins: number;
  totalCorrect: number;
  totalAttempts: number;
  streak: number;
  bestStreak: number;
  collectedIds: number[];
  todayCorrect: number;
  todayAttempts: number;
  todayDate: string;
}

export type Operation = 'add' | 'sub';
export type Difficulty = 'easy' | 'carry';

export interface Problem {
  top: number;
  bottom: number;
  operation: Operation;
  answer: number;
}
