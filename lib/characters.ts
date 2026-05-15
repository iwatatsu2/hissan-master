import { Character } from './types';

export const CHARACTERS: Character[] = [
  // ★ (ノーマル) - 20種
  { id: 1, emoji: '🐱', name: 'ミケちゃん', rarity: '★', line: 'いっしょにがんばろう！', color: 'from-orange-200 to-yellow-100' },
  { id: 2, emoji: '🐶', name: 'ポチくん', rarity: '★', line: 'よーし、やるぞ！', color: 'from-amber-200 to-orange-100' },
  { id: 3, emoji: '🐰', name: 'ウサミちゃん', rarity: '★', line: 'ぴょんぴょん♪', color: 'from-pink-200 to-rose-100' },
  { id: 4, emoji: '🐸', name: 'ケロタン', rarity: '★', line: 'ケロケロ〜！', color: 'from-green-200 to-emerald-100' },
  { id: 5, emoji: '🐥', name: 'ピヨちゃん', rarity: '★', line: 'ピヨピヨ♪', color: 'from-yellow-200 to-amber-100' },
  { id: 6, emoji: '🐷', name: 'ブーちゃん', rarity: '★', line: 'ブヒブヒ〜！', color: 'from-pink-200 to-pink-100' },
  { id: 7, emoji: '🐭', name: 'チューたろう', rarity: '★', line: 'チュウ！', color: 'from-gray-200 to-slate-100' },
  { id: 8, emoji: '🐹', name: 'ハムちゃん', rarity: '★', line: 'もぐもぐ♪', color: 'from-orange-200 to-amber-100' },
  { id: 9, emoji: '🐻', name: 'クマきち', rarity: '★', line: 'はちみつ〜！', color: 'from-amber-300 to-yellow-100' },
  { id: 10, emoji: '🐧', name: 'ペンタくん', rarity: '★', line: 'すいすい〜！', color: 'from-sky-200 to-blue-100' },
  { id: 11, emoji: '🐤', name: 'ヒヨちゃん', rarity: '★', line: 'がんばれ〜！', color: 'from-yellow-300 to-yellow-100' },
  { id: 12, emoji: '🐮', name: 'モーちゃん', rarity: '★', line: 'モー！', color: 'from-stone-200 to-white' },
  { id: 13, emoji: '🐑', name: 'メリーちゃん', rarity: '★', line: 'メェ〜♪', color: 'from-gray-100 to-white' },
  { id: 14, emoji: '🐔', name: 'コケッコ', rarity: '★', line: 'コケコッコー！', color: 'from-red-200 to-orange-100' },
  { id: 15, emoji: '🦔', name: 'ハリーくん', rarity: '★', line: 'チクチク♪', color: 'from-amber-200 to-stone-100' },
  { id: 16, emoji: '🐿️', name: 'リスちゃん', rarity: '★', line: 'どんぐり大好き！', color: 'from-orange-300 to-amber-100' },
  { id: 17, emoji: '🦀', name: 'カニまる', rarity: '★', line: 'チョキチョキ！', color: 'from-red-300 to-red-100' },
  { id: 18, emoji: '🐢', name: 'カメじい', rarity: '★', line: 'ゆっくりいこう', color: 'from-green-300 to-green-100' },
  { id: 19, emoji: '🐝', name: 'ハッチ', rarity: '★', line: 'ブーンブーン！', color: 'from-yellow-300 to-yellow-100' },
  { id: 20, emoji: '🐞', name: 'テントちゃん', rarity: '★', line: 'てんてん♪', color: 'from-red-200 to-yellow-100' },

  // ★★ (レア) - 10種
  { id: 21, emoji: '🦊', name: 'コンちゃん', rarity: '★★', line: 'コンコン♪ 算数とくい！', color: 'from-orange-300 to-red-100' },
  { id: 22, emoji: '🐼', name: 'パンダまる', rarity: '★★', line: 'ささ食べながら計算！', color: 'from-gray-200 to-green-100' },
  { id: 23, emoji: '🐨', name: 'コアラン', rarity: '★★', line: 'ねむい…でもがんばる！', color: 'from-gray-300 to-blue-100' },
  { id: 24, emoji: '🦁', name: 'レオくん', rarity: '★★', line: 'ガオー！ぜんぶ正解だ！', color: 'from-yellow-400 to-orange-200' },
  { id: 25, emoji: '🐬', name: 'ドルフィン', rarity: '★★', line: 'キュイキュイ♪', color: 'from-blue-300 to-cyan-100' },
  { id: 26, emoji: '🦋', name: 'ちょうちょ', rarity: '★★', line: 'ひらひら〜♪', color: 'from-purple-200 to-pink-100' },
  { id: 27, emoji: '🐙', name: 'タコちゃん', rarity: '★★', line: '8本の手で計算！', color: 'from-red-300 to-pink-200' },
  { id: 28, emoji: '🦉', name: 'フクロン', rarity: '★★', line: 'ホーホー、かしこい！', color: 'from-amber-300 to-stone-200' },
  { id: 29, emoji: '🦩', name: 'フラミー', rarity: '★★', line: '片足で計算できるよ！', color: 'from-pink-300 to-rose-100' },
  { id: 30, emoji: '🐠', name: 'ニモちゃん', rarity: '★★', line: 'すいすい正解！', color: 'from-orange-300 to-blue-100' },

  // ★★★ (スーパーレア) - 6種
  { id: 31, emoji: '🦄', name: 'ユニコーン', rarity: '★★★', line: '✨ キラキラ大正解！', color: 'from-purple-300 to-pink-200' },
  { id: 32, emoji: '🐉', name: 'りゅうくん', rarity: '★★★', line: '🔥 ドラゴンパワー！', color: 'from-red-400 to-orange-200' },
  { id: 33, emoji: '🦚', name: 'クジャクひめ', rarity: '★★★', line: '💎 うつくしく正解！', color: 'from-emerald-300 to-blue-200' },
  { id: 34, emoji: '🐋', name: 'クジラおう', rarity: '★★★', line: '🌊 海より広い知識！', color: 'from-blue-400 to-cyan-200' },
  { id: 35, emoji: '🦅', name: 'イーグル', rarity: '★★★', line: '🦅 空から全部見える！', color: 'from-amber-400 to-yellow-200' },
  { id: 36, emoji: '🐺', name: 'オオカミ先生', rarity: '★★★', line: '📚 わたしが教えよう！', color: 'from-indigo-300 to-slate-200' },

  // ★★★★ (ウルトラレア) - 4種
  { id: 37, emoji: '🌈', name: 'にじいろちゃん', rarity: '★★★★', line: '🌟 全部の色で応援！', color: 'from-pink-300 via-yellow-200 to-blue-300' },
  { id: 38, emoji: '⭐', name: 'スターくん', rarity: '★★★★', line: '💫 きみは算数のスター！', color: 'from-yellow-400 via-amber-300 to-orange-300' },
  { id: 39, emoji: '👑', name: 'おうさま', rarity: '★★★★', line: '👑 計算王に認定！', color: 'from-yellow-500 via-amber-300 to-yellow-400' },
  { id: 40, emoji: '🌟', name: 'きらりん', rarity: '★★★★', line: '✨ 宇宙いちの天才！', color: 'from-purple-400 via-pink-300 to-yellow-300' },
];

export const RARITY_WEIGHTS: Record<string, number> = {
  '★': 50,
  '★★': 30,
  '★★★': 15,
  '★★★★': 5,
};

export function pullGacha(): Character {
  const roll = Math.random() * 100;
  let cumulative = 0;
  let selectedRarity = '★';

  for (const [rarity, weight] of Object.entries(RARITY_WEIGHTS)) {
    cumulative += weight;
    if (roll < cumulative) {
      selectedRarity = rarity;
      break;
    }
  }

  const pool = CHARACTERS.filter((c) => c.rarity === selectedRarity);
  return pool[Math.floor(Math.random() * pool.length)];
}
