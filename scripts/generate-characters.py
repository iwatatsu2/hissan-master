#!/usr/bin/env python3
"""
ひっさんマスター キャラクターSVG生成スクリプト
SVGで動物キャラを生成し、PNGに変換して保存
"""

import os
import math
import subprocess
import tempfile

OUT_DIR = os.path.expanduser("~/Desktop/Claude-Projects/hissan-master/public/characters")
os.makedirs(OUT_DIR, exist_ok=True)

# ============================
# キャラクター定義
# ============================

CHARACTERS = [
    # ★ ノーマル (1-30) - 身近な動物
    (1, "cat", "#FFB347", "#FF8C00", "三毛猫"),
    (2, "dog", "#D4A574", "#8B6914", "柴犬"),
    (3, "rabbit", "#FFB6C1", "#FF69B4", "白うさぎ"),
    (4, "frog", "#90EE90", "#228B22", "カエル"),
    (5, "chick", "#FFD700", "#FFA500", "ひよこ"),
    (6, "pig", "#FFB6C1", "#FF69B4", "子豚"),
    (7, "mouse", "#C0C0C0", "#808080", "ネズミ"),
    (8, "hamster", "#F4A460", "#D2691E", "ハムスター"),
    (9, "bear", "#CD853F", "#8B4513", "子熊"),
    (10, "penguin", "#87CEEB", "#4169E1", "ペンギン"),
    (11, "chick2", "#FFEC8B", "#FFD700", "ヒヨコ"),
    (12, "cow", "#F5F5DC", "#8B8682", "牛"),
    (13, "sheep", "#FFFAF0", "#D3D3D3", "羊"),
    (14, "chicken", "#FF6347", "#CC3300", "ニワトリ"),
    (15, "hedgehog", "#DEB887", "#8B7355", "ハリネズミ"),
    (16, "squirrel", "#D2691E", "#8B4513", "リス"),
    (17, "crab", "#FF4500", "#CC0000", "カニ"),
    (18, "turtle", "#3CB371", "#006400", "亀"),
    (19, "bee", "#FFD700", "#FF8C00", "ミツバチ"),
    (20, "ladybug", "#FF0000", "#CC0000", "テントウムシ"),
    (21, "duck", "#FFD700", "#FFA500", "アヒル"),
    (22, "mole", "#8B7355", "#5C4033", "モグラ"),
    (23, "raccoon", "#A0522D", "#6B3A2E", "タヌキ"),
    (24, "parrot", "#32CD32", "#008000", "インコ"),
    (25, "fish", "#FF6347", "#FF4500", "金魚"),
    (26, "snail", "#9370DB", "#6A5ACD", "カタツムリ"),
    (27, "koala", "#A9A9A9", "#696969", "コアラ"),
    (28, "rabbit2", "#FFA07A", "#FF7F50", "うさぎ"),
    (29, "panda", "#F5F5F5", "#333333", "パンダ"),
    (30, "deer", "#DEB887", "#CD853F", "小鹿"),

    # ★★ レア (31-60) - アクセサリー付き
    (31, "fox", "#FF8C00", "#FF4500", "キツネ"),
    (32, "panda_prince", "#6495ED", "#333333", "パンダ王子"),
    (33, "koala_princess", "#DDA0DD", "#9370DB", "コアラ姫"),
    (34, "lion", "#FFD700", "#FF8C00", "ライオン"),
    (35, "dolphin", "#00BFFF", "#1E90FF", "イルカ"),
    (36, "butterfly", "#DA70D6", "#9932CC", "ちょうちょ"),
    (37, "octopus", "#FF6B6B", "#FF4444", "タコ船長"),
    (38, "owl", "#DEB887", "#8B7355", "フクロウ博士"),
    (39, "flamingo", "#FF69B4", "#FF1493", "フラミンゴ"),
    (40, "tropical_fish", "#FF7F50", "#FF4500", "熱帯魚"),
    (41, "otter", "#D2B48C", "#8B7355", "ラッコ"),
    (42, "parrot_pirate", "#FF4500", "#228B22", "オウム海賊"),
    (43, "chameleon", "#32CD32", "#9370DB", "カメレオン"),
    (44, "pelican", "#87CEEB", "#F5F5DC", "ペリカン"),
    (45, "seal", "#B0E0E6", "#4682B4", "アザラシ"),
    (46, "red_panda", "#FF7F50", "#CD853F", "レッサーパンダ"),
    (47, "sea_turtle", "#20B2AA", "#008B8B", "ウミガメ"),
    (48, "otter2", "#FFB6C1", "#D2B48C", "カワウソ"),
    (49, "manta", "#4169E1", "#191970", "マンタ"),
    (50, "hummingbird", "#7CFC00", "#FFD700", "ハチドリ"),
    (51, "jellyfish", "#E6E6FA", "#9370DB", "クラゲ"),
    (52, "gecko", "#2E8B57", "#006400", "ヤモリ忍者"),
    (53, "axolotl", "#FFB6C1", "#FF69B4", "ウーパールーパー"),
    (54, "swan", "#FFFAFA", "#B0C4DE", "白鳥"),
    (55, "ermine", "#FFFAF0", "#ADD8E6", "オコジョ"),
    (56, "capybara", "#D2B48C", "#A0522D", "カピバラ"),
    (57, "meerkat", "#F5DEB3", "#DEB887", "ミーアキャット"),
    (58, "snow_bird", "#FFF0F5", "#FFB6C1", "シマエナガ"),
    (59, "hermit_crab", "#9370DB", "#DEB887", "ヤドカリ"),
    (60, "firefly", "#FFFF00", "#32CD32", "ホタル"),

    # ★★★ スーパーレア (61-90) - ファンタジー装飾
    (61, "unicorn", "#E6E6FA", "#DA70D6", "ユニコーン"),
    (62, "dragon", "#FF4500", "#8B0000", "ドラゴン"),
    (63, "peacock", "#00CED1", "#006400", "クジャク"),
    (64, "whale_king", "#4169E1", "#191970", "クジラ王"),
    (65, "eagle", "#FFD700", "#CD853F", "タカの勇者"),
    (66, "wolf", "#708090", "#2F4F4F", "オオカミ賢者"),
    (67, "white_tiger", "#F5F5F5", "#FFD700", "白虎"),
    (68, "phoenix", "#FF4500", "#FFD700", "フェニックス"),
    (69, "nine_tail_fox", "#FF8C00", "#FF0000", "九尾のキツネ"),
    (70, "ice_penguin", "#ADD8E6", "#00BFFF", "氷のペンギン"),
    (71, "star_rabbit", "#DDA0DD", "#FFD700", "星うさぎ"),
    (72, "forest_deer", "#228B22", "#006400", "森の鹿"),
    (73, "rainbow_chameleon", "#FF69B4", "#00FF00", "虹カメレオン"),
    (74, "sakura_cat", "#FFB7C5", "#FF69B4", "桜ねこ姫"),
    (75, "thunder_cheetah", "#FFD700", "#FF8C00", "雷のチーター"),
    (76, "seahorse_king", "#4169E1", "#9370DB", "タツノオトシゴ"),
    (77, "butterfly_queen", "#FF69B4", "#DA70D6", "蝶々女王"),
    (78, "sun_lion", "#FFD700", "#FF4500", "太陽ライオン"),
    (79, "moon_rabbit", "#483D8B", "#9370DB", "月うさぎ"),
    (80, "wind_falcon", "#3CB371", "#008080", "風のハヤブサ"),
    (81, "earth_elephant", "#A0522D", "#DEB887", "ゾウ騎士"),
    (82, "snow_fox", "#E0FFFF", "#ADD8E6", "雪キツネ"),
    (83, "gem_turtle", "#9370DB", "#228B22", "宝石カメ"),
    (84, "nightingale", "#87CEEB", "#FFB6C1", "ナイチンゲール"),
    (85, "time_butterfly", "#DDA0DD", "#FFD700", "時の蝶々"),
    (86, "snow_leopard", "#483D8B", "#B0C4DE", "ユキヒョウ"),
    (87, "pegasus", "#FFB6C1", "#FFD700", "天空ペガサス"),
    (88, "mermaid_cat", "#DDA0DD", "#4169E1", "マーメイドねこ"),
    (89, "twin_dragon", "#FF4500", "#1E90FF", "双子竜"),
    (90, "phoenix_legend", "#FFD700", "#FF0000", "伝説フェニックス"),
]

