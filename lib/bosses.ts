export interface Boss {
  id: number;
  name: string;
  emoji: string;
  image: string; // キャラ画像を流用
  hp: number;
  attackLines: string[]; // ボスのセリフ
  defeatLine: string; // 倒した時のセリフ
  color: string; // 背景色
  reward: { coins: number; characterId?: number }; // 報酬
}

// ボスはキャラクター画像を流用しつつ、強そうな演出
export const BOSSES: Boss[] = [
  {
    id: 1, name: 'スライムキング', emoji: '👑',
    image: '/characters/char_4.png', hp: 3,
    attackLines: ['ぷるぷる〜！', 'まだまだ〜！', 'うわ〜！'],
    defeatLine: 'やられた〜！つよいね！',
    color: 'from-green-400 to-emerald-600',
    reward: { coins: 20 },
  },
  {
    id: 2, name: 'カニ将軍', emoji: '🦀',
    image: '/characters/char_17.png', hp: 4,
    attackLines: ['チョキチョキ！', 'はさむぞ〜！', 'カニカニ！', 'うぐぐ…！'],
    defeatLine: 'チョキ…チョキ…まいった！',
    color: 'from-red-400 to-orange-600',
    reward: { coins: 30 },
  },
  {
    id: 3, name: 'フクロウ魔術師', emoji: '🧙',
    image: '/characters/char_38.png', hp: 5,
    attackLines: ['ホッホッホ！', 'この問題とけるかな？', 'なかなかやるね！', 'む、むぅ…', 'まさか…！'],
    defeatLine: 'ホホホ…お見事じゃ！',
    color: 'from-purple-400 to-indigo-600',
    reward: { coins: 40 },
  },
  {
    id: 4, name: 'ライオン大王', emoji: '👑',
    image: '/characters/char_34.png', hp: 5,
    attackLines: ['ガオー！', 'この王を倒せるか！', 'なかなかの腕前！', 'ぐぬぬ…！', 'おお…！'],
    defeatLine: 'ガオ〜！キミが新しい王だ！',
    color: 'from-yellow-400 to-amber-600',
    reward: { coins: 50 },
  },
  {
    id: 5, name: 'タコ海賊船長', emoji: '🏴‍☠️',
    image: '/characters/char_37.png', hp: 6,
    attackLines: ['ヤーハー！', '宝はわたさんぞ！', '8本の腕でかかってこい！', 'スミをはくぞ〜！', 'こ、この力は…！', 'まさか…！'],
    defeatLine: '宝はキミのものだ…！',
    color: 'from-red-500 to-purple-600',
    reward: { coins: 60 },
  },
  {
    id: 6, name: 'ドラゴン', emoji: '🐉',
    image: '/characters/char_62.png', hp: 7,
    attackLines: ['グオオオ！', '炎をくらえ！', 'まだまだ！', 'なかなかやる…！', 'この力…！', 'バカな…！', 'うおおお！'],
    defeatLine: 'グオオ…認めよう、キミの勝ちだ！',
    color: 'from-red-600 to-orange-500',
    reward: { coins: 80 },
  },
  {
    id: 7, name: 'フェニックス', emoji: '🔥',
    image: '/characters/char_68.png', hp: 8,
    attackLines: ['燃え上がれ！', 'この炎をこえられるか！', 'なかなか…！', '復活の炎！', 'くっ…！', 'まだだ…！', 'この力は…！', 'まさか…！'],
    defeatLine: '美しい…キミの計算力は炎をも超える！',
    color: 'from-orange-500 to-red-600',
    reward: { coins: 100 },
  },
  {
    id: 8, name: '九尾のキツネ', emoji: '🦊',
    image: '/characters/char_69.png', hp: 8,
    attackLines: ['コンコン♪', '9本の尾で惑わせよう！', '幻術！', 'なかなかの力…', 'この知恵…！', 'くっ…まだ！', '本気を出すぞ！', 'うおおお…！'],
    defeatLine: 'コン…見事な計算力じゃ！',
    color: 'from-orange-500 to-red-500',
    reward: { coins: 100 },
  },
  {
    id: 9, name: '太陽ライオン王', emoji: '☀️',
    image: '/characters/char_78.png', hp: 9,
    attackLines: ['太陽の力を見よ！', '灼熱のもんだい！', 'まだまだ！', 'おお…やるな！', 'この光を…！', 'なんと…！', '太陽よ、力を！', 'くっ…！', 'まさか…！'],
    defeatLine: '太陽のように輝くキミを認めよう！',
    color: 'from-yellow-500 to-orange-600',
    reward: { coins: 120 },
  },
  {
    id: 10, name: '伝説のフェニックス', emoji: '🌟',
    image: '/characters/char_90.png', hp: 10,
    attackLines: ['伝説の力を見せてやろう！', '金と赤の炎！', 'まだまだ！', 'なかなかの腕前…', 'この力は…！', '復活する！', 'くっ…まだだ！', 'この計算力…！', 'うおおおお！', 'まさか…まさか…！'],
    defeatLine: '伝説を超えた…キミこそ真のマスター！',
    color: 'from-yellow-500 to-red-500',
    reward: { coins: 200 },
  },
];

export function getBoss(stage: number): Boss {
  const idx = Math.min(stage - 1, BOSSES.length - 1);
  return BOSSES[idx];
}
