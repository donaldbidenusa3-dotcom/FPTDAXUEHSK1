// Utility: So sánh ký tự giữa câu trả lời người dùng và đáp án mẫu
// Trả về danh sách từng ký tự có đánh dấu trạng thái (correct: xanh lá, incorrect: đỏ, neutral: ký tự khoảng trắng/dấu)

export interface DiffChar {
  char: string;
  status: "correct" | "incorrect" | "extra";
}

export function compareChineseAnswers(userVal: string, expectedVal: string): {
  isMatch: boolean;
  score: number;
  highlightedUser: DiffChar[];
  normalizedExpected: string;
} {
  // Chuẩn hóa: loại bỏ khoảng trắng thừa, chuẩn hóa dấu câu tiếng Trung / tiếng Anh
  const clean = (s: string) =>
    s
      .trim()
      .replace(/[\s\t\r\n]+/g, "")
      .replace(/[，,]/g, "，")
      .replace(/[。.]/g, "。")
      .replace(/[？?]/g, "？")
      .replace(/[！!]/g, "！")
      .replace(/[：:]/g, "：");

  const cleanUser = clean(userVal);
  const cleanExp = clean(expectedVal);

  if (cleanUser === cleanExp) {
    return {
      isMatch: true,
      score: 100,
      highlightedUser: userVal.split("").map((c) => ({
        char: c,
        status: "correct"
      })),
      normalizedExpected: cleanExp
    };
  }

  // So sánh từng ký tự theo thứ tự
  const userChars = userVal.split("");
  const expChars = expectedVal.split("");

  let correctCount = 0;
  const highlighted: DiffChar[] = [];

  // Thuật toán so sánh song song với tolerance cho khoảng trắng
  let expIdx = 0;
  for (let i = 0; i < userChars.length; i++) {
    const uc = userChars[i];
    // Bỏ qua ký tự khoảng trắng
    if (/\s/.test(uc)) {
      highlighted.push({ char: uc, status: "correct" });
      continue;
    }

    // Tìm ký tự tương ứng trong expected
    while (expIdx < expChars.length && /\s/.test(expChars[expIdx])) {
      expIdx++;
    }

    if (expIdx < expChars.length) {
      const ec = expChars[expIdx];
      // Kiểm tra trùng hoặc tương đương dấu câu
      const isCharEqual =
        uc === ec ||
        (uc === "?" && ec === "？") ||
        (uc === "？" && ec === "?") ||
        (uc === "." && ec === "。") ||
        (uc === "。" && ec === ".") ||
        (uc === "," && ec === "，") ||
        (uc === "，" && ec === ",");

      if (isCharEqual) {
        highlighted.push({ char: uc, status: "correct" });
        correctCount++;
        expIdx++;
      } else {
        // Kiểm tra xem ký tự này có xuất hiện gần đó trong expected không (chống lệch 1 ký tự)
        const nextLook = expChars.slice(expIdx, expIdx + 3).findIndex((x) => x === uc);
        if (nextLook > 0) {
          expIdx += nextLook + 1;
          highlighted.push({ char: uc, status: "correct" });
          correctCount++;
        } else {
          highlighted.push({ char: uc, status: "incorrect" });
          expIdx++;
        }
      }
    } else {
      highlighted.push({ char: uc, status: "incorrect" });
    }
  }

  const meaningfulExpLength = cleanExp.length || 1;
  const score = Math.min(100, Math.round((correctCount / meaningfulExpLength) * 100));

  return {
    isMatch: score >= 90,
    score,
    highlightedUser: highlighted,
    normalizedExpected: cleanExp
  };
}

// Phát âm phát audio qua SpeechSynthesis (hỗ trợ giọng zh-CN và vi-VN)
export function speakText(text: string, lang: "zh-CN" | "vi-VN" = "zh-CN") {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}
