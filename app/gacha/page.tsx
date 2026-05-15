'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Character, SaveData } from '@/lib/types';
import { pullGacha } from '@/lib/characters';
import { loadData, saveData } from '@/lib/storage';

const GACHA_COST = 10;

export default function GachaPage() {
  const [data, setData] = useState<SaveData | null>(null);
  const [phase, setPhase] = useState<'ready' | 'rolling' | 'reveal'>('ready');
  const [result, setResult] = useState<Character | null>(null);
  const [isNew, setIsNew] = useState(false);

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
      setPhase('reveal');
    }, 1500);
  };

  if (!data) return null;

  const rarityStars = (r: string) => r;
  const rarityColor = (r: string) => {
    if (r === '★★★★') return 'text-yellow-500';
    if (r === '★★★') return 'text-purple-500';
    if (r === '★★') return 'text-blue-500';
    return 'text-gray-500';
  };

  return (
    <div className="min-h-dvh bg-gradient-to-b from-purple-100 to-pink-50 p-4">
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
              <Link
                href="/practice"
                className="block text-purple-500 font-bold underline"
              >
                れんしゅうしてコインをためよう →
              </Link>
            )}
          </div>
        )}

        {/* Rolling Animation */}
        {phase === 'rolling' && (
          <div className="text-center space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <p className="text-8xl animate-spin">🌀</p>
            </div>
            <p className="text-xl text-purple-600 font-bold animate-pulse">ガチャガチャ...</p>
          </div>
        )}

        {/* Reveal */}
        {phase === 'reveal' && result && (
          <div className="text-center space-y-6">
            {/* Card */}
            <div
              className={`relative bg-gradient-to-br ${result.color} rounded-2xl shadow-2xl p-6 mx-auto max-w-[280px]
                ${result.rarity === '★★★★' ? 'animate-pulse ring-4 ring-yellow-400' : ''}
                ${result.rarity === '★★★' ? 'ring-2 ring-purple-400' : ''}`}
            >
              {isNew && (
                <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce">
                  NEW!
                </div>
              )}

              {/* Sparkle for rare */}
              {(result.rarity === '★★★' || result.rarity === '★★★★') && (
                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <span
                      key={i}
                      className="absolute text-xl animate-ping"
                      style={{
                        top: `${Math.random() * 80 + 10}%`,
                        left: `${Math.random() * 80 + 10}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${1 + Math.random()}s`,
                      }}
                    >
                      ✨
                    </span>
                  ))}
                </div>
              )}

              <p className="text-7xl mb-3">{result.emoji}</p>
              <p className="text-2xl font-bold text-gray-800 mb-1">{result.name}</p>
              <p className={`text-lg font-bold ${rarityColor(result.rarity)} mb-2`}>
                {rarityStars(result.rarity)}
              </p>
              <p className="text-gray-600 text-sm bg-white/50 rounded-lg px-3 py-2">
                「{result.line}」
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setPhase('ready');
                  setResult(null);
                }}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xl font-bold py-3 rounded-xl shadow transition active:scale-95"
              >
                もういっかい！
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
