import React, { useState } from "react";
import { SPEAKING_PROMPTS, SpeakingPrompt } from "../data/speaking";
import { speakText } from "../utils/diff";
import { Image as ImageIcon, Volume2, Sparkles, AlertCircle } from "lucide-react";

export const SpeakingSection: React.FC = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<SpeakingPrompt | null>(
    SPEAKING_PROMPTS[0] || null
  );

  return (
    <div className="space-y-8">
      {/* Header & Quy Tắc Cốt Lõi */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-950/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 uppercase tracking-widest">
            <span>Kho Tranh Luyện Nói Cuối Kì</span>
            <span aria-hidden="true">·</span>
            <span>CHN113</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">
            Visual Speaking Practice Gallery (26 Đề Tranh)
          </h2>
        </div>
      </div>

      {/* Thông báo nguyên tắc KHÔNG hiển thị câu trả lời mẫu */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
          <strong className="font-bold">Lưu ý sư phạm thi vấn đáp:</strong> Theo
          đúng quy định của đề thi và yêu cầu của bạn, phần tranh luyện nói này
          <strong> KHÔNG tự động hiển thị đáp án mẫu</strong> để giúp người học
          tự rèn luyện phản xạ nhìn tranh đặt câu (từ 3 đến 5 câu theo chủ đề:
          giới thiệu bản thân, gia đình, thời gian, vị trí đồ vật, mua sắm...).
        </div>
      </div>

      {/* Giao diện chính: Tranh lớn bên trái + Lưới danh sách bên phải */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Khung xem tranh chi tiết (7 cột) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
          {selectedPrompt ? (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-semibold text-emerald-800">
                    Trang {selectedPrompt.page} / 26 · Đề số #{selectedPrompt.number}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-stone-900 mt-0.5">
                    {selectedPrompt.title}
                  </h3>
                </div>
                <span className="text-xs text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200">
                  {selectedPrompt.topic}
                </span>
              </div>

              {/* Ảnh gốc chuẩn từ PDF */}
              <div className="w-full bg-stone-100 rounded-xl overflow-hidden border border-stone-200 relative aspect-4/3 flex items-center justify-center">
                <img
                  src={selectedPrompt.imageSrc}
                  alt={selectedPrompt.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Từ vựng gợi ý để người học tự luyện nói */}
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Từ vựng HSK 1 gợi ý cho bức tranh này:
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedPrompt.suggestedVocab.map((w, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => speakText(w)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-lg text-xs font-medium hover:bg-emerald-100 transition-colors"
                      title="Bấm để nghe phát âm từ vựng"
                    >
                      <span className="font-serif font-bold">{w}</span>
                      <Volume2 className="w-3 h-3 text-emerald-700" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Khung gợi ý cấu trúc nói */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
                <div className="font-semibold text-stone-800">
                  Gợi ý cấu trúc nói (3-5 câu):
                </div>
                <div>1. Đây là ai / đồ vật gì? (这是...)</div>
                <div>2. Đang ở đâu / vào lúc mấy giờ? (在... / 现在...)</div>
                <div>3. Đang làm gì? (在做什么... / 想...)</div>
                <div>4. Cảm nghĩ hoặc đặc điểm (很好 / 很喜欢 / 很好吃...)</div>
              </div>
            </>
          ) : (
            <div className="text-center py-20 text-stone-400">
              Chọn một bức tranh bên phải để bắt đầu luyện tập
            </div>
          )}
        </div>

        {/* Lưới danh sách 26 tranh (5 cột) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-600 uppercase tracking-wider px-1">
            <span>Toàn bộ 26 đề tranh ôn thi CHN113</span>
            <span>Bấm để xem</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 max-h-[640px] overflow-y-auto pr-1">
            {SPEAKING_PROMPTS.map((p) => {
              const isSelected = selectedPrompt?.id === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPrompt(p)}
                  className={`p-2.5 rounded-xl border text-left flex flex-col gap-2 transition-all group ${
                    isSelected
                      ? "bg-emerald-50 border-emerald-600 ring-2 ring-emerald-600/20 shadow-xs"
                      : "bg-white hover:bg-stone-50 border-stone-200"
                  }`}
                >
                  <div className="w-full aspect-4/3 bg-stone-100 rounded-lg overflow-hidden border border-stone-200">
                    <img
                      src={p.imageSrc}
                      alt={p.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-emerald-800">
                      Đề số #{p.number}
                    </div>
                    <div className="text-xs font-medium text-stone-800 line-clamp-1">
                      {p.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
