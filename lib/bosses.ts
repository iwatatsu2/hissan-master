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
    reward: { coins: 10 },
  },
  {
    id: 2, name: 'カニ将軍', emoji: '🦀',
    image: '/characters/char_17.png', hp: 4,
    attackLines: ['チョキチョキ！', 'はさむぞ〜！', 'カニカニ！', 'うぐぐ…！'],
    defeatLine: 'チョキ…チョキ…まいった！',
    color: 'from-red-400 to-orange-600',
    reward: { coins: 15 },
  },
  {
    id: 3, name: 'フクロウ魔術師', emoji: '🧙',
    image: '/characters/char_38.png', hp: 5,
    attackLines: ['ホッホッホ！', 'この問題とけるかな？', 'なかなかやるね！', 'む、むぅ…', 'まさか…！'],
    defeatLine: 'ホホホ…お見事じゃ！',
    color: 'from-purple-400 to-indigo-600',
    reward: { coins: 20 },
  },
  {
    id: 4, name: 'ライオン大王', emoji: '👑',
    image: '/characters/char_34.png', hp: 5,
    attackLines: ['ガオー！', 'この王を倒せるか！', 'なかなかの腕前！', 'ぐぬぬ…！', 'おお…！'],
    defeatLine: 'ガオ〜！キミが新しい王だ！',
    color: 'from-yellow-400 to-amber-600',
    reward: { coins: 25 },
  },
  {
    id: 5, name: 'タコ海賊船長', emoji: '🏴‍☠️',
    image: '/characters/char_37.png', hp: 6,
    attackLines: ['ヤーハー！', '宝はわたさんぞ！', '8本の腕でかかってこい！', 'スミをはくぞ〜！', 'こ、この力は…！', 'まさか…！'],
    defeatLine: '宝はキミのものだ…！',
    color: 'from-red-500 to-purple-600',
    reward: { coins: 30 },
  },
  {
    id: 6, name: 'ドラゴン', emoji: '🐉',
    image: '/characters/char_62.png', hp: 7,
    attackLines: ['グオオオ！', '炎をくらえ！', 'まだまだ！', 'なかなかやる…！', 'この力…！', 'バカな…！', 'うおおお！'],
    defeatLine: 'グオオ…認めよう、キミの勝ちだ！',
    color: 'from-red-600 to-orange-500',
    reward: { coins: 40 },
  },
  {
    id: 7, name: 'フェニックス', emoji: '🔥',
    image: '/characters/char_68.png', hp: 8,
    attackLines: ['燃え上がれ！', 'この炎をこえられるか！', 'なかなか…！', '復活の炎！', 'くっ…！', 'まだだ…！', 'この力は…！', 'まさか…！'],
    defeatLine: '美しい…キミの計算力は炎をも超える！',
    color: 'from-orange-500 to-red-600',
    reward: { coins: 50 },
  },
  {
    id: 8, name: '九尾のキツネ', emoji: '🦊',
    image: '/characters/char_69.png', hp: 8,
    attackLines: ['コンコン♪', '9本の尾で惑わせよう！', '幻術！', 'なかなかの力…', 'この知恵…！', 'くっ…まだ！', '本気を出すぞ！', 'うおおお…！'],
    defeatLine: 'コン…見事な計算力じゃ！',
    color: 'from-orange-500 to-red-500',
    reward: { coins: 50 },
  },
  {
    id: 9, name: '太陽ライオン王', emoji: '☀️',
    image: '/characters/char_78.png', hp: 9,
    attackLines: ['太陽の力を見よ！', '灼熱のもんだい！', 'まだまだ！', 'おお…やるな！', 'この光を…！', 'なんと…！', '太陽よ、力を！', 'くっ…！', 'まさか…！'],
    defeatLine: '太陽のように輝くキミを認めよう！',
    color: 'from-yellow-500 to-orange-600',
    reward: { coins: 60 },
  },
  {
    id: 10, name: '伝説のフェニックス', emoji: '🌟',
    image: '/characters/char_90.png', hp: 10,
    attackLines: ['伝説の力を見せてやろう！', '金と赤の炎！', 'まだまだ！', 'なかなかの腕前…', 'この力は…！', '復活する！', 'くっ…まだだ！', 'この計算力…！', 'うおおおお！', 'まさか…まさか…！'],
    defeatLine: '伝説を超えた…キミこそ真のマスター！',
    color: 'from-yellow-500 to-red-500',
    reward: { coins: 80 },
  },
  // ===== 追加ボス（ステージ11〜20）=====
  {
    id: 11, name: 'ゴーレム', emoji: '🗿',
    image: '/characters/char_4.png', hp: 10,
    attackLines: ['ドスン！', '岩の力だ！', 'まだまだ！', 'くっ…', '壊れない…！', 'この拳を…！', 'ぐぬぬ…', 'なんと…！', 'うおおお！', 'まさか…！'],
    defeatLine: 'ガラガラ…キミの計算力に砕かれた！',
    color: 'from-gray-500 to-stone-600',
    reward: { coins: 100 },
  },
  {
    id: 12, name: '嵐のグリフォン', emoji: '🦅',
    image: '/characters/char_17.png', hp: 11,
    attackLines: ['嵐をよぶぞ！', 'この翼で…！', 'ビリビリ！', 'まだだ！', 'おお…！', '雷よ！', 'なかなか…！', 'くっ…！', 'この力…！', 'う、うそだ…！', 'まさか…！'],
    defeatLine: '嵐がやんだ…キミの勝ちだ！',
    color: 'from-sky-500 to-indigo-600',
    reward: { coins: 120 },
  },
  {
    id: 13, name: '氷の女王', emoji: '❄️',
    image: '/characters/char_38.png', hp: 11,
    attackLines: ['凍りつけ！', '氷の世界へ！', 'まだまだよ！', 'ひんやり♪', 'おお…！', 'この冷気…！', 'くっ…！', 'ブリザード！', 'なんて力…！', 'まさか…！', 'うそ…！'],
    defeatLine: '氷がとけた…あったかい計算力ね…！',
    color: 'from-cyan-400 to-blue-600',
    reward: { coins: 140 },
  },
  {
    id: 14, name: '闇の魔王', emoji: '😈',
    image: '/characters/char_34.png', hp: 12,
    attackLines: ['闇の力だ！', 'ふはは！', 'まだまだ！', '呪いをかけるぞ！', 'なかなかやる…', 'この闇を…！', 'くっ…！', 'ダークネス！', 'おのれ…！', 'この計算力…！', 'うおおお…！', 'バカな…！'],
    defeatLine: '闇が…晴れた…キミの光に負けた！',
    color: 'from-purple-700 to-gray-900',
    reward: { coins: 160 },
  },
  {
    id: 15, name: 'メカドラゴン', emoji: '🤖',
    image: '/characters/char_37.png', hp: 12,
    attackLines: ['ガシャン！', 'ミサイル発射！', 'まだだ！', 'システムオンライン！', 'データ分析中…', 'エネルギー充填！', 'くっ…回路が！', 'フルパワー！', 'エラー発生…！', 'まさか…！', 'シャットダウン…！', 'ピーッ…！'],
    defeatLine: 'システムダウン…キミの計算力が上回った！',
    color: 'from-zinc-500 to-slate-700',
    reward: { coins: 180 },
  },
  {
    id: 16, name: '天空の龍神', emoji: '🐲',
    image: '/characters/char_62.png', hp: 13,
    attackLines: ['天空より来たれり！', '雷を落とすぞ！', 'まだまだ！', '風よ！', 'なかなか…！', 'この神力…！', 'くっ…！', '稲妻！', 'おのれ…！', 'バカな…！', 'この力は…！', 'うおおおお…！', 'まさか…まさか…！'],
    defeatLine: '天空の力を超えた…キミは神をも倒す！',
    color: 'from-blue-500 to-purple-700',
    reward: { coins: 200 },
  },
  {
    id: 17, name: '黄金のスフィンクス', emoji: '🏛️',
    image: '/characters/char_68.png', hp: 13,
    attackLines: ['なぞなぞの時間だ！', '知恵比べだ！', 'まだまだ！', 'ほう…！', 'やるな…！', 'この謎を…！', 'くっ…！', '黄金の力！', 'なんと…！', 'おのれ…！', 'この知恵…！', 'うおおお…！', 'まさか…！'],
    defeatLine: '見事！この知恵はスフィンクスを超えた！',
    color: 'from-amber-500 to-yellow-600',
    reward: { coins: 220 },
  },
  {
    id: 18, name: '深海のクラーケン', emoji: '🦑',
    image: '/characters/char_69.png', hp: 14,
    attackLines: ['深海より！', '10本の腕で！', 'まだだ！', 'スミをはくぞ！', 'ぐるぐる〜！', 'この力…！', 'くっ…！', '大波！', 'なんと…！', 'おのれ…！', '渦潮！', 'うおおお…！', 'バカな…！', 'まさか…！'],
    defeatLine: '深海に帰る…キミの計算力は海より深い！',
    color: 'from-blue-700 to-teal-900',
    reward: { coins: 250 },
  },
  {
    id: 19, name: '世界樹の精霊', emoji: '🌳',
    image: '/characters/char_78.png', hp: 14,
    attackLines: ['自然の力よ！', '根で絡めとるぞ！', 'まだまだ！', '光合成！', 'やるな…！', 'この生命力…！', 'くっ…！', '大樹の怒り！', 'なんと…！', 'おのれ…！', '種をまくぞ！', 'うおおお…！', 'バカな…！', 'まさか…！'],
    defeatLine: '世界樹が認めた…キミこそ自然の王！',
    color: 'from-green-600 to-emerald-800',
    reward: { coins: 280 },
  },
  {
    id: 20, name: '宇宙の創造神', emoji: '🌌',
    image: '/characters/char_90.png', hp: 15,
    attackLines: ['宇宙の力を見よ！', '星をぶつけるぞ！', 'まだまだ！', 'ブラックホール！', 'やるな…！', '超新星爆発！', 'くっ…！', '次元を超えろ！', 'なんと…！', 'おのれ…！', 'ビッグバン！', 'うおおお…！', 'バカな…！', 'この計算力…宇宙を超える…！', 'まさか…まさか…！'],
    defeatLine: '宇宙の果てまで…キミの計算力は響きわたる！最強だ！',
    color: 'from-indigo-600 to-violet-900',
    reward: { coins: 300 },
  },
];

export function getBoss(stage: number): Boss {
  const idx = Math.min(stage - 1, BOSSES.length - 1);
  return BOSSES[idx];
}
