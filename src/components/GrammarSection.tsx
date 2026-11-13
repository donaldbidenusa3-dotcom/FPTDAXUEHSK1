import React, { useState } from "react";
import { GRAMMAR_FORMULAS, GrammarFormula } from "../data/grammar";
import { speakText } from "../utils/diff";
import { BookMarked, Search, Volume2, Sparkles, Filter } from "lucide-react";

export const GrammarSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { key: "all", label: "Tất cả công thức" },
    { key: "cụm danh từ", label: "Cụm danh từ & Phương vị" },
    { key: "giới từ", label: "Giới từ 在, 给, 和" },
    { key: "thời gian", label: "Quy tắc thời gian" },
    { key: "phó từ & trợ từ", label: "Phó từ 都 & Cấu trúc 是……的" },
    { key: "đại từ nghi vấn", label: "Đặt câu hỏi gạch chân" }
  ];

  const filtered = GRAMMAR_FORMULAS.filter((f) => {
    const matchCat =
      selectedCategory === "all" || f.category === selectedCategory;
    const matchSearch =
      f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.explanation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.examples.some(
        (ex) =>
          ex.zh.includes(searchTerm) ||
          ex.vi.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-8">
      {/* Tiêu đề & Giới thiệu */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-950/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 uppercase tracking-widest">
            <span>Ngữ Pháp & Công Thức HSK 1</span>
            <span aria-hidden="true">·</span>
            <span>CHN113</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">
            Kho Công Thức Cốt Lõi & Hướng Dẫn Chi Tiết
          </h2>
        </div>
        <div className="text-xs text-stone-500 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200">
          Trích xuất đầy đủ từ tài liệu hướng dẫn ngữ pháp & đề thi
        </div>
      </div>

      {/* Tìm kiếm và Lọc danh mục */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm công thức, quy tắc ngữ pháp hoặc ví dụ..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 placeholder:text-stone-400 text-stone-800"
          />
        </div>

        {/* Interactive Filter Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setSelectedCategory(c.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === c.key
                  ? "bg-emerald-800 text-white shadow-2xs font-semibold"
                  : "bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200/70"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Danh sách thẻ công thức */}
      <div className="grid grid-cols-1 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xs hover:border-emerald-300 transition-colors space-y-4"
          >
            {/* Header Thẻ Công Thức */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-emerald-800 font-semibold uppercase tracking-wider">
                  Chủ điểm ngữ pháp
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900">
                  {item.title}
                </h3>
              </div>
              <span className="text-xs text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200 capitalize shrink-0">
                {item.category}
              </span>
            </div>

            {/* Khung Công Thức Nổi Bật */}
            <div className="bg-gradient-to-r from-emerald-50/80 via-amber-50/40 to-stone-50 border border-emerald-200/80 rounded-xl p-4">
              <div className="text-xs text-emerald-900/70 font-semibold uppercase tracking-wider mb-1">
                Công thức cấu trúc:
              </div>
              <div className="text-base sm:text-lg font-mono font-bold text-emerald-950 tracking-wide select-all">
                {item.formula}
              </div>
            </div>

            {/* Giải thích chi tiết */}
            <p className="text-sm text-stone-700 leading-relaxed">
              {item.explanation}
            </p>

            {/* Bảng ví dụ minh họa */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Ví dụ minh họa chuẩn đề thi:
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                {item.examples.map((ex, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-stone-50/80 rounded-lg border border-stone-200/60"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-serif font-bold text-stone-900">
                          {ex.zh}
                        </span>
                        <button
                          type="button"
                          onClick={() => speakText(ex.zh)}
                          className="p-1 text-emerald-700 hover:text-emerald-900 rounded-full hover:bg-emerald-100/50 transition-colors"
                          title="Phát âm"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-xs text-emerald-800 font-sans">
                        {ex.pinyin}
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm text-stone-600 sm:text-right font-medium">
                      {ex.vi}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ghi chú lưu ý nếu có */}
            {item.notes && item.notes.length > 0 && (
              <div className="bg-amber-50/60 border border-amber-200/80 rounded-lg p-3 text-xs text-amber-900 space-y-1">
                <span className="font-bold">⚠️ Lưu ý quan trọng:</span>
                <ul className="list-disc list-inside space-y-0.5">
                  {item.notes.map((n, i) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
