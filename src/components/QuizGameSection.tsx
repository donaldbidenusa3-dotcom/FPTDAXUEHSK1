import React, { useState, useEffect } from "react";
import { Flashcard, INITIAL_FLASHCARDS } from "../data/flashcards";
import { speakText } from "../utils/diff";
import {
  Trophy,
  RotateCw,
  CheckCircle2,
  XCircle,
  Clock,
  Volume2,
  Award,
  BookCheck,
  RefreshCcw,
  Eye,
  EyeOff
} from "lucide-react";

type GameMode = "match" | "mcq";
type QuizDirection = "hanzi_to_meaning" | "meaning_to_hanzi" | "mixed";

interface MatchTile {
  id: string;
  cardId: string;
  text: string;
  subText?: string;
  type: "hanzi" | "meaning";
  isMatched: boolean;
  isSelected: boolean;
}

interface McqQuestion {
  questionCard: Flashcard;
  options: Flashcard[];
  correctCardId: string;
  type: "hanzi_to_meaning" | "meaning_to_hanzi";
}

export const QuizGameSection: React.FC = () => {
  const [cards] = useState<Flashcard[]>(() => {
    const saved = localStorage.getItem("hsk1_flashcards");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_FLASHCARDS;
      }
    }
    return INITIAL_FLASHCARDS;
  });

  const [mode, setMode] = useState<GameMode>("mcq");
  const [quizDirection, setQuizDirection] =
    useState<QuizDirection>("hanzi_to_meaning");

  // === DANH SÁCH CÁC CÂU ĐÃ LÀM ĐÚNG (PERSISTENCE) ===
  const [masteredCardIds, setMasteredCardIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("hsk1_mastered_cards");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [showMasteredList, setShowMasteredList] = useState(false);
  const [confirmingReset, setConfirmingReset] = useState(false);

  useEffect(() => {
    localStorage.setItem("hsk1_mastered_cards", JSON.stringify(masteredCardIds));
  }, [masteredCardIds]);

  // === MATCH GAME STATE ===
  const [matchTiles, setMatchTiles] = useState<MatchTile[]>([]);
  const [firstSelected, setFirstSelected] = useState<MatchTile | null>(null);
  const [matchSeconds, setMatchSeconds] = useState(0);
  const [isMatchActive, setIsMatchActive] = useState(false);
  const [matchFinished, setMatchFinished] = useState(false);
  const [bestMatchTime, setBestMatchTime] = useState<number | null>(() => {
    const b = localStorage.getItem("hsk1_best_match_time");
    return b ? parseFloat(b) : null;
  });

  // === MCQ GAME STATE ===
  const [mcqQuestions, setMcqQuestions] = useState<McqQuestion[]>([]);
  const [currentMcqIndex, setCurrentMcqIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [mcqScore, setMcqScore] = useState(0);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [mcqFinished, setMcqFinished] = useState(false);

  // Lọc ra các từ CHƯA làm đúng
  const availableCardsForMcq = cards.filter(
    (c) => !masteredCardIds.includes(c.id)
  );

  // Khởi tạo trò chơi Match (6 cặp thẻ ngẫu nhiên)
  const initMatchGame = (masteredOverride?: string[]) => {
    const activeMastered = masteredOverride ?? masteredCardIds;
    const unmastered = cards.filter((c) => !activeMastered.includes(c.id));
    const candidates = unmastered.length >= 6 ? unmastered : cards;
    const pool = [...candidates].sort(() => Math.random() - 0.5).slice(0, 6);
    const tiles: MatchTile[] = [];

    pool.forEach((c) => {
      tiles.push({
        id: `hz-${c.id}`,
        cardId: c.id,
        text: c.hanzi,
        subText: c.pinyin,
        type: "hanzi",
        isMatched: false,
        isSelected: false
      });
      tiles.push({
        id: `mn-${c.id}`,
        cardId: c.id,
        text: c.meaning,
        type: "meaning",
        isMatched: false,
        isSelected: false
      });
    });

    setMatchTiles(tiles.sort(() => Math.random() - 0.5));
    setFirstSelected(null);
    setMatchSeconds(0);
    setIsMatchActive(true);
    setMatchFinished(false);
  };

  // Timer cho match game
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (isMatchActive && !matchFinished) {
      timer = setInterval(() => {
        setMatchSeconds((s) => s + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isMatchActive, matchFinished]);

  // Khởi tạo MCQ: Chọn từ danh sách CHƯA làm đúng và theo kiểu câu hỏi đã chọn
  const initMcqGame = (
    masteredOverride?: string[],
    directionOverride?: QuizDirection
  ) => {
    const activeMastered = masteredOverride ?? masteredCardIds;
    const activeDirection = directionOverride ?? quizDirection;
    const remainingCards = cards.filter((c) => !activeMastered.includes(c.id));

    // Nếu đã học hết tất cả các thẻ
    if (remainingCards.length === 0) {
      setMcqQuestions([]);
      setCurrentMcqIndex(0);
      setSelectedOptionId(null);
      setMcqScore(0);
      setIsAnswerChecked(false);
      setMcqFinished(true);
      return;
    }

    const questionPool = [...remainingCards]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);

    const questions: McqQuestion[] = questionPool.map((questionCard) => {
      // 3 lựa chọn gây nhiễu từ toàn bộ kho cards
      const distractors = cards
        .filter((c) => c.id !== questionCard.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      const options = [questionCard, ...distractors].sort(
        () => Math.random() - 0.5
      );
      const type: "hanzi_to_meaning" | "meaning_to_hanzi" =
        activeDirection === "mixed"
          ? Math.random() > 0.5
            ? "hanzi_to_meaning"
            : "meaning_to_hanzi"
          : activeDirection;

      return {
        questionCard,
        options,
        correctCardId: questionCard.id,
        type
      };
    });

    setMcqQuestions(questions);
    setCurrentMcqIndex(0);
    setSelectedOptionId(null);
    setMcqScore(0);
    setIsAnswerChecked(false);
    setMcqFinished(false);
  };

  useEffect(() => {
    if (mode === "match") {
      initMatchGame();
    } else {
      initMcqGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // Thay đổi linh hoạt loại Quiz (Nhìn chữ đoán nghĩa <-> Nhìn nghĩa đoán chữ <-> Trộn)
  const handleChangeQuizDirection = (newDir: QuizDirection) => {
    setQuizDirection(newDir);
    initMcqGame(masteredCardIds, newDir);
  };

  // Xử lý click tile trong trò chơi Match
  const handleTileClick = (tile: MatchTile) => {
    if (tile.isMatched || tile.isSelected) return;

    if (tile.type === "hanzi") {
      speakText(tile.text);
    }

    if (!firstSelected) {
      setFirstSelected(tile);
      setMatchTiles((prev) =>
        prev.map((t) => (t.id === tile.id ? { ...t, isSelected: true } : t))
      );
    } else {
      if (firstSelected.type === tile.type) {
        setMatchTiles((prev) =>
          prev.map((t) =>
            t.id === firstSelected.id
              ? { ...t, isSelected: false }
              : t.id === tile.id
              ? { ...t, isSelected: true }
              : t
          )
        );
        setFirstSelected(tile);
        return;
      }

      const prevSelectedId = firstSelected.id;
      const isCorrectMatch = firstSelected.cardId === tile.cardId;

      if (isCorrectMatch) {
        const updated = matchTiles.map((t) =>
          t.cardId === tile.cardId
            ? { ...t, isMatched: true, isSelected: false }
            : t
        );
        setMatchTiles(updated);
        setFirstSelected(null);

        if (!masteredCardIds.includes(tile.cardId)) {
          setMasteredCardIds((prev) => [...prev, tile.cardId]);
        }

        const remaining = updated.filter((t) => !t.isMatched);
        if (remaining.length === 0) {
          setMatchFinished(true);
          setIsMatchActive(false);
          const finalTime = matchSeconds;
          if (!bestMatchTime || finalTime < bestMatchTime) {
            setBestMatchTime(finalTime);
            localStorage.setItem("hsk1_best_match_time", finalTime.toString());
          }
        }
      } else {
        setMatchTiles((prev) =>
          prev.map((t) => (t.id === tile.id ? { ...t, isSelected: true } : t))
        );
        setTimeout(() => {
          setMatchTiles((prev) =>
            prev.map((t) =>
              t.id === prevSelectedId || t.id === tile.id
                ? { ...t, isSelected: false }
                : t
            )
          );
          setFirstSelected(null);
        }, 600);
      }
    }
  };

  // Xử lý chọn đáp án MCQ
  const handleMcqSelect = (optionId: string) => {
    if (isAnswerChecked) return;
    setSelectedOptionId(optionId);
  };

  const handleMcqCheck = () => {
    if (!selectedOptionId || isAnswerChecked) return;
    const currentQ = mcqQuestions[currentMcqIndex];
    const isCorrect = selectedOptionId === currentQ.correctCardId;

    if (isCorrect) {
      setMcqScore((s) => s + 1);
      // GHI NHỚ: Câu này đã làm đúng -> loại bỏ khỏi danh sách ôn tập các lần sau!
      if (!masteredCardIds.includes(currentQ.correctCardId)) {
        setMasteredCardIds((prev) => [...prev, currentQ.correctCardId]);
      }
    }
    setIsAnswerChecked(true);
  };

  const handleMcqNext = () => {
    if (currentMcqIndex + 1 < mcqQuestions.length) {
      setCurrentMcqIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerChecked(false);
    } else {
      setMcqFinished(true);
    }
  };

  // Đặt lại toàn bộ tiến độ (không dùng window.confirm vì iframe chặn confirm)
  const executeResetMastered = () => {
    const empty: string[] = [];
    setMasteredCardIds(empty);
    localStorage.removeItem("hsk1_mastered_cards");
    setShowMasteredList(false);
    setConfirmingReset(false);
    if (mode === "mcq") {
      initMcqGame(empty, quizDirection);
    } else {
      initMatchGame(empty);
    }
  };

  const currentQ = mcqQuestions[currentMcqIndex];

  // Danh sách các thẻ đã làm đúng (lọc khớp với cards hiện tại)
  const masteredCardsList = cards.filter((c) => masteredCardIds.includes(c.id));
  const masteredPercentage =
    cards.length > 0
      ? Math.min(100, Math.round((masteredCardsList.length / cards.length) * 100))
      : 0;

  return (
    <div className="space-y-8">
      {/* Header & Chọn Chế độ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-950/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 uppercase tracking-widest">
            <span>Học Tương Tác · HSK 1</span>
            <span aria-hidden="true">·</span>
            <span>Không lặp lại câu đã nắm vững</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">
            Chế Độ Học & Kiểm Tra Từ Vựng
          </h2>
        </div>

        {/* Tab chuyển đổi chế độ */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100/90 rounded-lg border border-stone-200 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setMode("mcq")}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
              mode === "mcq"
                ? "bg-white text-emerald-900 shadow-xs font-bold"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            Trắc Nghiệm (Quiz)
          </button>
          <button
            type="button"
            onClick={() => setMode("match")}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
              mode === "match"
                ? "bg-white text-emerald-900 shadow-xs font-bold"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            Nối Thẻ (Match)
          </button>
        </div>
      </div>

      {/* Thanh Thống Kê Tiến Độ Đã Làm Đúng & Nút Reset hoạt động trực tiếp */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5 text-emerald-800" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-stone-500">
              Tiến độ làm chủ từ vựng HSK 1:
            </div>
            <div className="text-sm font-medium text-stone-900 mt-0.5">
              Đã làm đúng chính xác:{" "}
              <strong className="text-emerald-800 font-bold font-mono text-base">
                {masteredCardsList.length}
              </strong>{" "}
              / {cards.length} từ ({masteredPercentage}%)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap self-end sm:self-auto">
          {masteredCardsList.length > 0 && (
            <button
              type="button"
              onClick={() => setShowMasteredList(!showMasteredList)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors"
            >
              {showMasteredList ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-stone-500" />
                  <span>Ẩn danh sách đã đúng</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Xem {masteredCardsList.length} câu đã đúng</span>
                </>
              )}
            </button>
          )}

          {!confirmingReset ? (
            <button
              type="button"
              onClick={() => setConfirmingReset(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-stone-700 bg-white hover:bg-red-50 hover:text-red-700 hover:border-red-200 border border-stone-200 rounded-lg transition-colors shadow-2xs"
              title="Đặt lại các câu đã làm đúng để luyện tập lại từ đầu"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              <span>Reset tiến độ</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 px-2.5 py-1.5 rounded-lg">
              <span className="text-xs font-medium text-red-800">
                Xác nhận xóa tiến độ?
              </span>
              <button
                type="button"
                onClick={executeResetMastered}
                className="px-2.5 py-1 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              >
                Đồng ý Reset
              </button>
              <button
                type="button"
                onClick={() => setConfirmingReset(false)}
                className="px-2 py-1 text-xs font-medium text-stone-600 hover:text-stone-900"
              >
                Hủy
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Danh sách các câu đã làm đúng nếu người dùng bấm xem lại */}
      {showMasteredList && (
        <div className="bg-emerald-50/40 rounded-2xl border border-emerald-200 p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-emerald-200/60 pb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2">
              <BookCheck className="w-4 h-4 text-emerald-700" />
              <span>
                Danh sách các từ bạn đã làm đúng (không lặp lại trong đề thi):
              </span>
            </h4>
            <span className="text-xs font-mono text-emerald-800 font-semibold">
              {masteredCardsList.length} từ
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-60 overflow-y-auto pr-1">
            {masteredCardsList.map((c) => (
              <div
                key={c.id}
                className="p-2.5 bg-white rounded-lg border border-emerald-100 flex items-center justify-between shadow-2xs"
              >
                <div>
                  <div className="font-serif font-bold text-stone-900 text-base">
                    {c.hanzi}
                  </div>
                  <div className="text-2xs text-emerald-800">{c.pinyin}</div>
                  <div className="text-xs text-stone-600 line-clamp-1">
                    {c.meaning}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => speakText(c.hanzi)}
                  className="p-1 text-stone-400 hover:text-emerald-700"
                  title="Nghe phát âm"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* CHẾ ĐỘ 1: TRẮC NGHIỆM THÔNG MINH (MCQ - KHÔNG LẶP CÂU ĐÚNG) */}
      {/* ========================================================= */}
      {mode === "mcq" && (
        <div className="space-y-5 max-w-2xl mx-auto">
          {/* Bộ chọn 2 loại hình thức Quiz linh hoạt */}
          <div className="bg-white rounded-xl border border-stone-200 p-2.5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-semibold text-stone-600 px-2">
              Hình thức câu hỏi:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleChangeQuizDirection("hanzi_to_meaning")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border ${
                  quizDirection === "hanzi_to_meaning"
                    ? "bg-emerald-800 text-white border-emerald-900 shadow-2xs"
                    : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                }`}
              >
                Nhìn mặt chữ đoán nghĩa
              </button>
              <button
                type="button"
                onClick={() => handleChangeQuizDirection("meaning_to_hanzi")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border ${
                  quizDirection === "meaning_to_hanzi"
                    ? "bg-emerald-800 text-white border-emerald-900 shadow-2xs"
                    : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                }`}
              >
                Nhìn nghĩa đoán mặt chữ
              </button>
              <button
                type="button"
                onClick={() => handleChangeQuizDirection("mixed")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border ${
                  quizDirection === "mixed"
                    ? "bg-amber-700 text-white border-amber-800 shadow-2xs"
                    : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                }`}
              >
                Trộn cả 2
              </button>
            </div>
          </div>

          {availableCardsForMcq.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-8 space-y-4 shadow-xs">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                Chúc Mừng! Bạn Đã Làm Đúng Toàn Bộ {cards.length} Từ Vựng HSK 1!
              </h3>
              <p className="text-stone-600 text-sm">
                Bạn đã trả lời chính xác tất cả các từ trong kho dữ liệu đề thi.
                Nếu muốn ôn tập lại từ đầu, hãy nhấn nút bên dưới.
              </p>
              <button
                type="button"
                onClick={executeResetMastered}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-800 text-white font-semibold text-sm rounded-lg hover:bg-emerald-900 transition-colors shadow-xs"
              >
                <RefreshCcw className="w-4 h-4" />
                <span>Reset và học lại từ đầu</span>
              </button>
            </div>
          ) : !mcqFinished && currentQ ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
              {/* Thanh tiến độ */}
              <div className="flex items-center justify-between text-xs text-stone-500 border-b border-stone-100 pb-3">
                <span className="font-semibold text-emerald-800">
                  Câu hỏi {currentMcqIndex + 1} / {mcqQuestions.length} (Còn{" "}
                  {availableCardsForMcq.length} từ chưa làm chủ)
                </span>
                <span>
                  Đúng phiên này:{" "}
                  <strong className="text-stone-900 font-mono">
                    {mcqScore}
                  </strong>
                </span>
              </div>

              {/* Đề bài */}
              <div className="text-center py-4 space-y-2">
                <div className="text-xs uppercase tracking-wider text-stone-400">
                  {currentQ.type === "hanzi_to_meaning"
                    ? "Nhìn mặt chữ đoán nghĩa tiếng Việt"
                    : "Nhìn nghĩa tiếng Việt đoán chữ Hán"}
                </div>
                <div className="flex items-center justify-center gap-3">
                  <h3
                    className={`font-serif font-bold text-stone-900 ${
                      currentQ.type === "hanzi_to_meaning"
                        ? "text-4xl sm:text-5xl"
                        : "text-2xl sm:text-3xl"
                    }`}
                  >
                    {currentQ.type === "hanzi_to_meaning"
                      ? currentQ.questionCard.hanzi
                      : currentQ.questionCard.meaning}
                  </h3>
                  {currentQ.type === "hanzi_to_meaning" && (
                    <button
                      type="button"
                      onClick={() => speakText(currentQ.questionCard.hanzi)}
                      className="p-1.5 text-emerald-800 hover:text-emerald-950 bg-emerald-50 rounded-full"
                      title="Nghe phát âm"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {currentQ.type === "hanzi_to_meaning" && (
                  <p className="text-emerald-800 font-sans text-sm">
                    {currentQ.questionCard.pinyin}
                  </p>
                )}
              </div>

              {/* 4 Lựa chọn */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOptionId === opt.id;
                  const isCorrect = opt.id === currentQ.correctCardId;

                  let btnStyle =
                    "bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200";

                  if (isAnswerChecked) {
                    if (isCorrect) {
                      btnStyle =
                        "bg-emerald-100/80 text-emerald-900 border-emerald-500 ring-2 ring-emerald-500/20 font-semibold";
                    } else if (isSelected && !isCorrect) {
                      btnStyle =
                        "bg-red-50 text-red-900 border-red-300 line-through";
                    } else {
                      btnStyle = "bg-stone-50 text-stone-400 border-stone-200";
                    }
                  } else if (isSelected) {
                    btnStyle =
                      "bg-emerald-800 text-white border-emerald-900 font-medium shadow-xs";
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleMcqSelect(opt.id)}
                      disabled={isAnswerChecked}
                      className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all select-none ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center text-xs font-mono font-medium shrink-0">
                          {idx + 1}
                        </span>
                        <div>
                          <div
                            className={`font-medium ${
                              currentQ.type === "meaning_to_hanzi"
                                ? "text-xl font-serif font-bold"
                                : "text-base"
                            }`}
                          >
                            {currentQ.type === "hanzi_to_meaning"
                              ? opt.meaning
                              : opt.hanzi}
                          </div>
                          {currentQ.type === "meaning_to_hanzi" &&
                            isAnswerChecked && (
                              <div
                                className={`text-xs ${
                                  isSelected && !isCorrect
                                    ? "text-red-700"
                                    : "text-emerald-800"
                                }`}
                              >
                                {opt.pinyin} · {opt.meaning}
                              </div>
                            )}
                        </div>
                      </div>

                      {isAnswerChecked && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                      )}
                      {isAnswerChecked && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Nút hành động */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                <div>
                  {isAnswerChecked && (
                    <span
                      className={`text-xs font-semibold ${
                        selectedOptionId === currentQ.correctCardId
                          ? "text-emerald-700"
                          : "text-red-600"
                      }`}
                    >
                      {selectedOptionId === currentQ.correctCardId
                        ? "✓ Chính xác! Câu này sẽ được lưu và không lặp lại."
                        : `✗ Chưa đúng. Đáp án là: ${
                            currentQ.type === "hanzi_to_meaning"
                              ? currentQ.questionCard.meaning
                              : `${currentQ.questionCard.hanzi} (${currentQ.questionCard.pinyin})`
                          } (Sẽ xuất hiện lại để ôn luyện)`}
                    </span>
                  )}
                </div>

                {!isAnswerChecked ? (
                  <button
                    type="button"
                    onClick={handleMcqCheck}
                    disabled={!selectedOptionId}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-xs shrink-0"
                  >
                    Kiểm tra đáp án
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleMcqNext}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 transition-colors shadow-xs shrink-0"
                  >
                    {currentMcqIndex + 1 < mcqQuestions.length
                      ? "Câu tiếp theo →"
                      : "Xem kết quả lượt học"}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-8 space-y-4 shadow-xs">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                Hoàn Thành Phiên Học!
              </h3>
              <p className="text-stone-600 text-sm">
                Bạn trả lời đúng{" "}
                <span className="font-bold text-emerald-800 font-mono text-lg">
                  {mcqScore} / {mcqQuestions.length}
                </span>{" "}
                câu. Những câu đúng đã được ghi nhận và sẽ không xuất hiện lại
                trong phiên tiếp theo.
              </p>
              <button
                type="button"
                onClick={() => initMcqGame()}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-800 text-white font-semibold text-sm rounded-lg hover:bg-emerald-900 transition-colors shadow-xs"
              >
                <RotateCw className="w-4 h-4" />
                <span>Học tiếp các câu còn lại</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* CHẾ ĐỘ 2: GHÉP NỐI THẺ (MATCH GAME) */}
      {/* ========================================================= */}
      {mode === "match" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-stone-50 border border-stone-200 rounded-xl px-5 py-3">
            <div className="flex items-center gap-2 text-stone-700">
              <Clock className="w-4 h-4 text-emerald-700" />
              <span className="text-xs uppercase tracking-wider text-stone-500">
                Thời gian:
              </span>
              <span className="font-mono font-bold text-emerald-800 text-lg">
                {matchSeconds}s
              </span>
            </div>

            {bestMatchTime !== null && (
              <div className="flex items-center gap-2 text-amber-800">
                <Trophy className="w-4 h-4 text-amber-600" />
                <span className="text-xs uppercase tracking-wider text-stone-500">
                  Kỷ lục:
                </span>
                <span className="font-mono font-bold">{bestMatchTime}s</span>
              </div>
            )}

            <button
              type="button"
              onClick={() => initMatchGame()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors shadow-2xs"
            >
              <RotateCw className="w-3.5 h-3.5 text-emerald-700" />
              <span>Chơi lại</span>
            </button>
          </div>

          {!matchFinished ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {matchTiles.map((tile) => {
                if (tile.isMatched) {
                  return (
                    <div
                      key={tile.id}
                      className="h-28 rounded-xl border border-dashed border-emerald-300/40 bg-emerald-50/20 flex items-center justify-center text-xs text-emerald-700/60 font-medium select-none"
                    >
                      ✓ Đã ghép
                    </div>
                  );
                }

                return (
                  <button
                    key={tile.id}
                    type="button"
                    onClick={() => handleTileClick(tile)}
                    className={`h-28 rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all select-none shadow-xs border ${
                      tile.isSelected
                        ? "bg-emerald-800 text-white border-emerald-900 scale-102 ring-2 ring-emerald-600/40 shadow-md"
                        : "bg-white hover:bg-emerald-50/40 border-stone-200 text-stone-800 hover:border-emerald-300"
                    }`}
                  >
                    <span
                      className={`font-serif font-bold ${
                        tile.type === "hanzi"
                          ? "text-2xl sm:text-3xl"
                          : "text-sm sm:text-base"
                      }`}
                    >
                      {tile.text}
                    </span>
                    {tile.subText && (
                      <span
                        className={`text-xs mt-1 ${
                          tile.isSelected
                            ? "text-emerald-200"
                            : "text-emerald-700"
                        }`}
                      >
                        {tile.subText}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-emerald-50/50 rounded-2xl border border-emerald-200 p-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-emerald-950">
                Xuất Sắc! Bạn Đã Hoàn Thành Nối Thẻ
              </h3>
              <p className="text-stone-600 text-sm max-w-md mx-auto">
                Thời gian:{" "}
                <span className="font-bold text-emerald-800 font-mono">
                  {matchSeconds} giây
                </span>
                . Các từ nối đúng đã được tính vào tiến độ học của bạn!
              </p>
              <button
                type="button"
                onClick={() => initMatchGame()}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-800 text-white font-semibold text-sm rounded-lg hover:bg-emerald-900 transition-colors shadow-xs"
              >
                <RotateCw className="w-4 h-4" />
                <span>Tiếp tục ván mới</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
