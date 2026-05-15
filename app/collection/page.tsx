'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CHARACTERS } from '@/lib/characters';
import { SaveData } from '@/lib/types';
import { loadData } from '@/lib/storage';

export default function CollectionPage() {
  const [data, setData] = useState<SaveData | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    setData(loadData());
  }, []);

  if (!data) return null;

  const collected = data.collectedIds.length;
  const total = CHARACTERS.length;
  const pct = Math.round((collected / total) * 100);

  const selectedChar = selected !== null ? CHARACTERS.find((c) => c.id === selected) : null;

  const rarityColor = (r: string) => {
    if (r === '★★★★') return 'text-yellow-500';
    if (r === '★★★') return 'text-purple-500';
    if (r === '★★') return 'text-blue-500';
    return 'text-gray-400';
  };

  return (
    <div className="min-h-dvh bg-gradient-to-b from-green-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="text-2xl">🏠</Link>
          <h1 className="text-2xl font-bold text-green-700">📖 ずかん</h1>
          <div />
        </div>

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
          <div
            className={`bg-gradient-to-br ${selectedChar.color} rounded-2xl shadow-lg p-4 mb-4 text-center`}
            onClick={() => setSelected(null)}
          >
            <p className="text-5xl mb-2">{selectedChar.emoji}</p>
            <p className="text-xl font-bold text-gray-800">{selectedChar.name}</p>
            <p className={`font-bold ${rarityColor(selectedChar.rarity)}`}>{selectedChar.rarity}</p>
            <p className="text-gray-600 text-sm mt-1">「{selectedChar.line}」</p>
          </div>
        )}

        {/* カード一覧 */}
        <div className="grid grid-cols-5 gap-2">
          {CHARACTERS.map((char) => {
            const owned = data.collectedIds.includes(char.id);
            return (
              <button
                key={char.id}
                onClick={() => setSelected(char.id)}
                className={`aspect-square rounded-xl flex items-center justify-center text-3xl transition
                  ${owned
                    ? `bg-gradient-to-br ${char.color} shadow hover:scale-110`
                    : 'bg-gray-200'
                  }
                  ${selected === char.id ? 'ring-2 ring-purple-500 scale-110' : ''}`}
              >
                {owned ? char.emoji : '❓'}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
