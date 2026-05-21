export type Rarity = '★' | '★★' | '★★★' | '★★★★';

export interface Character {
  id: number;
  emoji: string;
  name: string;
  rarity: Rarity;
  line: string; // セリフ
  color: string; // カード背景グラデーション
  image?: string; // イラスト画像パス（あれば優先表示）
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
  bossStage: number; // 現在のボスステージ（1〜）
  bossDefeated: number[]; // 倒したボスID
  bossCards: number[]; // 獲得したボスカードID
}

export type Operation = 'add' | 'sub';
export type Difficulty = 'easy' | 'carry';

export interface Problem {
  top: number;
  bottom: number;
  operation: Operation;
  answer: number;
}
