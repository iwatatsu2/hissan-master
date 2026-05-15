'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Problem, Operation, SaveData } from '@/lib/types';
import { loadData, saveData } from '@/lib/storage';

function generateProblem(op: Operation): Problem {
  let top: number, bottom: number, answer: number;

  if (op === 'add') {
    top = Math.floor(Math.random() * 90) + 10;
    bottom = Math.floor(Math.random() * 90) + 10;
    answer = top + bottom;
  } else {
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
  }, []);

  const checkAnswer = useCallback((ones: string, tens: string, hundreds: string) => {
    if (!problem || !data) return;
    const userAnswer = parseInt((hundreds || '0') + tens + ones, 10);
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
  }, [problem, data]);

  // テンキー入力
  const handleNumpad = (num: number) => {
    if (phase === 'ones') {
      setOnesDigit(String(num));
      // 自動で次へ
      setTimeout(() => {
        setPhase('tens');
      }, 200);
    } else if (phase === 'tens') {
      const newTens = String(num);
      setTensDigit(newTens);
      setTimeout(() => {
        if (problem && problem.answer >= 100) {
          setPhase('hundreds');
        } else {
          checkAnswer(onesDigit, newTens, '');
        }
      }, 200);
    } else if (phase === 'hundreds') {
      const newHundreds = String(num);
      setHundredsDigit(newHundreds);
      setTimeout(() => {
        checkAnswer(onesDigit, tensDigit, newHundreds);
      }, 200);
    }
  };

  // やりなおし（現在の位をクリア）
  const handleClear = () => {
    if (phase === 'ones') setOnesDigit('');
    else if (phase === 'tens') {
      setTensDigit('');
      setPhase('ones');
      setOnesDigit('');
    } else if (phase === 'hundreds') {
      setHundredsDigit('');
      setPhase('tens');
      setTensDigit('');
    }
  };

  if (!data) return null;

  const isInputPhase = phase === 'ones' || phase === 'tens' || phase === 'hundreds';

  // 回答欄のセルスタイル
  const cellStyle = (target: 'ones' | 'tens' | 'hundreds', value: string) => {
    const isActive = phase === target;
    const filled = value !== '';
    let base = 'w-12 h-14 text-center text-4xl border-2 rounded-lg font-mono flex items-center justify-center';
    if (phase === 'correct') return `${base} border-green-400 bg-green-50 text-green-600`;
    if (phase === 'wrong') return `${base} border-red-400 bg-red-50 text-red-600`;
    if (isActive) return `${base} border-purple-500 bg-purple-50 ring-2 ring-purple-300`;
    if (filled) return `${base} border-green-300 bg-green-50 text-green-700`;
    return `${base} border-gray-300 bg-gray-50 text-gray-400`;
  };

  return (
    <div className="min-h-dvh bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col">
      {/* ヘッダー */}
      <div className="flex items-center justify-between p-4">
        <Link href="/" className="text-2xl">🏠</Link>
        <div className="flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-full">
          <span>🪙</span>
          <span className="font-bold text-yellow-700">{data.coins}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full px-4">
        {phase === 'select' && (
          <div className="space-y-6 text-center w-full">
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
          <div className="w-full space-y-4 flex flex-col items-center">
            {/* 筆算表示 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 max-w-[280px] w-full">
              <div className="font-mono text-4xl space-y-1">
                {/* 上の数 */}
                <div className="text-right pr-2 flex justify-end">
                  {problem.answer >= 100 && <span className="inline-block w-12" />}
                  {String(problem.top).split('').map((d, i) => (
                    <span key={i} className="inline-block w-12 text-center">{d}</span>
                  ))}
                </div>
                {/* 演算記号 + 下の数 */}
                <div className="text-right pr-2 flex justify-end items-center">
                  <span className="inline-block w-8 text-center text-2xl text-gray-500">
                    {operation === 'add' ? '＋' : '−'}
                  </span>
                  {problem.answer >= 100 && <span className="inline-block w-4" />}
                  {String(problem.bottom).split('').map((d, i) => (
                    <span key={i} className="inline-block w-12 text-center">{d}</span>
                  ))}
                </div>
                {/* 線 */}
                <div className="border-b-4 border-gray-800 mx-1" />
                {/* 回答欄 */}
                <div className="text-right pr-2 flex justify-end items-center pt-2 gap-1">
                  {problem.answer >= 100 && (
                    <div className={cellStyle('hundreds', hundredsDigit)}>
                      {hundredsDigit || (phase === 'hundreds' ? '?' : '')}
                    </div>
                  )}
                  <div className={cellStyle('tens', tensDigit)}>
                    {tensDigit || (phase === 'tens' ? '?' : '')}
                  </div>
                  <div className={cellStyle('ones', onesDigit)}>
                    {onesDigit || (phase === 'ones' ? '?' : '')}
                  </div>
                </div>
              </div>

              {/* ヒント */}
              {isInputPhase && (
                <p className="text-center text-sm text-purple-500 mt-3 font-bold">
                  👇 {phase === 'ones' ? 'いちの位' : phase === 'tens' ? '十の位' : '百の位'}をいれてね！
                </p>
              )}
            </div>

            {/* 正解 */}
            {phase === 'correct' && (
              <div className="text-center space-y-3">
                <p className="text-4xl font-bold text-green-500">⭕ {cheer}</p>
                <p className="text-yellow-600 font-bold">🪙 +{earnedCoins} コイン！</p>
                <button
                  onClick={() => startProblem(operation)}
                  className="bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-3 px-8 rounded-xl shadow transition active:scale-95"
                >
                  つぎの問題 →
                </button>
                <br />
                <button onClick={() => setPhase('select')} className="text-gray-400 text-sm">
                  もどる
                </button>
              </div>
            )}

            {/* 不正解 */}
            {phase === 'wrong' && (
              <div className="text-center space-y-3">
                <p className="text-3xl font-bold text-red-400">❌ おしい！</p>
                <p className="text-xl text-gray-600">
                  こたえは <span className="font-bold text-blue-600 text-2xl">{problem.answer}</span> だよ
                </p>
                <button
                  onClick={() => startProblem(operation)}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold py-3 px-8 rounded-xl shadow transition active:scale-95"
                >
                  もういっかい →
                </button>
                <br />
                <button onClick={() => setPhase('select')} className="text-gray-400 text-sm">
                  もどる
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* テンキー（固定下部） */}
      {isInputPhase && (
        <div className="sticky bottom-0 bg-white border-t-2 border-gray-200 p-3 pb-[env(safe-area-inset-bottom)]">
          <div className="max-w-xs mx-auto">
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <button
                  key={n}
                  onClick={() => handleNumpad(n)}
                  className="bg-purple-100 hover:bg-purple-200 active:bg-purple-300 text-purple-800 text-3xl font-bold py-4 rounded-xl shadow transition active:scale-95"
                >
                  {n}
                </button>
              ))}
              <button
                onClick={handleClear}
                className="bg-red-100 hover:bg-red-200 active:bg-red-300 text-red-600 text-xl font-bold py-4 rounded-xl shadow transition active:scale-95"
              >
                もどる
              </button>
              <button
                onClick={() => handleNumpad(0)}
                className="bg-purple-100 hover:bg-purple-200 active:bg-purple-300 text-purple-800 text-3xl font-bold py-4 rounded-xl shadow transition active:scale-95"
              >
                0
              </button>
              <div />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
