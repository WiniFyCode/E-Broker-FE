import type {
  User,
  Course,
  AgendaItem,
  BlogPost,
  Announcement,
  RecommendedCourse,
  StreakData,
} from "./types"

// Người dùng hiện tại
export const currentUser: User = {
  id: "1",
  name: "TS. Elias Vance",
  email: "elias.vance@lumina.edu",
  avatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD8iFqwbcNoMNf6AQao_BMFH1ERsJg_oyiXdJNcfxyZrZ46uFRhBSvsqXow6wFfuCFdCTEAGUVjfKbcBqDOlRxdLzPkjSn8ce2Ni-8gQEaRfG5lrUfwl2vnFioHZmd5uGjTd_IUTvxcXOZq-osusFxjver1QVg-o2PU_Nru3i79YjXiU5su5jR9SAs5NMGHNI0cbrVmUT-lJFlF_MlYz8f6Qp9ZoBg1F3jTDPqB8_qCLK2kQtHToeHLl96PQUr2yVxTkk1QredblMs",
  role: "student", // sinh viên
}

// Dữ liệu streak
export const streakData: StreakData[] = [
  { day: "T2", value: 40 },
  { day: "T3", value: 60 },
  { day: "T4", value: 80 },
  { day: "T5", value: 50 },
  { day: "T6", value: 100 },
  { day: "T7", value: 70 },
  { day: "CN", value: 90 },
]

// Các mục lịch trình
export const agendaItems: AgendaItem[] = [
  {
    id: "1",
    type: "module", // mô-đun
    title: "Kiến trúc mạng nơ-ron",
    subtitle: "Mô-đun 4: Cơ bản về lan truyền ngược và gradient descent",
    duration: "45 phút",
    progress: 65,
  },
  {
    id: "2",
    type: "webinar", // hội thảo trực tuyến
    title: "Diễn đàn Đạo đức Dữ liệu Nâng cao",
    subtitle: "Bài giảng khách mời: Thiên vị trong ra quyết định thuật toán",
    startsIn: "10p",
    instructors: [
      {
        name: "TS. Sarah Chen",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAHy6K11xAnbeEltTE9gtKolYrtMlfLp2pbP0dbQP2aCLIsr2FEKcgw604FwSqQDQe7ojZ8_KRONn0PWCj5jTdewSTFm_XWbJdSFbdOmdeqHXjjr06KGrCpy6e27GDdZNptGrX8heYYTSxh-6H5F6ye3MR1_krWOcNN83B7k21Tvsa73W5mtpvu3PKYG7mRnVAgPmgvOGAKuFu8WuoQPStxVUt6NFc979ZPK9ybtZCIzctNeD9HSLOnfA_MY9PZnY1vhI5tntZCX0o",
      },
      {
        name: "GS. Michael Torres",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDN5NVOqEkjX4kSOM-zOEBCl_3o4MjNufmgBQdVJXGA71atqzrVhGGA_hRCHdT8vsmpCRNsxQ3E8lAA4eFiGRCw-9ww2w-Wz_ikDLgT4b3hZcu9RwhScsPuywKcCOENGnMrR-6Zqecc-dKoJxNIedKBvElYVMCRbCe2gnJxYzALeTLNKAEcoN82NfPZuYVMFGtkUOrYmQ0ZQVLNTFMZPD22cxLc27KoOTyrUw9B9eKkhnoP93yAAJp0K7dJ6Qu5-gFxt3ELPKKjeHI",
      },
    ],
    attendeeCount: 42,
  },
]

