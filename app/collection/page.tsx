'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CHARACTERS } from '@/lib/characters';
import { SaveData } from '@/lib/types';
import { loadData } from '@/lib/storage';
import CharacterCard from '@/components/CharacterCard';
import { BOSS_CARDS, BossCard } from '@/lib/boss-cards';

function miniCardClass(rarity: string) {
  if (rarity === '★★★★') return 'mini-card mini-card-ur';
  if (rarity === '★★★') return 'mini-card mini-card-sr';
  if (rarity === '★★') return 'mini-card mini-card-r';
  return 'mini-card';
}

export default function CollectionPage() {
  const [data, setData] = useState<SaveData | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [tab, setTab] = useState<'gacha' | 'boss'>('gacha');
  const [selectedBossCard, setSelectedBossCard] = useState<BossCard | null>(null);

  useEffect(() => {
    setData(loadData());
  }, []);

  if (!data) return null;

  const collected = data.collectedIds.length;
  const total = CHARACTERS.length;
  const pct = Math.round((collected / total) * 100);

  const selectedChar = selected !== null ? CHARACTERS.find((c) => c.id === selected) : null;

  return (
    <div className="min-h-dvh bg-gradient-to-b from-green-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="text-2xl">🏠</Link>
          <h1 className="text-2xl font-bold text-green-700">📖 ずかん</h1>
          <div />
        </div>

        {/* タブ切り替え */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => { setTab('gacha'); setSelectedBossCard(null); }}
            className={`flex-1 py-2 rounded-xl font-bold text-lg transition ${
              tab === 'gacha' ? 'bg-green-500 text-white shadow' : 'bg-white text-gray-500'
            }`}
          >
            🎰 ガチャ
          </button>
          <button
            onClick={() => { setTab('boss'); setSelected(null); }}
            className={`flex-1 py-2 rounded-xl font-bold text-lg transition ${
              tab === 'boss' ? 'bg-orange-500 text-white shadow' : 'bg-white text-gray-500'
            }`}
          >
            ⚔️ ボスカード
          </button>
        </div>

        {tab === 'gacha' && (
          <>
            {/* 進捗 */}
            <div className="bg-white rounded-xl shadow p-3 mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>あつめた数</span>
                <span>{collected} / {total} ({pct}%)</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            {/* 選択カード詳細 */}
            {selectedChar && data.collectedIds.includes(selectedChar.id) && (
              <div className="mb-4" onClick={() => setSelected(null)}>
                <CharacterCard character={selectedChar} />
              </div>
            )}

            {/* カード一覧 */}
            <div className="grid grid-cols-5 gap-2">
              {CHARACTERS.map((char) => {
                const owned = data.collectedIds.includes(char.id);
                return (
                  <button
                    key={char.id}
                    onClick={() => owned && setSelected(char.id)}
                    className={`aspect-square rounded-xl flex items-center justify-center text-3xl
                      ${owned
                        ? `bg-gradient-to-br ${char.color} ${miniCardClass(char.rarity)}`
                        : 'bg-gray-200'
                      }
                      ${selected === char.id ? 'ring-2 ring-purple-500 scale-110' : ''}`}
                  >
                    {owned ? (
                      char.image ? (
                        <img src={char.image} alt={char.name} className="w-full h-full object-contain p-0.5" draggable={false} />
                      ) : char.emoji
                    ) : '❓'}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {tab === 'boss' && (
          <>
            {/* ボスカード進捗 */}
            <div className="bg-white rounded-xl shadow p-3 mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>ボスカード</span>
                <span>{data.bossCards.length} / {BOSS_CARDS.length}</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-400 to-red-400 rounded-full transition-all"
                  style={{ width: `${Math.round((data.bossCards.length / BOSS_CARDS.length) * 100)}%` }}
                />
              </div>
            </div>

            {/* 選択したボスカード詳細 */}
            {selectedBossCard && (
              <div className="mb-4" onClick={() => setSelectedBossCard(null)}>
                <div className="bg-gradient-to-b from-amber-900/90 to-yellow-900/90 rounded-2xl p-4 border-2 border-yellow-400 shadow-xl">
                  <div className="w-48 h-64 mx-auto rounded-xl overflow-hidden shadow-lg border-2 border-yellow-400">
                    <img src={selectedBossCard.image} alt={selectedBossCard.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-white font-bold text-xl text-center mt-3">{selectedBossCard.name}</p>
                  <p className="text-yellow-400 text-center">{selectedBossCard.rarity}</p>
                </div>
              </div>
            )}

            {/* ボスカード一覧 */}
            <div className="grid grid-cols-3 gap-3">
              {BOSS_CARDS.map((card) => {
                const owned = data.bossCards.includes(card.id);
                return (
                  <button
                    key={card.id}
                    onClick={() => owned && setSelectedBossCard(card)}
                    className={`aspect-[3/4] rounded-xl overflow-hidden shadow transition active:scale-95
                      ${owned
                        ? 'ring-2 ring-yellow-400'
                        : 'bg-gray-300 opacity-60'
                      }
                      ${selectedBossCard?.id === card.id ? 'ring-4 ring-yellow-300 scale-105' : ''}`}
                  >
                    {owned ? (
                      <img src={card.image} alt={card.name} className="w-full h-full object-cover" draggable={false} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-4xl">❓</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
