#!/usr/bin/env python3
"""
ひっさんマスター キャラクター生成スクリプト v2
hiragana-app-tenのmonsterSVG方式を応用した高品質SVG生成→PNG変換
"""

import os
import subprocess
import tempfile
import math

OUT_DIR = os.path.expanduser("~/Desktop/Claude-Projects/hissan-master/public/characters")
os.makedirs(OUT_DIR, exist_ok=True)

# 疑似乱数（IDベースで決定的）
def rnd(id, n):
    return ((id * 2654435761 + n * 0x9e3779b9) & 0xFFFFFFFF)

def pick(arr, id, n):
    return arr[rnd(id, n) % len(arr)]

# ===== カラーパレット（属性別）=====
PALETTES = {
    'pink':    {'bg':'#fff0f5','b':'#ff69b4','b2':'#ffb6c1','hi':'#ffe0ec','eye':'#ff1493','ol':'#cc1166','cheek':'#ff9999'},
    'orange':  {'bg':'#fff5eb','b':'#ff8c42','b2':'#ffb347','hi':'#ffe0b2','eye':'#ff6600','ol':'#cc5500','cheek':'#ffaa77'},
    'blue':    {'bg':'#f0f5ff','b':'#4169e1','b2':'#87ceeb','hi':'#c8e0ff','eye':'#0066ff','ol':'#003399','cheek':'#99bbff'},
    'green':   {'bg':'#f0fff0','b':'#3cb371','b2':'#90ee90','hi':'#c8ffc8','eye':'#228b22','ol':'#006400','cheek':'#88dd88'},
    'purple':  {'bg':'#f5f0ff','b':'#9370db','b2':'#dda0dd','hi':'#e8d0ff','eye':'#7b2fbe','ol':'#4b0082','cheek':'#cc99ff'},
    'yellow':  {'bg':'#fffff0','b':'#daa520','b2':'#ffd700','hi':'#fff8c0','eye':'#cc8800','ol':'#996600','cheek':'#ffdd66'},
    'red':     {'bg':'#fff0f0','b':'#dc143c','b2':'#ff6b6b','hi':'#ffc0c0','eye':'#cc0000','ol':'#8b0000','cheek':'#ff8888'},
    'gray':    {'bg':'#f5f5f5','b':'#708090','b2':'#b0c4de','hi':'#d0d8e0','eye':'#4a4a4a','ol':'#2f4f4f','cheek':'#c0c0c0'},
}

