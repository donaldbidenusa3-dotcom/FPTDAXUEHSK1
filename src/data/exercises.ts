// Ngân hàng 5 dạng bài tập HSK 1 trích xuất từ các tài liệu CHN113:
// A. Dịch Việt -> Trung (91 câu)
// B. Dịch Trung -> Việt (Hội thoại & câu mẫu bài 1 - 15)
// C. Sắp xếp từ thành câu (40 câu)
// D. Trả lời câu hỏi theo ngữ cảnh (15 câu)
// E. Đặt câu hỏi cho phần gạch chân (35 câu)

export type ExerciseType = "trans_vi_zh" | "trans_zh_vi" | "rearrange" | "qa" | "underline_question";

export interface ExerciseItem {
  id: string;
  type: ExerciseType;
  prompt: string;          // Đề bài
  subPrompt?: string;      // Thông tin phụ (từ gợi ý trong ngoặc, từ gạch chân...)
  pinyin?: string;         // Pinyin nếu đề bài là tiếng Trung
  expectedAnswer: string;  // Đáp án mẫu chuẩn HSK 1
  expectedPinyin?: string; // Pinyin đáp án mẫu
  scrambledWords?: string[]; // Danh sách từ rời để sắp xếp (với dạng C)
  explanation?: string;    // Giải thích ngữ pháp
}

