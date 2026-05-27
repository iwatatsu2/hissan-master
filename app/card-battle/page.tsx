'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Problem, Operation, SaveData } from '@/lib/types';
import { loadData, saveData } from '@/lib/storage';
import { BOSS_CARDS, BossCard, getBossCard } from '@/lib/boss-cards';

type Difficulty = 'easy' | 'normal' | 'hard';
type Phase = 'deckSelect' | 'intro' | 'battle' | 'hit' | 'miss' | 'roundResult' | 'result';

function generateProblem(difficulty: Difficulty): Problem {
  const ops: Operation[] = difficulty === 'easy' ? ['add'] : ['add', 'sub'];
  const op = ops[Math.floor(Math.random() * ops.length)];
  const maxNum = difficulty === 'easy' ? 50 : difficulty === 'normal' ? 80 : 99;

  let top: number, bottom: number, answer: number;
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

function getCpuDeck(difficulty: Difficulty, playerCards: BossCard[]): BossCard[] {
  // CPUはプレイヤーが持っていないカードも含む全カードからランダムに選ぶ
  const pool = BOSS_CARDS.filter(c => !playerCards.find(p => p.id === c.id));
  const allPool = pool.length >= 3 ? pool : BOSS_CARDS;

  // 難易度でフィルタ
  let filtered: BossCard[];
  if (difficulty === 'easy') {
    filtered = allPool.filter(c => c.rarity === '★★★★');
  } else if (difficulty === 'hard') {
    filtered = allPool.filter(c => c.rarity === '★★★★★');
  } else {
    filtered = [...allPool];
  }
  if (filtered.length < 3) filtered = [...allPool];

  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

const REWARD_COINS: Record<Difficulty, number> = { easy: 5, normal: 10, hard: 20 };

export default function CardBattlePage() {
  const [data, setData] = useState<SaveData | null>(null);
  const [phase, setPhase] = useState<Phase>('deckSelect');
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
  const [playerDeck, setPlayerDeck] = useState<BossCard[]>([]);
  const [cpuDeck, setCpuDeck] = useState<BossCard[]>([]);
  const [round, setRound] = useState(0); // 0-2
  const [playerWins, setPlayerWins] = useState(0);
  const [cpuWins, setCpuWins] = useState(0);
  const [playerHp, setPlayerHp] = useState(0);
  const [cpuHp, setCpuHp] = useState(0);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [onesDigit, setOnesDigit] = useState('');
  const [tensDigit, setTensDigit] = useState('');
  const [hundredsDigit, setHundredsDigit] = useState('');
  const [inputPhase, setInputPhase] = useState<'ones' | 'tens' | 'hundreds'>('ones');
  const [shakePlayer, setShakePlayer] = useState(false);
  const [shakeCpu, setShakeCpu] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [roundWinner, setRoundWinner] = useState<'player' | 'cpu' | null>(null);
  const [damageText, setDamageText] = useState('');

  useEffect(() => {
    setData(loadData());
  }, []);

  const ownedCards = data ? BOSS_CARDS.filter(c => data.bossCards.includes(c.id)) : [];

  const toggleSelect = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else if (selectedIds.length < 3) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const startBattle = useCallback(() => {
    const deck = selectedIds.map(id => getBossCard(id)!);
    const cpu = getCpuDeck(difficulty, deck);
    setPlayerDeck(deck);
    setCpuDeck(cpu);
    setRound(0);
    setPlayerWins(0);
    setCpuWins(0);
    setPhase('intro');

    setTimeout(() => {
      setPlayerHp(deck[0].hp);
      setCpuHp(cpu[0].hp);
      const p = generateProblem(difficulty);
      setProblem(p);
      resetInput();
      setPhase('battle');
    }, 1500);
  }, [selectedIds, difficulty]);

  const resetInput = () => {
    setOnesDigit('');
    setTensDigit('');
    setHundredsDigit('');
    setInputPhase('ones');
  };

  const nextRoundOrFinish = useCallback((pWins: number, cWins: number, currentRound: number) => {
    // 2本先取 or 3ラウンド終了
    if (pWins >= 2 || cWins >= 2 || currentRound >= 2) {
      setTimeout(() => {
        if (pWins > cWins && data) {
          const newData = { ...data };
          newData.coins += REWARD_COINS[difficulty];
          saveData(newData);
          setData(newData);
        }
        setPhase('result');
      }, 1500);
    } else {
      // 次のラウンド
      const nextR = currentRound + 1;
      setTimeout(() => {
        setRound(nextR);
        setPlayerHp(playerDeck[nextR].hp);
        setCpuHp(cpuDeck[nextR].hp);
        const p = generateProblem(difficulty);
        setProblem(p);
        resetInput();
        setRoundWinner(null);
        setPhase('battle');
      }, 1500);
    }
  }, [data, difficulty, playerDeck, cpuDeck]);

  const checkAnswer = useCallback((ones: string, tens: string, hundreds: string) => {
    if (!problem) return;
    const userAnswer = parseInt((hundreds || '0') + tens + ones, 10);
    const isCorrect = userAnswer === problem.answer;

    const myCard = playerDeck[round];
    const cpuCard = cpuDeck[round];

    if (isCorrect) {
      // プレイヤー攻撃: ATK - 相手DEF*0.3
      const dmg = Math.max(10, Math.round(myCard.atk - cpuCard.def * 0.3));
      const newCpuHp = cpuHp - dmg;
      setCpuHp(newCpuHp);
      setShakeCpu(true);
      setDamageText(`-${dmg}`);
      setTimeout(() => { setShakeCpu(false); setDamageText(''); }, 600);

      if (newCpuHp <= 0) {
        // ラウンド勝利
        const newPW = playerWins + 1;
        setPlayerWins(newPW);
        setRoundWinner('player');
        setPhase('roundResult');
        nextRoundOrFinish(newPW, cpuWins, round);
      } else {
        setPhase('hit');
        setTimeout(() => {
          const p = generateProblem(difficulty);
          setProblem(p);
          resetInput();
          setPhase('battle');
        }, 800);
      }
    } else {
      // CPU攻撃
      const dmg = Math.max(10, Math.round(cpuCard.atk - myCard.def * 0.3));
      const newPlayerHp = playerHp - dmg;
      setPlayerHp(newPlayerHp);
      setShakePlayer(true);
      setDamageText(`-${dmg}`);
      setTimeout(() => { setShakePlayer(false); setDamageText(''); }, 600);

      if (newPlayerHp <= 0) {
        // ラウンド敗北
        const newCW = cpuWins + 1;
        setCpuWins(newCW);
        setRoundWinner('cpu');
        setPhase('roundResult');
        nextRoundOrFinish(playerWins, newCW, round);
      } else {
        setPhase('miss');
      }
    }
  }, [problem, playerDeck, cpuDeck, round, cpuHp, playerHp, playerWins, cpuWins, difficulty, nextRoundOrFinish]);

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

  const retryAfterMiss = () => {
    const p = generateProblem(difficulty);
    setProblem(p);
    resetInput();
    setPhase('battle');
  };

  if (!data) return null;

  const cellStyle = (target: 'ones' | 'tens' | 'hundreds', value: string) => {
    const isActive = inputPhase === target && phase === 'battle';
    const filled = value !== '';
    const base = 'w-10 h-12 text-center text-3xl border-2 rounded-lg font-mono flex items-center justify-center';
    if (phase === 'hit') return `${base} border-green-400 bg-green-50 text-green-600`;
    if (phase === 'miss') return `${base} border-red-400 bg-red-50 text-red-600`;
    if (isActive) return `${base} border-blue-500 bg-blue-50 ring-2 ring-blue-300`;
    if (filled) return `${base} border-green-300 bg-green-50 text-green-700`;
    return `${base} border-gray-300 bg-gray-50 text-gray-400`;
  };

  // デッキ選択画面
  if (phase === 'deckSelect') {
    return (
      <div className="min-h-dvh bg-gradient-to-b from-indigo-900 to-purple-900 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="text-2xl">🏠</Link>
            <h1 className="text-xl font-bold text-white">🃏 カードバトル</h1>
            <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
              <span>🪙</span>
              <span className="font-bold text-yellow-700">{data.coins}</span>
            </div>
          </div>

          {ownedCards.length < 3 ? (
            <div className="text-center py-12">
              <p className="text-6xl mb-4">🃏</p>
              <p className="text-white text-xl font-bold mb-2">カードが足りないよ！</p>
              <p className="text-white/70">ボスバトルで3枚以上カードを集めよう</p>
              <Link href="/battle" className="inline-block mt-6 bg-orange-500 text-white font-bold py-3 px-8 rounded-xl">
                ⚔️ ボスバトルへ
              </Link>
            </div>
          ) : (
            <>
              {/* 難易度選択 */}
              <div className="mb-4">
                <p className="text-white/80 text-sm mb-2">むずかしさ</p>
                <div className="flex gap-2">
                  {([['easy', 'かんたん', '🟢'], ['normal', 'ふつう', '🟡'], ['hard', 'むずかしい', '🔴']] as const).map(([d, label, emoji]) => (
                    <button
                      key={d}
                      onClick={() => setDifficulty(d)}
                      className={`flex-1 py-2 rounded-xl font-bold text-sm transition ${
                        difficulty === d ? 'bg-white text-purple-800 shadow-lg' : 'bg-white/20 text-white'
                      }`}
                    >
                      {emoji} {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 選択中カード */}
              <div className="mb-4">
                <p className="text-white/80 text-sm mb-2">えらんだカード ({selectedIds.length}/3)</p>
                <div className="flex gap-2 justify-center h-28">
                  {[0, 1, 2].map(i => {
                    const card = selectedIds[i] ? getBossCard(selectedIds[i]) : null;
                    return (
                      <div key={i} className={`w-20 h-28 rounded-xl border-2 border-dashed overflow-hidden flex items-center justify-center
                        ${card ? 'border-yellow-400 bg-black/30' : 'border-white/30 bg-white/10'}`}>
                        {card ? (
                          <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-white/30 text-2xl">?</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* カード一覧 */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {ownedCards.map(card => {
                  const selected = selectedIds.includes(card.id);
                  return (
                    <button
                      key={card.id}
                      onClick={() => toggleSelect(card.id)}
                      className={`aspect-[3/4] rounded-xl overflow-hidden transition active:scale-95 relative
                        ${selected ? 'ring-3 ring-yellow-400 scale-105' : 'opacity-70'}`}
                    >
                      <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
                      {selected && (
                        <div className="absolute top-1 right-1 bg-yellow-400 text-yellow-900 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                          {selectedIds.indexOf(card.id) + 1}
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-1 py-0.5">
                        <p className="text-white text-[10px] truncate">{card.name}</p>
                        <p className="text-yellow-300 text-[9px]">ATK {card.atk}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* バトル開始ボタン */}
              <button
                onClick={startBattle}
                disabled={selectedIds.length < 3}
                className={`w-full py-4 rounded-2xl font-bold text-xl shadow-lg transition active:scale-95
                  ${selectedIds.length === 3
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                    : 'bg-gray-600 text-gray-400'}`}
              >
                {selectedIds.length === 3 ? '⚔️ バトル開始！' : `あと${3 - selectedIds.length}枚えらんでね`}
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  const myCard = playerDeck[round];
  const cpuCard = cpuDeck[round];
  const myHpPct = myCard ? Math.max(0, (playerHp / myCard.hp) * 100) : 0;
  const cpuHpPct = cpuCard ? Math.max(0, (cpuHp / cpuCard.hp) * 100) : 0;

  // イントロ
  if (phase === 'intro') {
    return (
      <div className="min-h-dvh bg-gradient-to-b from-indigo-900 to-purple-900 flex items-center justify-center">
        <div className="text-center space-y-6 animate-pulse">
          <p className="text-white text-2xl font-bold">⚔️ カードバトル開始！</p>
          <div className="flex items-center justify-center gap-8">
            <div className="w-24 h-32 rounded-xl overflow-hidden border-2 border-blue-400">
              <img src={playerDeck[0]?.image} alt="" className="w-full h-full object-cover" />
            </div>
            <span className="text-4xl text-yellow-400 font-bold">VS</span>
            <div className="w-24 h-32 rounded-xl overflow-hidden border-2 border-red-400">
              <img src={cpuDeck[0]?.image} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 結果画面
  if (phase === 'result') {
    const won = playerWins > cpuWins;
    return (
      <div className={`min-h-dvh bg-gradient-to-b ${won ? 'from-yellow-600 to-amber-800' : 'from-gray-700 to-gray-900'} flex items-center justify-center p-4`}>
        <div className="text-center space-y-6 max-w-md w-full">
          <p className={`text-4xl font-bold ${won ? 'text-yellow-200 animate-bounce' : 'text-gray-300'}`}>
            {won ? '🎉 勝利！' : '😢 負け…'}
          </p>
          <div className="flex justify-center gap-4">
            <div className="text-center">
              <p className="text-blue-300 font-bold">じぶん</p>
              <p className="text-white text-3xl font-bold">{playerWins}</p>
            </div>
            <p className="text-white text-3xl font-bold self-end">-</p>
            <div className="text-center">
              <p className="text-red-300 font-bold">あいて</p>
              <p className="text-white text-3xl font-bold">{cpuWins}</p>
            </div>
          </div>
          {won && (
            <div className="bg-yellow-400 rounded-2xl px-6 py-4 shadow-lg inline-block">
              <p className="text-yellow-900 font-bold text-xl">🪙 +{REWARD_COINS[difficulty]} コイン GET！</p>
            </div>
          )}
          <div className="space-y-3">
            <button
              onClick={() => {
                setPhase('deckSelect');
                setSelectedIds([]);
                setRoundWinner(null);
              }}
              className="w-full bg-white text-purple-700 font-bold text-xl py-3 rounded-xl shadow active:scale-95 transition"
            >
              もういちど
            </button>
            <Link
              href="/"
              className="block w-full bg-white/30 text-white font-bold text-lg py-3 rounded-xl active:scale-95 transition text-center"
            >
              ホームにもどる
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // バトル画面（battle / hit / miss / roundResult）
  return (
    <div className="min-h-dvh bg-gradient-to-b from-indigo-900 to-purple-900 flex flex-col">
      {/* ヘッダー */}
      <div className="flex items-center justify-between p-3">
        <button onClick={() => setPhase('deckSelect')} className="text-xl text-white">🔙</button>
        <div className="flex items-center gap-3">
          <span className="text-blue-300 font-bold">{playerWins}</span>
          <span className="text-white font-bold">Round {round + 1}/3</span>
          <span className="text-red-300 font-bold">{cpuWins}</span>
        </div>
        <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full text-sm">
          <span>🪙</span>
          <span className="font-bold text-white">{data.coins}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center max-w-md mx-auto w-full px-4">
        {/* 相手カード */}
        <div className="w-full mb-3">
          <div className="flex items-center gap-3 mb-1">
            <div className={`w-16 h-22 rounded-lg overflow-hidden border-2 border-red-400 flex-shrink-0 ${shakeCpu ? 'boss-shake' : ''}`}>
              <img src={cpuCard?.image} alt={cpuCard?.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-red-300 font-bold text-sm">{cpuCard?.name}</p>
              <div className="bg-black/30 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${cpuHpPct > 50 ? 'bg-green-400' : cpuHpPct > 25 ? 'bg-yellow-400' : 'bg-red-400'}`}
                  style={{ width: `${cpuHpPct}%` }}
                />
              </div>
              <p className="text-white/60 text-xs">HP {Math.max(0, cpuHp)} / {cpuCard?.hp} | ATK {cpuCard?.atk}</p>
            </div>
          </div>
        </div>

        {/* ラウンド結果 */}
        {phase === 'roundResult' && (
          <div className="my-4 text-center">
            <p className={`text-2xl font-bold ${roundWinner === 'player' ? 'text-blue-300' : 'text-red-300'}`}>
              {roundWinner === 'player' ? '✨ ラウンド勝利！' : '💥 ラウンド敗北…'}
            </p>
          </div>
        )}

        {/* 筆算表示 */}
        {(phase === 'battle' || phase === 'hit' || phase === 'miss') && problem && (
          <div className="bg-white rounded-2xl shadow-lg p-4 max-w-[240px] w-full my-2">
            <div className="font-mono text-3xl space-y-1">
              <div className="text-right pr-2 flex justify-end">
                {problem.answer >= 100 && <span className="inline-block w-10" />}
                {String(problem.top).split('').map((d, i) => (
                  <span key={i} className="inline-block w-10 text-center">{d}</span>
                ))}
              </div>
              <div className="text-right pr-2 flex justify-end items-center">
                <span className="inline-block w-7 text-center text-xl text-gray-500">
                  {problem.operation === 'add' ? '＋' : '−'}
                </span>
                {problem.answer >= 100 && <span className="inline-block w-3" />}
                {String(problem.bottom).split('').map((d, i) => (
                  <span key={i} className="inline-block w-10 text-center">{d}</span>
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
        )}

        {/* ヒット・ミスメッセージ */}
        {phase === 'hit' && (
          <p className="text-green-300 font-bold text-lg animate-bounce">💥 ヒット！</p>
        )}
        {phase === 'miss' && problem && (
          <div className="text-center mt-2 space-y-2">
            <p className="text-red-300 font-bold text-lg">❌ おしい！</p>
            <p className="text-white/80 text-sm">こたえは <span className="text-yellow-300 font-bold text-lg">{problem.answer}</span></p>
            <button
              onClick={retryAfterMiss}
              className="bg-white text-purple-700 font-bold py-2 px-6 rounded-xl shadow active:scale-95 transition"
            >
              つぎの問題へ
            </button>
          </div>
        )}

        {/* 自分のカード */}
        <div className="w-full mt-auto mb-2">
          <div className="flex items-center gap-3">
            <div className={`w-16 h-22 rounded-lg overflow-hidden border-2 border-blue-400 flex-shrink-0 ${shakePlayer ? 'boss-shake' : ''}`}>
              <img src={myCard?.image} alt={myCard?.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-blue-300 font-bold text-sm">{myCard?.name}</p>
              <div className="bg-black/30 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${myHpPct > 50 ? 'bg-green-400' : myHpPct > 25 ? 'bg-yellow-400' : 'bg-red-400'}`}
                  style={{ width: `${myHpPct}%` }}
                />
              </div>
              <p className="text-white/60 text-xs">HP {Math.max(0, playerHp)} / {myCard?.hp} | ATK {myCard?.atk}</p>
            </div>
          </div>
        </div>
      </div>

      {/* テンキー */}
      {phase === 'battle' && (
        <div className="sticky bottom-0 bg-indigo-950 border-t-2 border-indigo-700 p-3 pb-[env(safe-area-inset-bottom)]">
          <div className="max-w-xs mx-auto">
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <button
                  key={n}
                  onClick={() => handleNumpad(n)}
                  className="bg-indigo-800 hover:bg-indigo-700 active:bg-indigo-600 text-white text-2xl font-bold py-3 rounded-xl shadow transition active:scale-95"
                >
                  {n}
                </button>
              ))}
              <button
                onClick={handleClear}
                className="bg-red-900 hover:bg-red-800 active:bg-red-700 text-red-300 text-lg font-bold py-3 rounded-xl shadow transition active:scale-95"
              >
                もどる
              </button>
              <button
                onClick={() => handleNumpad(0)}
                className="bg-indigo-800 hover:bg-indigo-700 active:bg-indigo-600 text-white text-2xl font-bold py-3 rounded-xl shadow transition active:scale-95"
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