# ===== キャラクター定義 =====
CHARACTERS = [
    # ★ ノーマル (1-30)
    (1, 'cat', 'pink', 'ミケちゃん'),
    (2, 'dog', 'orange', 'シバくん'),
    (3, 'rabbit', 'pink', 'ウサミちゃん'),
    (4, 'frog', 'green', 'ケロタン'),
    (5, 'chick', 'yellow', 'ピヨちゃん'),
    (6, 'pig', 'pink', 'ブーちゃん'),
    (7, 'mouse', 'gray', 'チューたろう'),
    (8, 'hamster', 'orange', 'ハムちゃん'),
    (9, 'bear', 'orange', 'クマきち'),
    (10, 'penguin', 'blue', 'ペンタくん'),
    (11, 'chick', 'yellow', 'ヒヨくん'),
    (12, 'cow', 'gray', 'モーちゃん'),
    (13, 'sheep', 'gray', 'メリーちゃん'),
    (14, 'chicken', 'red', 'コケッコ'),
    (15, 'hedgehog', 'orange', 'ハリーくん'),
    (16, 'squirrel', 'orange', 'リスちゃん'),
    (17, 'crab', 'red', 'カニまる'),
    (18, 'turtle', 'green', 'カメじい'),
    (19, 'bee', 'yellow', 'ハッチ'),
    (20, 'ladybug', 'red', 'テントちゃん'),
    (21, 'duck', 'yellow', 'アヒルん'),
    (22, 'mole', 'orange', 'モグラん'),
    (23, 'raccoon', 'orange', 'タヌきち'),
    (24, 'parrot', 'green', 'インコちゃん'),
    (25, 'fish', 'red', 'キンちゃん'),
    (26, 'snail', 'purple', 'カタツムリン'),
    (27, 'koala', 'gray', 'コアラん'),
    (28, 'rabbit', 'orange', 'ラビくん'),
    (29, 'panda', 'gray', 'パンダちゃん'),
    (30, 'deer', 'orange', 'バンビちゃん'),

    # ★★ レア (31-60)
    (31, 'fox', 'orange', 'コンちゃん'),
    (32, 'panda', 'blue', 'パンダおうじ'),
    (33, 'koala', 'purple', 'コアラひめ'),
    (34, 'lion', 'yellow', 'レオくん'),
    (35, 'dolphin', 'blue', 'ドルフィン'),
    (36, 'butterfly', 'purple', 'ちょうちょひめ'),
    (37, 'octopus', 'red', 'タコ船長'),
    (38, 'owl', 'orange', 'フクロン博士'),
    (39, 'flamingo', 'pink', 'フラミーナ'),
    (40, 'fish', 'orange', 'トロピくん'),
    (41, 'otter', 'orange', 'ラッコちゃん'),
    (42, 'parrot', 'green', 'オウム海賊'),
    (43, 'chameleon', 'green', 'カメレオン'),
    (44, 'pelican', 'blue', 'ペリカン郵便'),
    (45, 'seal', 'blue', 'アザラシひめ'),
    (46, 'fox', 'orange', 'レッサーたんけん'),
    (47, 'turtle', 'green', 'ウミガメサーファー'),
    (48, 'otter', 'pink', 'カワウソはなちゃん'),
    (49, 'whale', 'blue', 'マンタくん'),
    (50, 'bird', 'green', 'ハチドリちゃん'),
    (51, 'jellyfish', 'purple', 'クラゲちゃん'),
    (52, 'gecko', 'green', 'ヤモリ忍者'),
    (53, 'axolotl', 'pink', 'ウーパーちゃん'),
    (54, 'swan', 'gray', 'スワンひめ'),
    (55, 'ermine', 'gray', 'オコジョ雪'),
    (56, 'capybara', 'orange', 'カピバラ温泉'),
    (57, 'meerkat', 'yellow', 'ミーアキャット'),
    (58, 'bird', 'pink', 'シマエナガ'),
    (59, 'crab', 'purple', 'ヤドカリ宝石'),
    (60, 'firefly', 'yellow', 'ホタルちゃん'),

    # ★★★ スーパーレア (61-90)
    (61, 'unicorn', 'purple', 'ユニコーン'),
    (62, 'dragon', 'red', 'ドラゴンナイト'),
    (63, 'peacock', 'green', 'クジャクひめ'),
    (64, 'whale', 'blue', 'クジラ王'),
    (65, 'eagle', 'yellow', 'タカの勇者'),
    (66, 'wolf', 'gray', 'オオカミ賢者'),
    (67, 'tiger', 'yellow', 'ホワイトタイガー'),
    (68, 'phoenix', 'red', 'フェニックス鳥'),
    (69, 'fox', 'red', '九尾のキツネ'),
    (70, 'penguin', 'blue', '氷のペンギン王子'),
    (71, 'rabbit', 'purple', '星うさぎ姫'),
    (72, 'deer', 'green', '森の鹿の守護者'),
    (73, 'chameleon', 'purple', '虹カメレオン魔術師'),
    (74, 'cat', 'pink', '桜ねこ姫'),
    (75, 'cheetah', 'yellow', '雷のチーター'),
    (76, 'seahorse', 'blue', 'タツノオトシゴ王'),
    (77, 'butterfly', 'pink', '花の蝶々女王'),
    (78, 'lion', 'yellow', '太陽ライオン王'),
    (79, 'rabbit', 'purple', '月うさぎ忍者'),
    (80, 'eagle', 'green', '風のハヤブサ'),
    (81, 'elephant', 'orange', '大地のゾウ騎士'),
    (82, 'fox', 'blue', '雪キツネ妖精'),
    (83, 'turtle', 'purple', '宝石カメ賢者'),
    (84, 'bird', 'blue', 'ナイチンゲール'),
    (85, 'butterfly', 'purple', '時の蝶々'),
    (86, 'cheetah', 'blue', '魔法ユキヒョウ'),
    (87, 'unicorn', 'pink', '天空ペガサス'),
    (88, 'cat', 'purple', 'マーメイドねこ'),
    (89, 'dragon', 'blue', '炎と氷の双子竜'),
    (90, 'phoenix', 'yellow', '伝説のフェニックス'),
]


