import React, { useState, useEffect } from "react";
import {
  ExerciseItem,
  ExerciseType,
  INITIAL_EXERCISES
} from "../data/exercises";
import { speakText } from "../utils/diff";
import {
  CheckCircle2,
  Edit3,
  Save,
  RotateCcw,
  Volume2,
  Search
} from "lucide-react";

export const ExerciseHubSection: React.FC = () => {
  const [exercises, setExercises] = useState<ExerciseItem[]>(() => {
    const saved = localStorage.getItem("hsk1_exercises_custom");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_EXERCISES;
      }
    }
    return INITIAL_EXERCISES;
  });

  const [activeTab, setActiveTab] = useState<ExerciseType>("trans_vi_zh");
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmingReset, setConfirmingReset] = useState(false);

  // Trạng thái câu trả lời của người dùng
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});

  // Trạng thái kết quả sau khi người dùng ấn nút Kiểm tra
  const [checkedResults, setCheckedResults] = useState<
    Record<
      string,
      {
        isExact: boolean;
        userAnswer: string;
      }
    >
  >({});

  // Trạng thái chỉnh sửa đáp án mẫu
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editExpectedAnswer, setEditExpectedAnswer] = useState("");
  const [editExpectedPinyin, setEditExpectedPinyin] = useState("");

  // Tự động lưu bài tập tùy biến
  useEffect(() => {
    localStorage.setItem("hsk1_exercises_custom", JSON.stringify(exercises));
  }, [exercises]);

  const categoryTabs: { type: ExerciseType; label: string; count: number }[] = [
    {
      type: "trans_vi_zh",
      label: "A. Dịch Việt → Trung",
      count: exercises.filter((e) => e.type === "trans_vi_zh").length
    },
    {
      type: "trans_zh_vi",
      label: "B. Dịch Trung → Việt",
      count: exercises.filter((e) => e.type === "trans_zh_vi").length
    },
    {
      type: "rearrange",
      label: "C. Sắp xếp câu",
      count: exercises.filter((e) => e.type === "rearrange").length
    },
    {
      type: "qa",
      label: "D. Trả lời câu hỏi",
      count: exercises.filter((e) => e.type === "qa").length
    },
    {
      type: "underline_question",
      label: "E. Đặt câu hỏi gạch chân",
      count: exercises.filter((e) => e.type === "underline_question").length
    }
  ];

  const currentList = exercises.filter((item) => {
    const matchType = item.type === activeTab;
    const matchSearch =
      item.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.subPrompt &&
        item.subPrompt.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.expectedAnswer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchType && matchSearch;
  });

  // Chuẩn hóa câu để so sánh chính xác 100% không bị lỗi dấu câu hay khoảng trắng
  const normalize = (str: string) => {
    return str
      .normalize("NFC")
      .trim()
      .toLowerCase()
      .replace(/[\s\t\r\n]+/g, "")
      .replace(/[，,]/g, "")
      .replace(/[。.]/g, "")
      .replace(/[？?]/g, "")
      .replace(/[！!]/g, "")
      .replace(/[：:]/g, "")
      .replace(/["'“”‘’]/g, "")
      .replace(/[()（）]/g, "");
  };

  // Chỉ kiểm tra và hiện đáp án khi người dùng ấn nút "Kiểm tra" (hoặc Enter)
  const handleCheckAnswer = (item: ExerciseItem) => {
    const inputVal = userInputs[item.id] || "";
    if (!inputVal.trim()) return;

    const normUser = normalize(inputVal);
    const normExpected = normalize(item.expectedAnswer);

    const isExact = normUser.length > 0 && normUser === normExpected;

    setCheckedResults((prev) => ({
      ...prev,
      [item.id]: {
        isExact,
        userAnswer: inputVal
      }
    }));
  };

  const clearCheckedResult = (id: string) => {
    setCheckedResults((prev) => {
      if (!prev[id]) return prev;
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const startEditing = (item: ExerciseItem) => {
    setEditingId(item.id);
    setEditExpectedAnswer(item.expectedAnswer);
    setEditExpectedPinyin(item.expectedPinyin || "");
  };

  const saveEditing = (id: string) => {
    setExercises((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              expectedAnswer: editExpectedAnswer.trim(),
              expectedPinyin: editExpectedPinyin.trim()
            }
          : item
      )
    );
    setEditingId(null);
  };

  const executeResetExercises = () => {
    setExercises(INITIAL_EXERCISES);
    localStorage.removeItem("hsk1_exercises_custom");
    setCheckedResults({});
    setUserInputs({});
    setConfirmingReset(false);
  };

  return (
    <div className="space-y-8">
      {/* Header & Phân loại bài tập */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-950/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 uppercase tracking-widest">
            <span>Ngân Hàng Bài Tập 5 Dạng</span>
            <span aria-hidden="true">·</span>
            <span>Nhấn Kiểm tra để xem đáp án chuẩn</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">
            Luyện Đề HSK 1 & Kiểm Tra Đáp Án
          </h2>
        </div>

        {!confirmingReset ? (
          <button
            type="button"
            onClick={() => setConfirmingReset(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-600 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors shadow-2xs self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
            <span>Đặt lại đáp án gốc</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 px-2.5 py-1.5 rounded-lg self-start sm:self-auto">
            <span className="text-xs font-medium text-red-800">
              Khôi phục đáp án gốc?
            </span>
            <button
              type="button"
              onClick={executeResetExercises}
              className="px-2.5 py-1 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
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

      {/* Tabs 5 Chuyên Mục */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-stone-200">
        {categoryTabs.map((t) => (
          <button
            key={t.type}
            type="button"
            onClick={() => {
              setActiveTab(t.type);
              setSearchTerm("");
            }}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg border-b-2 whitespace-nowrap transition-all ${
              activeTab === t.type
                ? "border-emerald-800 text-emerald-950 bg-emerald-50/50"
                : "border-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-50"
            }`}
          >
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {/* Tìm kiếm */}
      <div className="relative">
        <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Tìm kiếm trong phần ${
            categoryTabs.find((x) => x.type === activeTab)?.label
          }...`}
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 placeholder:text-stone-400 text-stone-800"
        />
      </div>

      {/* Danh Sách Bài Tập */}
      <div className="space-y-6">
        {currentList.map((item, index) => {
          const inputVal = userInputs[item.id] || "";
          const result = checkedResults[item.id];
          const isEditing = editingId === item.id;

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-4 hover:border-emerald-300 transition-colors"
            >
              {/* Header câu hỏi */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-emerald-100/70 text-emerald-900 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      #{index + 1}
                    </span>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900">
                      {item.prompt}
                    </h3>
                  </div>
                  {item.pinyin && (
                    <div className="text-xs text-emerald-800 font-sans pl-9">
                      {item.pinyin}
                    </div>
                  )}
                  {item.subPrompt && (
                    <div className="text-xs font-medium text-amber-900 bg-amber-50 inline-block px-2.5 py-1 rounded-md ml-9 border border-amber-200/60">
                      {item.subPrompt}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => startEditing(item)}
                    className="p-1.5 text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-md transition-colors text-xs inline-flex items-center gap-1"
                    title="Chỉnh sửa đáp án mẫu"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span className="hidden sm:inline">Sửa đáp án</span>
                  </button>
                </div>
              </div>

              {/* DẠNG C: Hiển thị các từ rời */}
              {item.scrambledWords && item.scrambledWords.length > 0 && (
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/80 space-y-2">
                  <div className="text-xs text-stone-500 uppercase tracking-wider font-medium">
                    Từ vựng cho sẵn (bấm để thêm vào câu):
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.scrambledWords.map((word, wIdx) => (
                      <button
                        key={wIdx}
                        type="button"
                        onClick={() => {
                          const current = userInputs[item.id] || "";
                          const updated = current ? current + word : word;
                          setUserInputs((prev) => ({
                            ...prev,
                            [item.id]: updated
                          }));
                          clearCheckedResult(item.id);
                        }}
                        className="px-3 py-1.5 bg-white hover:bg-emerald-50 border border-stone-200 rounded-lg text-sm font-medium text-stone-800 shadow-2xs hover:border-emerald-300 transition-colors"
                      >
                        {word}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setUserInputs((prev) => ({
                          ...prev,
                          [item.id]: ""
                        }));
                        clearCheckedResult(item.id);
                      }}
                      className="px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-colors"
                    >
                      Xóa trắng
                    </button>
                  </div>
                </div>
              )}

              {/* Ô Nhập Câu Trả Lời Của Người Học */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => {
                      const val = e.target.value;
                      setUserInputs((prev) => ({
                        ...prev,
                        [item.id]: val
                      }));
                      // Khi người dùng sửa nội dung, ẩn kết quả kiểm tra cũ cho đến khi bấm "Kiểm tra"
                      clearCheckedResult(item.id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleCheckAnswer(item);
                    }}
                    placeholder="Gõ câu trả lời tại đây rồi ấn Kiểm tra..."
                    className="flex-1 px-4 py-2.5 text-sm bg-stone-50/60 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:bg-white text-stone-900 transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => handleCheckAnswer(item)}
                    disabled={!inputVal.trim()}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-xs shrink-0"
                  >
                    Kiểm tra
                  </button>
                </div>

                {/* Trạng thái sau khi bấm Kiểm tra */}
                {result && (
                  <div className="flex items-center gap-2 pt-1 text-xs">
                    {result.isExact ? (
                      <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>Chính xác tuyệt đối!</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-amber-800 font-medium">
                        <span>
                          Đã ghi nhận câu trả lời. Hãy đối chiếu với đáp án
                          chuẩn bên dưới:
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* CHỈ HIỆN ĐÁP ÁN CHUẨN KHI NGƯỜI DÙNG ẤN NÚT "KIỂM TRA" */}
              {Boolean(result) && !isEditing && (
                <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/80 space-y-2 text-sm transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-900">
                      Đáp án chuẩn HSK 1:
                    </span>
                    <button
                      type="button"
                      onClick={() => speakText(item.expectedAnswer)}
                      className="p-1 text-emerald-800 hover:text-emerald-950 rounded-full hover:bg-emerald-100/60 transition-colors"
                      title="Nghe phát âm đáp án"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-base font-serif font-bold text-emerald-950">
                    {item.expectedAnswer}
                  </div>
                  {item.expectedPinyin && (
                    <div className="text-xs text-emerald-800 font-sans">
                      {item.expectedPinyin}
                    </div>
                  )}
                  {item.explanation && (
                    <div className="text-xs text-stone-600 border-t border-emerald-200/60 pt-1.5 mt-1">
                      {item.explanation}
                    </div>
                  )}
                </div>
              )}

              {/* Form chỉnh sửa đáp án mẫu */}
              {isEditing && (
                <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-300 space-y-3">
                  <div className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Chỉnh sửa đáp án mẫu câu này:</span>
                  </div>
                  <div>
                    <label className="block text-2xs text-stone-600 mb-1 font-medium">
                      Đáp án chuẩn (Chữ Hán / Tiếng Việt) *
                    </label>
                    <input
                      type="text"
                      value={editExpectedAnswer}
                      onChange={(e) => setEditExpectedAnswer(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-2xs text-stone-600 mb-1 font-medium">
                      Phiên âm Pinyin (nếu có)
                    </label>
                    <input
                      type="text"
                      value={editExpectedPinyin}
                      onChange={(e) => setEditExpectedPinyin(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    />
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-800"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="button"
                      onClick={() => saveEditing(item.id)}
                      className="inline-flex items-center gap-1 px-4 py-1.5 text-xs font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 transition-colors shadow-2xs"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Lưu đáp án mới</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {currentList.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-stone-200 text-stone-500">
            Không tìm thấy bài tập nào khớp với từ khóa "{searchTerm}".
          </div>
        )}
      </div>
    </div>
  );
};
