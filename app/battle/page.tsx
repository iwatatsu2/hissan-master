'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Problem, Operation, SaveData } from '@/lib/types';
import { loadData, saveData } from '@/lib/storage';
import { getBoss, BOSSES } from '@/lib/bosses';

function generateProblem(stage: number): Problem {
  // ステージが上がると難易度UP
  const ops: Operation[] = stage <= 3 ? ['add'] : ['add', 'sub'];
  const op = ops[Math.floor(Math.random() * ops.length)];

  let top: number, bottom: number, answer: number;
  const maxNum = Math.min(10 + stage * 8, 99);

  if (op === 'add') {
    top = Math.floor(Math.random() * (maxNum - 9)) + 10;
    bottom = Math.floor(Math.random() * (maxNum - 9)) + 10;
    answer = top + bottom;
  } else {
    top = Math.floor(Math.random() * (maxNum - 9)) + 10;
    bottom = Math.floor(Math.random() * (maxNum - 9)) + 10;
    if (top < bottom) [top, bottom] = [bottom, top];
    answer = top - bottom;
  }

  return { top, bottom, operation: op, answer };
}

const HIT_MESSAGES = ['ナイス！💥', 'ヒット！🎯', 'ダメージ！⚡', 'クリティカル！💫', 'すごい一撃！🔥'];