def get_body(animal, id, p):
    """動物タイプ別のボディSVG（monsterSVG方式：パーツ選択式）"""
    bodies = {
        'cat': (
            # 体: 丸い体
            '<ellipse cx="100" cy="128" rx="52" ry="48"/>',
            # お腹
            '<ellipse cx="100" cy="138" rx="30" ry="28"/>',
            # 耳（三角）
            f'<polygon points="60,72 50,34 80,62" fill="{p["b"]}"/>'
            f'<polygon points="140,72 150,34 120,62" fill="{p["b"]}"/>'
            f'<polygon points="63,66 55,42 76,60" fill="{p["hi"]}" opacity="0.5"/>',
            # ヒゲ
            f'<line x1="40" y1="112" x2="65" y2="108" stroke="{p["ol"]}" stroke-width="1.5" opacity="0.5"/>'
            f'<line x1="38" y1="120" x2="64" y2="118" stroke="{p["ol"]}" stroke-width="1.5" opacity="0.5"/>'
            f'<line x1="135" y1="108" x2="160" y2="112" stroke="{p["ol"]}" stroke-width="1.5" opacity="0.5"/>'
            f'<line x1="136" y1="118" x2="162" y2="120" stroke="{p["ol"]}" stroke-width="1.5" opacity="0.5"/>',
            # しっぽ
            f'<path d="M148,150 C168,140 176,120 168,108" fill="none" stroke="{p["b"]}" stroke-width="8" stroke-linecap="round"/>',
        ),
        'dog': (
            '<ellipse cx="100" cy="128" rx="52" ry="48"/>',
            '<ellipse cx="100" cy="138" rx="30" ry="28"/>',
            f'<ellipse cx="62" cy="76" rx="22" ry="34" fill="{p["b"]}" transform="rotate(15,62,76)"/>'
            f'<ellipse cx="138" cy="76" rx="22" ry="34" fill="{p["b"]}" transform="rotate(-15,138,76)"/>',
            '',
            f'<path d="M148,148 C162,136 164,118 158,112" fill="none" stroke="{p["b"]}" stroke-width="10" stroke-linecap="round"/>',
        ),
        'rabbit': (
            '<ellipse cx="100" cy="130" rx="48" ry="46"/>',
            '<ellipse cx="100" cy="140" rx="28" ry="26"/>',
            f'<ellipse cx="78" cy="50" rx="14" ry="46" fill="{p["b"]}"/>'
            f'<ellipse cx="122" cy="50" rx="14" ry="46" fill="{p["b"]}"/>'
            f'<ellipse cx="78" cy="50" rx="8" ry="36" fill="{p["hi"]}" opacity="0.5"/>'
            f'<ellipse cx="122" cy="50" rx="8" ry="36" fill="{p["hi"]}" opacity="0.5"/>',
            '',
            f'<circle cx="148" cy="150" r="10" fill="white" opacity="0.8"/>',
        ),
        'frog': (
            '<ellipse cx="100" cy="130" rx="56" ry="44"/>',
            '<ellipse cx="100" cy="140" rx="32" ry="26"/>',
            f'<circle cx="72" cy="82" r="20" fill="{p["b"]}"/>'
            f'<circle cx="128" cy="82" r="20" fill="{p["b"]}"/>',
            '',
            '',
        ),
        'chick': (
            '<ellipse cx="100" cy="128" rx="46" ry="48"/>',
            '<ellipse cx="100" cy="138" rx="28" ry="26"/>',
            f'<path d="M90,68 L100,50 L110,68" fill="{p["b"]}"/>',
            # くちばし
            f'<polygon points="90,120 100,130 110,120" fill="#ff8c00"/>',
            # 翼
            f'<ellipse cx="56" cy="130" rx="18" ry="28" fill="{p["b"]}" transform="rotate(-10,56,130)"/>'
            f'<ellipse cx="144" cy="130" rx="18" ry="28" fill="{p["b"]}" transform="rotate(10,144,130)"/>',
        ),
        'pig': (
            '<ellipse cx="100" cy="128" rx="52" ry="48"/>',
            '<ellipse cx="100" cy="138" rx="30" ry="28"/>',
            f'<ellipse cx="70" cy="78" rx="18" ry="14" fill="{p["b"]}" transform="rotate(-15,70,78)"/>'
            f'<ellipse cx="130" cy="78" rx="18" ry="14" fill="{p["b"]}" transform="rotate(15,130,78)"/>',
            # 豚鼻
            f'<ellipse cx="100" cy="124" rx="16" ry="11" fill="{p["hi"]}"/>'
            f'<circle cx="94" cy="123" r="3" fill="{p["ol"]}"/>'
            f'<circle cx="106" cy="123" r="3" fill="{p["ol"]}"/>',
            f'<path d="M148,146 Q158,140 154,128 Q152,120 158,118" fill="none" stroke="{p["b"]}" stroke-width="4" stroke-linecap="round"/>',
        ),
        'mouse': (
            '<ellipse cx="100" cy="130" rx="46" ry="44"/>',
            '<ellipse cx="100" cy="140" rx="26" ry="24"/>',
            f'<circle cx="68" cy="78" r="24" fill="{p["b"]}"/>'
            f'<circle cx="132" cy="78" r="24" fill="{p["b"]}"/>'
            f'<circle cx="68" cy="78" r="16" fill="{p["hi"]}" opacity="0.45"/>'
            f'<circle cx="132" cy="78" r="16" fill="{p["hi"]}" opacity="0.45"/>',
            '',
            f'<path d="M144,156 C164,148 176,134 180,120" fill="none" stroke="{p["b"]}" stroke-width="4" stroke-linecap="round"/>',
        ),
        'hamster': (
            '<ellipse cx="100" cy="128" rx="50" ry="48"/>',
            '<ellipse cx="100" cy="138" rx="28" ry="26"/>',
            f'<circle cx="68" cy="82" r="18" fill="{p["b"]}"/>'
            f'<circle cx="132" cy="82" r="18" fill="{p["b"]}"/>'
            f'<circle cx="68" cy="82" r="12" fill="{p["hi"]}" opacity="0.4"/>'
            f'<circle cx="132" cy="82" r="12" fill="{p["hi"]}" opacity="0.4"/>',
            # ぷくぷくほっぺ
            f'<ellipse cx="62" cy="116" rx="20" ry="14" fill="{p["b"]}"/>'
            f'<ellipse cx="138" cy="116" rx="20" ry="14" fill="{p["b"]}"/>',
            '',
        ),
        'bear': (
            '<ellipse cx="100" cy="128" rx="54" ry="50"/>',
            '<ellipse cx="100" cy="140" rx="32" ry="28"/>',
            f'<circle cx="62" cy="78" r="18" fill="{p["b"]}"/>'
            f'<circle cx="138" cy="78" r="18" fill="{p["b"]}"/>'
            f'<circle cx="62" cy="78" r="10" fill="{p["ol"]}" opacity="0.3"/>'
            f'<circle cx="138" cy="78" r="10" fill="{p["ol"]}" opacity="0.3"/>',
            '',
            '',
        ),
        'penguin': (
            '<ellipse cx="100" cy="128" rx="48" ry="52"/>',
            '<ellipse cx="100" cy="138" rx="30" ry="34" fill="white"/>',
            '',
            # くちばし
            f'<polygon points="90,118 100,128 110,118" fill="#ff8c00"/>',
            # 翼
            f'<ellipse cx="54" cy="130" rx="14" ry="32" fill="{p["b"]}" transform="rotate(-8,54,130)"/>'
            f'<ellipse cx="146" cy="130" rx="14" ry="32" fill="{p["b"]}" transform="rotate(8,146,130)"/>',
        ),
        'fox': (
            '<ellipse cx="100" cy="128" rx="50" ry="48"/>',
            '<ellipse cx="100" cy="140" rx="28" ry="26"/>',
            f'<polygon points="62,76 48,30 84,64" fill="{p["b"]}"/>'
            f'<polygon points="138,76 152,30 116,64" fill="{p["b"]}"/>'
            f'<polygon points="64,70 54,40 80,62" fill="white" opacity="0.5"/>'
            f'<polygon points="136,70 146,40 120,62" fill="white" opacity="0.5"/>',
            # マズル
            f'<ellipse cx="100" cy="124" rx="20" ry="14" fill="white" opacity="0.7"/>',
            f'<path d="M146,148 C166,136 170,116 162,104" fill="{p["b"]}" stroke="{p["ol"]}" stroke-width="1"/>',
        ),
        'lion': (
            # たてがみ
            f'<circle cx="100" cy="108" rx="62" fill="{p["b"]}" opacity="0.5"/>',
            '<ellipse cx="100" cy="138" rx="30" ry="28"/>',
            f'<circle cx="68" cy="82" r="14" fill="{p["b"]}"/>'
            f'<circle cx="132" cy="82" r="14" fill="{p["b"]}"/>',
            '',
            f'<path d="M148,150 C166,142 168,122 162,112" fill="none" stroke="{p["b"]}" stroke-width="6" stroke-linecap="round"/>'
            f'<circle cx="162" cy="110" r="6" fill="{p["b"]}"/>',
        ),
        'owl': (
            '<ellipse cx="100" cy="128" rx="48" ry="48"/>',
            '<ellipse cx="100" cy="140" rx="28" ry="26"/>',
            f'<polygon points="68,76 60,46 82,70" fill="{p["b"]}"/>'
            f'<polygon points="132,76 140,46 118,70" fill="{p["b"]}"/>',
            # くちばし
            f'<polygon points="94,122 100,132 106,122" fill="#ff8c00"/>',
            # 翼
            f'<ellipse cx="54" cy="128" rx="20" ry="36" fill="{p["ol"]}" opacity="0.6"/>'
            f'<ellipse cx="146" cy="128" rx="20" ry="36" fill="{p["ol"]}" opacity="0.6"/>',
        ),
        'octopus': (
            '<ellipse cx="100" cy="110" rx="48" ry="42"/>',
            '<ellipse cx="100" cy="118" rx="28" ry="22"/>',
            '',
            # 足
            ''.join(f'<path d="M{60+i*12},150 C{55+i*12},170 {65+i*12},180 {60+i*12},190" fill="none" stroke="{p["b"]}" stroke-width="8" stroke-linecap="round"/>' for i in range(7)),
            '',
        ),
        'dragon': (
            '<ellipse cx="100" cy="128" rx="52" ry="48"/>',
            '<ellipse cx="100" cy="140" rx="28" ry="26"/>',
            # 角
            f'<polygon points="74,74 62,32 88,66" fill="{p["ol"]}"/>'
            f'<polygon points="126,74 138,32 112,66" fill="{p["ol"]}"/>',
            # 翼
            f'<path d="M46,108 C24,80 30,48 40,42 C44,56 50,68 56,78 C48,60 50,40 58,34 C60,50 66,66 74,80" fill="{p["b"]}" opacity="0.7"/>'
            f'<path d="M154,108 C176,80 170,48 160,42 C156,56 150,68 144,78 C152,60 150,40 142,34 C140,50 134,66 126,80" fill="{p["b"]}" opacity="0.7"/>',
            f'<path d="M148,152 C168,144 174,126 168,112" fill="none" stroke="{p["b"]}" stroke-width="10" stroke-linecap="round"/>',
        ),
        'unicorn': (
            '<ellipse cx="100" cy="128" rx="50" ry="48"/>',
            '<ellipse cx="100" cy="140" rx="28" ry="26"/>',
            # 角
            f'<polygon points="97,70 100,24 103,70" fill="#ffd700"/>'
            # 耳
            f'<polygon points="70,76 62,46 82,68" fill="{p["b"]}"/>'
            f'<polygon points="130,76 138,46 118,68" fill="{p["b"]}"/>',
            # たてがみ（レインボー）
            '<path d="M120,72 Q130,82 124,94" fill="none" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round"/>'
            '<path d="M126,76 Q136,88 128,100" fill="none" stroke="#ffd93d" stroke-width="5" stroke-linecap="round"/>'
            '<path d="M132,80 Q142,94 132,106" fill="none" stroke="#6bcb77" stroke-width="5" stroke-linecap="round"/>'
            '<path d="M136,86 Q146,100 134,112" fill="none" stroke="#4d96ff" stroke-width="5" stroke-linecap="round"/>',
            '',
        ),
        'phoenix': (
            '<ellipse cx="100" cy="126" rx="46" ry="44"/>',
            '<ellipse cx="100" cy="136" rx="26" ry="24"/>',
            # 冠毛
            f'<path d="M86,74 Q82,40 90,50" fill="{p["b"]}" stroke="{p["ol"]}" stroke-width="1"/>'
            f'<path d="M100,70 Q100,30 104,42" fill="{p["b2"]}" stroke="{p["ol"]}" stroke-width="1"/>'
            f'<path d="M114,74 Q118,40 110,50" fill="{p["b"]}" stroke="{p["ol"]}" stroke-width="1"/>',
            # 翼
            f'<path d="M46,110 C22,78 28,38 40,30 C44,50 52,68 60,80 C48,54 50,30 60,22 C62,44 70,66 80,86" fill="{p["b"]}" opacity="0.75"/>'
            f'<path d="M154,110 C178,78 172,38 160,30 C156,50 148,68 140,80 C152,54 150,30 140,22 C138,44 130,66 120,86" fill="{p["b"]}" opacity="0.75"/>',
            # 尾羽
            f'<path d="M100,172 Q80,190 72,186 Q88,178 100,172" fill="{p["b"]}" opacity="0.7"/>'
            f'<path d="M100,172 Q100,196 100,192" fill="{p["b2"]}" opacity="0.7"/>'
            f'<path d="M100,172 Q120,190 128,186 Q112,178 100,172" fill="{p["b"]}" opacity="0.7"/>',
        ),
        'butterfly': (
            '<ellipse cx="100" cy="130" rx="22" ry="44"/>',
            '<ellipse cx="100" cy="138" rx="14" ry="20"/>',
            # 翼
            f'<ellipse cx="60" cy="112" rx="38" ry="30" fill="{p["b"]}" opacity="0.7" transform="rotate(-10,60,112)"/>'
            f'<ellipse cx="62" cy="148" rx="28" ry="22" fill="{p["b2"]}" opacity="0.6" transform="rotate(-5,62,148)"/>'
            f'<ellipse cx="140" cy="112" rx="38" ry="30" fill="{p["b"]}" opacity="0.7" transform="rotate(10,140,112)"/>'
            f'<ellipse cx="138" cy="148" rx="28" ry="22" fill="{p["b2"]}" opacity="0.6" transform="rotate(5,138,148)"/>',
            # 触覚
            f'<path d="M90,90 Q78,56 74,42" fill="none" stroke="{p["ol"]}" stroke-width="2.5" stroke-linecap="round"/>'
            f'<circle cx="74" cy="40" r="5" fill="{p["b"]}"/>'
            f'<path d="M110,90 Q122,56 126,42" fill="none" stroke="{p["ol"]}" stroke-width="2.5" stroke-linecap="round"/>'
            f'<circle cx="126" cy="40" r="5" fill="{p["b"]}"/>',
            '',
        ),
        'whale': (
            '<ellipse cx="100" cy="126" rx="62" ry="48"/>',
            '<ellipse cx="100" cy="136" rx="38" ry="34" fill="white" opacity="0.7"/>',
            '',
            # 潮吹き
            f'<path d="M96,78 Q90,56 94,44" fill="none" stroke="#87ceeb" stroke-width="3" stroke-linecap="round"/>'
            f'<path d="M104,78 Q110,56 106,44" fill="none" stroke="#87ceeb" stroke-width="3" stroke-linecap="round"/>',
            # ヒレ
            f'<ellipse cx="44" cy="130" rx="22" ry="12" fill="{p["b"]}" transform="rotate(-15,44,130)"/>'
            f'<ellipse cx="156" cy="130" rx="22" ry="12" fill="{p["b"]}" transform="rotate(15,156,130)"/>',
        ),
        'peacock': (
            '<ellipse cx="100" cy="134" rx="42" ry="42"/>',
            '<ellipse cx="100" cy="144" rx="24" ry="22"/>',
            '',
            '',
            '',  # 尾羽は特別にbuild_svgで追加
        ),
        'wolf': (
            '<ellipse cx="100" cy="128" rx="50" ry="48"/>',
            '<ellipse cx="100" cy="140" rx="28" ry="26"/>',
            f'<polygon points="66,78 52,34 84,66" fill="{p["b"]}"/>'
            f'<polygon points="134,78 148,34 116,66" fill="{p["b"]}"/>',
            f'<ellipse cx="100" cy="124" rx="22" ry="14" fill="#d3d3d3" opacity="0.5"/>',
            f'<path d="M146,148 C166,138 170,118 164,106" fill="{p["b"]}" stroke="{p["ol"]}" stroke-width="1"/>',
        ),
        'tiger': (
            '<ellipse cx="100" cy="128" rx="52" ry="48"/>',
            '<ellipse cx="100" cy="140" rx="30" ry="28"/>',
            f'<polygon points="68,78 58,42 84,70" fill="{p["b"]}"/>'
            f'<polygon points="132,78 142,42 116,70" fill="{p["b"]}"/>',
            # 縞模様
            f'<path d="M78,100 Q82,114 78,128" fill="none" stroke="{p["ol"]}" stroke-width="3" opacity="0.35"/>'
            f'<path d="M122,100 Q118,114 122,128" fill="none" stroke="{p["ol"]}" stroke-width="3" opacity="0.35"/>'
            f'<path d="M84,92 Q88,104 84,116" fill="none" stroke="{p["ol"]}" stroke-width="2.5" opacity="0.25"/>',
            f'<path d="M148,146 C164,138 168,120 162,110" fill="none" stroke="{p["b"]}" stroke-width="8" stroke-linecap="round"/>',
        ),
        'eagle': (
            '<ellipse cx="100" cy="126" rx="48" ry="46"/>',
            '<ellipse cx="100" cy="138" rx="26" ry="24"/>',
            '',
            # くちばし
            f'<polygon points="90,118 100,130 110,118" fill="#ff8c00"/>',
            # 翼
            f'<path d="M48,110 C24,86 30,52 42,42 C46,58 52,72 60,82 C48,62 50,38 58,30 C60,48 68,68 78,86" fill="{p["b"]}" opacity="0.75"/>'
            f'<path d="M152,110 C176,86 170,52 158,42 C154,58 148,72 140,82 C152,62 150,38 142,30 C140,48 132,68 122,86" fill="{p["b"]}" opacity="0.75"/>',
        ),
        'elephant': (
            '<ellipse cx="100" cy="128" rx="56" ry="50"/>',
            '<ellipse cx="100" cy="142" rx="32" ry="28"/>',
            # 大きな耳
            f'<ellipse cx="46" cy="106" rx="30" ry="38" fill="{p["b"]}"/>'
            f'<ellipse cx="154" cy="106" rx="30" ry="38" fill="{p["b"]}"/>'
            f'<ellipse cx="46" cy="106" rx="20" ry="26" fill="{p["hi"]}" opacity="0.4"/>'
            f'<ellipse cx="154" cy="106" rx="20" ry="26" fill="{p["hi"]}" opacity="0.4"/>',
            # 鼻
            f'<path d="M100,120 Q100,150 92,164 Q88,172 94,174" fill="none" stroke="{p["b"]}" stroke-width="10" stroke-linecap="round"/>',
            '',
        ),
        'cheetah': (
            '<ellipse cx="100" cy="128" rx="50" ry="46"/>',
            '<ellipse cx="100" cy="140" rx="28" ry="26"/>',
            f'<polygon points="70,78 60,44 86,70" fill="{p["b"]}"/>'
            f'<polygon points="130,78 140,44 114,70" fill="{p["b"]}"/>',
            # スポット模様
            ''.join(f'<circle cx="{72+rnd(id,50+i)%56}" cy="{96+rnd(id,60+i)%48}" r="{3+rnd(id,70+i)%3}" fill="{p["ol"]}" opacity="0.3"/>' for i in range(5)),
            f'<path d="M148,146 C164,138 168,120 162,110" fill="none" stroke="{p["b"]}" stroke-width="6" stroke-linecap="round"/>',
        ),
        'seahorse': (
            '<path d="M100,66 C130,68 142,88 140,110 C138,134 126,154 108,168 C96,176 88,172 90,158 C92,148 100,140 108,134" fill="{p["b"]}" stroke="{p["ol"]}" stroke-width="2"/>',
            '<path d="M106,90 C120,92 128,104 126,118 C124,130 116,140 108,146" fill="{p["b2"]}" opacity="0.45" stroke="none"/>',
            # 冠
            f'<path d="M88,68 Q80,40 90,48" fill="{p["b"]}"/>'
            f'<path d="M96,64 Q92,34 100,44" fill="{p["b"]}"/>',
            # 背びれ
            f'<path d="M130,90 C144,82 148,96 140,102 C150,100 152,114 142,118" fill="{p["b2"]}" opacity="0.6"/>',
            '',
        ),
        'dolphin': (
            '<ellipse cx="100" cy="124" rx="56" ry="38"/>',
            '<ellipse cx="100" cy="130" rx="34" ry="24" fill="white" opacity="0.6"/>',
            # 背びれ
            f'<polygon points="100,86 92,68 108,68" fill="{p["b"]}"/>',
            # くちばし
            f'<ellipse cx="52" cy="118" rx="24" ry="12" fill="{p["b"]}"/>',
            # 尾びれ
            f'<polygon points="154,124 178,108 178,140" fill="{p["b"]}"/>',
        ),
        'flamingo': (
            '<ellipse cx="100" cy="112" rx="36" ry="34"/>',
            '<ellipse cx="100" cy="118" rx="22" ry="20"/>',
            '',
            # くちばし
            f'<path d="M82,106 L68,114 L82,112" fill="#333"/>',
            # 長い足
            f'<line x1="92" y1="146" x2="86" y2="186" stroke="{p["b"]}" stroke-width="4"/>'
            f'<line x1="108" y1="146" x2="114" y2="186" stroke="{p["b"]}" stroke-width="4"/>'
            # 首
            f'<path d="M100,78 C96,60 88,50 92,40" fill="none" stroke="{p["b"]}" stroke-width="8" stroke-linecap="round"/>',
        ),
        'seal': (
            '<ellipse cx="100" cy="128" rx="54" ry="44"/>',
            '<ellipse cx="100" cy="138" rx="32" ry="28"/>',
            '',
            '',
            # ヒレ
            f'<ellipse cx="54" cy="148" rx="20" ry="10" fill="{p["b"]}" transform="rotate(-20,54,148)"/>'
            f'<ellipse cx="146" cy="148" rx="20" ry="10" fill="{p["b"]}" transform="rotate(20,146,148)"/>',
        ),
        'jellyfish': (
            '<ellipse cx="100" cy="100" rx="44" ry="34"/>',
            '<ellipse cx="100" cy="104" rx="26" ry="18"/>',
            '',
            # 触手
            ''.join(f'<path d="M{68+i*12},134 C{64+i*12},154 {72+i*12},170 {68+i*12},186" fill="none" stroke="{p["b"]}" stroke-width="4" stroke-linecap="round" opacity="0.6"/>' for i in range(6)),
            '',
        ),
        'gecko': (
            '<ellipse cx="100" cy="126" rx="44" ry="40"/>',
            '<ellipse cx="100" cy="136" rx="24" ry="22"/>',
            # 大きな目（ヤモリ特有）
            f'<circle cx="76" cy="96" r="16" fill="{p["b"]}"/>'
            f'<circle cx="124" cy="96" r="16" fill="{p["b"]}"/>',
            '',
            f'<path d="M142,152 C162,148 172,138 176,126 C178,118 174,112 168,114" fill="none" stroke="{p["b"]}" stroke-width="6" stroke-linecap="round"/>',
        ),
        'axolotl': (
            '<ellipse cx="100" cy="128" rx="48" ry="44"/>',
            '<ellipse cx="100" cy="140" rx="28" ry="24"/>',
            # エラ（特徴的）
            f'<path d="M58,82 L42,52 L50,80" fill="{p["b2"]}" opacity="0.8"/>'
            f'<path d="M54,86 L34,60 L46,84" fill="{p["b"]}" opacity="0.6"/>'
            f'<path d="M52,90 L28,68 L44,88" fill="{p["b2"]}" opacity="0.5"/>'
            f'<path d="M142,82 L158,52 L150,80" fill="{p["b2"]}" opacity="0.8"/>'
            f'<path d="M146,86 L166,60 L154,84" fill="{p["b"]}" opacity="0.6"/>'
            f'<path d="M148,90 L172,68 L156,88" fill="{p["b2"]}" opacity="0.5"/>',
            '',
            '',
        ),
        'swan': (
            '<ellipse cx="100" cy="134" rx="42" ry="38"/>',
            '<ellipse cx="100" cy="142" rx="24" ry="22"/>',
            '',
            # くちばし
            f'<polygon points="72,86 60,92 72,94" fill="#ff8c00"/>',
            # 長い首
            f'<path d="M88,98 C82,76 72,68 76,58 C78,50 84,48 88,52" fill="none" stroke="{p["b"]}" stroke-width="10" stroke-linecap="round"/>'
            # 翼
            f'<path d="M136,120 C158,110 166,124 154,134" fill="{p["b"]}" opacity="0.6"/>',
        ),
    }

    # 動物タイプが見つからなければデフォルト（丸い動物）
    default = (
        '<ellipse cx="100" cy="128" rx="50" ry="48"/>',
        '<ellipse cx="100" cy="140" rx="28" ry="26"/>',
        f'<circle cx="68" cy="82" r="16" fill="{p["b"]}"/>'
        f'<circle cx="132" cy="82" r="16" fill="{p["b"]}"/>',
        '',
        '',
    )

    parts = bodies.get(animal, default)
    return parts