def generate_animal_svg(char_id, animal_type, color1, color2, name):
    """SVGでかわいい動物キャラを生成"""

    # レアリティ判定
    if char_id <= 30:
        rarity = "N"
        bg_color = "#f0f0f0"
        ring_color = "#cccccc"
    elif char_id <= 60:
        rarity = "R"
        bg_color = "#e8f0fe"
        ring_color = "#6495ED"
    else:
        rarity = "SR"
        bg_color = "#f3e8ff"
        ring_color = "#9370DB"

    # 共通のかわいい顔パーツ
    eye_style = """
        <ellipse cx="180" cy="220" rx="22" ry="26" fill="#333"/>
        <ellipse cx="180" cy="216" rx="14" ry="16" fill="#555"/>
        <ellipse cx="174" cy="210" rx="7" ry="8" fill="white"/>
        <ellipse cx="186" cy="218" rx="3" ry="4" fill="white" opacity="0.6"/>
        <ellipse cx="332" cy="220" rx="22" ry="26" fill="#333"/>
        <ellipse cx="332" cy="216" rx="14" ry="16" fill="#555"/>
        <ellipse cx="326" cy="210" rx="7" ry="8" fill="white"/>
        <ellipse cx="338" cy="218" rx="3" ry="4" fill="white" opacity="0.6"/>
    """

    # ほっぺ
    cheek = f"""
        <ellipse cx="150" cy="260" rx="25" ry="16" fill="#FF9999" opacity="0.5"/>
        <ellipse cx="362" cy="260" rx="25" ry="16" fill="#FF9999" opacity="0.5"/>
    """

    # 口（にっこり）
    mouth = """
        <path d="M235 270 Q256 295 277 270" fill="none" stroke="#333" stroke-width="3" stroke-linecap="round"/>
    """

    # 鼻
    nose = """
        <ellipse cx="256" cy="255" rx="8" ry="6" fill="#333"/>
    """

    # 動物別のボディパーツ
    body_parts = generate_body(animal_type, color1, color2, char_id)

    # レアリティ装飾
    deco = ""
    if rarity == "R":
        # 小さな星装飾
        deco = """
            <text x="80" y="80" font-size="30" opacity="0.6">⭐</text>
            <text x="400" y="100" font-size="24" opacity="0.5">✨</text>
        """
    elif rarity == "SR":
        # 豪華な装飾
        deco = f"""
            <text x="60" y="70" font-size="36" opacity="0.7">✨</text>
            <text x="410" y="90" font-size="30" opacity="0.6">⭐</text>
            <text x="80" y="440" font-size="28" opacity="0.5">💫</text>
            <text x="400" y="420" font-size="32" opacity="0.6">✨</text>
        """

    svg = f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <radialGradient id="bg_{char_id}" cx="50%" cy="45%" r="50%">
      <stop offset="0%" stop-color="{color1}" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="{bg_color}"/>
    </radialGradient>
    <radialGradient id="body_{char_id}" cx="40%" cy="30%">
      <stop offset="0%" stop-color="{color1}"/>
      <stop offset="100%" stop-color="{color2}"/>
    </radialGradient>
    <filter id="shadow_{char_id}">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.15"/>
    </filter>
  </defs>

  <!-- 背景円 -->
  <circle cx="256" cy="256" r="240" fill="url(#bg_{char_id})"/>
  <circle cx="256" cy="256" r="240" fill="none" stroke="{ring_color}" stroke-width="4" opacity="0.4"/>

  <!-- キャラクター本体 -->
  <g filter="url(#shadow_{char_id})">
    {body_parts}
    {eye_style}
    {cheek}
    {nose}
    {mouth}
  </g>

  {deco}
