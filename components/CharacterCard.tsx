'use client';

import { Character } from '@/lib/types';

interface Props {
  character: Character;
  isNew?: boolean;
  revealed?: boolean;
}

const SPARKLE_POSITIONS = [
  { top: '10%', left: '15%', delay: '0s' },
  { top: '20%', left: '75%', delay: '0.4s' },
  { top: '45%', left: '10%', delay: '0.8s' },
  { top: '50%', left: '85%', delay: '1.2s' },
  { top: '70%', left: '25%', delay: '0.2s' },
  { top: '75%', left: '70%', delay: '0.6s' },
  { top: '85%', left: '50%', delay: '1.0s' },
  { top: '15%', left: '50%', delay: '1.4s' },
  { top: '60%', left: '45%', delay: '0.3s' },
  { top: '35%', left: '90%', delay: '0.9s' },
];

function rarityKey(r: string) {
  if (r === '★★★★') return 'ur';
  if (r === '★★★') return 'sr';
  if (r === '★★') return 'r';
  return 'n';
}

function rarityStarColor(r: string) {
  if (r === '★★★★') return '#d97706';
  if (r === '★★★') return '#a855f7';
  if (r === '★★') return '#3b82f6';
  return '#9ca3af';
}

export default function CharacterCard({ character, isNew, revealed }: Props) {
  const rk = rarityKey(character.rarity);
  const isUR = rk === 'ur';
  const isSR = rk === 'sr';
  const showSparkles = isUR || isSR;

  const revealClass = revealed
    ? isUR ? 'card-reveal-ur' : 'card-reveal'
    : '';

  return (
    <div
      className={`card-frame card-${rk.toUpperCase()} ${revealClass} mx-auto`}
      style={{ maxWidth: 280, width: '100%' }}
    >
      {/* NEW badge */}
      {isNew && <div className="new-badge">NEW!</div>}

      {/* ホログラムオーバーレイ（URのみ） */}
      {isUR && <div className="holo-overlay" />}

      {/* キラキラパーティクル（SR/UR） */}
      {showSparkles && (
        <div className="sparkle-container">
          {SPARKLE_POSITIONS.map((pos, i) => (
            <span
              key={i}
              className="sparkle"
              style={{
                top: pos.top,
                left: pos.left,
                animationDelay: pos.delay,
                animationDuration: `${1.5 + (i % 3) * 0.5}s`,
              }}
            >
              {isUR ? (i % 2 === 0 ? '✨' : '💫') : '✨'}
            </span>
          ))}
        </div>
      )}

      <div className="card-inner">
        {/* カード上部装飾ライン */}
        <div
          className="w-full h-1 rounded-full mb-3"
          style={{
            background: isUR
              ? 'linear-gradient(90deg, #d97706, #fbbf24, #d97706)'
              : isSR
              ? 'linear-gradient(90deg, #a855f7, #ec4899, #a855f7)'
              : rk === 'r'
              ? 'linear-gradient(90deg, #60a5fa, #93c5fd, #60a5fa)'
              : '#e5e7eb',
          }}
        />

        {/* キャラクターイラスト */}
        {character.image ? (
          <div className={`relative ${isSR ? 'card-emoji-sr' : ''} ${isUR ? 'card-emoji-ur' : ''}`}>
            <img
              src={character.image}
              alt={character.name}
              className="w-36 h-36 object-contain"
              draggable={false}
            />
          </div>
        ) : (
          <div className={`card-emoji ${isSR ? 'card-emoji-sr' : ''} ${isUR ? 'card-emoji-ur' : ''}`}>
            {character.emoji}
          </div>
        )}

        {/* 名前 */}
        <div className={`card-name ${isUR ? 'card-name-ur' : ''}`}
          style={{ color: isUR ? undefined : '#1f2937' }}
        >
          {character.name}
        </div>

        {/* レアリティ星 */}
        <div className="card-rarity" style={{ color: rarityStarColor(character.rarity) }}>
          {character.rarity}
        </div>

        {/* セリフ */}
        <div className={`card-speech card-speech-${rk}`}>
          「{character.line}」
        </div>

        {/* カード下部装飾ライン */}
        <div
          className="w-full h-1 rounded-full mt-3"
          style={{
            background: isUR
              ? 'linear-gradient(90deg, #d97706, #fbbf24, #d97706)'
              : isSR
              ? 'linear-gradient(90deg, #a855f7, #ec4899, #a855f7)'
              : rk === 'r'
              ? 'linear-gradient(90deg, #60a5fa, #93c5fd, #60a5fa)'
              : '#e5e7eb',
          }}
        />
      </div>
    </div>
  );
}
