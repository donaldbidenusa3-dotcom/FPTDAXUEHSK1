import React, { useState, useEffect } from "react";
import { Flashcard, INITIAL_FLASHCARDS } from "../data/flashcards";
import { speakText } from "../utils/diff";
import {
  Volume2,
  Plus,
  Trash2,
  RotateCw,
  Search,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  BookOpen
} from "lucide-react";

export const FlashcardSection: React.FC = () => {
  const [cards, setCards] = useState<Flashcard[]>(() => {
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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [confirmingReset, setConfirmingReset] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Form thêm từ mới
  const [showAddModal, setShowAddModal] = useState(false);
  const [newHanzi, setNewHanzi] = useState("");
  const [newPinyin, setNewPinyin] = useState("");
  const [newMeaning, setNewMeaning] = useState("");
  const [newCategory, setNewCategory] = useState("Từ mới");

  useEffect(() => {
    localStorage.setItem("hsk1_flashcards", JSON.stringify(cards));
  }, [cards]);

  const categories = Array.from(
    new Set(cards.map((c) => c.category).filter(Boolean))
  ) as string[];

  const filteredCards = cards.filter((card) => {
    const matchSearch =
      card.hanzi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.pinyin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.meaning.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat =
      selectedCategory === "all" || card.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const safeIndex = Math.min(
    currentIndex,
    Math.max(0, filteredCards.length - 1)
  );
  const activeCard =
    filteredCards[safeIndex] || filteredCards[0] || cards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setConfirmDeleteId(null);
    setCurrentIndex((prev) => (prev + 1) % (filteredCards.length || 1));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setConfirmDeleteId(null);
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, filteredCards.length - 1) : prev - 1
    );
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setConfirmDeleteId(null);
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHanzi.trim() || !newMeaning.trim()) return;
    const newCard: Flashcard = {
      id: `custom-${Date.now()}`,
      hanzi: newHanzi.trim(),
      pinyin: newPinyin.trim() || "",
      meaning: newMeaning.trim(),
      category: newCategory.trim() || "Từ mới",
      custom: true
    };
    setCards([newCard, ...cards]);
    setNewHanzi("");
    setNewPinyin("");
    setNewMeaning("");
    setShowAddModal(false);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const executeDeleteCard = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = cards.filter((c) => c.id !== id);
    setCards(updated);
    setConfirmDeleteId(null);
    if (currentIndex >= updated.length) {
      setCurrentIndex(Math.max(0, updated.length - 1));
    }
  };

  const executeResetDefault = () => {
    setCards(INITIAL_FLASHCARDS);
    setCurrentIndex(0);
    setIsFlipped(false);
    setConfirmingReset(false);
  };

  return (
    <div className="space-y-8">
      {/* Thanh điều hướng phụ & Thống kê */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-emerald-950/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 uppercase tracking-widest">
            <span>Kho Thẻ Ghi Nhớ HSK 1</span>
            <span aria-hidden="true">·</span>
            <span>Tổng số {cards.length} thuật ngữ</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">
            Học Từ Vựng Tương Tác 3D
          </h2>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleShuffle}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors shadow-xs"
            title="Trộn ngẫu nhiên"
          >
            <Shuffle className="w-3.5 h-3.5 text-emerald-700" />
            <span>Trộn thẻ</span>
          </button>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm từ mới</span>
          </button>

          {!confirmingReset ? (
            <button
              type="button"
              onClick={() => setConfirmingReset(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-500 hover:text-stone-700 transition-colors"
              title="Khôi phục 198 từ gốc"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Đặt lại gốc</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 px-2.5 py-1.5 rounded-lg">
              <span className="text-xs font-medium text-red-800">
                Khôi phục 198 từ gốc?
              </span>
              <button
                type="button"
                onClick={executeResetDefault}
                className="px-2 py-1 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Đồng ý
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

      {/* Bộ lọc và Tìm kiếm */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentIndex(0);
            }}
            placeholder="Tìm kiếm theo chữ Hán, Pinyin hoặc nghĩa tiếng Việt..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all placeholder:text-stone-400 text-stone-800"
          />
        </div>
        <div className="sm:col-span-4">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentIndex(0);
            }}
            className="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-stone-700"
          >
            <option value="all">Tất cả chủ đề ({cards.length})</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Khu vực Flashcard 3D trung tâm */}
      {filteredCards.length > 0 && activeCard ? (
        <div className="flex flex-col items-center justify-center space-y-6 pt-2">
          {/* Card Wrapper with 3D perspective */}
          <div
            className="w-full max-w-xl h-80 sm:h-96 cursor-pointer select-none [perspective:1200px]"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div
              className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] shadow-lg rounded-2xl ${
                isFlipped ? "[transform:rotateY(180deg)]" : ""
              }`}
            >
              {/* MẶT TRƯỚC: Tiếng Trung & Pinyin */}
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-gradient-to-br from-stone-50 via-amber-50/30 to-emerald-50/30 border border-stone-200/80 rounded-2xl p-8 flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-emerald-800">
                      HSK 1
                    </span>
                    <span>·</span>
                    <span>{activeCard.category || "Từ vựng"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-stone-400">
                      {safeIndex + 1} / {filteredCards.length}
                    </span>
                    {confirmDeleteId === activeCard.id ? (
                      <div
                        className="flex items-center gap-1 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={(e) => executeDeleteCard(activeCard.id, e)}
                          className="text-2xs font-semibold text-red-700 hover:underline"
                        >
                          Xóa?
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setConfirmDeleteId(null);
                          }}
                          className="text-2xs text-stone-500 hover:text-stone-800"
                        >
                          Hủy
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirmDeleteId(activeCard.id);
                        }}
                        className="p-1 text-stone-400 hover:text-red-600 transition-colors"
                        title="Xóa thẻ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Nội dung chính mặt trước */}
                <div className="text-center my-auto space-y-3">
                  <h3 className="text-6xl sm:text-7xl font-serif font-bold text-stone-900 tracking-wide drop-shadow-xs">
                    {activeCard.hanzi}
                  </h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xl sm:text-2xl text-emerald-800 font-sans tracking-wide">
                      {activeCard.pinyin}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(activeCard.hanzi);
                      }}
                      className="p-1.5 text-emerald-800 hover:text-emerald-950 bg-emerald-100/60 rounded-full hover:bg-emerald-200 transition-colors"
                      title="Nghe phát âm"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span>Nhấn để lật xem nghĩa</span>
                  <RotateCw className="w-3.5 h-3.5 text-stone-300 animate-pulse" />
                </div>
              </div>

              {/* MẶT SAU: Nghĩa tiếng Việt */}
              <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-2xl p-8 flex flex-col justify-between border border-emerald-700/50">
                <div className="flex items-center justify-between text-xs text-emerald-200/80">
                  <span>MẶT SAU · NGHĨA TIẾNG VIỆT</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(activeCard.hanzi);
                      }}
                      className="p-1.5 text-white hover:text-amber-200 bg-emerald-700/60 rounded-full"
                      title="Nghe lại chữ Hán"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-center my-auto space-y-3">
                  <div className="text-sm font-medium tracking-wide text-amber-200">
                    {activeCard.hanzi} · {activeCard.pinyin}
                  </div>
                  <h4 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide">
                    {activeCard.meaning}
                  </h4>
                  <div className="text-xs text-emerald-200/90 font-light">
                    Thuộc nhóm: {activeCard.category || "Cơ bản"}
                  </div>
                </div>

                <div className="text-center text-xs text-emerald-300/70">
                  Nhấn để quay lại mặt trước
                </div>
              </div>
            </div>
          </div>

          {/* Nút điều hướng trước / sau */}
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={handlePrev}
              className="p-3 text-stone-700 bg-white border border-stone-200 rounded-full hover:bg-stone-100 hover:border-stone-300 transition-all shadow-xs"
              title="Thẻ trước"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-sm font-medium text-stone-600">
              <span className="font-bold text-stone-900">
                {safeIndex + 1}
              </span>{" "}
              / {filteredCards.length}
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="p-3 text-stone-700 bg-white border border-stone-200 rounded-full hover:bg-stone-100 hover:border-stone-300 transition-all shadow-xs"
              title="Thẻ tiếp theo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-stone-200 text-stone-500">
          Không tìm thấy từ vựng nào khớp với từ khóa "{searchTerm}".
        </div>
      )}

      {/* Danh sách từ vựng dạng bảng nhỏ phía dưới */}
      <div className="pt-6 border-t border-stone-200">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-stone-800 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-800" />
            <span>Mục lục từ vựng ({filteredCards.length} từ)</span>
          </h4>
          <span className="text-xs text-stone-500">
            Click vào dòng để xem ngay thẻ
          </span>
        </div>

        <div className="max-h-72 overflow-y-auto bg-white rounded-xl border border-stone-200 divide-y divide-stone-100">
          {filteredCards.map((c, i) => (
            <div
              key={c.id}
              onClick={() => {
                setCurrentIndex(i);
                setIsFlipped(false);
                window.scrollTo({ top: 120, behavior: "smooth" });
              }}
              className={`flex items-center justify-between p-3 cursor-pointer hover:bg-emerald-50/50 transition-colors ${
                i === safeIndex ? "bg-emerald-50/80 font-medium" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="w-8 text-xs font-mono text-stone-400">
                  #{i + 1}
                </span>
                <span className="text-lg font-serif font-bold text-stone-900 w-16">
                  {c.hanzi}
                </span>
                <span className="text-sm text-emerald-800 w-24 hidden sm:inline">
                  {c.pinyin}
                </span>
                <span className="text-sm text-stone-700">{c.meaning}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakText(c.hanzi);
                  }}
                  className="p-1.5 text-stone-400 hover:text-emerald-700 rounded-md"
                  title="Nghe"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                {confirmDeleteId === c.id ? (
                  <div
                    className="flex items-center gap-1 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={(e) => executeDeleteCard(c.id, e)}
                      className="text-2xs font-semibold text-red-700 hover:underline"
                    >
                      Xóa
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmDeleteId(null);
                      }}
                      className="text-2xs text-stone-500 hover:text-stone-800"
                    >
                      Hủy
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmDeleteId(c.id);
                    }}
                    className="p-1.5 text-stone-400 hover:text-red-600 rounded-md"
                    title="Xóa"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Thêm Từ Vựng Mới */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-lg font-serif font-bold text-stone-900">
                Thêm Từ Vựng Mới
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-600 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCard} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Chữ Hán (Ví dụ: 手机) *
                </label>
                <input
                  type="text"
                  required
                  value={newHanzi}
                  onChange={(e) => setNewHanzi(e.target.value)}
                  placeholder="Nhập chữ Hán..."
                  className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Phiên âm Pinyin (Ví dụ: shǒujī)
                </label>
                <input
                  type="text"
                  value={newPinyin}
                  onChange={(e) => setNewPinyin(e.target.value)}
                  placeholder="Nhập pinyin..."
                  className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Nghĩa tiếng Việt *
                </label>
                <input
                  type="text"
                  required
                  value={newMeaning}
                  onChange={(e) => setNewMeaning(e.target.value)}
                  placeholder="Ví dụ: Điện thoại di động"
                  className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Nhóm từ / Chủ đề
                </label>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Ví dụ: Đồ vật, Động từ..."
                  className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-800"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 transition-colors"
                >
                  Lưu từ vựng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