def build_svg(char_id, animal, palette_name, name):
    p = PALETTES[palette_name]

    # レアリティ
    if char_id <= 30:
        rarity = 'N'
    elif char_id <= 60:
        rarity = 'R'
    else:
        rarity = 'SR'

    body_main, belly, accessory, extra, tail = get_body(animal, char_id, p)

    # 目（monsterSVG方式：バリエーション選択）
    EL, ER, EY = 80, 120, 108
    eyes_variants = [
        # 丸い目（白+黒+ハイライト）
        f'<circle cx="{EL}" cy="{EY}" r="11" fill="white"/>'
        f'<circle cx="{EL+2}" cy="{EY+1}" r="7" fill="#111"/>'
        f'<circle cx="{EL+4}" cy="{EY-2}" r="3" fill="white"/>'
        f'<circle cx="{ER}" cy="{EY}" r="11" fill="white"/>'
        f'<circle cx="{ER+2}" cy="{EY+1}" r="7" fill="#111"/>'
        f'<circle cx="{ER+4}" cy="{EY-2}" r="3" fill="white"/>',
        # カラー瞳
        f'<circle cx="{EL}" cy="{EY}" r="11" fill="white"/>'
        f'<circle cx="{EL}" cy="{EY+1}" r="7" fill="{p["eye"]}"/>'
        f'<circle cx="{EL}" cy="{EY+1}" r="3.5" fill="#111"/>'
        f'<circle cx="{EL+3}" cy="{EY-2}" r="2.5" fill="white"/>'
        f'<circle cx="{ER}" cy="{EY}" r="11" fill="white"/>'
        f'<circle cx="{ER}" cy="{EY+1}" r="7" fill="{p["eye"]}"/>'
        f'<circle cx="{ER}" cy="{EY+1}" r="3.5" fill="#111"/>'
        f'<circle cx="{ER+3}" cy="{EY-2}" r="2.5" fill="white"/>',
        # 大きなキラキラ目
        f'<circle cx="{EL}" cy="{EY}" r="13" fill="white"/>'
        f'<circle cx="{EL}" cy="{EY}" r="9" fill="#111"/>'
        f'<circle cx="{EL+3}" cy="{EY-3}" r="4" fill="white"/>'
        f'<circle cx="{EL-2}" cy="{EY+3}" r="2" fill="white" opacity="0.6"/>'
        f'<circle cx="{ER}" cy="{EY}" r="13" fill="white"/>'
        f'<circle cx="{ER}" cy="{EY}" r="9" fill="#111"/>'
        f'<circle cx="{ER+3}" cy="{EY-3}" r="4" fill="white"/>'
        f'<circle cx="{ER-2}" cy="{EY+3}" r="2" fill="white" opacity="0.6"/>',
        # にっこり閉じ目
        f'<path d="M{EL-8},{EY} Q{EL},{EY-8} {EL+8},{EY}" fill="none" stroke="#333" stroke-width="3" stroke-linecap="round"/>'
        f'<path d="M{ER-8},{EY} Q{ER},{EY-8} {ER+8},{EY}" fill="none" stroke="#333" stroke-width="3" stroke-linecap="round"/>',
    ]
    eyes = pick(eyes_variants, char_id, 7)

    # 口
    mouth_variants = [
        f'<path d="M88,130 Q100,142 112,130" fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round"/>',
        f'<path d="M86,128 Q100,146 114,128" fill="{p["cheek"]}" opacity="0.8"/><path d="M88,128 L112,128" fill="none" stroke="white" stroke-width="2"/>',
        f'<ellipse cx="100" cy="133" rx="8" ry="6" fill="#cc1133" stroke="#333" stroke-width="1.5"/>',
        f'<path d="M92,130 Q100,138 108,130" fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round"/>',
        f'<path d="M86,128 Q100,146 114,128" fill="#cc2244"/>'
        f'<polygon points="92,128 96,140 100,128" fill="white"/>'
        f'<polygon points="100,128 104,140 108,128" fill="white"/>',
    ]
    mouth = pick(mouth_variants, char_id, 8)

    # ほっぺ
    cheeks = f'<circle cx="{EL-14}" cy="{EY+14}" r="8" fill="{p["cheek"]}" opacity="0.4"/>' \
             f'<circle cx="{ER+14}" cy="{EY+14}" r="8" fill="{p["cheek"]}" opacity="0.4"/>'

    # 影
    shadow = '<ellipse cx="100" cy="182" rx="38" ry="6" fill="black" opacity="0.12"/>'

    # レアリティ装飾
    marks = ''
    glow_def = ''
    glow_rect = ''

    if rarity == 'R':
        for i in range(4):
            x = 60 + rnd(char_id, 20+i) % 80
            y = 40 + rnd(char_id, 30+i) % 60
            rad = 3 + rnd(char_id, 40+i) % 3
            marks += f'<circle cx="{x}" cy="{y}" r="{rad}" fill="{p["hi"]}" opacity="0.5"/>'
        marks += f'<polygon points="150,38 152,32 154,38 160,36 156,40 158,46 152,43 146,46 148,40 142,36" fill="#ffd700" opacity="0.6"/>'
    elif rarity == 'SR':
        glow_def = f'<radialGradient id="srg{char_id}" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="{p["hi"]}" stop-opacity="0.2"/><stop offset="100%" stop-color="{p["bg"]}" stop-opacity="0"/></radialGradient>'
        glow_rect = f'<rect width="200" height="200" rx="16" fill="url(#srg{char_id})"/>'
        marks += f'<polygon points="146,34 148,26 150,34 158,30 152,36 154,44 148,40 142,44 144,36 138,30" fill="#ffd700" opacity="0.8"/>'
        marks += f'<polygon points="48,44 50,38 52,44 56,42 54,46 56,50 50,48 46,50 48,46 44,42" fill="#ffd700" opacity="0.6"/>'
        marks += f'<polygon points="158,148 160,142 162,148 168,146 164,150 166,156 160,152 154,156 156,150 150,146" fill="#ffd700" opacity="0.5"/>'

    # 孔雀の特別処理（尾羽）
    peacock_tail = ''
    if animal == 'peacock':
        colors = ['#00ced1', '#228b22', '#ffd700', '#4169e1', '#9370db']
        for i in range(7):
            angle = -60 + i * 20
            cx = 100 + int(80 * math.cos(math.radians(angle - 90)))
            cy = 80 + int(80 * math.sin(math.radians(angle - 90)))
            c = colors[i % len(colors)]
            peacock_tail += f'<ellipse cx="{cx}" cy="{cy}" rx="14" ry="24" fill="{c}" opacity="0.55" transform="rotate({angle},{cx},{cy})"/>'
            peacock_tail += f'<circle cx="{cx}" cy="{cy-8}" r="5" fill="#ffd700" opacity="0.7"/>'

    # 足
    feet = f'<ellipse cx="82" cy="174" rx="14" ry="6" fill="{p["b"]}"/>' \
           f'<ellipse cx="118" cy="174" rx="14" ry="6" fill="{p["b"]}"/>'
    # 一部の動物は足を変える
    if animal in ('dolphin', 'whale', 'fish', 'jellyfish', 'seahorse', 'flamingo', 'butterfly', 'octopus', 'swan'):
        feet = ''

    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="512" height="512">
  <defs>{glow_def}</defs>
  <rect width="200" height="200" rx="16" fill="{p['bg']}"/>
  {glow_rect}
  {shadow}
  {peacock_tail}
  {accessory}
  <g fill="{p['b']}" stroke="{p['ol']}" stroke-width="2">
    {body_main}
  </g>
  <g fill="{p['b2']}" stroke="none" opacity="0.45">
    {belly}
  </g>
  {extra}
  {eyes}
  {cheeks}
  {mouth}
  {tail}
  {feet}
  {marks}
</svg>'''

    return svg


def svg_to_png(svg_content, output_path):
    with tempfile.NamedTemporaryFile(suffix='.svg', mode='w', delete=False, encoding='utf-8') as f:
        f.write(svg_content)
        svg_path = f.name
    try:
        result = subprocess.run(
            ['rsvg-convert', '-w', '512', '-h', '512', svg_path, '-o', output_path],
            capture_output=True, text=True
        )
        return result.returncode == 0
    except FileNotFoundError:
        return False
    finally:
        os.unlink(svg_path)


def main():
    print("=== ひっさんマスター キャラクター生成 v2 ===")
    print(f"出力先: {OUT_DIR}")

    success = 0
    for char_id, animal, palette, name in CHARACTERS:
        svg = build_svg(char_id, animal, palette, name)
        png_path = os.path.join(OUT_DIR, f"char_{char_id}.png")
        if svg_to_png(svg, png_path):
            success += 1
        print(f"  [{char_id:02d}/90] {name} ({animal}/{palette}) ✓")

    print(f"\n完了！ {success}/90 PNG生成成功")


if __name__ == "__main__":
    main()
