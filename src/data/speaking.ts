// Danh sách tranh luyện nói cuối kì trích xuất chuẩn 100% từ file gốc o_n_ta__p_tranh_CHN113_9e3d8011.pdf
// QUY TẮC CỐT LÕI: KHÔNG HIỂN THỊ ĐÁP ÁN MẪU cho học sinh, chỉ hiển thị số tranh và từ gợi ý chủ đề để luyện phản xạ nói tự nhiên.

export interface SpeakingPrompt {
  id: string;
  number: number;
  page: number;
  title: string;
  imageSrc: string;
  topic: string;
  suggestedVocab: string[];
}

export const SPEAKING_PROMPTS: SpeakingPrompt[] = [
  {
    id: "sp-1",
    number: 5,
    page: 1,
    title: "Tranh 5: Cô gái chọn mua cốc ở kệ hàng",
    imageSrc: "/assets/speaking_pages/page_1.jpg",
    topic: "Mua sắm (Cửa hàng, cốc, đồ dùng)",
    suggestedVocab: ["杯子", "商店", "买", "看", "喜欢", "多少钱", "小姐"]
  },
  {
    id: "sp-2",
    number: 6,
    page: 2,
    title: "Tranh 6: Cậu học sinh ngồi đọc sách trong thư viện",
    imageSrc: "/assets/speaking_pages/page_2.jpg",
    topic: "Học tập (Trường học, đọc sách, học sinh)",
    suggestedVocab: ["学校", "看书", "学生", "喜欢", "桌子", "椅子", "上午"]
  },
  {
    id: "sp-3",
    number: 7,
    page: 3,
    title: "Tranh 7: Cô gái uống trà và đọc sách bên cửa sổ mưa",
    imageSrc: "/assets/speaking_pages/page_3.jpg",
    topic: "Thời tiết & Sở thích (Mưa, uống trà, ở nhà)",
    suggestedVocab: ["下雨", "喝茶", "看书", "在家", "今天", "天气", "冷"]
  },
  {
    id: "sp-4",
    number: 8,
    page: 4,
    title: "Tranh 8: Bé gái đeo tạp dề đỏ nấu ăn trong bếp",
    imageSrc: "/assets/speaking_pages/page_4.jpg",
    topic: "Gia đình & Nấu ăn (Món ăn, con gái, ở nhà)",
    suggestedVocab: ["做菜", "中国菜", "女儿", "吃", "在家", "喜欢", "小"]
  },
  {
    id: "sp-5",
    number: 1,
    page: 5,
    title: "Tranh 1: Bàn làm việc có màn hình máy tính và cốc cà phê",
    imageSrc: "/assets/speaking_pages/page_5.jpg",
    topic: "Miêu tả đồ vật trong phòng (Vị trí, đồ đạc)",
    suggestedVocab: ["桌子", "电脑", "上面", "杯子", "咖啡", "这是"]
  },
  {
    id: "sp-6",
    number: 3,
    page: 6,
    title: "Tranh 3: Nữ sinh đeo tai nghe học bài bên laptop",
    imageSrc: "/assets/speaking_pages/page_6.jpg",
    topic: "Học tập & Hoạt động (Nghe nhạc, viết bài, laptop)",
    suggestedVocab: ["学习", "听", "写字", "看", "电脑", "在家", "喜欢"]
  },
  {
    id: "sp-7",
    number: 4,
    page: 7,
    title: "Tranh 4: Mua táo ở quầy hoa quả (Đồng hồ 10:10)",
    imageSrc: "/assets/speaking_pages/page_7.jpg",
    topic: "Mua sắm hoa quả & Thời gian",
    suggestedVocab: ["苹果", "水果", "买", "商店", "多少钱", "十点", "块"]
  },
  {
    id: "sp-8",
    number: 2,
    page: 8,
    title: "Tranh 2: Cô gái ngồi học trước máy tính có mèo trắng và chó đen (2:00)",
    imageSrc: "/assets/speaking_pages/page_8.jpg",
    topic: "Thời gian, đồ vật & Thú cưng (Chó, mèo, 2 giờ)",
    suggestedVocab: ["电脑", "桌子", "猫", "狗", "两点", "椅子", "在家", "看书"]
  },
  {
    id: "sp-9",
    number: 9,
    page: 9,
    title: "Tranh 9: Hai bố con đầu bếp cùng nấu ăn (Đồng hồ 12:00)",
    imageSrc: "/assets/speaking_pages/page_9.jpg",
    topic: "Gia đình & Nấu ăn bữa trưa (12 giờ trưa, bố, con gái)",
    suggestedVocab: ["十二点", "中午", "爸爸", "女儿", "做饭", "中国菜", "好吃", "高兴"]
  },
  {
    id: "sp-10",
    number: 10,
    page: 10,
    title: "Tranh 10: Hai bạn nữ trò chuyện vui vẻ uống nước (Đồng hồ 6:30)",
    imageSrc: "/assets/speaking_pages/page_10.jpg",
    topic: "Bạn bè & Thời gian gặp gỡ (6 giờ 30, bạn bè, uống trà)",
    suggestedVocab: ["朋友", "高兴", "六点半", "喝茶", "喝水", "认识", "小姐"]
  },
  {
    id: "sp-11",
    number: 11,
    page: 11,
    title: "Tranh 11: Nhân viên nam làm việc văn phòng với laptop và tài liệu",
    imageSrc: "/assets/speaking_pages/page_11.jpg",
    topic: "Nghề nghiệp & Làm việc (Công việc, máy tính, buổi sáng)",
    suggestedVocab: ["工作", "电脑", "看书", "先生", "上午", "医院/公司"]
  },
  {
    id: "sp-12",
    number: 12,
    page: 12,
    title: "Tranh 12: Mẹ đón con gái đi học về nhà (18:05)",
    imageSrc: "/assets/speaking_pages/page_12.jpg",
    topic: "Gia đình & Thời gian (6 giờ 5 phút chiều, về nhà, mẹ và con gái)",
    suggestedVocab: ["回家", "六点", "妈妈", "女儿", "学校", "高兴", "下午"]
  },
  {
    id: "sp-13",
    number: 13,
    page: 13,
    title: "Tranh 13: Cả gia đình xếp hàng mua vé trước rạp chiếu phim (Bắp rang)",
    imageSrc: "/assets/speaking_pages/page_13.jpg",
    topic: "Xem phim & Giải trí (Rạp phim, cùng nhau, buổi tối)",
    suggestedVocab: ["看电影", "电影", "一家人", "朋友", "喜欢", "想", "吃"]
  },
  {
    id: "sp-14",
    number: 14,
    page: 14,
    title: "Tranh 14: Cô giáo cầm sách mỉm cười bên bảng đen",
    imageSrc: "/assets/speaking_pages/page_14.jpg",
    topic: "Giới thiệu giáo viên (Cô giáo tiếng Trung, trường học)",
    suggestedVocab: ["老师", "汉语老师", "学校", "漂亮", "书", "学生", "认识"]
  },
  {
    id: "sp-15",
    number: 15,
    page: 15,
    title: "Tranh 15: Cô gái học tập làm việc trực tuyến bên bàn đèn",
    imageSrc: "/assets/speaking_pages/page_15.jpg",
    topic: "Học tập tại nhà (Bàn, đèn, máy tính, học tập)",
    suggestedVocab: ["在家", "电脑", "学习", "桌子", "看", "喝水"]
  },
  {
    id: "sp-16",
    number: 16,
    page: 16,
    title: "Tranh 16: Thư giãn xem phim Netflix trên tivi và ăn bỏng ngô",
    imageSrc: "/assets/speaking_pages/page_16.jpg",
    topic: "Xem phim / Tivi ở nhà (Buổi tối, thích xem phim)",
    suggestedVocab: ["看电视", "看电影", "在家", "吃", "晚上", "喜欢", "桌子"]
  },
  {
    id: "sp-17",
    number: 17,
    page: 17,
    title: "Tranh 17: Chàng trai ở sân bay mơ ước đến Vạn Lý Trường Thành",
    imageSrc: "/assets/speaking_pages/page_17.jpg",
    topic: "Du lịch & Máy bay (Đến Bắc Kinh, Trung Quốc, máy bay)",
    suggestedVocab: ["飞机", "坐飞机", "去", "北京", "中国", "想", "看"]
  },
  {
    id: "sp-18",
    number: 18,
    page: 18,
    title: "Tranh 18: Bác sĩ khám bệnh dặn dò bệnh nhân ăn hoa quả uống nước",
    imageSrc: "/assets/speaking_pages/page_18.jpg",
    topic: "Sức khỏe & Nghề bác sĩ (Bác sĩ, bệnh viện, sức khỏe tốt)",
    suggestedVocab: ["医生", "医院", "身体", "水果", "喝水", "多吃", "好"]
  },
  {
    id: "sp-19",
    number: 19,
    page: 19,
    title: "Tranh 19: Cô gái quấn khăn ấm bị sốt đo nhiệt kế trên sofa",
    imageSrc: "/assets/speaking_pages/page_19.jpg",
    topic: "Sức khỏe & Thời tiết (Sức khỏe không tốt, lạnh, nghỉ ngơi)",
    suggestedVocab: ["身体不好", "冷", "在家", "喝水", "不爱吃饭", "睡觉"]
  },
  {
    id: "sp-20",
    number: 20,
    page: 20,
    title: "Tranh 20: Chợ trái cây bán táo và dưa hấu có bảng giá tiền",
    imageSrc: "/assets/speaking_pages/page_20.jpg",
    topic: "Mua sắm hoa quả & Giá tiền (Quả táo, mua, bao nhiêu tiền)",
    suggestedVocab: ["买", "苹果", "水果", "多少钱", "块", "商店", "好吃"]
  },
  {
    id: "sp-21",
    number: 21,
    page: 21,
    title: "Tranh 21: Chàng trai ngồi sofa gọi điện thoại uống cà phê",
    imageSrc: "/assets/speaking_pages/page_21.jpg",
    topic: "Gọi điện thoại & Nghỉ ngơi (Gọi điện, a-lô, uống cà phê)",
    suggestedVocab: ["打电话", "喂", "喝咖啡", "在家", "朋友", "高兴"]
  },
  {
    id: "sp-22",
    number: 22,
    page: 22,
    title: "Tranh 22: Căn phòng ngủ có bàn học máy tính và giường ngủ",
    imageSrc: "/assets/speaking_pages/page_22.jpg",
    topic: "Miêu tả vị trí đồ vật trong phòng (Bàn, ghế, máy tính, giường)",
    suggestedVocab: ["电脑", "桌子", "上面", "椅子", "书", "睡觉", "里"]
  },
  {
    id: "sp-23",
    number: 23,
    page: 23,
    title: "Tranh 23: Hành khách ngắm máy bay cất cánh tại cửa sổ sân bay",
    imageSrc: "/assets/speaking_pages/page_23.jpg",
    topic: "Phương tiện đi lại (Đi máy bay, đi Bắc Kinh)",
    suggestedVocab: ["坐飞机", "飞机", "去", "北京", "什么时候", "回"]
  },
  {
    id: "sp-24",
    number: 24,
    page: 24,
    title: "Tranh 24: Khách sạn cổ kính có xe hơi sang trọng đỗ phía trước",
    imageSrc: "/assets/speaking_pages/page_24.jpg",
    topic: "Địa điểm & Xe hơi (Khách sạn, xe ô tô, phía trước)",
    suggestedVocab: ["饭店", "车", "开车", "坐车", "前面", "先生"]
  },
  {
    id: "sp-25",
    number: 25,
    page: 25,
    title: "Tranh 25: Cô gái trong tiệm thời trang chọn váy hồng và váy trắng",
    imageSrc: "/assets/speaking_pages/page_25.jpg",
    topic: "Mua sắm quần áo (Quần áo, cửa hàng, rất đẹp, mua)",
    suggestedVocab: ["衣服", "商店", "买", "漂亮", "喜欢", "小姐", "看"]
  },
  {
    id: "sp-26",
    number: 26,
    page: 26,
    title: "Tranh 26: Quý cô lái xe mui trần mỉm cười uống cà phê",
    imageSrc: "/assets/speaking_pages/page_26.jpg",
    topic: "Phương tiện & Lái xe (Lái xe, ô tô, rất vui, xinh đẹp)",
    suggestedVocab: ["开", "车", "开车", "漂亮", "高兴", "小姐", "喝咖啡"]
  }
];