// Khoá học
export const courses: Course[] = [
  {
    id: "1",
    title: "Cấu trúc thuật toán nâng cao",
    titleVi: "Cấu trúc thuật toán nâng cao",
    description:
      "Khám phá các cấu trúc dữ liệu nâng cao và thuật toán tối ưu",
    descriptionVi: "Khám phá các cấu trúc dữ liệu nâng cao và thuật toán tối ưu",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBQjodZmAkkTfs44eeEqlCiCqS8D9EybkEv5EmY4ZKz1lckmTv8lrBBWt0554Xy6D-2287XM3QmY1qungL410zF0I8jcfojnEtTzgOzi71qG_eIG1rZvoT0puRcGr0T-uFyQlVCuMu4lOzTOATsHNbEBmQKfwoZQx_aMO-8MxWvFdjUn_vso63rdqM5wOlE0IUxo5dQc91qpMFgckxbHQ3N8Zpe-LBnw5cnS--6Ig2NTZgfw7DTapnUlJzQrfpcYPT8lzxa7EDMgqw",
    progress: 65,
    totalLessons: 18,
    completedLessons: 12,
    remainingHours: 3.5,
    gradientFrom: "from-blue-500",
    gradientTo: "to-purple-600",
  },
  {
    id: "2",
    title: "Mật mã ứng dụng",
    titleVi: "Mật mã ứng dụng",
    description: "Nắm vững các kỹ thuật mã hóa và bảo mật thông tin",
    descriptionVi: "Nắm vững các kỹ thuật mã hóa và bảo mật thông tin",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCm42O5VVS1dTIZFqUrx6aXsFWZj-aOcU4BnXp1gt_A3YyiwrH_SQiSZL5dYLecAPOSKZ6VVPGP1r-f5azA-g3Q-1RS_UqZKcWlXsRREb0mU5K4qnTYQTUuV8IXey5UMrKQuXtu4NTIKEN5UGoRXq5fd3zw4mqYiZqJPu-tfCwI1cBxNXlEj2d7w2Op4P0nOOmiZYrumI1Dws-Y2EbdJyqOvGbWko8RImaU6vHom6IuMKmEGPrAZG7SQTkcdc_KPFQYvolqVM57rFg",
    progress: 32,
    totalLessons: 25,
    completedLessons: 8,
    remainingHours: 6.2,
    gradientFrom: "from-emerald-500",
    gradientTo: "to-teal-600",
  },
  {
    id: "3",
    title: "Triết học khoa học",
    titleVi: "Triết học khoa học",
    description: "Tìm hiểu triết học khoa học và phương pháp luận nghiên cứu",
    descriptionVi: "Tìm hiểu triết học khoa học và phương pháp luận nghiên cứu",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDtWdLBVQ7xA-9uPXCeJJTG-cwWdRDSmGXFogR5Pa0vtQnoNPoe7p-5iih7lrNwojq5tzL13KDn12uZs52o3bfe2MTZRMucEcvVGydFHWBw6Kqx01BmE7eZvN4n7c7rV_m3iqipaK7ygwIlV8fMStyRF6SSOhCPH_it9QUdZZQxCIco2cYhPkoh-Txxa8AJkRnOMRvrDYwXyss2TmtEoVT5hly7kxoOF5St0c9LX4o9-LQwq3KRYeVEY1Q5y3OAX1eK0TwKBrnBr_Q",
    progress: 89,
    totalLessons: 18,
    completedLessons: 16,
    remainingHours: 0.8,
    isNearComplete: true,
    gradientFrom: "from-amber-500",
    gradientTo: "to-orange-600",
  },
]

// Khóa học khuyến nghị
export const recommendedCourses: RecommendedCourse[] = [
  {
    id: "4",
    title: "Tâm lý học nhận thức trong trải nghiệm người dùng",
    level: "Trung cấp",
    modules: 6,
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBQjodZmAkkTfs44eeEqlCiCqS8D9EybkEv5EmY4ZKz1lckmTv8lrBBWt0554Xy6D-2287XM3QmY1qungL410zF0I8jcfojnEtTzgOzi71qG_eIG1rZvoT0puRcGr0T-uFyQlVCuMu4lOzTOATsHNbEBmQKfwoZQx_aMO-8MxWvFdjUn_vso63rdqM5wOlE0IUxo5dQc91qpMFgckxbHQ3N8Zpe-LBnw5cnS--6Ig2NTZgfw7DTapnUlJzQrfpcYPT8lzxa7EDMgqw",
  },
  {
    id: "5",
    title: "Trực quan hóa dữ liệu ứng dụng",
    level: "Nâng cao",
    modules: 8,
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCm42O5VVS1dTIZFqUrx6aXsFWZj-aOcU4BnXp1gt_A3YyiwrH_SQiSZL5dYLecAPOSKZ6VVPGP1r-f5azA-g3Q-1RS_UqZKcWlXsRREb0mU5K4qnTYQTUuV8IXey5UMrKQuXtu4NTIKEN5UGoRXq5fd3zw4mqYiZqJPu-tfCwI1cBxNXlEj2d7w2Op4P0nOOmiZYrumI1Dws-Y2EbdJyqOvGbWko8RImaU6vHom6IuMKmEGPrAZG7SQTkcdc_KPFQYvolqVM57rFg",
  },
  {
    id: "6",
    title: "Nhập môn thị giác máy tính",
    level: "Cơ bản",
    modules: 7,
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAa_xag8F91UdQz_roSwwlnNLkbiusydD3hfaYukHTA63zGEKGxK8dIUrrTXLUZ80_9F76XLAbUZQkn1cSi0GfiAdtmES7_cyKKYe7e-Lr4pLJ9AF_R_H8-tfSMZ452U8zPTeCWC8oaqDA-yy1ePC-zuXjQUHOXf_eLT8prFrZkIkvc5668VcMRTbhleNpY48R5dacHa-ySQB-jStpt1NaN1x1HXdss63qTXf7UIwBwdzcgN254TG0SFY5DfR_8NlDZFaUJZqjlAFU",
  },
  {
    id: "7",
    title: "Phân tích dữ liệu với Python",
    level: "Trung cấp",
    modules: 10,
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDSbZw6GKZ1LEKZb4lYIREM04tCB8IXGKzvrK18mtR48Ds41awCSZ-v1qyO36zMIqkND2QwqBzFQV5O-qveRGMN6743QbZoJZFR1C269wnpWtiOd2p-oxLW_XKTlFA35ne1Y1bcsWXoJlj7kx2a-G1XgxN5aIi7NCGno2uU1WUo4k8KB2kozI3eGyQzwy8af-dQm8AIHxjp3MvlJVvmNaxG2iMt1GhB0Bg54flM2gaazcRnljyRcok9KDSmac8cQ-PlNIH2kHk_OAs",
  },
]

