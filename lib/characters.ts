import { Character } from './types';

function img(id: number) { return `/characters/char_${id}.png`; }

export const CHARACTERS: Character[] = [
  // ===== ★ ノーマル (1-30) =====
  { id: 1, emoji: '🐱', name: 'ミケちゃん', rarity: '★', line: 'いっしょにがんばろう！', color: 'from-orange-200 to-yellow-100', image: img(1) },
  { id: 2, emoji: '🐶', name: 'シバくん', rarity: '★', line: 'よーし、やるぞ！', color: 'from-amber-200 to-orange-100', image: img(2) },
  { id: 3, emoji: '🐰', name: 'ウサミちゃん', rarity: '★', line: 'ぴょんぴょん♪', color: 'from-pink-200 to-rose-100', image: img(3) },
  { id: 4, emoji: '🐸', name: 'ケロタン', rarity: '★', line: 'ケロケロ〜！', color: 'from-green-200 to-emerald-100', image: img(4) },
  { id: 5, emoji: '🐥', name: 'ピヨちゃん', rarity: '★', line: 'ピヨピヨ♪', color: 'from-yellow-200 to-amber-100', image: img(5) },
  { id: 6, emoji: '🐷', name: 'ブーちゃん', rarity: '★', line: 'ブヒブヒ〜！', color: 'from-pink-200 to-pink-100', image: img(6) },
  { id: 7, emoji: '🐭', name: 'チューたろう', rarity: '★', line: 'チュウ！', color: 'from-gray-200 to-slate-100', image: img(7) },
  { id: 8, emoji: '🐹', name: 'ハムちゃん', rarity: '★', line: 'もぐもぐ♪', color: 'from-orange-200 to-amber-100', image: img(8) },
  { id: 9, emoji: '🐻', name: 'クマきち', rarity: '★', line: 'はちみつ〜！', color: 'from-amber-300 to-yellow-100', image: img(9) },
  { id: 10, emoji: '🐧', name: 'ペンタくん', rarity: '★', line: 'すいすい〜！', color: 'from-sky-200 to-blue-100', image: img(10) },
  { id: 11, emoji: '🐤', name: 'ヒヨくん', rarity: '★', line: 'がんばれ〜！', color: 'from-yellow-300 to-yellow-100', image: img(11) },
  { id: 12, emoji: '🐮', name: 'モーちゃん', rarity: '★', line: 'モー！', color: 'from-stone-200 to-white', image: img(12) },
  { id: 13, emoji: '🐑', name: 'メリーちゃん', rarity: '★', line: 'メェ〜♪', color: 'from-gray-100 to-white', image: img(13) },
  { id: 14, emoji: '🐔', name: 'コケッコ', rarity: '★', line: 'コケコッコー！', color: 'from-red-200 to-orange-100', image: img(14) },
  { id: 15, emoji: '🦔', name: 'ハリーくん', rarity: '★', line: 'チクチク♪', color: 'from-amber-200 to-stone-100', image: img(15) },
  { id: 16, emoji: '🐿️', name: 'リスちゃん', rarity: '★', line: 'どんぐり大好き！', color: 'from-orange-300 to-amber-100', image: img(16) },
  { id: 17, emoji: '🦀', name: 'カニまる', rarity: '★', line: 'チョキチョキ！', color: 'from-red-300 to-red-100', image: img(17) },
  { id: 18, emoji: '🐢', name: 'カメじい', rarity: '★', line: 'ゆっくりいこう', color: 'from-green-300 to-green-100', image: img(18) },
  { id: 19, emoji: '🐝', name: 'ハッチ', rarity: '★', line: 'ブーンブーン！', color: 'from-yellow-300 to-yellow-100', image: img(19) },
  { id: 20, emoji: '🐞', name: 'テントちゃん', rarity: '★', line: 'てんてん♪', color: 'from-red-200 to-yellow-100', image: img(20) },
  { id: 21, emoji: '🦆', name: 'アヒルん', rarity: '★', line: 'ガーガー♪', color: 'from-yellow-200 to-green-100', image: img(21) },
  { id: 22, emoji: '🐾', name: 'モグラん', rarity: '★', line: 'ほりほり！', color: 'from-amber-300 to-stone-200', image: img(22) },
  { id: 23, emoji: '🦝', name: 'タヌきち', rarity: '★', line: 'ポンポコ♪', color: 'from-amber-200 to-stone-100', image: img(23) },
  { id: 24, emoji: '🦜', name: 'インコちゃん', rarity: '★', line: 'おしゃべり大好き！', color: 'from-green-200 to-yellow-100', image: img(24) },
  { id: 25, emoji: '🐡', name: 'キンちゃん', rarity: '★', line: 'ぷくぷく♪', color: 'from-orange-200 to-red-100', image: img(25) },
  { id: 26, emoji: '🐌', name: 'カタツムリン', rarity: '★', line: 'のんびり〜♪', color: 'from-green-200 to-purple-100', image: img(26) },
  { id: 27, emoji: '🐨', name: 'コアラん', rarity: '★', line: 'すやすや…', color: 'from-gray-200 to-blue-100', image: img(27) },
  { id: 28, emoji: '🐰', name: 'ラビくん', rarity: '★', line: 'にんじん大好き！', color: 'from-orange-200 to-green-100', image: img(28) },
  { id: 29, emoji: '🐼', name: 'パンダちゃん', rarity: '★', line: 'ささ食べながら計算！', color: 'from-gray-200 to-green-100', image: img(29) },
  { id: 30, emoji: '🦌', name: 'バンビちゃん', rarity: '★', line: 'お花きれい♪', color: 'from-amber-200 to-pink-100', image: img(30) },

  // ===== ★★ レア (31-60) =====
  { id: 31, emoji: '🦊', name: 'コンちゃん', rarity: '★★', line: 'コンコン♪ 算数とくい！', color: 'from-orange-300 to-red-100', image: img(31) },
  { id: 32, emoji: '🐼', name: 'パンダおうじ', rarity: '★★', line: '青いマントでかっこいい！', color: 'from-blue-200 to-gray-100', image: img(32) },
  { id: 33, emoji: '🐨', name: 'コアラひめ', rarity: '★★', line: 'ティアラきらきら♪', color: 'from-pink-200 to-purple-100', image: img(33) },
  { id: 34, emoji: '🦁', name: 'レオくん', rarity: '★★', line: 'ガオー！ぜんぶ正解だ！', color: 'from-yellow-400 to-orange-200', image: img(34) },
  { id: 35, emoji: '🐬', name: 'ドルフィン', rarity: '★★', line: 'キュイキュイ♪', color: 'from-blue-300 to-cyan-100', image: img(35) },
  { id: 36, emoji: '🦋', name: 'ちょうちょひめ', rarity: '★★', line: '虹の羽でひらひら〜♪', color: 'from-purple-200 to-pink-100', image: img(36) },
  { id: 37, emoji: '🐙', name: 'タコ船長', rarity: '★★', line: '8本の手で計算！', color: 'from-red-300 to-pink-200', image: img(37) },
  { id: 38, emoji: '🦉', name: 'フクロン博士', rarity: '★★', line: 'ホーホー、かしこい！', color: 'from-amber-300 to-stone-200', image: img(38) },
  { id: 39, emoji: '🦩', name: 'フラミーナ', rarity: '★★', line: 'バレリーナみたいでしょ♪', color: 'from-pink-300 to-rose-100', image: img(39) },
  { id: 40, emoji: '🐠', name: 'トロピくん', rarity: '★★', line: 'なみのり計算！', color: 'from-orange-300 to-blue-100', image: img(40) },
  { id: 41, emoji: '🦦', name: 'ラッコちゃん', rarity: '★★', line: '貝がらキラキラ♪', color: 'from-amber-200 to-blue-100', image: img(41) },
  { id: 42, emoji: '🦜', name: 'オウム海賊', rarity: '★★', line: '宝石みーつけた！', color: 'from-green-300 to-red-100', image: img(42) },
  { id: 43, emoji: '🦎', name: 'カメレオン', rarity: '★★', line: '虹色にへーんしん！', color: 'from-green-200 to-purple-200', image: img(43) },
  { id: 44, emoji: '🐦', name: 'ペリカン郵便', rarity: '★★', line: 'お手紙とどけます♪', color: 'from-sky-200 to-white', image: img(44) },
  { id: 45, emoji: '🦭', name: 'アザラシひめ', rarity: '★★', line: '氷のステッキでキラリ！', color: 'from-blue-200 to-cyan-100', image: img(45) },
  { id: 46, emoji: '🐾', name: 'レッサーたんけん', rarity: '★★', line: '地図をよんで冒険だ！', color: 'from-orange-300 to-amber-200', image: img(46) },
  { id: 47, emoji: '🐢', name: 'ウミガメサーファー', rarity: '★★', line: 'アロハ〜♪', color: 'from-green-300 to-blue-200', image: img(47) },
  { id: 48, emoji: '🦦', name: 'カワウソはなちゃん', rarity: '★★', line: '花束どうぞ♪', color: 'from-pink-200 to-green-100', image: img(48) },
  { id: 49, emoji: '🐋', name: 'マンタくん', rarity: '★★', line: '青い宝石キラリ！', color: 'from-blue-300 to-indigo-200', image: img(49) },
  { id: 50, emoji: '🐦', name: 'ハチドリちゃん', rarity: '★★', line: '虹色の羽でぶんぶん♪', color: 'from-green-200 to-yellow-100', image: img(50) },
  { id: 51, emoji: '🪼', name: 'クラゲちゃん', rarity: '★★', line: 'ふわふわ光るよ♪', color: 'from-purple-200 to-blue-100', image: img(51) },
  { id: 52, emoji: '🦎', name: 'ヤモリ忍者', rarity: '★★', line: 'にんにん！手裏剣シュッ！', color: 'from-green-300 to-gray-200', image: img(52) },
  { id: 53, emoji: '🐾', name: 'ウーパーちゃん', rarity: '★★', line: '魔法のつえでキラリ♪', color: 'from-pink-300 to-purple-100', image: img(53) },
  { id: 54, emoji: '🦢', name: 'スワンひめ', rarity: '★★', line: '銀のティアラきらきら♪', color: 'from-white to-blue-100', image: img(54) },
  { id: 55, emoji: '🐾', name: 'オコジョ雪', rarity: '★★', line: '雪の結晶キラキラ♪', color: 'from-white to-blue-50', image: img(55) },
  { id: 56, emoji: '🐾', name: 'カピバラ温泉', rarity: '★★', line: 'あったか〜い♪', color: 'from-amber-200 to-orange-100', image: img(56) },
  { id: 57, emoji: '🐾', name: 'ミーアキャット', rarity: '★★', line: '見はり番がんばる！', color: 'from-yellow-200 to-amber-100', image: img(57) },
  { id: 58, emoji: '🐦', name: 'シマエナガ', rarity: '★★', line: 'ふわもこ♪', color: 'from-pink-100 to-white', image: img(58) },
  { id: 59, emoji: '🐚', name: 'ヤドカリ宝石', rarity: '★★', line: 'キラキラの殻でしょ♪', color: 'from-purple-200 to-amber-100', image: img(59) },
  { id: 60, emoji: '✨', name: 'ホタルちゃん', rarity: '★★', line: 'ランタンで道を照らすよ♪', color: 'from-yellow-200 to-green-100', image: img(60) },

  // ===== ★★★ スーパーレア (61-90) =====
  { id: 61, emoji: '🦄', name: 'ユニコーン', rarity: '★★★', line: '✨ 虹のたてがみでキラキラ！', color: 'from-purple-300 to-pink-200', image: img(61) },
  { id: 62, emoji: '🐉', name: 'ドラゴンナイト', rarity: '★★★', line: '🔥 炎のマントでかっこいい！', color: 'from-red-400 to-orange-200', image: img(62) },
  { id: 63, emoji: '🦚', name: 'クジャクひめ', rarity: '★★★', line: '💎 七色の羽で美しく！', color: 'from-emerald-300 to-blue-200', image: img(63) },
  { id: 64, emoji: '🐋', name: 'クジラ王', rarity: '★★★', line: '🌊 海より広い知識！', color: 'from-blue-400 to-cyan-200', image: img(64) },
  { id: 65, emoji: '🦅', name: 'タカの勇者', rarity: '★★★', line: '🦅 金の鎧で空を飛ぶ！', color: 'from-amber-400 to-yellow-200', image: img(65) },
  { id: 66, emoji: '🐺', name: 'オオカミ賢者', rarity: '★★★', line: '📚 月の光で教えよう！', color: 'from-indigo-300 to-slate-200', image: img(66) },
  { id: 67, emoji: '🐯', name: 'ホワイトタイガー', rarity: '★★★', line: '⚔️ 金と白の鎧で守る！', color: 'from-amber-200 to-white', image: img(67) },
  { id: 68, emoji: '🔥', name: 'フェニックス鳥', rarity: '★★★', line: '🔥 炎の翼で復活！', color: 'from-red-400 to-yellow-200', image: img(68) },
  { id: 69, emoji: '🦊', name: '九尾のキツネ', rarity: '★★★', line: '🏯 9本の尻尾が光る！', color: 'from-orange-400 to-red-200', image: img(69) },
  { id: 70, emoji: '🐧', name: '氷のペンギン王子', rarity: '★★★', line: '❄️ 氷の王冠で凍らせる！', color: 'from-blue-300 to-cyan-100', image: img(70) },
  { id: 71, emoji: '🐰', name: '星うさぎ姫', rarity: '★★★', line: '⭐ 星のドレスでキラリ！', color: 'from-purple-200 to-yellow-100', image: img(71) },
  { id: 72, emoji: '🦌', name: '森の鹿の守護者', rarity: '★★★', line: '🌿 森を守る緑のオーラ！', color: 'from-green-400 to-emerald-200', image: img(72) },
  { id: 73, emoji: '🦎', name: '虹カメレオン魔術師', rarity: '★★★', line: '🌈 7色に光って魔法陣！', color: 'from-green-300 to-purple-200', image: img(73) },
  { id: 74, emoji: '🐱', name: '桜ねこ姫', rarity: '★★★', line: '🌸 桜の花びらが舞う！', color: 'from-pink-300 to-rose-100', image: img(74) },
  { id: 75, emoji: '🐆', name: '雷のチーター', rarity: '★★★', line: '⚡ 稲妻のスピード！', color: 'from-yellow-400 to-amber-200', image: img(75) },
  { id: 76, emoji: '🐉', name: 'タツノオトシゴ王', rarity: '★★★', line: '💠 深海の宝石の冠！', color: 'from-blue-400 to-purple-200', image: img(76) },
  { id: 77, emoji: '🦋', name: '花の蝶々女王', rarity: '★★★', line: '🌺 大きな虹の翼！', color: 'from-pink-300 to-purple-200', image: img(77) },
  { id: 78, emoji: '🦁', name: '太陽ライオン王', rarity: '★★★', line: '☀️ 炎のたてがみ！', color: 'from-yellow-500 to-orange-300', image: img(78) },
  { id: 79, emoji: '🐰', name: '月うさぎ忍者', rarity: '★★★', line: '🌙 三日月の手裏剣！', color: 'from-indigo-300 to-purple-200', image: img(79) },
  { id: 80, emoji: '🦅', name: '風のハヤブサ', rarity: '★★★', line: '🌪️ 風の翼で飛ぶ！', color: 'from-green-300 to-teal-200', image: img(80) },
  { id: 81, emoji: '🐘', name: '大地のゾウ騎士', rarity: '★★★', line: '🏔️ 岩の鎧で守る！', color: 'from-stone-400 to-amber-200', image: img(81) },
  { id: 82, emoji: '🦊', name: '雪キツネ妖精', rarity: '★★★', line: '❄️ 氷の結晶が舞う！', color: 'from-blue-200 to-white', image: img(82) },
  { id: 83, emoji: '🐢', name: '宝石カメ賢者', rarity: '★★★', line: '💎 宝石の甲羅が光る！', color: 'from-purple-300 to-green-200', image: img(83) },
  { id: 84, emoji: '🐦', name: 'ナイチンゲール', rarity: '★★★', line: '🎵 金のハープで歌う！', color: 'from-blue-200 to-pink-100', image: img(84) },
  { id: 85, emoji: '🦋', name: '時の蝶々', rarity: '★★★', line: '⏳ 時計の翼で時をあやつる！', color: 'from-purple-200 to-yellow-100', image: img(85) },
  { id: 86, emoji: '🐆', name: '魔法ユキヒョウ', rarity: '★★★', line: '🔮 星空の毛皮がきらめく！', color: 'from-indigo-300 to-blue-200', image: img(86) },
  { id: 87, emoji: '🦄', name: '天空ペガサス', rarity: '★★★', line: '🌈 金の翼で雲の上！', color: 'from-pink-200 to-yellow-100', image: img(87) },
  { id: 88, emoji: '🐱', name: 'マーメイドねこ', rarity: '★★★', line: '🧜 真珠の冠で海を泳ぐ！', color: 'from-purple-300 to-blue-200', image: img(88) },
  { id: 89, emoji: '🐉', name: '炎と氷の双子竜', rarity: '★★★', line: '🔥❄️ 二つの力で最強！', color: 'from-red-300 to-blue-300', image: img(89) },
  { id: 90, emoji: '🔥', name: '伝説のフェニックス', rarity: '★★★', line: '🌟 金と赤の炎で復活！', color: 'from-yellow-400 to-red-300', image: img(90) },
];

export const RARITY_WEIGHTS: Record<string, number> = {
  '★': 50,
  '★★': 30,
  '★★★': 20,
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
