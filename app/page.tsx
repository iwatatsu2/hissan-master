'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SaveData } from '@/lib/types';
import { loadData } from '@/lib/storage';
import { CHARACTERS } from '@/lib/characters';

export default function HomePage() {
  const [data, setData] = useState<SaveData | null>(null);

  useEffect(() => {
    setData(loadData());
  }, []);

  if (!data) return null;

  const accuracy = data.todayAttempts > 0
    ? Math.round((data.todayCorrect / data.todayAttempts) * 100)
    : 0;
  const collected = data.collectedIds.length;
  const total = CHARACTERS.length;

  return (
    <div className="min-h-dvh bg-gradient-to-b from-yellow-50 to-pink-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* タイトル */}
        <div className="text-center pt-4">
          <h1 className="text-4xl font-bold text-purple-700">🔢 ひっさん</h1>
          <h2 className="text-4xl font-bold text-purple-700">マスター</h2>
          <p className="text-gray-500 mt-1">たのしく計算れんしゅう！</p>
        </div>

        {/* コイン */}
        <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🪙</span>
            <div>
              <p className="text-sm text-gray-500">コイン</p>
              <p className="text-2xl font-bold text-yellow-600">{data.coins}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl">📖</span>
            <div>
              <p className="text-sm text-gray-500">ずかん</p>
              <p className="text-2xl font-bold text-green-600">{collected}/{total}</p>
            </div>
          </div>
        </div>

        {/* 今日の成績 */}
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <p className="text-sm text-gray-500 mb-2">📅 きょうのきろく</p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">{data.todayAttempts}</p>
              <p className="text-xs text-gray-500">もんだい</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{data.todayCorrect}</p>
              <p className="text-xs text-gray-500">せいかい</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{accuracy}%</p>
              <p className="text-xs text-gray-500">せいかいりつ</p>
            </div>
          </div>
          {data.bestStreak > 0 && (
            <p className="text-center text-orange-500 text-sm mt-2">
              🔥 さいこう {data.bestStreak}連続せいかい！
            </p>
          )}
        </div>

        {/* メニューボタン */}
        <div className="grid grid-cols-1 gap-3">
          <Link
            href="/practice"
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-2xl font-bold py-5 rounded-2xl shadow-lg text-center active:scale-95 transition"
          >
            🔢 れんしゅうする！
          </Link>

          <Link
            href="/gacha"
            className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-2xl font-bold py-5 rounded-2xl shadow-lg text-center active:scale-95 transition"
          >
            🎰 ガチャをまわす！
          </Link>

          <Link
            href="/collection"
            className="bg-gradient-to-r from-green-400 to-blue-400 text-white text-2xl font-bold py-5 rounded-2xl shadow-lg text-center active:scale-95 transition"
          >
            📖 ずかんを見る
          </Link>
        </div>
      </div>
    </div>
  );
}