// Thông báo
export const announcements: Announcement[] = [
  {
    id: "1",
    type: "system",
    title: "Môi trường Sandbox tương tác mới đã có sẵn",
    description:
      "Kiểm tra mã của bạn theo thời gian thực trên trình duyệt. Đã hỗ trợ Python và R.",
  },
  {
    id: "2",
    type: "event",
    title: "Mở đăng ký Hội nghị thường niên Luminary",
    description:
      "Tham gia cùng chúng tôi tại Geneva hoặc trực tuyến cho khóa chuyên sâu ba ngày về đạo đức công nghệ tương lai.",
  },
  {
    id: "3",
    type: "system",
    title: "Nâng cấp hệ thống hoàn tất",
    description:
      "Hệ thống đã được nâng cấp thành công nhằm cải thiện hiệu suất và bảo mật. Vui lòng tải lại trang để truy cập những tính năng mới.",
  },
  {
    id: "4",
    type: "event",
    title: "Cuộc thi lập trình sáng tạo 2024",
    description:
      "Đăng ký tham gia cuộc thi lập trình dành cho sinh viên trên toàn quốc với tổng giải thưởng lên tới 100 triệu đồng.",
  },
  {
    id: "5",
    type: "system",
    title: "Bảo trì định kỳ vào cuối tuần này",
    description:
      "Hệ thống sẽ bảo trì từ 22:00 thứ Bảy đến 6:00 Chủ nhật. Vui lòng lên kế hoạch sử dụng phù hợp.",
  },
]

// Bài viết blog
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Tương lai của AI trong giáo dục",
    excerpt:
      "Khám phá cách các mô hình sinh tạo đang tái định hình cách chúng ta tiếp cận học tập cá nhân hóa và phát triển chương trình giảng dạy.",
    category: "Technology",
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDSbZw6GKZ1LEKZb4lYIREM04tCB8IXGKzvrK18mtR48Ds41awCSZ-v1qyO36zMIqkND2QwqBzFQV5O-qveRGMN6743QbZoJZFR1C269wnpWtiOd2p-oxLW_XKTlFA35ne1Y1bcsWXoJlj7kx2a-G1XgxN5aIi7NCGno2uU1WUo4k8KB2kozI3eGyQzwy8af-dQm8AIHxjp3MvlJVvmNaxG2iMt1GhB0Bg54flM2gaazcRnljyRcok9KDSmac8cQ-PlNIH2kHk_OAs",
  },
  {
    id: "2",
    title: "Ứng dụng thuyết tải nhận thức",
    excerpt:
      "Chiến lược thực tiễn để giảm thiểu tải nhận thức ngoại lai khi thiết kế giao diện kỹ thuật số cho các nhiệm vụ phức tạp.",
    category: "Research",
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDtWdLBVQ7xA-9uPXCeJJTG-cwWdRDSmGXFogR5Pa0vtQnoNPoe7p-5iih7lrNwojq5tzL13KDn12uZs52o3bfe2MTZRMucEcvVGydFHWBw6Kqx01BmE7eZvN4n7c7rV_m3iqipaK7ygwIlV8fMStyRF6SSOhCPH_it9QUdZZQxCIco2cYhPkoh-Txxa8AJkRnOMRvrDYwXyss2TmtEoVT5hly7kxoOF5St0c9LX4o9-LQwq3KRYeVEY1Q5y3OAX1eK0TwKBrnBr_Q",
  },
  {
    id: "3",
    title: "Xây dựng không gian hợp tác",
    excerpt:
      "Cách các tính năng xã hội mới của Học viện Lumina đang thúc đẩy một cộng đồng học tập toàn cầu mạnh mẽ và gắn kết hơn.",
    category: "Community",
    coverImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAa_xag8F91UdQz_roSwwlnNLkbiusydD3hfaYukHTA63zGEKGxK8dIUrrTXLUZ80_9F76XLAbUZQkn1cSi0GfiAdtmES7_cyKKYe7e-Lr4pLJ9AF_R_H8-tfSMZ452U8zPTeCWC8oaqDA-yy1ePC-zuXjQUHOXf_eLT8prFrZkIkvc5668VcMRTbhleNpY48R5dacHa-ySQB-jStpt1NaN1x1HXdss63qTXf7UIwBwdzcgN254TG0SFY5DfR_8NlDZFaUJZqjlAFU",
  },
]