export default function BattlePage() {
  const [data, setData] = useState<SaveData | null>(null);
  const [phase, setPhase] = useState<'intro' | 'battle' | 'hit' | 'miss' | 'victory' | 'stageSelect'>('stageSelect');
  const [problem, setProblem] = useState<Problem | null>(null);
  const [bossHp, setBossHp] = useState(0);
  const [bossMaxHp, setBossMaxHp] = useState(0);
  const [onesDigit, setOnesDigit] = useState('');
  const [tensDigit, setTensDigit] = useState('');
  const [hundredsDigit, setHundredsDigit] = useState('');
  const [inputPhase, setInputPhase] = useState<'ones' | 'tens' | 'hundreds'>('ones');
  const [hitMsg, setHitMsg] = useState('');
  const [shakeClass, setShakeClass] = useState('');
  const [selectedStage, setSelectedStage] = useState(1);

  useEffect(() => {
    const d = loadData();
    setData(d);
    setSelectedStage(d.bossStage);
  }, []);

  const startBattle = useCallback((stage: number) => {
    const boss = getBoss(stage);
    setBossHp(boss.hp);
    setBossMaxHp(boss.hp);
    setSelectedStage(stage);
    setPhase('intro');
    setTimeout(() => {
      setPhase('battle');
      const p = generateProblem(stage);
      setProblem(p);
      setOnesDigit('');
      setTensDigit('');
      setHundredsDigit('');
      setInputPhase('ones');
    }, 2000);
  }, []);

  const nextProblem = useCallback(() => {
    const p = generateProblem(selectedStage);
    setProblem(p);
    setOnesDigit('');
    setTensDigit('');
    setHundredsDigit('');
    setInputPhase('ones');
    setPhase('battle');
  }, [selectedStage]);

  const checkAnswer = useCallback((ones: string, tens: string, hundreds: string) => {
    if (!problem || !data) return;
    const userAnswer = parseInt((hundreds || '0') + tens + ones, 10);
    const isCorrect = userAnswer === problem.answer;

    if (isCorrect) {
      const newHp = bossHp - 1;
      setBossHp(newHp);
      setShakeClass('boss-shake');
      setHitMsg(HIT_MESSAGES[Math.floor(Math.random() * HIT_MESSAGES.length)]);
      setTimeout(() => setShakeClass(''), 500);

      if (newHp <= 0) {
        // ボス撃破！
        const boss = getBoss(selectedStage);
        const newData = { ...data };
        newData.coins += boss.reward.coins;
        if (!newData.bossDefeated.includes(boss.id)) {
          newData.bossDefeated = [...newData.bossDefeated, boss.id];
        }
        if (selectedStage >= newData.bossStage && selectedStage < BOSSES.length) {
          newData.bossStage = selectedStage + 1;
        }
        saveData(newData);
        setData(newData);
        setTimeout(() => setPhase('victory'), 800);
      } else {
        setPhase('hit');
        setTimeout(() => nextProblem(), 1200);
      }
    } else {
      setPhase('miss');
    }
  }, [problem, data, bossHp, selectedStage, nextProblem]);

  const handleNumpad = (num: number) => {
    if (phase !== 'battle') return;
    if (inputPhase === 'ones') {
      setOnesDigit(String(num));
      setTimeout(() => setInputPhase('tens'), 200);
    } else if (inputPhase === 'tens') {
      const newTens = String(num);
      setTensDigit(newTens);
      setTimeout(() => {
        if (problem && problem.answer >= 100) {
          setInputPhase('hundreds');
        } else {
          checkAnswer(onesDigit, newTens, '');
        }
      }, 200);
    } else if (inputPhase === 'hundreds') {
      const newHundreds = String(num);
      setHundredsDigit(newHundreds);
      setTimeout(() => {
        checkAnswer(onesDigit, tensDigit, newHundreds);
      }, 200);
    }
  };

  const handleClear = () => {
    if (inputPhase === 'ones') setOnesDigit('');
    else if (inputPhase === 'tens') {
      setTensDigit('');
      setInputPhase('ones');
      setOnesDigit('');
    } else if (inputPhase === 'hundreds') {
      setHundredsDigit('');
      setInputPhase('tens');
      setTensDigit('');
    }
  };

  if (!data) return null;

  const boss = getBoss(selectedStage);
  const hpPercent = bossMaxHp > 0 ? Math.max(0, (bossHp / bossMaxHp) * 100) : 100;

  const cellStyle = (target: 'ones' | 'tens' | 'hundreds', value: string) => {
    const isActive = inputPhase === target && phase === 'battle';
    const filled = value !== '';
    let base = 'w-12 h-14 text-center text-4xl border-2 rounded-lg font-mono flex items-center justify-center';
    if (phase === 'hit') return `${base} border-green-400 bg-green-50 text-green-600`;
    if (phase === 'miss') return `${base} border-red-400 bg-red-50 text-red-600`;
    if (isActive) return `${base} border-purple-500 bg-purple-50 ring-2 ring-purple-300`;
    if (filled) return `${base} border-green-300 bg-green-50 text-green-700`;
    return `${base} border-gray-300 bg-gray-50 text-gray-400`;
  };

  // ステージセレクト
  if (phase === 'stageSelect') {
    return (
      <div className="min-h-dvh bg-gradient-to-b from-slate-800 to-slate-900 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="text-2xl">🏠</Link>
            <h1 className="text-2xl font-bold text-white">⚔️ ボスバトル</h1>
            <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
              <span>🪙</span>
              <span className="font-bold text-yellow-700">{data.coins}</span>
            </div>
          </div>

          <div className="space-y-3">
            {BOSSES.map((b, i) => {
              const unlocked = i + 1 <= data.bossStage;
              const defeated = data.bossDefeated.includes(b.id);
              return (
                <button
                  key={b.id}
                  onClick={() => unlocked && startBattle(i + 1)}
                  disabled={!unlocked}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition active:scale-[0.98]
                    ${unlocked
                      ? defeated
                        ? 'bg-gradient-to-r from-green-700 to-green-800 ring-2 ring-green-400'
                        : 'bg-gradient-to-r from-slate-600 to-slate-700 ring-1 ring-slate-500'
                      : 'bg-slate-800 opacity-50'
                    }`}
                >
                  <div className="w-14 h-14 rounded-xl bg-black/30 flex items-center justify-center overflow-hidden">
                    {unlocked ? (
                      <img src={b.image} alt={b.name} className="w-12 h-12 object-contain" />
                    ) : (
                      <span className="text-3xl">❓</span>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-white font-bold text-lg">
                      {unlocked ? `ステージ${i + 1}: ${b.name}` : `ステージ${i + 1}: ???`}
                    </p>
                    <p className="text-slate-300 text-sm">
                      {unlocked ? `HP: ${b.hp} ❤️` : 'まだ挑戦できないよ'}
                    </p>
                  </div>
                  <div className="text-2xl">
                    {defeated ? '⭐' : unlocked ? '⚔️' : '🔒'}
                  </div>
                </button>
              );
            })}
          </div>

          {data.bossStage > BOSSES.length && (
            <div className="mt-6 text-center">
              <p className="text-yellow-400 text-xl font-bold">🎉 全ステージクリア！</p>
              <p className="text-slate-300 text-sm mt-1">キミはひっさんマスターだ！</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-dvh bg-gradient-to-b ${boss.color} flex flex-col`}>
      {/* ヘッダー */}
      <div className="flex items-center justify-between p-4">
        <button onClick={() => setPhase('stageSelect')} className="text-2xl">🔙</button>
        <span className="text-white font-bold">ステージ {selectedStage}</span>
        <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
          <span>🪙</span>
          <span className="font-bold text-white">{data.coins}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center max-w-md mx-auto w-full px-4">
        {/* イントロ */}
        {phase === 'intro' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 animate-pulse">
            <p className="text-white text-2xl font-bold">{boss.emoji} {boss.name}が あらわれた！</p>
            <div className={`w-40 h-40 rounded-full bg-black/20 flex items-center justify-center ${shakeClass}`}>
              <img src={boss.image} alt={boss.name} className="w-32 h-32 object-contain" />
            </div>
          </div>
        )}

        {/* バトル中 / ヒット / ミス */}
        {(phase === 'battle' || phase === 'hit' || phase === 'miss') && problem && (
          <>
            {/* ボスエリア */}
            <div className="w-full mb-4">
              {/* ボス名 & HP */}
              <div className="text-center mb-2">
                <p className="text-white font-bold text-lg">{boss.emoji} {boss.name}</p>
              </div>
              <div className="bg-black/30 rounded-full h-6 overflow-hidden mx-4 mb-3">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${hpPercent > 50 ? 'bg-green-400' : hpPercent > 25 ? 'bg-yellow-400' : 'bg-red-400'}`}
                  style={{ width: `${hpPercent}%` }}
                />
              </div>
              <p className="text-center text-white/80 text-sm">❤️ {bossHp} / {bossMaxHp}</p>

              {/* ボスキャラ */}
              <div className="flex justify-center my-3">
                <div className={`w-28 h-28 rounded-full bg-black/20 flex items-center justify-center relative ${shakeClass}`}>
                  <img src={boss.image} alt={boss.name} className="w-24 h-24 object-contain" />
                  {phase === 'hit' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl animate-bounce">{hitMsg}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* ボスのセリフ */}
              <div className="bg-white/20 rounded-xl px-4 py-2 mx-4">
                <p className="text-white text-center text-sm font-bold">
                  「{phase === 'miss'
                    ? 'ハハハ！ざんねん！'
                    : boss.attackLines[Math.min(bossMaxHp - bossHp, boss.attackLines.length - 1)]}」
                </p>
              </div>
            </div>

            {/* 筆算表示 */}
            <div className="bg-white rounded-2xl shadow-lg p-5 max-w-[260px] w-full">
              <div className="font-mono text-4xl space-y-1">
                <div className="text-right pr-2 flex justify-end">
                  {problem.answer >= 100 && <span className="inline-block w-12" />}
                  {String(problem.top).split('').map((d, i) => (
                    <span key={i} className="inline-block w-12 text-center">{d}</span>
                  ))}
                </div>
                <div className="text-right pr-2 flex justify-end items-center">
                  <span className="inline-block w-8 text-center text-2xl text-gray-500">
                    {problem.operation === 'add' ? '＋' : '−'}
                  </span>
                  {problem.answer >= 100 && <span className="inline-block w-4" />}
                  {String(problem.bottom).split('').map((d, i) => (
                    <span key={i} className="inline-block w-12 text-center">{d}</span>
                  ))}
                </div>
                <div className="border-b-4 border-gray-800 mx-1" />
                <div className="text-right pr-2 flex justify-end items-center pt-2 gap-1">
                  {problem.answer >= 100 && (
                    <div className={cellStyle('hundreds', hundredsDigit)}>
                      {hundredsDigit || (inputPhase === 'hundreds' && phase === 'battle' ? '?' : '')}
                    </div>
                  )}
                  <div className={cellStyle('tens', tensDigit)}>
                    {tensDigit || (inputPhase === 'tens' && phase === 'battle' ? '?' : '')}
                  </div>
                  <div className={cellStyle('ones', onesDigit)}>
                    {onesDigit || (inputPhase === 'ones' && phase === 'battle' ? '?' : '')}
                  </div>
                </div>
              </div>
            </div>

            {/* ミス時 */}
            {phase === 'miss' && (
              <div className="text-center mt-4 space-y-3">
                <p className="text-white text-2xl font-bold">❌ おしい！</p>
                <p className="text-white/80">こたえは <span className="text-yellow-300 text-2xl font-bold">{problem.answer}</span> だよ</p>
                <button
                  onClick={nextProblem}
                  className="bg-white text-purple-700 font-bold text-xl py-3 px-8 rounded-xl shadow active:scale-95 transition"
                >
                  もういっかい！
                </button>
              </div>
            )}
          </>
        )}

        {/* 勝利 */}
        {phase === 'victory' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
            <p className="text-4xl font-bold text-yellow-300 animate-bounce">🎉 勝利！</p>
            <div className="w-32 h-32 rounded-full bg-black/20 flex items-center justify-center opacity-50">
              <img src={boss.image} alt={boss.name} className="w-28 h-28 object-contain" />
            </div>
            <div className="bg-white/20 rounded-xl px-6 py-3">
              <p className="text-white font-bold">「{boss.defeatLine}」</p>
            </div>
            <div className="bg-yellow-400 rounded-2xl px-6 py-4 shadow-lg">
              <p className="text-yellow-900 font-bold text-xl">🪙 +{boss.reward.coins} コイン GET！</p>
            </div>
            <div className="space-y-3 w-full max-w-xs">
              {selectedStage < BOSSES.length && (
                <button
                  onClick={() => startBattle(selectedStage + 1)}
                  className="w-full bg-white text-purple-700 font-bold text-xl py-3 rounded-xl shadow active:scale-95 transition"
                >
                  つぎのボスへ →
                </button>
              )}
              <button
                onClick={() => setPhase('stageSelect')}
                className="w-full bg-white/30 text-white font-bold text-lg py-3 rounded-xl active:scale-95 transition"
              >
                ステージ選択にもどる
              </button>
            </div>
          </div>
        )}
      </div>

      {/* テンキー */}
      {phase === 'battle' && (
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
