import React, { useState } from "react";
import { FlashcardSection } from "./components/FlashcardSection";
import { QuizGameSection } from "./components/QuizGameSection";
import { GrammarSection } from "./components/GrammarSection";
import { SpeakingSection } from "./components/SpeakingSection";
import { ExerciseHubSection } from "./components/ExerciseHubSection";
import { 
  BookOpen, 
  GraduationCap, 
  FileText, 
  Image as ImageIcon, 
  CheckSquare
} from "lucide-react";

export type NavTab = "flashcard" | "quiz" | "grammar" | "speaking" | "exercises";

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>("flashcard");

  const navItems = [
    {
      id: "flashcard" as NavTab,
      label: "Thẻ Flashcard 3D",
      subtitle: "198 Từ Vựng HSK 1",
      icon: BookOpen
    },
    {
      id: "quiz" as NavTab,
      label: "Học (Quiz & Nối Thẻ)",
      subtitle: "Không lặp câu đúng",
      icon: GraduationCap
    },
    {
      id: "grammar" as NavTab,
      label: "Kho Công Thức",
      subtitle: "Ngữ Pháp CHN113",
      icon: FileText
    },
    {
      id: "speaking" as NavTab,
      label: "Tranh Luyện Nói",
      subtitle: "26 Chủ Đề Chuẩn Đề Thi",
      icon: ImageIcon
    },
    {
      id: "exercises" as NavTab,
      label: "Phân Dạng Bài Tập",
      subtitle: "Hiện Đáp Án Trực Tiếp",
      icon: CheckSquare
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans selection:bg-emerald-800 selection:text-white">
      {/* Top Bar Contract (1 dòng, 3 phân vùng rõ ràng) */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-8 transition-all">
        {/* Vùng 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-800 to-teal-950 flex items-center justify-center text-white font-serif font-bold text-lg shadow-xs border border-emerald-700/50">
            汉
          </div>
          <a
            href="/"
            className="text-lg font-serif font-bold tracking-tight text-stone-900 whitespace-nowrap"
          >
            HSK 1 Learning Hub
          </a>
        </div>

        {/* Vùng 2: Navigation Links (5 tabs điều hướng chính) */}
        <nav className="hidden md:flex items-center gap-1.5 shrink-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
                  isActive
                    ? "bg-emerald-800 text-white shadow-xs font-bold"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/50"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-amber-200" : "text-stone-500"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Vùng 3: Primary Action / Quick Badge */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-stone-500 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>CHN113 Chuẩn HSK 1</span>
          </div>
          <button
            onClick={() => setActiveTab("exercises")}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 transition-colors shadow-xs whitespace-nowrap shrink-0"
          >
            Luyện Đề Ngay
          </button>
        </div>
      </header>

      {/* Thanh điều hướng Mobile khi màn hình nhỏ */}
      <div className="md:hidden flex items-center gap-1 px-4 py-2 bg-stone-100 border-b border-stone-200 overflow-x-auto scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap flex items-center gap-1.5 transition-all ${
                isActive
                  ? "bg-emerald-800 text-white font-bold shadow-2xs"
                  : "text-stone-600 bg-white border border-stone-200"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Stage */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-8">
        {activeTab === "flashcard" && <FlashcardSection />}
        {activeTab === "quiz" && <QuizGameSection />}
        {activeTab === "grammar" && <GrammarSection />}
        {activeTab === "speaking" && <SpeakingSection />}
        {activeTab === "exercises" && <ExerciseHubSection />}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200/80 bg-stone-100/60 py-6 px-4 sm:px-8 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-stone-800">
              HSK 1 Chinese Learning Hub
            </span>
            <span>·</span>
            <span>Tài liệu ôn thi chuẩn môn CHN113</span>
          </div>
          <div className="flex items-center gap-4">
            <span>198 Thẻ Từ Vựng</span>
            <span>·</span>
            <span>26 Đề Tranh Nói</span>
            <span>·</span>
            <span>5 Dạng Bài Tập</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