export const INITIAL_EXERCISES: ExerciseItem[] = [
  // ==========================================
  // DẠNG A: DỊCH TIẾNG VIỆT SANG TIẾNG TRUNG (91 CÂU)
  // ==========================================
  {
    id: "ex-a-1",
    type: "trans_vi_zh",
    prompt: "1. Anh ấy đang học nấu món ăn Trung Quốc.",
    expectedAnswer: "他在学做中国菜呢。",
    expectedPinyin: "Tā zài xué zuò Zhōngguó cài ne.",
    explanation: "Cấu trúc hành động đang tiếp diễn: S + 在 + V + O (呢)."
  },
  {
    id: "ex-a-2",
    type: "trans_vi_zh",
    prompt: "2. Tạ Bằng đang đọc sách ở nhà.",
    expectedAnswer: "谢朋在家看书呢。",
    expectedPinyin: "Xiè Péng zài jiā kànshū ne.",
    explanation: "Cấu trúc giới từ 在 chỉ nơi chốn: S + 在 + Địa điểm + V + O."
  },
  {
    id: "ex-a-3",
    type: "trans_vi_zh",
    prompt: "3. Bố tôi đang xem ti vi ở nhà.",
    expectedAnswer: "我爸爸在家看电视呢。",
    expectedPinyin: "Wǒ bàba zài jiā kàn diànshì ne."
  },
  {
    id: "ex-a-4",
    type: "trans_vi_zh",
    prompt: "4. Bố và mẹ chiều nay đi xem phim.",
    expectedAnswer: "爸爸和妈妈今天下午去看电影。",
    expectedPinyin: "Bàba hé māma jīntiān xiàwǔ qù kàn diànyǐng."
  },
  {
    id: "ex-a-5",
    type: "trans_vi_zh",
    prompt: "5. Vương Phương thích viết chữ Hán.",
    expectedAnswer: "王方喜欢写汉字。",
    expectedPinyin: "Wáng Fāng xǐhuan xiě hànzì."
  },
  {
    id: "ex-a-6",
    type: "trans_vi_zh",
    prompt: "6. David đang ngủ ở nhà.",
    expectedAnswer: "大卫在家睡觉呢。",
    expectedPinyin: "Dàwèi zài jiā shuìjiào ne."
  },
  {
    id: "ex-a-7",
    type: "trans_vi_zh",
    prompt: "7. Đây là số điện thoại của cô Lý.",
    expectedAnswer: "这是李老师的电话号码。",
    expectedPinyin: "Zhè shì Lǐ lǎoshī de diànhuà hàomǎ."
  },
  {
    id: "ex-a-8",
    type: "trans_vi_zh",
    prompt: "8. Buổi sáng, tôi học ở trường.",
    expectedAnswer: "上午我在学校学习。",
    expectedPinyin: "Shàngwǔ wǒ zài xuéxiào xuéxí."
  },
  {
    id: "ex-a-9",
    type: "trans_vi_zh",
    prompt: "9. A lô, bạn đang làm gì đấy?",
    expectedAnswer: "喂，你在做什么呢？",
    expectedPinyin: "Wèi, nǐ zài zuò shénme ne?"
  },
  {
    id: "ex-a-10",
    type: "trans_vi_zh",
    prompt: "10. Buổi sáng, tôi gọi điện thoại cho mẹ.",
    expectedAnswer: "上午我给妈妈打电话。",
    expectedPinyin: "Shàngwǔ wǒ gěi māma dǎ diànhuà."
  },
  {
    id: "ex-a-11",
    type: "trans_vi_zh",
    prompt: "11. Số điện thoại của thầy Vương là 00813927564.",
    expectedAnswer: "王老师的电话是00813927564。",
    expectedPinyin: "Wáng lǎoshī de diànhuà shì 00813927564."
  },
  {
    id: "ex-a-12",
    type: "trans_vi_zh",
    prompt: "12. Hôm qua thời tiết ở Bắc Kinh không tốt lắm.",
    expectedAnswer: "昨天北京的天气不太好。",
    expectedPinyin: "Zuótiān Běijīng de tiānqì bú tài hǎo."
  },
  {
    id: "ex-a-13",
    type: "trans_vi_zh",
    prompt: "13. Hôm nay, thời tiết rất đẹp, không nóng, không lạnh.",
    expectedAnswer: "今天天气很好，不冷不热。",
    expectedPinyin: "Jīntiān tiānqì hěn hǎo, bù lěng bú rè."
  },
  {
    id: "ex-a-14",
    type: "trans_vi_zh",
    prompt: "14. Chủ nhật, thời tiết nóng lắm.",
    expectedAnswer: "星期天天气太热了。",
    expectedPinyin: "Xīngqītiān tiānqì tài rè le."
  },
  {
    id: "ex-a-15",
    type: "trans_vi_zh",
    prompt: "15. Hôm nay sẽ không mưa đâu.",
    expectedAnswer: "今天不会下雨。",
    expectedPinyin: "Jīntiān bú huì xiàyǔ."
  },
  {
    id: "ex-a-16",
    type: "trans_vi_zh",
    prompt: "16. Hôm nay, chị Vương sẽ không đến đâu.",
    expectedAnswer: "今天王小姐不会来。",
    expectedPinyin: "Jīntiān Wáng xiǎojiě bú huì lái."
  },
  {
    id: "ex-a-17",
    type: "trans_vi_zh",
    prompt: "17. Sức khỏe của bố tôi không tốt lắm.",
    expectedAnswer: "我爸爸身体不太好。",
    expectedPinyin: "Wǒ bàba shēntǐ bú tài hǎo."
  },
  {
    id: "ex-a-18",
    type: "trans_vi_zh",
    prompt: "18. Trời nóng quá, tôi không muốn ăn cơm.",
    expectedAnswer: "天气太热了，我不想吃饭。",
    expectedPinyin: "Tiānqì tài rè le, wǒ bù xiǎng chīfàn."
  },
  {
    id: "ex-a-19",
    type: "trans_vi_zh",
    prompt: "19. Bạn ăn nhiều hoa quả, uống nhiều nước nhé.",
    expectedAnswer: "你多吃水果，多喝水吧。",
    expectedPinyin: "Nǐ duō chī shuǐguǒ, duō hē shuǐ ba."
  },
  {
    id: "ex-a-20",
    type: "trans_vi_zh",
    prompt: "20. Bây giờ là 3h30 chiều.",
    expectedAnswer: "现在是下午三点半。",
    expectedPinyin: "Xiànzài shì xiàwǔ sān diǎn bàn."
  },
  {
    id: "ex-a-21",
    type: "trans_vi_zh",
    prompt: "21. Buổi trưa tôi ăn cơm lúc 11h20.",
    expectedAnswer: "中午十一点二十分我吃饭。",
    expectedPinyin: "Zhōngwǔ shíyī diǎn èrshí fēn wǒ chīfàn."
  },
  {
    id: "ex-a-22",
    type: "trans_vi_zh",
    prompt: "22. David 9h15 sáng đi xem phim.",
    expectedAnswer: "大卫上午九点十五分去看不影。",
    expectedPinyin: "Dàwèi shàngwǔ jiǔ diǎn shíwǔ fēn qù kàn diànyǐng."
  },
  {
    id: "ex-a-23",
    type: "trans_vi_zh",
    prompt: "23. Tạ Bằng muốn sống ở Bắc Kinh 5 ngày.",
    expectedAnswer: "谢朋想在北京住五天。",
    expectedPinyin: "Xiè Péng xiǎng zài Běijīng zhù wǔ tiān."
  },
  {
    id: "ex-a-24",
    type: "trans_vi_zh",
    prompt: "24. Tôi có thể về nhà trước thứ ba.",
    expectedAnswer: "星期二前我能回家。",
    expectedPinyin: "Xīngqī'èr qián wǒ néng huí jiā."
  },
  {
    id: "ex-a-25",
    type: "trans_vi_zh",
    prompt: "25. Trên bàn có một quyển sách và một cái máy tính.",
    expectedAnswer: "桌子上有一本书和一个电脑。",
    expectedPinyin: "Zhuōzi shang yǒu yì běn shū hé yí gè diànnǎo."
  },
  {
    id: "ex-a-26",
    type: "trans_vi_zh",
    prompt: "26. Trên ghế có một cái cốc và một quyển sách.",
    expectedAnswer: "椅子上有一个杯子和一本书。",
    expectedPinyin: "Yǐzi shang yǒu yí gè bēizi hé yì běn shū."
  },
  {
    id: "ex-a-27",
    type: "trans_vi_zh",
    prompt: "27. Những quyển sách này của Vương Phương.",
    expectedAnswer: "这些书是王方的。",
    expectedPinyin: "Zhèxiē shū shì Wáng Fāng de."
  },
  {
    id: "ex-a-28",
    type: "trans_vi_zh",
    prompt: "28. Con mèo ở trên chiếc bàn kia.",
    expectedAnswer: "猫在那个桌子上。",
    expectedPinyin: "Māo zài nà ge zhuōzi shang."
  },
  {
    id: "ex-a-29",
    type: "trans_vi_zh",
    prompt: "29. Con chó ở dưới cái ghế kia.",
    expectedAnswer: "狗在那个椅子下面。",
    expectedPinyin: "Gǒu zài nà ge yǐzi xiàmiàn."
  },
  {
    id: "ex-a-30",
    type: "trans_vi_zh",
    prompt: "30. Người ở phía trước kia là bạn tôi.",
    expectedAnswer: "前面那个人是我朋友。",
    expectedPinyin: "Qiánmiàn nà ge rén shì wǒ péngyou."
  },
  {
    id: "ex-a-31",
    type: "trans_vi_zh",
    prompt: "31. Người ở phía sau kia là bạn cùng học của tôi.",
    expectedAnswer: "后面那个人是我的同学。",
    expectedPinyin: "Hòumiàn nà ge rén shì wǒ de tóngxué."
  },
  {
    id: "ex-a-32",
    type: "trans_vi_zh",
    prompt: "32. Trong ngăn bàn có một cái cốc.",
    expectedAnswer: "桌子里面有一个杯子。",
    expectedPinyin: "Zhuōzi lǐmiàn yǒu yí gè bēizi."
  },
  {
    id: "ex-a-33",
    type: "trans_vi_zh",
    prompt: "33. Chỗ này không có người, bạn có thể ngồi.",
    expectedAnswer: "这儿没有人，你可以坐。",
    expectedPinyin: "Zhèr méiyǒu rén, nǐ kěyǐ zuò."
  },
  {
    id: "ex-a-34",
    type: "trans_vi_zh",
    prompt: "34. Vương Phương làm việc ở bệnh viện.",
    expectedAnswer: "王方在医院工作。",
    expectedPinyin: "Wáng Fāng zài yīyuàn gōngzuò."
  },
  {
    id: "ex-a-35",
    type: "trans_vi_zh",
    prompt: "35. Tạ Bằng làm việc ở cửa hàng.",
    expectedAnswer: "谢朋在商店工作。",
    expectedPinyin: "Xiè Péng zài shāngdiàn gōngzuò."
  },
  {
    id: "ex-a-36",
    type: "trans_vi_zh",
    prompt: "36. Bố tôi làm việc ở trường học.",
    expectedAnswer: "我爸爸在学校工作。",
    expectedPinyin: "Wǒ bàba zài xuéxiào gōngzuò."
  },
  {
    id: "ex-a-37",
    type: "trans_vi_zh",
    prompt: "37. Mẹ tôi là bác sỹ của bệnh viện này.",
    expectedAnswer: "我妈妈是这个医院的医生。",
    expectedPinyin: "Wǒ māma shì zhè ge yīyuàn de yīshēng."
  },
  {
    id: "ex-a-38",
    type: "trans_vi_zh",
    prompt: "38. Bố tôi là giáo viên của trường FPT.",
    expectedAnswer: "我爸爸是FPT大学的老师。",
    expectedPinyin: "Wǒ bàba shì FPT dàxué de lǎoshī."
  },
  {
    id: "ex-a-39",
    type: "trans_vi_zh",
    prompt: "39. Tôi muốn uống trà Trung Quốc.",
    expectedAnswer: "我想喝中国茶。",
    expectedPinyin: "Wǒ xiǎng hē Zhōngguó chá."
  },
  {
    id: "ex-a-40",
    type: "trans_vi_zh",
    prompt: "40. Cậu ấy muốn ăn cơm.",
    expectedAnswer: "他想吃米饭。",
    expectedPinyin: "Tā xiǎng chī mǐfàn."
  },
  {
    id: "ex-a-41",
    type: "trans_vi_zh",
    prompt: "41. Buổi chiều tôi muốn đi xem phim.",
    expectedAnswer: "下午我想去看电影。",
    expectedPinyin: "Xiàwǔ wǒ xiǎng qù kàn diànyǐng."
  },
  {
    id: "ex-a-42",
    type: "trans_vi_zh",
    prompt: "42. Tôi muốn đi cửa hàng mua một quyển sách.",
    expectedAnswer: "我想去商店买一本书。",
    expectedPinyin: "Wǒ xiǎng qù shāngdiàn mǎi yì běn shū."
  },
  {
    id: "ex-a-43",
    type: "trans_vi_zh",
    prompt: "43. Cái cốc kia 18 tệ một chiếc.",
    expectedAnswer: "那个杯子十八块。",
    expectedPinyin: "Nà ge bēizi shíbā kuài."
  },
  {
    id: "ex-a-44",
    type: "trans_vi_zh",
    prompt: "44. Quyển sách này 9 tệ.",
    expectedAnswer: "这本书九块钱。",
    expectedPinyin: "Zhè běn shū jiǔ kuài qián."
  },
  {
    id: "ex-a-45",
    type: "trans_vi_zh",
    prompt: "45. Hôm nay thứ ba, ngày 15/09.",
    expectedAnswer: "今天九月十五号星期二。",
    expectedPinyin: "Jīntiān jiǔ yuè shíwǔ hào xīngqī'èr."
  },
  {
    id: "ex-a-46",
    type: "trans_vi_zh",
    prompt: "46. Tôi muốn đi đến trường đọc sách.",
    expectedAnswer: "我想去学校看书。",
    expectedPinyin: "Wǒ xiǎng qù xuéxiào kànshū."
  },
  {
    id: "ex-a-47",
    type: "trans_vi_zh",
    prompt: "47. 4h chiều nay tôi muốn về nhà.",
    expectedAnswer: "今天下午四点我想回家。",
    expectedPinyin: "Jīntiān xiàwǔ sì diǎn wǒ xiǎng huí jiā."
  },
  {
    id: "ex-a-48",
    type: "trans_vi_zh",
    prompt: "48. Tôi không biết nấu đồ ăn Trung Quốc.",
    expectedAnswer: "我不会做中国菜。",
    expectedPinyin: "Wǒ bú huì zuò Zhōngguó cài."
  },
  {
    id: "ex-a-49",
    type: "trans_vi_zh",
    prompt: "49. Vương Phương biết nói tiếng Trung Quốc.",
    expectedAnswer: "王方会说汉语。",
    expectedPinyin: "Wáng Fāng huì shuō Hànyǔ."
  },
  {
    id: "ex-a-50",
    type: "trans_vi_zh",
    prompt: "50. Chữ Hán này tôi biết đọc, không biết viết.",
    expectedAnswer: "这个汉字我会读，不会写。",
    expectedPinyin: "Zhè ge hànzì wǒ huì dú, bú huì xiě."
  },
  {
    id: "ex-a-51",
    type: "trans_vi_zh",
    prompt: "51. Năm nay con gái tôi 19 tuổi.",
    expectedAnswer: "我女儿今年十九岁。",
    expectedPinyin: "Wǒ nǚ'ér jīnnián shíjiǔ suì."
  },
  {
    id: "ex-a-52",
    type: "trans_vi_zh",
    prompt: "52. Năm nay con trai tôi 24 tuổi.",
    expectedAnswer: "我儿子今年二十四岁。",
    expectedPinyin: "Wǒ érzi jīnnián èrshísì suì."
  },
  {
    id: "ex-a-53",
    type: "trans_vi_zh",
    prompt: "53. Nhà tôi có 5 người, bố, mẹ, hai anh trai và tôi.",
    expectedAnswer: "我家有五口人：爸爸、妈妈、两个哥哥和我。",
    expectedPinyin: "Wǒ jiā yǒu wǔ kǒu rén: bàba, māma, liǎng gè gēge hé wǒ."
  },
  {
    id: "ex-a-54",
    type: "trans_vi_zh",
    prompt: "54. Đây là giáo viên tiếng Trung của tôi.",
    expectedAnswer: "这是我的汉语老师。",
    expectedPinyin: "Zhè shì wǒ de Hànyǔ lǎoshī."
  },
  {
    id: "ex-a-55",
    type: "trans_vi_zh",
    prompt: "55. Anh ấy là bác sĩ và là bạn của tôi.",
    expectedAnswer: "他是医生，也是我的朋友。",
    expectedPinyin: "Tā shì yīshēng, yě shì wǒ de péngyou."
  },
  {
    id: "ex-a-56",
    type: "trans_vi_zh",
    prompt: "56. Lý Nguyệt là bạn Trung Quốc của tôi.",
    expectedAnswer: "李月是我的中国朋友。",
    expectedPinyin: "Lǐ Yuè shì wǒ de Zhōngguó péngyou."
  },
  {
    id: "ex-a-57",
    type: "trans_vi_zh",
    prompt: "57. Đây là học sinh của thầy Vương.",
    expectedAnswer: "这是王老师的学生。",
    expectedPinyin: "Zhè shì Wáng lǎoshī de xuésheng."
  },
  {
    id: "ex-a-58",
    type: "trans_vi_zh",
    prompt: "58. David là bạn người Mỹ của tôi.",
    expectedAnswer: "大卫是我的美国朋友。",
    expectedPinyin: "Dàwèi shì wǒ de Měiguó péngyou."
  },
  {
    id: "ex-a-59",
    type: "trans_vi_zh",
    prompt: "59. Cảm ơn bạn đã mua cho tôi quyển sách này.",
    expectedAnswer: "谢谢你给我买这本书。",
    expectedPinyin: "Xièxie nǐ gěi wǒ mǎi zhè běn shū."
  },
  {
    id: "ex-a-60",
    type: "trans_vi_zh",
    prompt: "60. Xin lỗi, tôi có thể ngồi ở đây được không?",
    expectedAnswer: "对不起，我能坐在这儿吗？",
    expectedPinyin: "Duìbuqǐ, wǒ néng zuò zài zhèr ma?"
  },
  {
    id: "ex-a-61",
    type: "trans_vi_zh",
    prompt: "61. Nhà tôi có 1 con chó và 1 con mèo.",
    expectedAnswer: "我家有一只狗和一只猫。",
    expectedPinyin: "Wǒ jiā yǒu yì zhī gǒu hé yì zhī māo."
  },
  {
    id: "ex-a-62",
    type: "trans_vi_zh",
    prompt: "62. Người ở phía sau là bố tôi, ông ấy làm việc ở bệnh viện Bắc Kinh.",
    expectedAnswer: "后面那个人是我爸爸，他在北京医院工作。",
    expectedPinyin: "Hòumiàn nà ge rén shì wǒ bàba, tā zài Běijīng yīyuàn gōngzuò."
  },
  {
    id: "ex-a-63",
    type: "trans_vi_zh",
    prompt: "63. Quyển sách của tôi ở trên ghế, quyển sách của anh ấy ở trong ngăn bàn.",
    expectedAnswer: "我的书在椅子上，他的书在桌子里。",
    expectedPinyin: "Wǒ de shū zài yǐzi shang, tā de shū zài zhuōzi lǐ."
  },
  {
    id: "ex-a-64",
    type: "trans_vi_zh",
    prompt: "64. Ngày mai anh có thể đến nhà tôi được không?",
    expectedAnswer: "明天你能来我家吗？",
    expectedPinyin: "Míngtiān nǐ néng lái wǒ jiā ma?"
  },
  {
    id: "ex-a-65",
    type: "trans_vi_zh",
    prompt: "65. Quyển sách này rất hay, con có thể mua.",
    expectedAnswer: "这本书很好看，你可以买。",
    expectedPinyin: "Zhè běn shū hěn hǎokàn, nǐ kěyǐ mǎi."
  },
  {
    id: "ex-a-66",
    type: "trans_vi_zh",
    prompt: "66. Lý Nguyệt làm việc ở trường phía sau.",
    expectedAnswer: "李月在后面的学校工作。",
    expectedPinyin: "Lǐ Yuè zài hòumiàn de xuéxiào gōngzuò."
  },
  {
    id: "ex-a-67",
    type: "trans_vi_zh",
    prompt: "67. Trước trường đại học đó là bệnh viện Bắc Kinh.",
    expectedAnswer: "那个大学前面是北京医院。",
    expectedPinyin: "Nà ge dàxué qiánmiàn shì Běijīng yīyuàn."
  },
  {
    id: "ex-a-68",
    type: "trans_vi_zh",
    prompt: "68. Vương Phương ngồi ở phía trước, phía sau cô ấy là Tạ Bằng.",
    expectedAnswer: "王方坐在前面，她后面是谢朋。",
    expectedPinyin: "Wáng Fāng zuò zài qiánmiàn, tā hòumiàn shì Xiè Péng."
  },
  {
    id: "ex-a-69",
    type: "trans_vi_zh",
    prompt: "69. Trong cửa hàng này không có sách tiếng Hán.",
    expectedAnswer: "这个商店里没有汉语书。",
    expectedPinyin: "Zhè ge shāngdiàn lǐ méiyǒu Hànyǔ shū."
  },
  {
    id: "ex-a-70",
    type: "trans_vi_zh",
    prompt: "70. Sáng hôm qua tôi và mẹ đi cửa hàng mua một ít hoa quả và trà.",
    expectedAnswer: "昨天上午我和妈妈去商店买了一点儿水果和茶。",
    expectedPinyin: "Zuótiān shàngwǔ wǒ hé māma qù shāngdiàn mǎi le yìdiǎnr shuǐguǒ hé chá."
  },
  {
    id: "ex-a-71",
    type: "trans_vi_zh",
    prompt: "71. Tôi không biết lái xe, tháng 12 năm nay tôi đi học lái xe.",
    expectedAnswer: "我不会开车，今年十二月我去学开车。",
    expectedPinyin: "Wǒ bú huì kāi chē, jīnnián shí'èr yuè wǒ qù xué kāi chē."
  },
  {
    id: "ex-a-72",
    type: "trans_vi_zh",
    prompt: "72. Anh ấy đi đến trường rồi, 30 phút nữa sẽ về.",
    expectedAnswer: "他去学校了，三十分钟后回来。",
    expectedPinyin: "Tā qù xuéxiào le, sānshí fēnzhōng hòu huí lai."
  },
  {
    id: "ex-a-73",
    type: "trans_vi_zh",
    prompt: "73. Bạn có nhìn thấy cô Trương không? Cô ấy đi cửa hàng chưa quay lại.",
    expectedAnswer: "你看见张小姐了吗？她去商店了，没回来。",
    expectedPinyin: "Nǐ kànjiàn Zhāng xiǎojiě le ma? Tā qù shāngdiàn le, méi huí lai."
  },
  {
    id: "ex-a-74",
    type: "trans_vi_zh",
    prompt: "74. Alo, xin hỏi bao giờ thầy Vương sẽ về?",
    expectedAnswer: "喂，请问王老师什么时候回来？",
    expectedPinyin: "Wèi, qǐngwèn Wáng lǎoshī shénme shíhou huí lai?"
  },
  {
    id: "ex-a-75",
    type: "trans_vi_zh",
    prompt: "75. Đây đều là quần áo của con gái tôi.",
    expectedAnswer: "这些都是我女儿的衣服。",
    expectedPinyin: "Zhèxiē dōu shì wǒ nǚ'ér de yīfu."
  },
  {
    id: "ex-a-76",
    type: "trans_vi_zh",
    prompt: "76. Vương Phương là bạn học đại học của tôi, cô ấy rất xinh đẹp.",
    expectedAnswer: "王方是我的大学同学，她很漂亮。",
    expectedPinyin: "Wáng Fāng shì wǒ de dàxué tóngxué, tā hěn piàoliang."
  },
  {
    id: "ex-a-77",
    type: "trans_vi_zh",
    prompt: "77. Mấy giờ thì bạn đi đến cửa hàng mua đồ?",
    expectedAnswer: "你几点去商店买东西？",
    expectedPinyin: "Nǐ jǐ diǎn qù shāngdiàn mǎi dōngxi?"
  },
  {
    id: "ex-a-78",
    type: "trans_vi_zh",
    prompt: "78. 8 giờ sáng nay bố tôi lái xe đến bệnh viện làm việc.",
    expectedAnswer: "今天上午八点我爸爸开车去医院工作。",
    expectedPinyin: "Jīntiān shàngwǔ bā diǎn wǒ bàba kāi chē qù yīyuàn gōngzuò."
  },
  {
    id: "ex-a-79",
    type: "trans_vi_zh",
    prompt: "79. 5 giờ chiều mai tôi đi học nấu món ăn Trung Quốc.",
    expectedAnswer: "明天下午五点我去学做中国菜。",
    expectedPinyin: "Míngtiān xiàwǔ wǔ diǎn wǒ qù xué zuò Zhōngguó cài."
  },
  {
    id: "ex-a-80",
    type: "trans_vi_zh",
    prompt: "80. Trên bàn đều là đồ của bố tôi.",
    expectedAnswer: "桌子上都是我爸爸的东西。",
    expectedPinyin: "Zhuōzi shang dōu shì wǒ bàba de dōngxi."
  },
  {
    id: "ex-a-81",
    type: "trans_vi_zh",
    prompt: "81. Hôm qua tôi và mấy người bạn học cùng nhau đi xem một bộ phim Trung Quốc.",
    expectedAnswer: "昨天我和几个同学一起去看了一个中国电影。",
    expectedPinyin: "Zuótiān wǒ hé jǐ gè tóngxué yìqǐ qù kàn le yí gè Zhōngguó diànyǐng."
  },
  {
    id: "ex-a-82",
    type: "trans_vi_zh",
    prompt: "82. Bố tôi và mẹ tôi quen nhau ở trường đại học, họ là bạn học đại học.",
    expectedAnswer: "我爸爸和我妈妈是在大学认识的，他们是大学同学。",
    expectedPinyin: "Wǒ bàba hé wǒ māma shì zài dàxué rènshi de, tāmen shì dàxué tóngxué."
  },
  {
    id: "ex-a-83",
    type: "trans_vi_zh",
    prompt: "83. Tôi và cô Vương quen nhau từ tháng 3 năm 2011.",
    expectedAnswer: "我和王老师是2011年3月认识的。",
    expectedPinyin: "Wǒ hé Wáng lǎoshī shì 2011 nián 3 yuè rènshi de."
  },
  {
    id: "ex-a-84",
    type: "trans_vi_zh",
    prompt: "84. Hôm nay tôi không lái xe đến trường, tôi đi bằng taxi.",
    expectedAnswer: "今天我没开车去学校，我是坐出租车去的。",
    expectedPinyin: "Jīntiān wǒ méi kāi chē qù xuéxiào, wǒ shì zuò chūzūchē qù de."
  },
  {
    id: "ex-a-85",
    type: "trans_vi_zh",
    prompt: "85. Thầy Trương, rất vui được gặp thầy!",
    expectedAnswer: "张老师，很高兴认识您！",
    expectedPinyin: "Zhāng lǎoshī, hěn gāoxìng rènshi nín!"
  },
  {
    id: "ex-a-86",
    type: "trans_vi_zh",
    prompt: "86. Tôi đáp máy bay đến Bắc Kinh gặp thầy Vương.",
    expectedAnswer: "我是坐飞机去北京见王老师的。",
    expectedPinyin: "Wǒ shì zuò fēijī qù Běijīng jiàn Wáng lǎoshī de."
  },
  {
    id: "ex-a-87",
    type: "trans_vi_zh",
    prompt: "87. Những quần áo này là tôi mua ở Bắc Kinh.",
    expectedAnswer: "这些衣服是我在北京买的。",
    expectedPinyin: "Zhèxiē yīfu shì wǒ zài Běijīng mǎi de."
  },
  {
    id: "ex-a-88",
    type: "trans_vi_zh",
    prompt: "88. Quyển sách này không phải tôi mua, là mẹ mua cho tôi.",
    expectedAnswer: "这本书不是我买的，是妈妈给我买的。",
    expectedPinyin: "Zhè běn shū bú shì wǒ mǎi de, shì māma gěi wǒ mǎi de."
  },
  {
    id: "ex-a-89",
    type: "trans_vi_zh",
    prompt: "89. Chúng tôi cùng lái xe tới, tôi không thích đi taxi.",
    expectedAnswer: "我们是一起开车来的，我不喜欢坐出租车。",
    expectedPinyin: "Wǒmen shì yìqǐ kāi chē lái de, wǒ bù xǐhuan zuò chūzūchē."
  },
  {
    id: "ex-a-90",
    type: "trans_vi_zh",
    prompt: "90. Cái máy tính này là mua ở cửa hàng Bắc Kinh.",
    expectedAnswer: "这个电脑是在北京商店买的。",
    expectedPinyin: "Zhè ge diànnǎo shì zài Běijīng shāngdiàn mǎi de."
  },
  {
    id: "ex-a-91",
    type: "trans_vi_zh",
    prompt: "91. Tôi học ở trường đại học FPT.",
    expectedAnswer: "我在FPT大学学习。",
    expectedPinyin: "Wǒ zài FPT dàxué xuéxí."
  },

  // ==========================================
  // DẠNG B: DỊCH TIẾNG TRUNG SANG TIẾNG VIỆT
  // ==========================================
  {
    id: "ex-b-1",
    type: "trans_zh_vi",
    prompt: "你在哪儿工作？我在医院工作。",
    pinyin: "Nǐ zài nǎr gōngzuò? Wǒ zài yīyuàn gōngzuò.",
    expectedAnswer: "Bạn làm việc ở đâu? Tôi làm việc ở bệnh viện."
  },
  {
    id: "ex-b-2",
    type: "trans_zh_vi",
    prompt: "今天天气怎么样？今天天气很好，不冷不热。",
    pinyin: "Jīntiān tiānqì zěnmeyàng? Jīntiān tiānqì hěn hǎo, bù lěng bú rè.",
    expectedAnswer: "Thời tiết hôm nay thế nào? Hôm nay thời tiết rất đẹp, không lạnh không nóng."
  },
  {
    id: "ex-b-3",
    type: "trans_zh_vi",
    prompt: "你想喝什么？我想喝茶。",
    pinyin: "Nǐ xiǎng hē shénme? Wǒ xiǎng hē chá.",
    expectedAnswer: "Bạn muốn uống gì? Tôi muốn uống trà."
  },
  {
    id: "ex-b-4",
    type: "trans_zh_vi",
    prompt: "请问，这个杯子多少钱？这个杯子十八块。",
    pinyin: "Qǐngwèn, zhè ge bēizi duōshao qián? Zhè ge bēizi shíbā kuài.",
    expectedAnswer: "Xin hỏi, cái cốc này bao nhiêu tiền? Chiếc cốc này 18 tệ."
  },
  {
    id: "ex-b-5",
    type: "trans_zh_vi",
    prompt: "她是开车去学校的。",
    pinyin: "Tā shì kāi chē qù xuéxiào de.",
    expectedAnswer: "Cô ấy lái xe ô tô đi đến trường học."
  },
  {
    id: "ex-b-6",
    type: "trans_zh_vi",
    prompt: "桌子上面有一本书和一个电脑。",
    pinyin: "Zhuōzi shàngmian yǒu yì běn shū hé yí gè diànnǎo.",
    expectedAnswer: "Trên bàn có một quyển sách và một chiếc máy tính."
  },
  {
    id: "ex-b-7",
    type: "trans_zh_vi",
    prompt: "我们都喜欢吃中国菜。",
    pinyin: "Wǒmen dōu xǐhuan chī Zhōngguó cài.",
    expectedAnswer: "Chúng tôi đều thích ăn món ăn Trung Quốc."
  },
  {
    id: "ex-b-8",
    type: "trans_zh_vi",
    prompt: "他没在看书，他在睡觉呢。",
    pinyin: "Tā méi zài kànshū, tā zài shuìjiào ne.",
    expectedAnswer: "Anh ấy không đang đọc sách, anh ấy đang ngủ đấy."
  },

  // ==========================================
  // DẠNG C: SẮP XẾP CÂU (40 CÂU CHUẨN ĐỀ THI)
  // ==========================================
  {
    id: "ex-c-1",
    type: "rearrange",
    prompt: "Sắp xếp từ thành câu hoàn chỉnh:",
    scrambledWords: ["朋友家", "去", "明天", "想", "我"],
    expectedAnswer: "明天我想去朋友家。",
    expectedPinyin: "Míngtiān wǒ xiǎng qù péngyou jiā."
  },
  {
    id: "ex-c-2",
    type: "rearrange",
    prompt: "Sắp xếp từ thành câu hoàn chỉnh:",
    scrambledWords: ["这个", "块", "杯子", "35"],
    expectedAnswer: "这个杯子35块。",
    expectedPinyin: "Zhè ge bēizi 35 kuài."
  },
  {
    id: "ex-c-3",
    type: "rearrange",
    prompt: "Sắp xếp từ thành câu hoàn chỉnh:",
    scrambledWords: ["商店", "去", "明天", "买什么", "你"],
    expectedAnswer: "明天你去商店买什么？",
    expectedPinyin: "Míngtiān nǐ qù shāngdiàn mǎi shénme?"
  },
  {
    id: "ex-c-4",
    type: "rearrange",
    prompt: "Sắp xếp từ thành câu hoàn chỉnh:",
    scrambledWords: ["有", "五个", "我", "中国朋友"],
    expectedAnswer: "我有五个中国朋友。",
    expectedPinyin: "Wǒ yǒu wǔ gè Zhōngguó péngyou."
  },
  {
    id: "ex-c-5",
    type: "rearrange",
    prompt: "Sắp xếp từ thành câu hoàn chỉnh:",
    scrambledWords: ["买", "去", "菜", "想", "我", "商店"],
    expectedAnswer: "我想去商店买菜。",
    expectedPinyin: "Wǒ xiǎng qù shāngdiàn mǎi cài."
  },
  {
    id: "ex-c-6",
    type: "rearrange",
    prompt: "Sắp xếp từ thành câu hoàn chỉnh:",
    scrambledWords: ["你", "去哪", "个商店", "买", "杯子"],
    expectedAnswer: "你去哪个商店买杯子？",
    expectedPinyin: "Nǐ qù nǎ ge shāngdiàn mǎi bēizi?"
  },
  {
    id: "ex-c-7",
    type: "rearrange",
    prompt: "Sắp xếp từ thành câu hoàn chỉnh:",
    scrambledWords: ["有", "学校", "学生", "多少", "你们"],
    expectedAnswer: "你们学校有多少学生？",
    expectedPinyin: "Nǐmen xuéxiào yǒu duōshao xuésheng?"
  },
  {
    id: "ex-c-8",
    type: "rearrange",
    prompt: "Sắp xếp từ thành câu hoàn chỉnh:",
    scrambledWords: ["5个", "杯子", "买", "我", "想"],
    expectedAnswer: "我想买5个杯子。",
    expectedPinyin: "Wǒ xiǎng mǎi 5 gè bēizi."
  },
  {
    id: "ex-c-9",
    type: "rearrange",
    prompt: "Sắp xếp từ thành câu hoàn chỉnh:",
    scrambledWords: ["医院", "儿子", "在", "李老师的", "工作"],
    expectedAnswer: "李老师的儿子在医院工作。",
    expectedPinyin: "Lǐ lǎoshī de érzi zài yīyuàn gōngzuò."
  },
  {
    id: "ex-c-10",
    type: "rearrange",
    prompt: "Sắp xếp từ thành câu hoàn chỉnh:",
    scrambledWords: ["椅子", "我女儿", "在", "的小猫", "下面"],
    expectedAnswer: "我女儿的小猫在椅子下面。",
    expectedPinyin: "Wǒ nǚ'ér de xiǎomāo zài yǐzi xiàmiàn."
  },
  {
    id: "ex-c-11",
    type: "rearrange",
    prompt: "Sắp xếp từ thành câu hoàn chỉnh:",
    scrambledWords: ["回", "八点", "前", "吗", "爸爸", "家", "会"],
    expectedAnswer: "爸爸八点前会回家吗？",
    expectedPinyin: "Bàba bā diǎn qián huì huí jiā ma?"
  },
  {
    id: "ex-c-12",
    type: "rearrange",
    prompt: "Sắp xếp từ thành câu hoàn chỉnh:",
    scrambledWords: ["怎么样", "北京的", "明天", "天气"],
    expectedAnswer: "明天北京的天气怎么样？",
    expectedPinyin: "Míngtiān Běijīng de tiānqì zěnmeyàng?"
  },
  {
    id: "ex-c-13",
    type: "rearrange",
    prompt: "Sắp xếp từ thành câu hoàn chỉnh:",
    scrambledWords: ["学校", "什么", "你", "去", "时候", "看书"],
    expectedAnswer: "你什么时候去学校看书？",
    expectedPinyin: "Nǐ shénme shíhou qù xuéxiào kànshū?"
  },
  {
    id: "ex-c-14",
    type: "rearrange",
    prompt: "Sắp xếp từ thành câu hoàn chỉnh:",
    scrambledWords: ["你", "喝", "多", "要", "水"],
    expectedAnswer: "你要多喝水。",
    expectedPinyin: "Nǐ yào duō hē shuǐ."
  },
  {
    id: "ex-c-15",
    type: "rearrange",
    prompt: "Sắp xếp từ thành câu hoàn chỉnh:",
    scrambledWords: ["去", "的同学", "星期天", "谢朋", "北京"],
    expectedAnswer: "谢朋的同学星期天去北京。",
    expectedPinyin: "Xiè Péng de tóngxué xīngqītiān qù Běijīng."
  },
  {
    id: "ex-c-16",
    type: "rearrange",
    prompt: "Sắp xếp từ thành câu hoàn chỉnh:",
    scrambledWords: ["四十五分", "中午", "十二点", "现在"],
    expectedAnswer: "现在中午十二点四十五分。",
    expectedPinyin: "Xiànzài zhōngwǔ shí'èr diǎn sìshíwǔ fēn."
  },
  {
    id: "ex-c-17",
    type: "rearrange",
    prompt: "Sắp xếp từ thành câu hoàn chỉnh:",
    scrambledWords: ["电影", "什么时候", "去看", "你们"],
    expectedAnswer: "你们什么时候去看电影？",
    expectedPinyin: "Nǐmen shénme shíhou qù kàn diànyǐng?"
  },
  {
    id: "ex-c-18",
    type: "rearrange",
    prompt: "Sắp xếp từ thành câu hoàn chỉnh:",
    scrambledWords: ["我", "回", "能", "星期三前", "家"],
    expectedAnswer: "星期三前我能回家。",
    expectedPinyin: "Xīngqīsān qián wǒ néng huí jiā."
  },
  {
    id: "ex-c-19",
    type: "rearrange",
    prompt: "Sắp xếp từ thành câu hoàn chỉnh:",
    scrambledWords: ["下午", "学校", "吗", "去", "三点", "你"],
    expectedAnswer: "下午三点你去学校吗？",
    expectedPinyin: "Xiàwǔ sān diǎn nǐ qù xuéxiào ma?"
  },
  {
    id: "ex-c-20",
    type: "rearrange",
    prompt: "Sắp xếp từ thành câu hoàn chỉnh:",
    scrambledWords: ["看", "和", "去", "明天下午", "他朋友", "大卫", "电影"],
    expectedAnswer: "明天下午大卫和他朋友去看不影。",
    expectedPinyin: "Míngtiān xiàwǔ Dàwèi hé tā péngyou qù kàn diànyǐng."
  },
  {
    id: "ex-c-21",
    type: "rearrange",
    prompt: "Sắp xếp từ thành câu hoàn chỉnh:",
    scrambledWords: ["我", "茶", "我的", "去", "今天下午", "朋友", "喝", "和"],
    expectedAnswer: "今天下午我和我的朋友去喝茶。",
    expectedPinyin: "Jīntiān xiàwǔ wǒ hé wǒ de péngyou qù hē chá."
  },
  {
    id: "ex-c-22",
    type: "rearrange",
    prompt: "Sắp xếp từ thành câu hoàn chỉnh:",
    scrambledWords: ["你妈妈", "能", "说", "汉语", "吗"],
    expectedAnswer: "你妈妈能说汉语吗？",
    expectedPinyin: "Nǐ māma néng shuō Hànyǔ ma?"
  },
  {
    id: "ex-c-23",
    type: "rearrange",
    prompt: "Sắp xếp từ thành câu hoàn chỉnh:",
    scrambledWords: ["王方", "那个", "后面", "叫", "人"],
    expectedAnswer: "王方后面那个人叫什么？",
    expectedPinyin: "Wáng Fāng hòumiàn nà ge rén jiào shénme?"
  },
  {
    id: "ex-c-24",
    type: "rearrange",
    prompt: "Sắp xếp từ thành câu hoàn chỉnh:",
    scrambledWords: ["桌子", "一本", "有", "上面", "一杯", "和", "书", "茶"],
    expectedAnswer: "桌子上面有一本书和一杯茶。",
    expectedPinyin: "Zhuōzi shàngmian yǒu yì běn shū hé yì bēi chá."
  },
  {
    id: "ex-c-25",
    type: "rearrange",
    prompt: "Sắp xếp từ thành câu hoàn chỉnh:",
    scrambledWords: ["椅子", "小猫", "有", "上面", "和", "小狗"],
    expectedAnswer: "椅子上面有小猫和小狗。",
    expectedPinyin: "Yǐzi shàngmian yǒu xiǎomāo hé xiǎogǒu."
  },
  {
    id: "ex-c-26",
    type: "rearrange",
    prompt: "Sắp xếp từ thành câu hoàn chỉnh:",
    scrambledWords: ["这儿的", "很", "菜", "中国", "好吃"],
    expectedAnswer: "这儿的中国菜很好吃。",
    expectedPinyin: "Zhèr de Zhōngguó cài hěn hǎochī."
  },
  {
    id: "ex-c-27",
    type: "rearrange",
    prompt: "Sắp xếp từ thành câu hoàn chỉnh:",
    scrambledWords: ["商店", "什么", "去", "你", "买", "想"],
    expectedAnswer: "你想去商店买什么？",
    expectedPinyin: "Nǐ xiǎng qù shāngdiàn mǎi shénme?"
  },
  {
    id: "ex-c-28",
    type: "rearrange",
    prompt: "Sắp xếp từ thành câu hoàn chỉnh:",
    scrambledWords: ["明天", "学校", "我", "想", "下午", "去", "看", "书"],
    expectedAnswer: "明天下午我想去学校看书。",
    expectedPinyin: "Míngtiān xiàwǔ wǒ xiǎng qù xuéxiào kànshū."
  },
  {
    id: "ex-c-29",
    type: "rearrange",
    prompt: "Sắp xếp từ thành câu hoàn chỉnh:",
    scrambledWords: ["商店", "想", "汉语书", "她", "买", "一本", "去"],
    expectedAnswer: "她想去商店买一本汉语书。",
    expectedPinyin: "Tā xiǎng qù shāngdiàn mǎi yì běn Hànyǔ shū."
  },
  {
    id: "ex-c-30",
    type: "rearrange",
    prompt: "Sắp xếp từ thành câu hoàn chỉnh:",
    scrambledWords: ["李老师的", "医生", "是", "儿子"],
    expectedAnswer: "李老师的儿子是医生。",
    expectedPinyin: "Lǐ lǎoshī de érzi shì yīshēng."
  },

  // ==========================================
  // DẠNG D: TRẢ LỜI CÂU HỎI THEO NGỮ CẢNH (15 CÂU)
  // ==========================================
  {
    id: "ex-d-1",
    type: "qa",
    prompt: "1. 星期一你去学校吗？",
    subPrompt: "Từ gợi ý: 商店",
    pinyin: "Xīngqīyī nǐ qù xuéxiào ma?",
    expectedAnswer: "我不去学校，我去商店。",
    expectedPinyin: "Wǒ bú qù xuéxiào, wǒ qù shāngdiàn."
  },
  {
    id: "ex-d-2",
    type: "qa",
    prompt: "2. 星期天你去朋友家做什么？",
    subPrompt: "Từ gợi ý: 看书",
    pinyin: "Xīngqītiān nǐ qù péngyou jiā zuò shénme?",
    expectedAnswer: "我去朋友家看书。",
    expectedPinyin: "Wǒ qù péngyou jiā kànshū."
  },
  {
    id: "ex-d-3",
    type: "qa",
    prompt: "3. 你有几个中国老师？",
    subPrompt: "Từ gợi ý: 六",
    pinyin: "Nǐ yǒu jǐ gè Zhōngguó lǎoshī?",
    expectedAnswer: "我有六个中国老师。",
    expectedPinyin: "Wǒ yǒu liù gè Zhōngguó lǎoshī."
  },
  {
    id: "ex-d-4",
    type: "qa",
    prompt: "4. 你们学校有美国学生吗？",
    subPrompt: "Từ gợi ý: 中国",
    pinyin: "Nǐmen xuéxiào yǒu Měiguó xuésheng ma?",
    expectedAnswer: "没有，我们学校有中国学生。",
    expectedPinyin: "Méiyǒu, wǒmen xuéxiào yǒu Zhōngguó xuésheng."
  },
  {
    id: "ex-d-5",
    type: "qa",
    prompt: "5. 你想吃米饭吗？",
    subPrompt: "Từ gợi ý: 中国菜",
    pinyin: "Nǐ xiǎng chī mǐfàn ma?",
    expectedAnswer: "不想，我想吃中国菜。",
    expectedPinyin: "Bù xiǎng, wǒ xiǎng chī Zhōngguó cài."
  },
  {
    id: "ex-d-6",
    type: "qa",
    prompt: "6. 下午你想做什么？",
    subPrompt: "Từ gợi ý: 写",
    pinyin: "Xiàwǔ nǐ xiǎng zuò shénme?",
    expectedAnswer: "下午我想写汉字。",
    expectedPinyin: "Xiàwǔ wǒ xiǎng xiě hànzì."
  },
  {
    id: "ex-d-7",
    type: "qa",
    prompt: "7. 你想买椅子吗？",
    subPrompt: "Từ gợi ý: 桌子",
    pinyin: "Nǐ xiǎng mǎi yǐzi ma?",
    expectedAnswer: "不想，我想买桌子。",
    expectedPinyin: "Bù xiǎng, wǒ xiǎng mǎi zhuōzi."
  },
  {
    id: "ex-d-8",
    type: "qa",
    prompt: "8. 请问，这个杯子多少钱？",
    subPrompt: "Từ gợi ý: 块",
    pinyin: "Qǐngwèn, zhè ge bēizi duōshao qián?",
    expectedAnswer: "这个杯子十八块。",
    expectedPinyin: "Zhè ge bēizi shíbā kuài."
  },
  {
    id: "ex-d-9",
    type: "qa",
    prompt: "9. 那个菜 5 块吗？",
    subPrompt: "Từ gợi ý: 6 块",
    pinyin: "Nà ge cài 5 kuài ma?",
    expectedAnswer: "不是，那个菜6块。",
    expectedPinyin: "Bú shì, nà ge cài liù kuài."
  },
  {
    id: "ex-d-10",
    type: "qa",
    prompt: "10. 你给谁打电话？",
    subPrompt: "Từ gợi ý: 妈妈",
    pinyin: "Nǐ gěi shéi dǎ diànhuà?",
    expectedAnswer: "我给妈妈打电话。",
    expectedPinyin: "Wǒ gěi māma dǎ diànhuà."
  },
  {
    id: "ex-d-11",
    type: "qa",
    prompt: "11. 什么时候你去看电影？",
    subPrompt: "Từ gợi ý: 三点前",
    pinyin: "Shénme shíhou nǐ qù kàn diànyǐng?",
    expectedAnswer: "三点前我去看电影。",
    expectedPinyin: "Sān diǎn qián wǒ qù kàn diànyǐng."
  },
  {
    id: "ex-d-12",
    type: "qa",
    prompt: "12. 你去北京，什么时候你回家？",
    subPrompt: "Từ gợi ý: 星期六前",
    pinyin: "Nǐ qù Běijīng, shénme shíhou nǐ huí jiā?",
    expectedAnswer: "星期六前我回家。",
    expectedPinyin: "Xīngqīliù qián wǒ huí jiā."
  },
  {
    id: "ex-d-13",
    type: "qa",
    prompt: "13. 你妈妈在哪儿工作？",
    subPrompt: "Từ gợi ý: 学校",
    pinyin: "Nǐ māma zài nǎr gōngzuò?",
    expectedAnswer: "我妈妈在学校工作。",
    expectedPinyin: "Wǒ māma zài xuéxiào gōngzuò."
  },
  {
    id: "ex-d-14",
    type: "qa",
    prompt: "14. 谁在医院工作？",
    subPrompt: "Từ gợi ý: 医生",
    pinyin: "Shéi zài yīyuàn gōngzuò?",
    expectedAnswer: "医生在医院工作。",
    expectedPinyin: "Yīshēng zài yīyuàn gōngzuò."
  },
  {
    id: "ex-d-15",
    type: "qa",
    prompt: "15. 明天天气怎么样？",
    subPrompt: "Từ gợi ý: 冷",
    pinyin: "Míngtiān tiānqì zěnmeyàng?",
    expectedAnswer: "明天天气很冷。",
    expectedPinyin: "Míngtiān tiānqì hěn lěng."
  },

  // ==========================================
  // DẠNG E: ĐẶT CÂU HỎI CHO TỪ GẠCH CHÂN (35 CÂU)
  // ==========================================
  {
    id: "ex-e-1",
    type: "underline_question",
    prompt: "1. 我想喝[茶]。",
    subPrompt: "Từ gạch chân: 茶",
    pinyin: "Wǒ xiǎng hē chá.",
    expectedAnswer: "你想喝什么？",
    expectedPinyin: "Nǐ xiǎng hē shénme?",
    explanation: "Đồ vật/thức uống → dùng 什么, chuyển '我' thành '你'."
  },
  {
    id: "ex-e-2",
    type: "underline_question",
    prompt: "2. 明天下午你想去[李老师家]。",
    subPrompt: "Từ gạch chân: 李老师家",
    pinyin: "Míngtiān xiàwǔ nǐ xiǎng qù Lǐ lǎoshī jiā.",
    expectedAnswer: "明天下午你想去哪儿？",
    expectedPinyin: "Míngtiān xiàwǔ nǐ xiǎng qù nǎr?",
    explanation: "Nơi chốn/địa điểm → thay bằng 哪儿."
  },
  {
    id: "ex-e-3",
    type: "underline_question",
    prompt: "3. 这个菜 [6 块]。",
    subPrompt: "Từ gạch chân: 6 块",
    pinyin: "Zhè ge cài 6 kuài.",
    expectedAnswer: "这个菜多少钱？",
    expectedPinyin: "Zhè ge cài duōshao qián?",
    explanation: "Giá tiền → thay bằng 多少钱."
  },
  {
    id: "ex-e-4",
    type: "underline_question",
    prompt: "4. 明天下午[李月]去商店。",
    subPrompt: "Từ gạch chân: 李月",
    pinyin: "Míngtiān xiàwǔ Lǐ Yuè qù shāngdiàn.",
    expectedAnswer: "明天下午谁去商店？",
    expectedPinyin: "Míngtiān xiàwǔ shéi qù shāngdiàn?",
    explanation: "Người làm chủ ngữ → thay bằng 谁."
  },
  {
    id: "ex-e-5",
    type: "underline_question",
    prompt: "5. 我们学校有 [7000] 个学生。",
    subPrompt: "Từ gạch chân: 7000",
    pinyin: "Wǒmen xuéxiào yǒu 7000 gè xuésheng.",
    expectedAnswer: "你们学校有多少个学生？",
    expectedPinyin: "Nǐmen xuéxiào yǒu duōshao gè xuésheng?",
    explanation: "Số lượng lớn (>10) → dùng 多少, chuyển '我们' thành '你们'."
  },
  {
    id: "ex-e-6",
    type: "underline_question",
    prompt: "6. 你妈妈想吃[米饭]。",
    subPrompt: "Từ gạch chân: 米饭",
    pinyin: "Nǐ māma xiǎng chī mǐfàn.",
    expectedAnswer: "你妈妈想吃什么？",
    expectedPinyin: "Nǐ māma xiǎng chī shénme?",
    explanation: "Món ăn → thay bằng 什么."
  },
  {
    id: "ex-e-7",
    type: "underline_question",
    prompt: "7. 明天 [6 月 24 号]。",
    subPrompt: "Từ gạch chân: 6 月 24 号",
    pinyin: "Míngtiān 6 yuè 24 hào.",
    expectedAnswer: "明天几月几号？",
    expectedPinyin: "Míngtiān jǐ yuè jǐ hào?",
    explanation: "Ngày tháng cụ thể → dùng 几月几号."
  },
  {
    id: "ex-e-8",
    type: "underline_question",
    prompt: "8. 我去商店买[五]个杯子。",
    subPrompt: "Từ gạch chân: 五",
    pinyin: "Wǒ qù shāngdiàn mǎi wǔ gè bēizi.",
    expectedAnswer: "你去商店买几个杯子？",
    expectedPinyin: "Nǐ qù shāngdiàn mǎi jǐ gè bēizi?",
    explanation: "Số lượng nhỏ (<10) → dùng 几."
  },
  {
    id: "ex-e-9",
    type: "underline_question",
    prompt: "9. 他今天身体[很好]。",
    subPrompt: "Từ gạch chân: 很好",
    pinyin: "Tā jīntiān shēntǐ hěn hǎo.",
    expectedAnswer: "他今天身体怎么样？",
    expectedPinyin: "Tā jīntiān shēntǐ zěnmeyàng?",
    explanation: "Hỏi tình trạng, sức khỏe → dùng 怎么样."
  },
  {
    id: "ex-e-10",
    type: "underline_question",
    prompt: "10. [北京]的天气不太冷。",
    subPrompt: "Từ gạch chân: 北京",
    pinyin: "Běijīng de tiānqì bú tài lěng.",
    expectedAnswer: "哪儿的天气不太冷？",
    expectedPinyin: "Nǎr de tiānqì bú tài lěng?",
    explanation: "Địa danh → thay bằng 哪儿."
  },
  {
    id: "ex-e-11",
    type: "underline_question",
    prompt: "11. 我同学爱看[中国电影]。",
    subPrompt: "Từ gạch chân: 中国电影",
    pinyin: "Wǒ tóngxué ài kàn Zhōngguó diànyǐng.",
    expectedAnswer: "你同学爱看什么？",
    expectedPinyin: "Nǐ tóngxué ài kàn shénme?",
    explanation: "Sự vật → thay bằng 什么."
  },
  {
    id: "ex-e-12",
    type: "underline_question",
    prompt: "12. [我朋友]在看电视。",
    subPrompt: "Từ gạch chân: 我朋友",
    pinyin: "Wǒ péngyou zài kàn diànshì.",
    expectedAnswer: "谁在看电视？",
    expectedPinyin: "Shéi zài kàn diànshì?",
    explanation: "Người làm chủ ngữ → thay bằng 谁."
  },
  {
    id: "ex-e-13",
    type: "underline_question",
    prompt: "13. 大卫没在做中国菜，他在[看书]。",
    subPrompt: "Từ gạch chân: 看书",
    pinyin: "Dàwèi méi zài zuò Zhōngguó cài, tā zài kànshū.",
    expectedAnswer: "大卫在做什么？",
    expectedPinyin: "Dàwèi zài zuò shénme?",
    explanation: "Hành động V+O → thay bằng 做什么."
  },
  {
    id: "ex-e-14",
    type: "underline_question",
    prompt: "14. 李老师的女儿在[同学家]做饭。",
    subPrompt: "Từ gạch chân: 同学家",
    pinyin: "Lǐ lǎoshī de nǚ'ér zài tóngxué jiā zuò fàn.",
    expectedAnswer: "李老师的女儿在哪儿做饭？",
    expectedPinyin: "Lǐ lǎoshī de nǚ'ér zài nǎr zuò fàn?",
    explanation: "Nơi chốn sau giới từ 在 → thay bằng 哪儿."
  },
  {
    id: "ex-e-15",
    type: "underline_question",
    prompt: "15. 我儿子喜欢[看中国电影]。",
    subPrompt: "Từ gạch chân: 看中国电影",
    pinyin: "Wǒ érzi xǐhuan kàn Zhōngguó diànyǐng.",
    expectedAnswer: "你儿子喜欢做什么？",
    expectedPinyin: "Nǐ érzi xǐhuan zuò shénme?"
  },
  {
    id: "ex-e-16",
    type: "underline_question",
    prompt: "16. 学生们喜欢[睡觉]。",
    subPrompt: "Từ gạch chân: 睡觉",
    pinyin: "Xuéshengmen xǐhuan shuìjiào.",
    expectedAnswer: "学生们喜欢做什么？",
    expectedPinyin: "Xuéshengmen xǐhuan zuò shénme?"
  },
  {
    id: "ex-e-17",
    type: "underline_question",
    prompt: "17. 李月的电话号码是 [82304156]。",
    subPrompt: "Từ gạch chân: 82304156",
    pinyin: "Lǐ Yuè de diànhuà hàomǎ shì 82304156.",
    expectedAnswer: "李月的电话号码是多少？",
    expectedPinyin: "Lǐ Yuè de diànhuà hàomǎ shì duōshao?",
    explanation: "Hỏi số điện thoại → thay bằng 多少."
  },
  {
    id: "ex-e-18",
    type: "underline_question",
    prompt: "18. [大卫]在打电话呢。",
    subPrompt: "Từ gạch chân: 大卫",
    pinyin: "Dàwèi zài dǎ diànhuà ne.",
    expectedAnswer: "谁在打电话呢？",
    expectedPinyin: "Shéi zài dǎ diànhuà ne?"
  },
  {
    id: "ex-e-19",
    type: "underline_question",
    prompt: "19. [王老师]写的汉字很好。",
    subPrompt: "Từ gạch chân: 王老师",
    pinyin: "Wáng lǎoshī xiě de hànzì hěn hǎo.",
    expectedAnswer: "谁写的汉字很好？",
    expectedPinyin: "Shéi xiě de hànzì hěn hǎo?"
  },
  {
    id: "ex-e-20",
    type: "underline_question",
    prompt: "20. 李月没[看书]。",
    subPrompt: "Từ gạch chân: 看书",
    pinyin: "Lǐ Yuè méi kànshū.",
    expectedAnswer: "李月在做什么？",
    expectedPinyin: "Lǐ Yuè zài zuò shénme?"
  },
  {
    id: "ex-e-21",
    type: "underline_question",
    prompt: "21. 她[今天下午五点]在家看电视呢。",
    subPrompt: "Từ gạch chân: 今天下午五点",
    pinyin: "Tā jīntiān xiàwǔ wǔ diǎn zài jiā kàn diànshì ne.",
    expectedAnswer: "她什么时候在家看电视呢？",
    expectedPinyin: "Tā shénme shíhou zài jiā kàn diànshì ne?",
    explanation: "Khoảng thời gian → thay bằng 什么时候."
  },
  {
    id: "ex-e-22",
    type: "underline_question",
    prompt: "22. [我同学]很想学写汉字。",
    subPrompt: "Từ gạch chân: 我同学",
    pinyin: "Wǒ tóngxué hěn xiǎng xué xiě hànzì.",
    expectedAnswer: "谁很想学写汉字？",
    expectedPinyin: "Shéi hěn xiǎng xué xiě hànzì?"
  },
  {
    id: "ex-e-23",
    type: "underline_question",
    prompt: "23. 她给她朋友[打电话]。",
    subPrompt: "Từ gạch chân: 打电话",
    pinyin: "Tā gěi tā péngyou dǎ diànhuà.",
    expectedAnswer: "她给她朋友做什么？",
    expectedPinyin: "Tā gěi tā péngyou zuò shénme?"
  },
  {
    id: "ex-e-24",
    type: "underline_question",
    prompt: "24. 李老师家有[四]口人。",
    subPrompt: "Từ gạch chân: 四",
    pinyin: "Lǐ lǎoshī jiā yǒu sì kǒu rén.",
    expectedAnswer: "李老师家有几口人？",
    expectedPinyin: "Lǐ lǎoshī jiā yǒu jǐ kǒu rén?"
  },
  {
    id: "ex-e-25",
    type: "underline_question",
    prompt: "25. 她女儿不会做[中国菜]。",
    subPrompt: "Từ gạch chân: 中国菜",
    pinyin: "Tā nǚ'ér bú huì zuò Zhōngguó cài.",
    expectedAnswer: "她女儿不会做什么菜？",
    expectedPinyin: "Tā nǚ'ér bú huì zuò shénme cài?"
  },
  {
    id: "ex-e-26",
    type: "underline_question",
    prompt: "26. 我[星期六前]回北京。",
    subPrompt: "Từ gạch chân: 星期六前",
    pinyin: "Wǒ xīngqīliù qián huí Běijīng.",
    expectedAnswer: "你什么时候回北京？",
    expectedPinyin: "Nǐ shénme shíhou huí Běijīng?"
  },
  {
    id: "ex-e-27",
    type: "underline_question",
    prompt: "27. 我在[王方家]住一个星期。",
    subPrompt: "Từ gạch chân: 王方家",
    pinyin: "Wǒ zài Wáng Fāng jiā zhù yí gè xīngqī.",
    expectedAnswer: "你在哪儿住一个星期？",
    expectedPinyin: "Nǐ zài nǎr zhù yí gè xīngqī?"
  },
  {
    id: "ex-e-28",
    type: "underline_question",
    prompt: "28. 他[星期日]去看电影。",
    subPrompt: "Từ gạch chân: 星期日",
    pinyin: "Tā xīngqīrì qù kàn diànyǐng.",
    expectedAnswer: "他什么时候去看电影？",
    expectedPinyin: "Tā shénme shíhou qù kàn diànyǐng?"
  },
  {
    id: "ex-e-29",
    type: "underline_question",
    prompt: "29. 我朋友[星期四前]在北京。",
    subPrompt: "Từ gạch chân: 星期四前",
    pinyin: "Wǒ péngyou xīngqīsì qián zài Běijīng.",
    expectedAnswer: "你朋友什么时候在北京？",
    expectedPinyin: "Nǐ péngyou shénme shíhou zài Běijīng?"
  },
  {
    id: "ex-e-30",
    type: "underline_question",
    prompt: "30. 她十点四十五分在[学校]看书。",
    subPrompt: "Từ gạch chân: 学校",
    pinyin: "Tā shí diǎn sìshíwǔ fēn zài xuéxiào kànshū.",
    expectedAnswer: "她十点四十五分在哪儿看书？",
    expectedPinyin: "Tā shí diǎn sìshíwǔ fēn zài nǎr kànshū?"
  },
  {
    id: "ex-e-31",
    type: "underline_question",
    prompt: "31. 她[下午四点前]喝茶。",
    subPrompt: "Từ gạch chân: 下午四点前",
    pinyin: "Tā xiàwǔ sì diǎn qián hē chá.",
    expectedAnswer: "她什么时候喝茶？",
    expectedPinyin: "Tā shénme shíhou hē chá?"
  },
  {
    id: "ex-e-32",
    type: "underline_question",
    prompt: "32. [李月的妈妈]身体不太好。",
    subPrompt: "Từ gạch chân: 李月的妈妈",
    pinyin: "Lǐ Yuè de māma shēntǐ bú tài hǎo.",
    expectedAnswer: "谁身体不太好？",
    expectedPinyin: "Shéi shēntǐ bú tài hǎo?"
  },
  {
    id: "ex-e-33",
    type: "underline_question",
    prompt: "33. 他今天不爱[吃饭]。",
    subPrompt: "Từ gạch chân: 吃饭",
    pinyin: "Tā jīntiān bú ài chīfàn.",
    expectedAnswer: "他今天不爱做什么？",
    expectedPinyin: "Tā jīntiān bú ài zuò shénme?"
  },
  {
    id: "ex-e-34",
    type: "underline_question",
    prompt: "34. [明天]我想去商店买水果。",
    subPrompt: "Từ gạch chân: 明天",
    pinyin: "Míngtiān wǒ xiǎng qù shāngdiàn mǎi shuǐguǒ.",
    expectedAnswer: "什么时候你想去商店买水果？",
    expectedPinyin: "Shénme shíhou nǐ xiǎng qù shāngdiàn mǎi shuǐguǒ?"
  },
  {
    id: "ex-e-35",
    type: "underline_question",
    prompt: "35. 北京的天气[不冷不热]。",
    subPrompt: "Từ gạch chân: 不冷不热",
    pinyin: "Běijīng de tiānqì bù lěng bú rè.",
    expectedAnswer: "北京的天气怎么样？",
    expectedPinyin: "Běijīng de tiānqì zěnmeyàng?"
  }
];
