export interface BossCard {
  id: number;
  name: string;
  image: string;
  rarity: '★★★★' | '★★★★★';
  atk: number;
  def: number;
  hp: number;
}

// 各カードのデータ（画像から読み取った名前）
export const BOSS_CARDS: BossCard[] = [
  // シート1: 9枚
  { id: 1, name: 'エララ', image: '/boss-cards/boss_card_1.png', rarity: '★★★★★', atk: 230, def: 135, hp: 500 },
  { id: 2, name: 'ゾルカナス', image: '/boss-cards/boss_card_2.png', rarity: '★★★★★', atk: 230, def: 130, hp: 480 },
  { id: 3, name: 'オーラ', image: '/boss-cards/boss_card_3.png', rarity: '★★★★★', atk: 200, def: 160, hp: 520 },
  { id: 4, name: 'メツラー', image: '/boss-cards/boss_card_4.png', rarity: '★★★★', atk: 155, def: 130, hp: 400 },
  { id: 5, name: 'ガイア', image: '/boss-cards/boss_card_5.png', rarity: '★★★★', atk: 150, def: 135, hp: 420 },
  { id: 6, name: 'ゴイム', image: '/boss-cards/boss_card_6.png', rarity: '★★★★', atk: 150, def: 130, hp: 410 },
  { id: 7, name: 'モーヴァス', image: '/boss-cards/boss_card_7.png', rarity: '★★★★', atk: 150, def: 130, hp: 400 },
  { id: 8, name: 'ガイア（覚醒）', image: '/boss-cards/boss_card_8.png', rarity: '★★★★', atk: 158, def: 135, hp: 430 },
  { id: 9, name: 'ロクサナ', image: '/boss-cards/boss_card_9.png', rarity: '★★★★', atk: 160, def: 120, hp: 380 },
  // シート2: 9枚
  { id: 10, name: 'アルチェリ', image: '/boss-cards/boss_card_10.png', rarity: '★★★★★', atk: 220, def: 140, hp: 500 },
  { id: 11, name: 'イグニス', image: '/boss-cards/boss_card_11.png', rarity: '★★★★★', atk: 235, def: 130, hp: 470 },
  { id: 12, name: 'モーヴァス（闇）', image: '/boss-cards/boss_card_12.png', rarity: '★★★★★', atk: 210, def: 150, hp: 510 },
  { id: 13, name: 'ネプチューン', image: '/boss-cards/boss_card_13.png', rarity: '★★★★', atk: 150, def: 130, hp: 420 },
  { id: 14, name: 'ウルヴァリン', image: '/boss-cards/boss_card_14.png', rarity: '★★★★', atk: 155, def: 125, hp: 390 },
  { id: 15, name: 'シルフィ', image: '/boss-cards/boss_card_15.png', rarity: '★★★★', atk: 140, def: 140, hp: 430 },
  { id: 16, name: 'タウルス', image: '/boss-cards/boss_card_16.png', rarity: '★★★★', atk: 158, def: 130, hp: 410 },
  { id: 17, name: 'フェニックス', image: '/boss-cards/boss_card_17.png', rarity: '★★★★', atk: 150, def: 130, hp: 400 },
  { id: 18, name: 'ガブリエル', image: '/boss-cards/boss_card_18.png', rarity: '★★★★', atk: 145, def: 145, hp: 440 },
  // シート3: 9枚
  { id: 19, name: 'カラコス', image: '/boss-cards/boss_card_19.png', rarity: '★★★★★', atk: 225, def: 135, hp: 490 },
  { id: 20, name: 'クリスタ', image: '/boss-cards/boss_card_20.png', rarity: '★★★★★', atk: 200, def: 155, hp: 530 },
  { id: 21, name: 'ノグル', image: '/boss-cards/boss_card_21.png', rarity: '★★★★★', atk: 215, def: 145, hp: 500 },
  { id: 22, name: 'プリン', image: '/boss-cards/boss_card_22.png', rarity: '★★★★', atk: 130, def: 130, hp: 400 },
  { id: 23, name: 'ゲームマスター', image: '/boss-cards/boss_card_23.png', rarity: '★★★★', atk: 155, def: 130, hp: 410 },
  { id: 24, name: 'クレオーネ', image: '/boss-cards/boss_card_24.png', rarity: '★★★★', atk: 145, def: 135, hp: 420 },
  { id: 25, name: 'フォレストエルフ', image: '/boss-cards/boss_card_25.png', rarity: '★★★★', atk: 140, def: 140, hp: 430 },
  { id: 26, name: 'ゴシックメイジ', image: '/boss-cards/boss_card_26.png', rarity: '★★★★', atk: 160, def: 120, hp: 380 },
  { id: 27, name: 'ドラゴンナイト', image: '/boss-cards/boss_card_27.png', rarity: '★★★★', atk: 155, def: 130, hp: 400 },
  // シート4: 7枚
  { id: 28, name: 'セレステナ', image: '/boss-cards/boss_card_28.png', rarity: '★★★★★', atk: 210, def: 155, hp: 520 },
  { id: 29, name: 'エララ（水）', image: '/boss-cards/boss_card_29.png', rarity: '★★★★★', atk: 225, def: 140, hp: 500 },
  { id: 30, name: 'ゾルカナス（炎）', image: '/boss-cards/boss_card_30.png', rarity: '★★★★', atk: 160, def: 125, hp: 390 },
  { id: 31, name: 'ガイア（森）', image: '/boss-cards/boss_card_31.png', rarity: '★★★★', atk: 150, def: 135, hp: 420 },
  { id: 32, name: 'メツラー（闇）', image: '/boss-cards/boss_card_32.png', rarity: '★★★★', atk: 155, def: 130, hp: 400 },
  { id: 33, name: 'ゴイム（大地）', image: '/boss-cards/boss_card_33.png', rarity: '★★★★', atk: 150, def: 138, hp: 430 },
  { id: 34, name: 'ガイア（究極）', image: '/boss-cards/boss_card_34.png', rarity: '★★★★★', atk: 230, def: 150, hp: 540 },
  // シート5: 9枚
  { id: 35, name: 'リュミエール', image: '/boss-cards/boss_card_35.png', rarity: '★★★★★', atk: 230, def: 135, hp: 500 },
  { id: 36, name: 'ヴァルカン', image: '/boss-cards/boss_card_36.png', rarity: '★★★★★', atk: 235, def: 136, hp: 480 },
  { id: 37, name: 'モーガン', image: '/boss-cards/boss_card_37.png', rarity: '★★★★★', atk: 210, def: 150, hp: 510 },
  { id: 38, name: 'ネプチューネ', image: '/boss-cards/boss_card_38.png', rarity: '★★★★', atk: 150, def: 130, hp: 420 },
  { id: 39, name: 'ウルヴァリン（闇）', image: '/boss-cards/boss_card_39.png', rarity: '★★★★', atk: 155, def: 133, hp: 400 },
  { id: 40, name: 'シルフィ（風）', image: '/boss-cards/boss_card_40.png', rarity: '★★★★', atk: 150, def: 130, hp: 410 },
  { id: 41, name: 'タウルス（闘）', image: '/boss-cards/boss_card_41.png', rarity: '★★★★', atk: 158, def: 135, hp: 420 },
  { id: 42, name: 'フェニックス（炎）', image: '/boss-cards/boss_card_42.png', rarity: '★★★★', atk: 155, def: 130, hp: 400 },
  { id: 43, name: 'ガブリエル（聖）', image: '/boss-cards/boss_card_43.png', rarity: '★★★★', atk: 150, def: 140, hp: 430 },
  // シート6: 9枚
  { id: 44, name: 'リュミエール（覚醒）', image: '/boss-cards/boss_card_44.png', rarity: '★★★★★', atk: 225, def: 140, hp: 510 },
  { id: 45, name: 'ヴァルカン（覚醒）', image: '/boss-cards/boss_card_45.png', rarity: '★★★★★', atk: 240, def: 136, hp: 490 },
  { id: 46, name: 'モーガン（覚醒）', image: '/boss-cards/boss_card_46.png', rarity: '★★★★★', atk: 215, def: 150, hp: 520 },
  { id: 47, name: 'ネプチューネ（覚醒）', image: '/boss-cards/boss_card_47.png', rarity: '★★★★', atk: 155, def: 135, hp: 430 },
  { id: 48, name: 'ウルヴァリン（覚醒）', image: '/boss-cards/boss_card_48.png', rarity: '★★★★', atk: 160, def: 130, hp: 410 },
  { id: 49, name: 'シルフィ（覚醒）', image: '/boss-cards/boss_card_49.png', rarity: '★★★★', atk: 150, def: 140, hp: 440 },
  { id: 50, name: 'タウルス（覚醒）', image: '/boss-cards/boss_card_50.png', rarity: '★★★★', atk: 157, def: 135, hp: 420 },
  { id: 51, name: 'フェニックス（覚醒）', image: '/boss-cards/boss_card_51.png', rarity: '★★★★', atk: 155, def: 133, hp: 410 },
  { id: 52, name: 'ガブリエル（覚醒）', image: '/boss-cards/boss_card_52.png', rarity: '★★★★', atk: 150, def: 140, hp: 430 },
  // シート7: 9枚
  { id: 53, name: 'リリ', image: '/boss-cards/boss_card_53.png', rarity: '★★★★★', atk: 220, def: 140, hp: 500 },
  { id: 54, name: 'ボルカン', image: '/boss-cards/boss_card_54.png', rarity: '★★★★★', atk: 230, def: 150, hp: 530 },
  { id: 55, name: 'リリス', image: '/boss-cards/boss_card_55.png', rarity: '★★★★★', atk: 225, def: 140, hp: 490 },
  { id: 56, name: 'シルバン', image: '/boss-cards/boss_card_56.png', rarity: '★★★★', atk: 160, def: 130, hp: 420 },
  { id: 57, name: 'ルナ', image: '/boss-cards/boss_card_57.png', rarity: '★★★★', atk: 150, def: 140, hp: 430 },
  { id: 58, name: 'テラ', image: '/boss-cards/boss_card_58.png', rarity: '★★★★', atk: 155, def: 135, hp: 420 },
  { id: 59, name: 'カイル', image: '/boss-cards/boss_card_59.png', rarity: '★★★★', atk: 150, def: 130, hp: 400 },
  { id: 60, name: 'ベラ', image: '/boss-cards/boss_card_60.png', rarity: '★★★★', atk: 140, def: 140, hp: 440 },
  { id: 61, name: 'ガブリエル（光）', image: '/boss-cards/boss_card_61.png', rarity: '★★★★★', atk: 210, def: 155, hp: 520 },
];

// ボスID → 報酬カードIDのマッピング（初回撃破時にランダムで1枚獲得）
export const BOSS_REWARD_CARDS: Record<number, number[]> = {
  1: [1, 2, 3, 35, 36, 37],           // スライムキング
  2: [4, 5, 6, 38, 39, 40],           // カニ将軍
  3: [7, 8, 9, 41, 42, 43],           // フクロウ魔術師
  4: [10, 11, 12, 44, 45, 46],        // ライオン大王
  5: [13, 14, 15, 47, 48, 49],        // タコ海賊船長
  6: [16, 17, 18, 50, 51, 52],        // ドラゴン
  7: [19, 20, 21, 53, 54, 55],        // フェニックス
  8: [22, 23, 24, 56, 57, 58],        // 九尾のキツネ
  9: [25, 26, 27, 59, 60, 61],        // 太陽ライオン王
  10: [28, 29, 30, 31, 32, 33, 34],   // 伝説のフェニックス
};

export function getBossCard(id: number): BossCard | undefined {
  return BOSS_CARDS.find(c => c.id === id);
}