</svg>"""

    return svg

def generate_body(animal_type, c1, c2, cid):
    """動物タイプ別のボディSVG"""

    gid = f"body_{cid}"

    # 基本的な丸い体
    base_body = f"""
        <ellipse cx="256" cy="310" rx="130" ry="120" fill="url(#{gid})"/>
    """

    # 頭
    base_head = f"""
        <circle cx="256" cy="200" r="110" fill="url(#{gid})"/>
    """

    # お腹（白）
    belly = """
        <ellipse cx="256" cy="330" rx="85" ry="80" fill="#FFFAF0" opacity="0.85"/>
    """

    # 手
    arms = f"""
        <ellipse cx="145" cy="330" rx="30" ry="45" fill="url(#{gid})" transform="rotate(-15,145,330)"/>
        <ellipse cx="367" cy="330" rx="30" ry="45" fill="url(#{gid})" transform="rotate(15,367,330)"/>
    """

    # 足
    feet = f"""
        <ellipse cx="200" cy="420" rx="40" ry="22" fill="url(#{gid})"/>
        <ellipse cx="312" cy="420" rx="40" ry="22" fill="url(#{gid})"/>
    """

    # 動物別の耳・しっぽ等
    if animal_type in ("cat", "sakura_cat", "mermaid_cat"):
        ears = f"""
            <polygon points="175,130 150,50 210,100" fill="url(#{gid})"/>
            <polygon points="337,130 362,50 302,100" fill="url(#{gid})"/>
            <polygon points="183,125 162,70 212,105" fill="#FFB6C1" opacity="0.7"/>
            <polygon points="329,125 350,70 300,105" fill="#FFB6C1" opacity="0.7"/>
        """
        tail = f'<path d="M380 370 Q430 340 440 280 Q445 250 420 240" fill="none" stroke="url(#{gid})" stroke-width="14" stroke-linecap="round"/>'
        whiskers = """
            <line x1="120" y1="250" x2="170" y2="245" stroke="#999" stroke-width="2"/>
            <line x1="115" y1="265" x2="168" y2="260" stroke="#999" stroke-width="2"/>
            <line x1="342" y1="245" x2="392" y2="250" stroke="#999" stroke-width="2"/>
            <line x1="344" y1="260" x2="397" y2="265" stroke="#999" stroke-width="2"/>
        """
        extra = ""
        if animal_type == "sakura_cat":
            extra = '<text x="350" y="130" font-size="40">🌸</text><text x="100" y="150" font-size="30">🌸</text>'
        elif animal_type == "mermaid_cat":
            extra = f'<path d="M200 420 Q256 470 312 420 Q256 500 200 420" fill="#9370DB" opacity="0.7"/>'
            feet = ""
        return base_body + base_head + belly + arms + feet + ears + tail + whiskers + extra

    elif animal_type in ("dog",):
        ears = f"""
            <ellipse cx="165" cy="140" rx="45" ry="65" fill="url(#{gid})" transform="rotate(20,165,140)"/>
            <ellipse cx="347" cy="140" rx="45" ry="65" fill="url(#{gid})" transform="rotate(-20,347,140)"/>
        """
        tail = f'<path d="M380 350 Q420 310 410 270" fill="none" stroke="url(#{gid})" stroke-width="16" stroke-linecap="round"/>'
        return base_body + base_head + belly + arms + feet + ears + tail

    elif animal_type in ("rabbit", "rabbit2", "star_rabbit", "moon_rabbit"):
        ear_h = 100
        ears = f"""
            <ellipse cx="200" cy="100" rx="28" ry="{ear_h}" fill="url(#{gid})"/>
            <ellipse cx="312" cy="100" rx="28" ry="{ear_h}" fill="url(#{gid})"/>
            <ellipse cx="200" cy="100" rx="16" ry="{ear_h-15}" fill="#FFB6C1" opacity="0.6"/>
            <ellipse cx="312" cy="100" rx="16" ry="{ear_h-15}" fill="#FFB6C1" opacity="0.6"/>
        """
        tail_r = f'<circle cx="380" cy="380" r="20" fill="white"/>'
        extra = ""
        if animal_type == "star_rabbit":
            extra = '<text x="170" y="60" font-size="36">⭐</text><text x="290" y="50" font-size="28">✨</text>'
        elif animal_type == "moon_rabbit":
            extra = '<text x="180" y="55" font-size="40">🌙</text>'
        return base_body + base_head + belly + arms + feet + ears + tail_r + extra

    elif animal_type in ("frog",):
        eyes_bump = f"""
            <circle cx="190" cy="150" r="40" fill="url(#{gid})"/>
            <circle cx="322" cy="150" r="40" fill="url(#{gid})"/>
        """
        return base_body + base_head + belly + arms + feet + eyes_bump

    elif animal_type in ("chick", "chick2"):
        beak = '<polygon points="256,250 240,270 272,270" fill="#FF8C00"/>'
        wing_l = f'<ellipse cx="140" cy="310" rx="35" ry="55" fill="url(#{gid})" transform="rotate(-10,140,310)"/>'
        wing_r = f'<ellipse cx="372" cy="310" rx="35" ry="55" fill="url(#{gid})" transform="rotate(10,372,310)"/>'
        # 鼻を消すためにビークを使う
        return base_body + base_head + belly + wing_l + wing_r + feet + beak

    elif animal_type in ("pig",):
        snout = f"""
            <ellipse cx="256" cy="260" rx="35" ry="25" fill="#FFB6C1"/>
            <circle cx="245" cy="258" r="5" fill="#333"/>
            <circle cx="267" cy="258" r="5" fill="#333"/>
        """
        ears = f"""
            <ellipse cx="185" cy="130" rx="35" ry="30" fill="url(#{gid})" transform="rotate(-20,185,130)"/>
            <ellipse cx="327" cy="130" rx="35" ry="30" fill="url(#{gid})" transform="rotate(20,327,130)"/>
        """
        tail = '<path d="M380 370 Q400 360 395 340 Q390 320 405 315" fill="none" stroke="#FFB6C1" stroke-width="6" stroke-linecap="round"/>'
        return base_body + base_head + belly + arms + feet + ears + snout + tail

    elif animal_type in ("mouse",):
        ears = f"""
            <circle cx="175" cy="130" r="50" fill="url(#{gid})"/>
            <circle cx="337" cy="130" r="50" fill="url(#{gid})"/>
            <circle cx="175" cy="130" r="35" fill="#FFB6C1" opacity="0.5"/>
            <circle cx="337" cy="130" r="35" fill="#FFB6C1" opacity="0.5"/>
        """
        tail = f'<path d="M380 380 Q430 370 450 330 Q460 300 440 280" fill="none" stroke="{c1}" stroke-width="6" stroke-linecap="round"/>'
        return base_body + base_head + belly + arms + feet + ears + tail

    elif animal_type in ("hamster",):
        ears = f"""
            <circle cx="175" cy="135" r="35" fill="url(#{gid})"/>
            <circle cx="337" cy="135" r="35" fill="url(#{gid})"/>
            <circle cx="175" cy="135" r="22" fill="#FFB6C1" opacity="0.5"/>
            <circle cx="337" cy="135" r="22" fill="#FFB6C1" opacity="0.5"/>
        """
        # でかいほっぺ
        big_cheeks = f"""
            <ellipse cx="155" cy="240" rx="40" ry="30" fill="url(#{gid})"/>
            <ellipse cx="357" cy="240" rx="40" ry="30" fill="url(#{gid})"/>
        """
        return base_body + base_head + belly + arms + feet + ears + big_cheeks

    elif animal_type in ("bear", "earth_elephant"):
        ears = f"""
            <circle cx="170" cy="130" r="35" fill="url(#{gid})"/>
            <circle cx="342" cy="130" r="35" fill="url(#{gid})"/>
            <circle cx="170" cy="130" r="20" fill="{c2}" opacity="0.4"/>
            <circle cx="342" cy="130" r="20" fill="{c2}" opacity="0.4"/>
        """
        extra = ""
        if animal_type == "earth_elephant":
            # 象の鼻
            extra = f'<path d="M256 255 Q256 310 240 340 Q230 360 245 365" fill="url(#{gid})" stroke="{c2}" stroke-width="3"/>'
            ears = f"""
                <ellipse cx="140" cy="190" rx="65" ry="80" fill="url(#{gid})"/>
                <ellipse cx="372" cy="190" rx="65" ry="80" fill="url(#{gid})"/>
                <ellipse cx="140" cy="190" rx="45" ry="55" fill="{c1}" opacity="0.5"/>
                <ellipse cx="372" cy="190" rx="45" ry="55" fill="{c1}" opacity="0.5"/>
            """
        return base_body + base_head + belly + arms + feet + ears + extra

    elif animal_type in ("penguin", "ice_penguin"):
        # 白い胸
        chest = '<ellipse cx="256" cy="300" rx="80" ry="95" fill="white"/>'
        beak = '<polygon points="256,248 242,268 270,268" fill="#FF8C00"/>'
        extra = ""
        if animal_type == "ice_penguin":
            extra = '<text x="220" y="120" font-size="40">👑</text>'
            extra += f'<circle cx="256" cy="256" r="230" fill="none" stroke="#00BFFF" stroke-width="3" stroke-dasharray="15,10" opacity="0.4"/>'
        return base_body + base_head + chest + arms + feet + beak + extra

    elif animal_type in ("fox", "nine_tail_fox", "snow_fox"):
        ears = f"""
            <polygon points="180,140 155,50 220,110" fill="url(#{gid})"/>
            <polygon points="332,140 357,50 292,110" fill="url(#{gid})"/>
            <polygon points="185,135 165,65 215,112" fill="white" opacity="0.6"/>
            <polygon points="327,135 347,65 297,112" fill="white" opacity="0.6"/>
        """
        tail = f'<path d="M370 360 Q430 320 450 260 Q455 230 430 220" fill="url(#{gid})" stroke="{c2}" stroke-width="2"/>'
        extra = ""
        if animal_type == "nine_tail_fox":
            # 複数の尻尾
            tails = ""
            for i in range(5):
                angle = -30 + i * 15
                tails += f'<path d="M370 360 Q{410+i*8} {300-i*10} {440+i*5} {240-i*15}" fill="none" stroke="{c1}" stroke-width="10" stroke-linecap="round" opacity="0.7" transform="rotate({angle},370,360)"/>'
            extra = tails + '<text x="200" y="100" font-size="36">🔥</text>'
        elif animal_type == "snow_fox":
            extra = '<text x="350" y="130" font-size="30">❄️</text><text x="120" y="120" font-size="24">❄️</text>'
        muzzle = f'<ellipse cx="256" cy="260" rx="40" ry="30" fill="white" opacity="0.8"/>'
        return base_body + base_head + belly + arms + feet + ears + tail + muzzle + extra

    elif animal_type in ("lion", "sun_lion"):
        # たてがみ
        mane = f'<circle cx="256" cy="200" r="130" fill="{c1}" opacity="0.6"/>'
        extra = ""
        if animal_type == "sun_lion":
            # 炎のたてがみ（放射状の線）
            rays = ""
            for i in range(12):
                angle = i * 30
                x1 = 256 + 120 * math.cos(math.radians(angle))
                y1 = 200 + 120 * math.sin(math.radians(angle))
                x2 = 256 + 150 * math.cos(math.radians(angle))
                y2 = 200 + 150 * math.sin(math.radians(angle))
                rays += f'<line x1="{x1:.0f}" y1="{y1:.0f}" x2="{x2:.0f}" y2="{y2:.0f}" stroke="#FFD700" stroke-width="8" stroke-linecap="round" opacity="0.6"/>'
            extra = rays
        ears = f"""
            <circle cx="175" cy="130" r="30" fill="url(#{gid})"/>
            <circle cx="337" cy="130" r="30" fill="url(#{gid})"/>
        """
        return mane + extra + base_body + base_head + belly + arms + feet + ears

    elif animal_type in ("dolphin",):
        body = f"""
            <ellipse cx="256" cy="280" rx="120" ry="80" fill="url(#{gid})"/>
            <ellipse cx="256" cy="290" rx="80" ry="55" fill="white" opacity="0.7"/>
        """
        fin = f'<polygon points="256,210 230,160 280,160" fill="url(#{gid})"/>'
        tail_fin = f'<polygon points="380,280 430,250 430,310" fill="url(#{gid})"/>'
        beak_d = f'<ellipse cx="170" cy="260" rx="55" ry="25" fill="url(#{gid})"/>'
        head = f'<circle cx="220" cy="240" r="70" fill="url(#{gid})"/>'
        eye = """
            <ellipse cx="200" cy="235" rx="12" ry="14" fill="#333"/>
            <ellipse cx="196" cy="230" rx="5" ry="6" fill="white"/>
        """
        cheek_d = '<ellipse cx="185" cy="255" rx="15" ry="10" fill="#FF9999" opacity="0.4"/>'
        mouth_d = '<path d="M165 260 Q175 270 190 262" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round"/>'
        return body + head + beak_d + fin + tail_fin + eye + cheek_d + mouth_d

    elif animal_type in ("owl", "nightingale"):
        # フクロウ/鳥
        wing_l = f'<ellipse cx="150" cy="300" rx="50" ry="80" fill="{c2}" opacity="0.7"/>'
        wing_r = f'<ellipse cx="362" cy="300" rx="50" ry="80" fill="{c2}" opacity="0.7"/>'
        # 大きな目
        big_eyes = f"""
            <circle cx="210" cy="210" r="35" fill="white"/>
            <circle cx="302" cy="210" r="35" fill="white"/>
            <circle cx="210" cy="215" r="18" fill="#333"/>
            <circle cx="302" cy="215" r="18" fill="#333"/>
            <circle cx="205" cy="208" rx="6" ry="7" fill="white"/>
            <circle cx="297" cy="208" rx="6" ry="7" fill="white"/>
        """
        beak_o = '<polygon points="256,245 245,265 267,265" fill="#FF8C00"/>'
        tuft = ""
        if animal_type == "owl":
            tuft = f"""
                <polygon points="185,130 170,70 210,110" fill="url(#{gid})"/>
                <polygon points="327,130 342,70 302,110" fill="url(#{gid})"/>
            """
            beak_o += '<text x="218" y="115" font-size="30">🎓</text>'
        else:
            beak_o += '<text x="340" y="150" font-size="28">🎵</text><text x="370" y="120" font-size="20">🎵</text>'
        return base_body + base_head + belly + wing_l + wing_r + feet + big_eyes + beak_o + tuft

    elif animal_type in ("dragon", "twin_dragon"):
        horns = f"""
            <polygon points="195,130 170,50 220,110" fill="{c2}"/>
            <polygon points="317,130 342,50 292,110" fill="{c2}"/>
        """
        wings = f"""
            <path d="M130 250 Q80 180 100 120 Q110 150 130 170 Q120 140 135 100 Q145 140 160 180" fill="{c1}" opacity="0.6"/>
            <path d="M382 250 Q432 180 412 120 Q402 150 382 170 Q392 140 377 100 Q367 140 352 180" fill="{c1}" opacity="0.6"/>
        """
        tail = f'<path d="M375 380 Q420 370 440 340 Q460 310 450 290" fill="none" stroke="url(#{gid})" stroke-width="14" stroke-linecap="round"/>'
        spikes = f'<polygon points="440,290 455,275 445,300" fill="{c1}"/>'
        extra = ""
        if animal_type == "twin_dragon":
            extra = '<text x="100" y="100" font-size="36">🔥</text><text x="370" y="100" font-size="36">❄️</text>'
        return base_body + base_head + belly + arms + feet + horns + wings + tail + spikes + extra

    elif animal_type in ("unicorn", "pegasus"):
        horn = '<polygon points="256,100 248,30 264,30" fill="#FFD700"/>'
        ears = f"""
            <polygon points="195,130 180,70 215,110" fill="url(#{gid})"/>
            <polygon points="317,130 332,70 297,110" fill="url(#{gid})"/>
        """
        # レインボーたてがみ
        mane_colors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#9B59B6"]
        mane = ""
        for i, mc in enumerate(mane_colors):
            mane += f'<path d="M{280+i*8} {140+i*10} Q{300+i*10} {160+i*12} {280+i*6} {190+i*14}" fill="none" stroke="{mc}" stroke-width="8" stroke-linecap="round"/>'
        extra = ""
        if animal_type == "pegasus":
            extra = f"""
                <path d="M130 240 Q70 180 90 120 Q100 160 120 180 Q110 140 130 110" fill="white" opacity="0.7"/>
                <path d="M382 240 Q442 180 422 120 Q412 160 392 180 Q402 140 382 110" fill="white" opacity="0.7"/>
            """
            extra += '<text x="200" y="80" font-size="24">🌈</text>'
        tail_u = ""
        for i, mc in enumerate(mane_colors):
            tail_u += f'<path d="M{375+i*3} {370+i*5} Q{410+i*5} {350+i*3} {420+i*3} {320+i*5}" fill="none" stroke="{mc}" stroke-width="6" stroke-linecap="round"/>'
        return base_body + base_head + belly + arms + feet + ears + horn + mane + tail_u + extra

    elif animal_type in ("phoenix", "phoenix_legend"):
        wings = f"""
            <path d="M130 260 Q60 180 80 80 Q100 140 130 170 Q110 110 130 60 Q150 120 170 190" fill="{c1}" opacity="0.8"/>
            <path d="M382 260 Q452 180 432 80 Q412 140 382 170 Q402 110 382 60 Q362 120 342 190" fill="{c1}" opacity="0.8"/>
        """
        tail_feathers = f"""
            <path d="M256 430 Q200 480 180 470 Q220 450 256 430" fill="{c1}" opacity="0.7"/>
            <path d="M256 430 Q256 490 256 480 Q256 460 256 430" fill="{c2}" opacity="0.7"/>
            <path d="M256 430 Q312 480 332 470 Q292 450 256 430" fill="{c1}" opacity="0.7"/>
        """
        crest = f"""
            <path d="M230 130 Q220 60 240 80" fill="{c1}" opacity="0.8"/>
            <path d="M256 120 Q256 40 260 60" fill="{c2}" opacity="0.8"/>
            <path d="M282 130 Q292 60 272 80" fill="{c1}" opacity="0.8"/>
        """
        extra = ""
        if animal_type == "phoenix_legend":
            extra = '<text x="100" y="80" font-size="36">🔥</text><text x="370" y="80" font-size="36">🔥</text>'
            extra += f'<circle cx="256" cy="256" r="220" fill="none" stroke="{c2}" stroke-width="3" stroke-dasharray="10,8" opacity="0.4"/>'
        return base_body + base_head + belly + arms + feet + wings + tail_feathers + crest + extra

    elif animal_type in ("butterfly", "butterfly_queen", "time_butterfly"):
        # 蝶々の翼
        wing_l = f"""
            <ellipse cx="140" cy="250" rx="90" ry="70" fill="{c1}" opacity="0.7" transform="rotate(-15,140,250)"/>
            <ellipse cx="145" cy="340" rx="65" ry="55" fill="{c2}" opacity="0.6" transform="rotate(-10,145,340)"/>
        """
        wing_r = f"""
            <ellipse cx="372" cy="250" rx="90" ry="70" fill="{c1}" opacity="0.7" transform="rotate(15,372,250)"/>
            <ellipse cx="367" cy="340" rx="65" ry="55" fill="{c2}" opacity="0.6" transform="rotate(10,367,340)"/>
        """
        # 触覚
        antennae = f"""
            <path d="M230 150 Q210 90 200 70" fill="none" stroke="{c2}" stroke-width="4" stroke-linecap="round"/>
            <circle cx="200" cy="70" r="8" fill="{c1}"/>
            <path d="M282 150 Q302 90 312 70" fill="none" stroke="{c2}" stroke-width="4" stroke-linecap="round"/>
            <circle cx="312" cy="70" r="8" fill="{c1}"/>
        """
        small_body = f'<ellipse cx="256" cy="300" rx="45" ry="90" fill="url(#{gid})"/>'
        small_head = f'<circle cx="256" cy="200" r="60" fill="url(#{gid})"/>'
        extra = ""
        if animal_type == "butterfly_queen":
            extra = '<text x="220" y="130" font-size="32">👑</text>'
        elif animal_type == "time_butterfly":
            extra = '<text x="100" y="260" font-size="28">⏰</text><text x="370" y="260" font-size="28">⏳</text>'
        return wing_l + wing_r + small_body + small_head + antennae + extra

    elif animal_type in ("peacock",):
        # 孔雀の扇形尾羽
        tail_feathers = ""
        colors = ["#00CED1", "#228B22", "#FFD700", "#4169E1", "#9370DB"]
        for i in range(7):
            angle = -60 + i * 20
            cx_f = 256 + 180 * math.cos(math.radians(angle - 90))
            cy_f = 180 + 180 * math.sin(math.radians(angle - 90))
            c = colors[i % len(colors)]
            tail_feathers += f'<ellipse cx="{cx_f:.0f}" cy="{cy_f:.0f}" rx="25" ry="45" fill="{c}" opacity="0.6" transform="rotate({angle},{cx_f:.0f},{cy_f:.0f})"/>'
            tail_feathers += f'<circle cx="{cx_f:.0f}" cy="{cy_f-15:.0f}" r="10" fill="#FFD700" opacity="0.7"/>'
        crest = f"""
            <line x1="245" y1="140" x2="240" y2="80" stroke="{c1}" stroke-width="3"/>
            <circle cx="240" cy="75" r="6" fill="#FFD700"/>
            <line x1="256" y1="135" x2="256" y2="70" stroke="{c1}" stroke-width="3"/>
            <circle cx="256" cy="65" r="6" fill="#FFD700"/>
            <line x1="267" y1="140" x2="272" y2="80" stroke="{c1}" stroke-width="3"/>
            <circle cx="272" cy="75" r="6" fill="#FFD700"/>
        """
        return tail_feathers + base_body + base_head + belly + arms + feet + crest

    elif animal_type in ("whale_king",):
        body_w = f'<ellipse cx="256" cy="300" rx="160" ry="110" fill="url(#{gid})"/>'
        belly_w = '<ellipse cx="256" cy="320" rx="100" ry="80" fill="white" opacity="0.7"/>'
        head_w = f'<ellipse cx="256" cy="220" rx="120" ry="90" fill="url(#{gid})"/>'
        fin_l = f'<ellipse cx="120" cy="310" rx="50" ry="25" fill="url(#{gid})" transform="rotate(-20,120,310)"/>'
        fin_r = f'<ellipse cx="392" cy="310" rx="50" ry="25" fill="url(#{gid})" transform="rotate(20,392,310)"/>'
        tail_w = f'<polygon points="256,400 210,450 302,450" fill="url(#{gid})"/>'
        crown = '<text x="215" y="145" font-size="44">👑</text>'
        eye_w = """
            <ellipse cx="200" cy="230" rx="14" ry="16" fill="#333"/>
            <ellipse cx="196" cy="224" rx="5" ry="6" fill="white"/>
            <ellipse cx="312" cy="230" rx="14" ry="16" fill="#333"/>
            <ellipse cx="308" cy="224" rx="5" ry="6" fill="white"/>
        """
        cheek_w = '<ellipse cx="175" cy="260" rx="20" ry="12" fill="#FF9999" opacity="0.4"/><ellipse cx="337" cy="260" rx="20" ry="12" fill="#FF9999" opacity="0.4"/>'
        mouth_w = '<path d="M235 275 Q256 290 277 275" fill="none" stroke="#333" stroke-width="3" stroke-linecap="round"/>'
        spout = '<path d="M256 155 Q240 120 250 100" fill="none" stroke="#87CEEB" stroke-width="4" stroke-linecap="round"/><path d="M256 155 Q272 120 262 100" fill="none" stroke="#87CEEB" stroke-width="4" stroke-linecap="round"/>'
        return body_w + head_w + belly_w + fin_l + fin_r + tail_w + eye_w + cheek_w + mouth_w + crown + spout

    elif animal_type in ("wolf",):
        ears = f"""
            <polygon points="180,135 155,55 220,105" fill="url(#{gid})"/>
            <polygon points="332,135 357,55 292,105" fill="url(#{gid})"/>
        """
        muzzle = '<ellipse cx="256" cy="260" rx="45" ry="30" fill="#D3D3D3" opacity="0.6"/>'
        tail = f'<path d="M375 370 Q420 340 430 290 Q435 260 415 250" fill="url(#{gid})" stroke="{c2}" stroke-width="2"/>'
        extra = '<text x="350" y="120" font-size="30">🌙</text><text x="220" y="100" font-size="26">📚</text>'
        return base_body + base_head + belly + arms + feet + ears + muzzle + tail + extra

    elif animal_type in ("white_tiger", "thunder_cheetah", "snow_leopard"):
        ears = f"""
            <polygon points="185,135 165,65 215,110" fill="url(#{gid})"/>
            <polygon points="327,135 347,65 297,110" fill="url(#{gid})"/>
        """
        # 縞模様
        stripes = f"""
            <path d="M210 180 Q220 200 210 220" fill="none" stroke="{c2}" stroke-width="5" opacity="0.4"/>
            <path d="M302 180 Q292 200 302 220" fill="none" stroke="{c2}" stroke-width="5" opacity="0.4"/>
            <path d="M220 300 Q230 330 220 360" fill="none" stroke="{c2}" stroke-width="5" opacity="0.3"/>
            <path d="M292 300 Q282 330 292 360" fill="none" stroke="{c2}" stroke-width="5" opacity="0.3"/>
        """
        tail = f'<path d="M378 370 Q420 340 440 300" fill="none" stroke="url(#{gid})" stroke-width="14" stroke-linecap="round"/>'
        extra = ""
        if animal_type == "white_tiger":
            extra = '<text x="220" y="105" font-size="36">⚔️</text>'
        elif animal_type == "thunder_cheetah":
            extra = '<text x="350" y="130" font-size="36">⚡</text><text x="120" y="140" font-size="28">⚡</text>'
        elif animal_type == "snow_leopard":
            extra = '<text x="350" y="130" font-size="30">🔮</text>'
        return base_body + base_head + belly + arms + feet + ears + stripes + tail + extra

    elif animal_type in ("eagle", "wind_falcon"):
        wings = f"""
            <path d="M130 250 Q70 200 80 130 Q100 180 130 200 Q110 160 120 110 Q140 170 170 220" fill="url(#{gid})" opacity="0.8"/>
            <path d="M382 250 Q442 200 432 130 Q412 180 382 200 Q402 160 392 110 Q372 170 342 220" fill="url(#{gid})" opacity="0.8"/>
        """
        beak_e = f'<polygon points="256,245 235,265 277,265" fill="#FF8C00"/>'
        big_eyes = """
            <circle cx="215" cy="215" r="22" fill="white"/>
            <circle cx="297" cy="215" r="22" fill="white"/>
            <circle cx="215" cy="218" r="12" fill="#333"/>
            <circle cx="297" cy="218" r="12" fill="#333"/>
            <circle cx="211" cy="213" r="4" fill="white"/>
            <circle cx="293" cy="213" r="4" fill="white"/>
        """
        extra = ""
        if animal_type == "eagle":
            extra = '<text x="215" y="120" font-size="36">⚔️</text>'
        else:
            extra = '<text x="350" y="130" font-size="30">🌪️</text>'
        return base_body + base_head + belly + wings + feet + beak_e + big_eyes + extra

    else:
        # デフォルト: 丸い動物
        ears = f"""
            <circle cx="185" cy="130" r="30" fill="url(#{gid})"/>
            <circle cx="327" cy="130" r="30" fill="url(#{gid})"/>
        """
        return base_body + base_head + belly + arms + feet + ears


def svg_to_png(svg_content, output_path):
    """SVGをPNGに変換（resvgまたはrsvg-convert使用）"""
    with tempfile.NamedTemporaryFile(suffix='.svg', mode='w', delete=False, encoding='utf-8') as f:
        f.write(svg_content)
        svg_path = f.name

    try:
        # rsvg-convertを試す
        result = subprocess.run(
            ['rsvg-convert', '-w', '512', '-h', '512', svg_path, '-o', output_path],
            capture_output=True, text=True
        )
        if result.returncode == 0:
            return True
    except FileNotFoundError:
        pass

    try:
        # Pythonのcairosvg
        import cairosvg
        cairosvg.svg2png(bytestring=svg_content.encode('utf-8'), write_to=output_path,
                         output_width=512, output_height=512)
        return True
    except ImportError:
        pass

    try:
        # Pillowで直接SVGは無理なのでHTMLから変換を試みる
        from PIL import Image
        import io
        # svgをそのまま保存（ブラウザで表示可能）
        with open(output_path.replace('.png', '.svg'), 'w', encoding='utf-8') as f:
            f.write(svg_content)
        print(f"  PNG変換ツールなし。SVGとして保存: {output_path.replace('.png', '.svg')}")
        return False
    except Exception:
        pass

    return False


def main():
    print("=== ひっさんマスター キャラクター生成 ===")
    print(f"出力先: {OUT_DIR}")

    # まずSVGとして全部生成
    svg_dir = os.path.join(OUT_DIR, "..", "characters_svg")
    os.makedirs(svg_dir, exist_ok=True)

    success_count = 0
    svg_only_count = 0

    for char_id, animal_type, color1, color2, name in CHARACTERS:
        svg_content = generate_animal_svg(char_id, animal_type, color1, color2, name)

        # SVG保存
        svg_path = os.path.join(svg_dir, f"char_{char_id}.svg")
        with open(svg_path, 'w', encoding='utf-8') as f:
            f.write(svg_content)

        # PNG変換
        png_path = os.path.join(OUT_DIR, f"char_{char_id}.png")
        if svg_to_png(svg_content, png_path):
            success_count += 1
        else:
            svg_only_count += 1

        print(f"  [{char_id:02d}/90] {name} ({animal_type}) ✓")

    print(f"\n完了！ PNG: {success_count}, SVG only: {svg_only_count}")

    if svg_only_count > 0:
        print("\n⚠️ PNG変換には rsvg-convert が必要です:")
        print("  brew install librsvg")
        print("  その後、このスクリプトを再実行してください")


if __name__ == "__main__":
    main()
