export interface BossCard {
  id: number;
  name: string;
  image: string;
  rarity: '★★★★' | '★★★★★';
}

// 各カードのデータ（画像から読み取った名前）
export const BOSS_CARDS: BossCard[] = [
  // シート1: 9枚
  { id: 1, name: 'エララ', image: '/boss-cards/boss_card_1.png', rarity: '★★★★★' },
  { id: 2, name: 'ゾルカナス', image: '/boss-cards/boss_card_2.png', rarity: '★★★★★' },
  { id: 3, name: 'オーラ', image: '/boss-cards/boss_card_3.png', rarity: '★★★★★' },
  { id: 4, name: 'メツラー', image: '/boss-cards/boss_card_4.png', rarity: '★★★★' },
  { id: 5, name: 'ガイア', image: '/boss-cards/boss_card_5.png', rarity: '★★★★' },
  { id: 6, name: 'ゴイム', image: '/boss-cards/boss_card_6.png', rarity: '★★★★' },
  { id: 7, name: 'モーヴァス', image: '/boss-cards/boss_card_7.png', rarity: '★★★★' },
  { id: 8, name: 'ガイア（覚醒）', image: '/boss-cards/boss_card_8.png', rarity: '★★★★' },
  { id: 9, name: 'ロクサナ', image: '/boss-cards/boss_card_9.png', rarity: '★★★★' },
  // シート2: 9枚
  { id: 10, name: 'アルチェリ', image: '/boss-cards/boss_card_10.png', rarity: '★★★★★' },
  { id: 11, name: 'イグニス', image: '/boss-cards/boss_card_11.png', rarity: '★★★★★' },
  { id: 12, name: 'モーヴァス（闇）', image: '/boss-cards/boss_card_12.png', rarity: '★★★★★' },
  { id: 13, name: 'ネプチューン', image: '/boss-cards/boss_card_13.png', rarity: '★★★★' },
  { id: 14, name: 'ウルヴァリン', image: '/boss-cards/boss_card_14.png', rarity: '★★★★' },
  { id: 15, name: 'シルフィ', image: '/boss-cards/boss_card_15.png', rarity: '★★★★' },
  { id: 16, name: 'タウルス', image: '/boss-cards/boss_card_16.png', rarity: '★★★★' },
  { id: 17, name: 'フェニックス', image: '/boss-cards/boss_card_17.png', rarity: '★★★★' },
  { id: 18, name: 'ガブリエル', image: '/boss-cards/boss_card_18.png', rarity: '★★★★' },
  // シート3: 9枚
  { id: 19, name: 'カラコス', image: '/boss-cards/boss_card_19.png', rarity: '★★★★★' },
  { id: 20, name: 'クリスタ', image: '/boss-cards/boss_card_20.png', rarity: '★★★★★' },
  { id: 21, name: 'ノグル', image: '/boss-cards/boss_card_21.png', rarity: '★★★★★' },
  { id: 22, name: 'プリン', image: '/boss-cards/boss_card_22.png', rarity: '★★★★' },
  { id: 23, name: 'ゲームマスター', image: '/boss-cards/boss_card_23.png', rarity: '★★★★' },
  { id: 24, name: 'クレオーネ', image: '/boss-cards/boss_card_24.png', rarity: '★★★★' },
  { id: 25, name: 'フォレストエルフ', image: '/boss-cards/boss_card_25.png', rarity: '★★★★' },
  { id: 26, name: 'ゴシックメイジ', image: '/boss-cards/boss_card_26.png', rarity: '★★★★' },
  { id: 27, name: 'ドラゴンナイト', image: '/boss-cards/boss_card_27.png', rarity: '★★★★' },
  // シート4: 7枚
  { id: 28, name: 'セレステナ', image: '/boss-cards/boss_card_28.png', rarity: '★★★★★' },
  { id: 29, name: 'エララ（水）', image: '/boss-cards/boss_card_29.png', rarity: '★★★★★' },
  { id: 30, name: 'ゾルカナス（炎）', image: '/boss-cards/boss_card_30.png', rarity: '★★★★' },
  { id: 31, name: 'ガイア（森）', image: '/boss-cards/boss_card_31.png', rarity: '★★★★' },
  { id: 32, name: 'メツラー（闇）', image: '/boss-cards/boss_card_32.png', rarity: '★★★★' },
  { id: 33, name: 'ゴイム（大地）', image: '/boss-cards/boss_card_33.png', rarity: '★★★★' },
  { id: 34, name: 'ガイア（究極）', image: '/boss-cards/boss_card_34.png', rarity: '★★★★★' },
];

// ボスID → 報酬カードIDのマッピング（初回撃破時にランダムで1枚獲得）
export const BOSS_REWARD_CARDS: Record<number, number[]> = {
  1: [1, 2, 3],       // スライムキング
  2: [4, 5, 6],       // カニ将軍
  3: [7, 8, 9],       // フクロウ魔術師
  4: [10, 11, 12],    // ライオン大王
  5: [13, 14, 15],    // タコ海賊船長
  6: [16, 17, 18],    // ドラゴン
  7: [19, 20, 21],    // フェニックス
  8: [22, 23, 24],    // 九尾のキツネ
  9: [25, 26, 27],    // 太陽ライオン王
  10: [28, 29, 30, 31, 32, 33, 34], // 伝説のフェニックス（最終ボスは多め）
};

export function getBossCard(id: number): BossCard | undefined {
  return BOSS_CARDS.find(c => c.id === id);
}
