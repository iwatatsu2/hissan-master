'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Character, SaveData } from '@/lib/types';
import { pullGacha } from '@/lib/characters';
import { loadData, saveData } from '@/lib/storage';
import CharacterCard from '@/components/CharacterCard';

const GACHA_COST = 30;

export default function GachaPage() {
  const [data, setData] = useState<SaveData | null>(null);
  const [phase, setPhase] = useState<'ready' | 'rolling' | 'reveal'>('ready');
  const [result, setResult] = useState<Character | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [flashClass, setFlashClass] = useState('');

  useEffect(() => {
    setData(loadData());
  }, []);

  const pull = () => {
    if (!data || data.coins < GACHA_COST) return;

    const newData = { ...data, coins: data.coins - GACHA_COST };
    setData(newData);
    setPhase('rolling');

    setTimeout(() => {
      const char = pullGacha();
      const newCard = !newData.collectedIds.includes(char.id);
      if (newCard) {
        newData.collectedIds = [...newData.collectedIds, char.id];
      }
      saveData(newData);
      setData(newData);
      setResult(char);
      setIsNew(newCard);

      // レアリティ別フラッシュ
      if (char.rarity === '★★★★') setFlashClass('ur-flash');
      else if (char.rarity === '★★★') setFlashClass('sr-flash');
      else setFlashClass('');

      setPhase('reveal');
    }, 1800);
  };

  if (!data) return null;

  return (
    <div className={`min-h-dvh bg-gradient-to-b from-purple-100 to-pink-50 p-4 ${flashClass}`}>
      <div className="max-w-md mx-auto">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="text-2xl">🏠</Link>
          <div className="flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-full">
            <span>🪙</span>
            <span className="font-bold text-yellow-700">{data.coins}</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">🎰 ガチャ</h1>

        {/* Ready */}
        {phase === 'ready' && (
          <div className="text-center space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <p className="text-6xl mb-4">🎁</p>
              <p className="text-gray-600 mb-2">どんなカードが出るかな？</p>
              <p className="text-sm text-gray-400">1回 = 🪙{GACHA_COST}コイン</p>
              <div className="flex justify-center gap-3 mt-4 text-xs text-gray-400">
                <span>★ 50%</span>
                <span>★★ 30%</span>
                <span className="text-purple-400">★★★ 15%</span>
                <span className="text-yellow-500">★★★★ 5%</span>
              </div>
            </div>

            <button
              onClick={pull}
              disabled={data.coins < GACHA_COST}
              className={`w-full text-2xl font-bold py-4 rounded-2xl shadow-lg transition active:scale-95
                ${data.coins >= GACHA_COST
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              {data.coins >= GACHA_COST ? 'ガチャをまわす！' : 'コインがたりないよ 😢'}
            </button>

            {data.coins < GACHA_COST && (
              <Link href="/practice" className="block text-purple-500 font-bold underline">
                れんしゅうしてコインをためよう →
              </Link>
            )}
          </div>
        )}

        {/* Rolling */}
        {phase === 'rolling' && (
          <div className="text-center space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-12 relative overflow-hidden">
              <div className="relative">
                <p className="text-8xl animate-spin" style={{ animationDuration: '0.5s' }}>🌀</p>
              </div>
              {/* 背景パーティクル */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <span
                    key={i}
                    className="absolute text-lg animate-ping"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 1}s`,
                      animationDuration: `${0.8 + Math.random() * 0.8}s`,
                    }}
                  >
                    {['⭐', '✨', '💫', '🌟'][i % 4]}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-xl text-purple-600 font-bold animate-pulse">ガチャガチャ...</p>
          </div>
        )}

        {/* Reveal */}
        {phase === 'reveal' && result && (
          <div className="text-center space-y-6">
            <CharacterCard character={result} isNew={isNew} revealed />

            <div className="space-y-3">
              <button
                onClick={() => {
                  setPhase('ready');
                  setResult(null);
                  setFlashClass('');
                }}
                disabled={data.coins < GACHA_COST}
                className={`w-full text-xl font-bold py-3 rounded-xl shadow transition active:scale-95
                  ${data.coins >= GACHA_COST
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                    : 'bg-gray-300 text-gray-500'}`}
              >
                {data.coins >= GACHA_COST ? 'もういっかい！' : 'コインがたりない…'}
              </button>

              <div className="flex gap-3">
                <Link
                  href="/collection"
                  className="flex-1 bg-white text-purple-600 font-bold py-2 rounded-xl shadow text-center"
                >
                  📖 ずかん
                </Link>
                <Link
                  href="/practice"
                  className="flex-1 bg-white text-blue-600 font-bold py-2 rounded-xl shadow text-center"
                >
                  🔢 れんしゅう
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
