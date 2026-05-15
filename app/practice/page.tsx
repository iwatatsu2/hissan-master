'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Problem, Operation, SaveData } from '@/lib/types';
import { loadData, saveData } from '@/lib/storage';

function generateProblem(op: Operation): Problem {
  let top: number, bottom: number, answer: number;

  if (op === 'add') {
    top = Math.floor(Math.random() * 90) + 10; // 10-99
    bottom = Math.floor(Math.random() * 90) + 10;
    // 答えが3桁になる場合もOK（繰り上がり練習）
    answer = top + bottom;
  } else {
    // ひき算: top >= bottom にする
    top = Math.floor(Math.random() * 90) + 10;
    bottom = Math.floor(Math.random() * 90) + 10;
    if (top < bottom) [top, bottom] = [bottom, top];
    answer = top - bottom;
  }

  return { top, bottom, operation: op, answer };
}

const CHEERS = ['すごい！🎉', 'やったね！✨', 'かんぺき！💯', 'さすが！🌟', 'グッジョブ！👏', 'バッチリ！💪'];

export default function PracticePage() {
  const [data, setData] = useState<SaveData | null>(null);
  const [operation, setOperation] = useState<Operation>('add');
  const [problem, setProblem] = useState<Problem | null>(null);
  const [onesDigit, setOnesDigit] = useState('');
  const [tensDigit, setTensDigit] = useState('');
  const [hundredsDigit, setHundredsDigit] = useState('');
  const [phase, setPhase] = useState<'select' | 'ones' | 'tens' | 'hundreds' | 'correct' | 'wrong'>('select');
  const [cheer, setCheer] = useState('');
  const [earnedCoins, setEarnedCoins] = useState(0);
  const onesRef = useRef<HTMLInputElement>(null);
  const tensRef = useRef<HTMLInputElement>(null);
  const hundredsRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setData(loadData());
  }, []);

  const startProblem = useCallback((op: Operation) => {
    setOperation(op);
    const p = generateProblem(op);
    setProblem(p);
    setOnesDigit('');
    setTensDigit('');
    setHundredsDigit('');
    setPhase('ones');
    setTimeout(() => onesRef.current?.focus(), 100);
  }, []);

  const checkAnswer = useCallback(() => {
    if (!problem || !data) return;
    const userAnswer = parseInt((hundredsDigit || '0') + tensDigit + onesDigit, 10);
    const isCorrect = userAnswer === problem.answer;

    const newData = { ...data };
    newData.totalAttempts++;
    newData.todayAttempts++;

    if (isCorrect) {
      newData.totalCorrect++;
      newData.todayCorrect++;
      newData.streak++;
      if (newData.streak > newData.bestStreak) newData.bestStreak = newData.streak;
      const bonus = newData.streak >= 5 ? 5 : newData.streak >= 3 ? 3 : 2;
      newData.coins += bonus;
      setEarnedCoins(bonus);
      setCheer(CHEERS[Math.floor(Math.random() * CHEERS.length)]);
      setPhase('correct');
    } else {
      newData.streak = 0;
      setPhase('wrong');
    }

    saveData(newData);
    setData(newData);
  }, [problem, data, onesDigit, tensDigit, hundredsDigit]);

  const handleOnesSubmit = () => {
    if (onesDigit === '') return;
    setPhase('tens');
    setTimeout(() => tensRef.current?.focus(), 100);
  };

  const handleTensSubmit = () => {
    if (tensDigit === '') return;
    if (problem && problem.answer >= 100) {
      setPhase('hundreds');
      setTimeout(() => hundredsRef.current?.focus(), 100);
    } else {
      checkAnswer();
    }
  };

  const handleHundredsSubmit = () => {
    if (hundredsDigit === '') return;
    checkAnswer();
  };

  if (!data) return null;

  return (
    <div className="min-h-dvh bg-gradient-to-b from-blue-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="text-2xl">🏠</Link>
          <div className="flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-full">
            <span>🪙</span>
            <span className="font-bold text-yellow-700">{data.coins}</span>
          </div>
        </div>

        {phase === 'select' && (
          <div className="space-y-6 text-center">
            <h1 className="text-3xl font-bold text-purple-700">🔢 れんしゅう</h1>
            <p className="text-gray-600">どっちをやる？</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => startProblem('add')}
                className="bg-pink-400 hover:bg-pink-500 text-white text-2xl font-bold py-8 rounded-2xl shadow-lg active:scale-95 transition"
              >
                たし算<br />＋
              </button>
              <button
                onClick={() => startProblem('sub')}
                className="bg-blue-400 hover:bg-blue-500 text-white text-2xl font-bold py-8 rounded-2xl shadow-lg active:scale-95 transition"
              >
                ひき算<br />−
              </button>
            </div>
            {data.streak > 0 && (
              <p className="text-orange-500 font-bold">🔥 {data.streak}連続せいかい中！</p>
            )}
          </div>
        )}

        {problem && phase !== 'select' && (
          <div className="space-y-6">
            {/* 筆算表示 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mx-auto max-w-[260px]">
              <div className="font-mono text-4xl space-y-1">
                {/* 上の数 */}
                <div className="text-right pr-2">
                  {String(problem.top).split('').map((d, i) => (
                    <span key={i} className="inline-block w-12 text-center">{d}</span>
                  ))}
                </div>
                {/* 演算記号 + 下の数 */}
                <div className="text-right pr-2 flex justify-end items-center">
                  <span className="inline-block w-8 text-center text-2xl text-gray-500">
                    {operation === 'add' ? '＋' : '−'}
                  </span>
                  {String(problem.bottom).split('').map((d, i) => (
                    <span key={i} className="inline-block w-12 text-center">{d}</span>
                  ))}
                </div>
                {/* 線 */}
                <div className="border-b-4 border-gray-800 mx-1" />
                {/* 回答欄 */}
                <div className="text-right pr-2 flex justify-end items-center pt-2">
                  {problem.answer >= 100 && (
                    <input
                      ref={hundredsRef}
                      type="number"
                      inputMode="numeric"
                      value={hundredsDigit}
                      onChange={(e) => setHundredsDigit(e.target.value.slice(-1))}
                      onKeyDown={(e) => e.key === 'Enter' && handleHundredsSubmit()}
                      className={`w-12 h-14 text-center text-4xl border-2 rounded-lg outline-none
                        ${phase === 'hundreds' ? 'border-purple-400 bg-purple-50 animate-pulse' : 'border-gray-300 bg-gray-50'}
                        ${phase === 'correct' ? 'border-green-400 bg-green-50 text-green-600' : ''}
                        ${phase === 'wrong' ? 'border-red-400 bg-red-50 text-red-600' : ''}`}
                      disabled={phase !== 'hundreds'}
                    />
                  )}
                  <input
                    ref={tensRef}
                    type="number"
                    inputMode="numeric"
                    value={tensDigit}
                    onChange={(e) => setTensDigit(e.target.value.slice(-1))}
                    onKeyDown={(e) => e.key === 'Enter' && handleTensSubmit()}
                    className={`w-12 h-14 text-center text-4xl border-2 rounded-lg outline-none
                      ${phase === 'tens' ? 'border-purple-400 bg-purple-50 animate-pulse' : 'border-gray-300 bg-gray-50'}
                      ${phase === 'correct' ? 'border-green-400 bg-green-50 text-green-600' : ''}
                      ${phase === 'wrong' ? 'border-red-400 bg-red-50 text-red-600' : ''}`}
                    disabled={phase !== 'tens'}
                  />
                  <input
                    ref={onesRef}
                    type="number"
                    inputMode="numeric"
                    value={onesDigit}
                    onChange={(e) => setOnesDigit(e.target.value.slice(-1))}
                    onKeyDown={(e) => e.key === 'Enter' && handleOnesSubmit()}
                    className={`w-12 h-14 text-center text-4xl border-2 rounded-lg outline-none
                      ${phase === 'ones' ? 'border-purple-400 bg-purple-50 animate-pulse' : 'border-gray-300 bg-gray-50'}
                      ${phase === 'correct' ? 'border-green-400 bg-green-50 text-green-600' : ''}
                      ${phase === 'wrong' ? 'border-red-400 bg-red-50 text-red-600' : ''}`}
                    disabled={phase !== 'ones'}
                  />
                </div>
              </div>

              {/* ヒント: 今どこを入力中か */}
              {(phase === 'ones' || phase === 'tens' || phase === 'hundreds') && (
                <p className="text-center text-sm text-purple-500 mt-3 animate-bounce">
                  👆 {phase === 'ones' ? 'いちの位' : phase === 'tens' ? '十の位' : '百の位'}を入れてね！
                </p>
              )}
            </div>

            {/* 入力ボタン（一の位入力中） */}
            {phase === 'ones' && (
              <button
                onClick={handleOnesSubmit}
                disabled={onesDigit === ''}
                className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white text-xl font-bold py-3 rounded-xl shadow transition"
              >
                つぎへ →
              </button>
            )}

            {phase === 'tens' && (
              <button
                onClick={handleTensSubmit}
                disabled={tensDigit === ''}
                className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white text-xl font-bold py-3 rounded-xl shadow transition"
              >
                {problem.answer >= 100 ? 'つぎへ →' : 'こたえあわせ！'}
              </button>
            )}

            {phase === 'hundreds' && (
              <button
                onClick={handleHundredsSubmit}
                disabled={hundredsDigit === ''}
                className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white text-xl font-bold py-3 rounded-xl shadow transition"
              >
                こたえあわせ！
              </button>
            )}

            {/* 正解 */}
            {phase === 'correct' && (
              <div className="text-center space-y-4 animate-bounce">
                <p className="text-4xl font-bold text-green-500">⭕ {cheer}</p>
                <p className="text-yellow-600 font-bold">🪙 +{earnedCoins} コイン！</p>
                <button
                  onClick={() => startProblem(operation)}
                  className="bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-3 px-8 rounded-xl shadow transition"
                >
                  つぎの問題 →
                </button>
              </div>
            )}

            {/* 不正解 */}
            {phase === 'wrong' && (
              <div className="text-center space-y-4">
                <p className="text-3xl font-bold text-red-400">❌ おしい！</p>
                <p className="text-xl text-gray-600">
                  こたえは <span className="font-bold text-blue-600 text-2xl">{problem.answer}</span> だよ
                </p>
                <button
                  onClick={() => startProblem(operation)}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold py-3 px-8 rounded-xl shadow transition"
                >
                  もういっかい →
                </button>
              </div>
            )}

            {/* 戻る */}
            {(phase === 'correct' || phase === 'wrong') && (
              <button
                onClick={() => setPhase('select')}
                className="w-full text-gray-400 py-2"
              >
                もどる
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
