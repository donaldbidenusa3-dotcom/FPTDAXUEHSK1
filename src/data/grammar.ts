// Kho công thức ngữ pháp HSK 1 trích xuất từ tài liệu người dùng tải lên
export interface GrammarFormula {
  id: string;
  title: string;
  formula: string;
  explanation: string;
  examples: {
    zh: string;
    pinyin: string;
    vi: string;
  }[];
  notes?: string[];
  category: "cụm danh từ" | "giới từ" | "thời gian" | "phó từ & trợ từ" | "đại từ nghi vấn";
}

export const GRAMMAR_FORMULAS: GrammarFormula[] = [
  {
    id: "f-1",
    title: "1. Cụm danh từ & Định ngữ với 的",
    formula: "Định ngữ + 的 + Danh từ chính",
    explanation: "Định ngữ đứng trước bổ nghĩa cho danh từ chính, biểu thị quan hệ sở hữu, hạn định tính chất hoặc miêu tả. Khi là đại từ nhân xưng biểu thị quan hệ thân thuộc (bố, mẹ, anh, em...) có thể lược bỏ 的.",
    category: "cụm danh từ",
    examples: [
      { zh: "我（的）爸爸", pinyin: "Wǒ (de) bàba", vi: "Bố (của) tôi" },
      { zh: "李老师的女儿", pinyin: "Lǐ lǎoshī de nǚ'ér", vi: "Con gái của cô giáo Lý" },
      { zh: "我的汉语老师", pinyin: "Wǒ de Hànyǔ lǎoshī", vi: "Giáo viên tiếng Trung của tôi" },
      { zh: "桌子上的那本书是我的", pinyin: "Zhuōzi shang de nà běn shū shì wǒ de", vi: "Quyển sách ở trên bàn kia là của tôi" }
    ],
    notes: ["Quy tắc trật tự ngược với tiếng Việt: Danh từ chính luôn đứng sau cùng."]
  },
  {
    id: "f-2",
    title: "2. Phương vị từ (Vị trí & Phương hướng)",
    formula: "Danh từ + 上 / 下 / 前面 / 后面 / 里面",
    explanation: "Phương vị từ đặt SAU danh từ để tạo thành từ ngữ chỉ nơi chốn/vị trí. Không đặt các từ chỉ vị trí phía trước danh từ như tiếng Việt.",
    category: "cụm danh từ",
    examples: [
      { zh: "桌子上 / 椅子下", pinyin: "zhuōzi shang / yǐzi xià", vi: "Trên bàn / Dưới ghế" },
      { zh: "学校里 / 商店里", pinyin: "xuéxiào lǐ / shāngdiàn lǐ", vi: "Trong trường học / Trong cửa hàng" },
      { zh: "学校后面有一个商店", pinyin: "Xuéxiào hòumiàn yǒu yí gè shāngdiàn", vi: "Phía sau trường học có một cửa hàng" },
      { zh: "在桌子下面有一只猫", pinyin: "Zài zhuōzi xiàmiàn yǒu yì zhī māo", vi: "Ở dưới cái bàn có một con mèo" }
    ]
  },
  {
    id: "f-3",
    title: "3. Động từ & Giới từ 在 (Ở, tại)",
    formula: "S + 在 + Địa điểm (Động từ) | S + 在 + Địa điểm + V + O (Giới từ)",
    explanation: "Khi làm động từ: biểu thị sự tồn tại ở đâu. Khi làm giới từ: diễn đạt địa điểm diễn ra hành động (phải đặt TRƯỚC động từ chính).",
    category: "giới từ",
    examples: [
      { zh: "你在家吗？——我不在家，我在商店。", pinyin: "Nǐ zài jiā ma? —— Wǒ bú zài jiā, wǒ zài shāngdiàn.", vi: "Bạn có ở nhà không? Tôi không ở nhà, tôi ở cửa hàng." },
      { zh: "我爸爸在医院工作。", pinyin: "Wǒ bàba zài yīyuàn gōngzuò.", vi: "Bố tôi làm việc ở bệnh viện." },
      { zh: "我在学校吃饭。", pinyin: "Wǒ zài xuéxiào chīfàn.", vi: "Tôi ăn cơm ở trường." },
      { zh: "我在家看电视。", pinyin: "Wǒ zài jiā kàn diànshì.", vi: "Tôi xem ti-vi ở nhà." },
      { zh: "我在 FPT 大学学习。", pinyin: "Wǒ zài FPT dàxué xuéxí.", vi: "Tôi học ở trường đại học FPT." }
    ],
    notes: ["Tuyệt đối không nói 'S + V + 在 + Địa điểm' (trừ một số động từ đặc biệt như 住 ở HSK cao hơn). HSK 1: S + 在 + Địa điểm + V."]
  },
  {
    id: "f-4",
    title: "4. Phó từ 在 (Đang - Hành động tiếp diễn)",
    formula: "S + 在 + V + O (呢) | Phủ định: S + 没(在) + V + O (呢)",
    explanation: "Đặt '在' trước động từ để biểu thị hành động đang diễn ra tại thời điểm nói. Có thể kết hợp cùng trợ từ ngữ khí '呢' ở cuối câu. Dạng phủ định dùng '没' hoặc '没有', không dùng '不'.",
    category: "giới từ",
    examples: [
      { zh: "他在学做中国菜呢。", pinyin: "Tā zài xué zuò Zhōngguó cài ne.", vi: "Anh ấy đang học nấu món ăn Trung Quốc đấy." },
      { zh: "他没看电视，他在睡觉呢。", pinyin: "Tā méi kàn diànshì, tā zài shuìjiào ne.", vi: "Anh ấy không xem ti vi, anh ấy đang ngủ đấy." },
      { zh: "李朋在看书呢。", pinyin: "Lǐ Péng zài kànshū ne.", vi: "Lý Bằng đang đọc sách." }
    ]
  },
  {
    id: "f-5",
    title: "5. Động từ & Giới từ 给 (Đưa, Cho)",
    formula: "S + 给 + Ai + Cái gì (Động từ) | A + 给 + B + V + O (Giới từ)",
    explanation: "Động từ 给 nghĩa là đưa cho, tặng cho ai. Giới từ 给 diễn tả đối tượng tiếp nhận hành vi (làm cái gì cho ai).",
    category: "giới từ",
    examples: [
      { zh: "我给他一本书。", pinyin: "Wǒ gěi tā yì běn shū.", vi: "Tôi đưa/cho anh ấy một quyển sách." },
      { zh: "爸爸给我很多钱。", pinyin: "Bàba gěi wǒ hěn duō qián.", vi: "Bố cho tôi rất nhiều tiền." },
      { zh: "我给妈妈打电话。", pinyin: "Wǒ gěi māma dǎ diànhuà.", vi: "Tôi gọi điện thoại cho mẹ." },
      { zh: "她给我买很多水果。", pinyin: "Tā gěi wǒ mǎi hěn duō shuǐguǒ.", vi: "Cô ấy mua cho tôi rất nhiều hoa quả." }
    ]
  },
  {
    id: "f-6",
    title: "6. Cấu trúc Cùng nhau làm gì (和 & 一起)",
    formula: "A + 和 + B + (一起) + V + O",
    explanation: "Liên từ '和' nối hai danh từ/đại từ. Khi muốn nói 'A làm gì cùng với B', trong tiếng Trung cấu trúc '和 B (一起)' phải đặt TRƯỚC động từ.",
    category: "giới từ",
    examples: [
      { zh: "我和妈妈去商店买水果。", pinyin: "Wǒ hé māma qù shāngdiàn mǎi shuǐguǒ.", vi: "Tôi đi cửa hàng mua trái cây cùng với mẹ." },
      { zh: "明天我和他一起去看电影。", pinyin: "Míngtiān wǒ hé tā yìqǐ qù kàn diànyǐng.", vi: "Ngày mai tôi và anh ấy cùng nhau đi xem phim." },
      { zh: "爸爸和妈妈下午去买衣服。", pinyin: "Bàba hé māma xiàwǔ qù mǎi yīfu.", vi: "Bố và mẹ chiều nay đi mua quần áo." }
    ]
  },
  {
    id: "f-7",
    title: "7. Trật tự Thời gian trong câu",
    formula: "Năm → Tháng → Ngày (Thứ) → Buổi → Giờ → Phút + S + V + O",
    explanation: "Trật tự thời gian trong tiếng Trung đi từ LỚN ĐẾN BÉ. Cụm từ thời gian đứng ở đầu câu (trước chủ ngữ) hoặc ngay sau chủ ngữ (trước động từ vị ngữ).",
    category: "thời gian",
    examples: [
      { zh: "今天 2026 年 11 月 12 号星期四。", pinyin: "Jīntiān 2026 nián 11 yuè 12 hào xīngqīsì.", vi: "Hôm nay là Thứ Năm, ngày 12 tháng 11 năm 2026." },
      { zh: "星期四我学汉语。", pinyin: "Xīngqīsì wǒ xué Hànyǔ.", vi: "Thứ Năm tôi học tiếng Hán." },
      { zh: "今天中午十一点我吃饭。", pinyin: "Jīntiān zhōngwǔ shíyī diǎn wǒ chīfàn.", vi: "Trưa hôm nay lúc 11 giờ tôi ăn cơm." },
      { zh: "三点前我回来。", pinyin: "Sān diǎn qián wǒ huí lai.", vi: "Trước 3 giờ tôi trở về." },
      { zh: "四十分钟后我回家。", pinyin: "Sìshí fēnzhōng hòu wǒ huí jiā.", vi: "Sau 40 phút nữa tôi về nhà." }
    ],
    notes: ["...前 (qián): trước mốc thời gian đó; ...后 (hòu): sau khoảng/mốc thời gian đó."]
  },
  {
    id: "f-8",
    title: "8. Phó từ 都 (Đều, Tất cả)",
    formula: "Chủ ngữ (số nhiều) + 都 + V / Tính từ",
    explanation: "'都' là phó từ, luôn luôn đứng trước động từ hoặc hình dung từ, chủ ngữ đi kèm phải là danh từ hoặc đại từ số nhiều (我们, 他们, 这些...).",
    category: "phó từ & trợ từ",
    examples: [
      { zh: "这些都是王方的东西。", pinyin: "Zhèxiē dōu shì Wáng Fāng de dōngxi.", vi: "Những thứ này đều là đồ của Vương Phương." },
      { zh: "我们都喜欢喝中国茶。", pinyin: "Wǒmen dōu xǐhuan hē Zhōngguó chá.", vi: "Chúng tôi đều thích uống trà Trung Quốc." },
      { zh: "桌子上都是爸爸的书。", pinyin: "Zhuōzi shang dōu shì bàba de shū.", vi: "Trên bàn toàn là sách của bố." }
    ]
  },
  {
    id: "f-9",
    title: "9. Cấu trúc Nhấn mạnh 是……的",
    formula: "S + 是 + [Thời gian / Địa điểm / Phương thức] + V + 的 | Phủ định: S + 不是 + ... + V + 的",
    explanation: "Dùng để nhấn mạnh thời gian, địa điểm, cách thức hoặc đối tượng thực hiện của một hành vi ĐÃ XẢY RA trong quá khứ. Đặt '是' ngay trước thành phần cần nhấn mạnh, cuối câu có '的'.",
    category: "phó từ & trợ từ",
    examples: [
      { zh: "我是昨天回来的。——你是什么时候回来的？", pinyin: "Wǒ shì zuótiān huí lai de. —— Nǐ shì shénme shíhou huí lai de?", vi: "Tôi về hôm qua đấy. — Bạn về khi nào thế?" },
      { zh: "她是开车去学校的。——她是怎么去学校的？", pinyin: "Tā shì kāi chē qù xuéxiào de. —— Tā shì zěnme qù xuéxiào de?", vi: "Cô ấy lái xe đi học đấy. — Cô ấy đi học bằng cách nào?" },
      { zh: "这个电脑是在中国买的。——是在哪儿买的？", pinyin: "Zhè ge diànnǎo shì zài Zhōngguó mǎi de. —— Shì zài nǎr mǎi de?", vi: "Cái máy tính này mua ở Trung Quốc đấy. — Mua ở đâu thế?" },
      { zh: "她不是开车来的，她是坐出租车来的。", pinyin: "Tā bú shì kāi chē lái de, tā shì zuò chūzūchē lái de.", vi: "Cô ấy không phải lái xe đến, cô ấy đi bằng taxi." }
    ]
  },
  {
    id: "f-10",
    title: "10. Hỏi & Trả lời Phương tiện đi lại",
    formula: "S + 怎么 + V + (Địa điểm/O)? | Trả lời: S + [开车 / 坐飞机 / 坐出租车] + V",
    explanation: "Đại từ nghi vấn '怎么' đứng trước động từ hỏi về phương thức thực hiện hành động (đi bằng gì, làm như thế nào).",
    category: "đại từ nghi vấn",
    examples: [
      { zh: "你是怎么去学校的？——我是开车去学校的。", pinyin: "Nǐ shì zěnme qù xuéxiào de? —— Wǒ shì kāi chē qù xuéxiào de.", vi: "Bạn đến trường bằng phương tiện gì? — Tôi lái xe đến trường." },
      { zh: "你怎么回家的？——我坐出租车回家。", pinyin: "Nǐ zěnme huí jiā de? —— Wǒ zuò chūzūchē huí jiā.", vi: "Bạn về nhà bằng cách nào? — Tôi ngồi taxi về nhà." },
      { zh: "开车", pinyin: "kāi chē", vi: "Lái xe ô tô" },
      { zh: "坐飞机", pinyin: "zuò fēijī", vi: "Đi/ngồi máy bay" },
      { zh: "坐出租车", pinyin: "zuò chūzūchē", vi: "Đi/ngồi taxi" }
    ]
  },
  {
    id: "f-11",
    title: "11. Quy tắc Đặt câu hỏi cho phần gạch chân",
    formula: "Bước 1: Xác định phần gạch chân → Bước 2: Chọn đại từ nghi vấn phù hợp → Bước 3: Thay thế trực tiếp → Bước 4: Chuyển ngôi (我 → 你)",
    explanation: "Nguyên tắc vàng: Tất cả các thành phần KHÔNG GẠCH CHÂN phải GIỮ NGUYÊN VỊ TRÍ, không xáo trộn cấu trúc câu, chỉ chuyển ngôi nhân xưng '我' thành '你'.",
    category: "đại từ nghi vấn",
    examples: [
      { zh: "她是我的中国朋友。→ 她是谁？", pinyin: "Tā shì wǒ de Zhōngguó péngyou. → Tā shì shéi?", vi: "Người (gạch chân: 我的中国朋友) → Dùng 谁" },
      { zh: "我想喝茶。→ 你想喝什么？", pinyin: "Wǒ xiǎng hē chá. → Nǐ xiǎng hē shénme?", vi: "Vật/Đồ uống (gạch chân: 茶) → Dùng 什么" },
      { zh: "王方星期一去北京。→ 王方星期一去哪儿？", pinyin: "Wáng Fāng xīngqīyī qù Běijīng. → Wáng Fāng xīngqīyī qù nǎr?", vi: "Địa điểm (gạch chân: 北京) → Dùng 哪儿" },
      { zh: "他星期五前能回家。→ 他什么时候能回家？", pinyin: "Tā xīngqīwǔ qián néng huí jiā. → Tā shénme shíhou néng huí jiā?", vi: "Thời gian (gạch chân: 星期五前) → Dùng 什么时候" },
      { zh: "今天天气很好。→ 今天天气怎么样？", pinyin: "Jīntiān tiānqì hěn hǎo. → Jīntiān tiānqì zěnmeyàng?", vi: "Tính chất/Thời tiết (gạch chân: 很好) → Dùng 怎么样" },
      { zh: "这个菜 25 块。→ 这个菜多少钱？", pinyin: "Zhè ge cài 25 kuài. → Zhè ge cài duōshao qián?", vi: "Giá tiền (gạch chân: 25块) → Dùng 多少钱" },
      { zh: "我女儿今年三岁。→ 你女儿今年几岁？", pinyin: "Wǒ nǚ'ér jīnnián sān suì. → Nǐ nǚ'ér jīnnián jǐ suì?", vi: "Tuổi nhỏ < 10 (gạch chân: 三岁) → Dùng 几岁" },
      { zh: "我今年 20 岁。→ 你今年多大？", pinyin: "Wǒ jīnnián 20 suì. → Nǐ jīnnián duō dà?", vi: "Tuổi người lớn > 10 (gạch chân: 20岁) → Dùng 多大" },
      { zh: "我家有四口人。→ 你家有几口人？", pinyin: "Wǒ jiā yǒu sì kǒu rén. → Nǐ jiā yǒu jǐ kǒu rén?", vi: "Số lượng nhỏ < 10 (gạch chân: 四) → Dùng 几" },
      { zh: "我们学校有 1000 个学生。→ 你们学校有多少个学生？", pinyin: "Wǒmen xuéxiào yǒu 1000 gè xuésheng. → Nǐmen xuéxiào yǒu duōshao gè xuésheng?", vi: "Số lượng lớn > 10 (gạch chân: 1000) → Dùng 多少" },
      { zh: "我想学写汉字。→ 你想学做什么？", pinyin: "Wǒ xiǎng xué xiě hànzì. → Nǐ xiǎng xué zuò shénme?", vi: "Hành động V+O (gạch chân: 写汉字) → Dùng 做什么" }
    ]
  }
];
