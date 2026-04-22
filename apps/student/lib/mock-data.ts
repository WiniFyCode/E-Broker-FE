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
    title: "Cập nhật chính sách thuế bất động sản mới 2024",
    description:
      "Từ ngày 15/04/2024, thuế thu nhập từ chuyển nhượng bất động sản có nhiều thay đổi. Xem chi tiết tại đây.",
  },
  {
    id: "2",
    type: "event",
    title: "Hội thảo đầu tư bất động sản Quận 9",
    description:
      "Tham gia sự kiện miễn phí để tìm hiểu cơ hội đầu tư và xu hướng thị trường bất động sản khu vực.",
  },
  {
    id: "3",
    type: "system",
    title: "Xác minh pháp lý dự án hoàn tất",
    description:
      "Tất cả các dự án trên nền tảng đã được xác minh pháp lý. Bạn có thể yên tâm đầu tư vào các dự án đã kiểm duyệt.",
  },
  {
    id: "4",
    type: "event",
    title: "Triển lãm bất động sản Quốc tế 2024",
    description:
      "Đăng ký tham gia triển lãm bất động sản quốc tế với hơn 200 dự án từ 30 quốc gia. Giảm giá 50% cho suất đăng ký sớm.",
  },
  {
    id: "5",
    type: "system",
    title: "Bảo trì hệ thống cuối tuần",
    description:
      "Hệ thống sẽ bảo trì từ 22:00 thứ Bảy đến 6:00 Chủ nhật để nâng cấp tính năng tìm kiếm bất động sản.",
  },
]

import type { TimelinePostData, TimelineComment } from "@/components/timeline"

// Sample comments
const sampleComments: TimelineComment[] = [
  {
    id: "c1",
    author: {
      name: "Nguyễn Văn A",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHy6K11xAnbeEltTE9gtKolYrtMlfLp2pbP0dbQP2aCLIsr2FEKcgw604FwSqQDQe7ojZ8_KRONn0PWCj5jTdewSTFm_XWbJdSFbdOmdeqHXjjr06KGrCpy6e27GDdZNptGrX8heYYTSxh-6H5F6ye3MR1_krWOcNN83B7k21Tvsa73W5mtpvu3PKYG7mRnVAgPmgvOGAKuFu8WuoQPStxVUt6NFc979ZPK9ybtZCIzctNeD9HSLOnfA_MY9PZnY1vhI5tntZCX0o",
    },
    content: "Bài viết rất hữu ích! Cảm ơn chị đã chia sẻ.",
    timestamp: "2 giờ trước",
    likes: 12,
  },
  {
    id: "c2",
    author: {
      name: "Trần Thị B",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDN5NVOqEkjX4kSOM-zOEBCl_3o4MjNufmgBQdVJXGA71atqzrVhGGA_hRCHdT8vsmpCRNsxQ3E8lAA4eFiGRCw-9ww2w-Wz_ikDLgT4b3hZcu9RwhScsPuywKcCOENGnMrR-6Zqecc-dKoJxNIedKBvElYVMCRbCe2gnJxYzALeTLNKAEcoN82NfPZuYVMFGtkUOrYmQ0ZQVLNTFMZPD22cxLc27KoOTyrUw9B9eKkhnoP93yAAJp0K7dJ6Qu5-gFxt3ELPKKjeHI",
    },
    content: "Em có câu hỏi về điều khoản loại trừ, mong chị giải đáp thêm ạ.",
    timestamp: "1 giờ trước",
    likes: 5,
  },
]

// Timeline posts
export const timelinePosts: TimelinePostData[] = [
  {
    id: "1",
    author: {
      name: "Trịnh Thị Thu Hiền",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD8iFqwbcNoMNf6AQao_BMFH1ERsJg_oyiXdJNcfxyZrZ46uFRhBSvsqXow6wFfuCFdCTEAGUVjfKbcBqDOlRxdLzPkjSn8ce2Ni-8gQEaRfG5lrUfwl2vnFioHZmd5uGjTd_IUTvxcXOZq-osusFxjver1QVg-o2PU_Nru3i79YjXiU5su5jR9SAs5NMGHNI0cbrVmUT-lJFlF_MlYz8f6Qp9ZoBg1F3jTDPqB8_qCLK2kQtHToeHLl96PQUr2yVxTkk1QredblMs",
      title: "Kiến thức và kỹ năng cơ bản dành cho Đại lý",
    },
    timestamp: "3 phút trước",
    title: "Tóm tắt Quy tắc và Điều khoản Sản phẩm Bảo hiểm",
    excerpt:
      "Anh chị thân mến,\n\nTrong quá trình tư vấn sản phẩm bảo hiểm, Đại lý cần tư vấn điều khoản sản phẩm cho khách hàng.\n\nVậy nội dung nào trong điều khoản là quan trọng nhất và cần phải lưu ý? Bài viết này sẽ giúp anh chị nắm vững các điểm chính...",
    content: `Anh chị thân mến,

Trong quá trình tư vấn sản phẩm bảo hiểm, Đại lý cần tư vấn điều khoản sản phẩm cho khách hàng.

Vậy nội dung nào trong điều khoản là quan trọng nhất và cần phải lưu ý? Bài viết này sẽ giúp anh chị nắm vững các điểm chính.

## 1. Phạm vi bảo hiểm

Đây là phần quan trọng nhất mà khách hàng cần hiểu rõ. Đại lý cần giải thích:
- Các rủi ro được bảo hiểm
- Các trường hợp được chi trả
- Giới hạn bảo hiểm

## 2. Điều khoản loại trừ

Khách hàng cần biết rõ những trường hợp nào KHÔNG được bảo hiểm để tránh hiểu lầm sau này.

## 3. Quyền và nghĩa vụ của các bên

Cần làm rõ quyền lợi của khách hàng cũng như nghĩa vụ khai báo trung thực.

## 4. Thờ hạn và cách thức thanh toán

Giải thích rõ về thờ hạn hợp đồng, cách đóng phí và quyền lợi khi đóng phí đầy đủ.

---

Hy vọng bài viết này hữu ích cho công việc tư vấn của anh chị!`,
    thumbnail: {
      url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=450&fit=crop",
      alt: "Bảo hiểm sản phẩm",
    },
    stats: {
      likes: 50,
      comments: 7,
    },
    tags: ["Bảo hiểm", "Điều khoản", "Tư vấn"],
    isLiked: false,
    isFavorited: false,
    comments: sampleComments,
  },
  {
    id: "2",
    author: {
      name: "MBA Digital Admin 02",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAHy6K11xAnbeEltTE9gtKolYrtMlfLp2pbP0dbQP2aCLIsr2FEKcgw604FwSqQDQe7ojZ8_KRONn0PWCj5jTdewSTFm_XWbJdSFbdOmdeqHXjjr06KGrCpy6e27GDdZNptGrX8heYYTSxh-6H5F6ye3MR1_krWOcNN83B7k21Tvsa73W5mtpvu3PKYG7mRnVAgPmgvOGAKuFu8WuoQPStxVUt6NFc979ZPK9ybtZCIzctNeD9HSLOnfA_MY9PZnY1vhI5tntZCX0o",
      title: "M-Talk",
    },
    timestamp: "5 ngày trước",
    title: "M-Talk #247: Xây đội ngũ - Dẫn thành công",
    excerpt:
      "Chương trình M-Talk tuần này sẽ chia sẻ về chủ đề xây dựng đội ngũ bán hàng hiệu quả. Các diễn giả sẽ đến từ các công ty hàng đầu trong ngành bảo hiểm...",
    thumbnail: {
      url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=225&fit=crop",
      alt: "M-Talk Event",
    },
    stats: {
      likes: 128,
      comments: 24,
    },
    isLiked: true,
    isFavorited: true,
  },
  {
    id: "3",
    author: {
      name: "Nguyễn Văn Minh",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDN5NVOqEkjX4kSOM-zOEBCl_3o4MjNufmgBQdVJXGA71atqzrVhGGA_hRCHdT8vsmpCRNsxQ3E8lAA4eFiGRCw-9ww2w-Wz_ikDLgT4b3hZcu9RwhScsPuywKcCOENGnMrR-6Zqecc-dKoJxNIedKBvElYVMCRbCe2gnJxYzALeTLNKAEcoN82NfPZuYVMFGtkUOrYmQ0ZQVLNTFMZPD22cxLc27KoOTyrUw9B9eKkhnoP93yAAJp0K7dJ6Qu5-gFxt3ELPKKjeHI",
      title: "Chuyên gia Tư vấn Bảo hiểm",
    },
    timestamp: "1 giờ trước",
    title: "Kinh nghiệm chăm sóc khách hàng VIP",
    excerpt:
      "Sau 10 năm làm việc với các khách hàng VIP, tôi đã rút ra được một số bài học quý giá muốn chia sẻ cùng anh chị em. Điều quan trọng nhất là sự chân thành và chuyên nghiệp...",
    thumbnail: {
      url: "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=225&fit=crop",
      alt: "Chăm sóc khách hàng",
    },
    stats: {
      likes: 86,
      comments: 15,
    },
    isLiked: false,
    isFavorited: false,
  },
  {
    id: "4",
    author: {
      name: "Lê Thị Hương",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBQjodZmAkkTfs44eeEqlCiCqS8D9EybkEv5EmY4ZKz1lckmTv8lrBBWt0554Xy6D-2287XM3QmY1qungL410zF0I8jcfojnEtTzgOzi71qG_eIG1rZvoT0puRcGr0T-uFyQlVCuMu4lOzTOATsHNbEBmQKfwoZQx_aMO-8MxWvFdjUn_vso63rdqM5wOlE0IUxo5dQc91qpMFgckxbHQ3N8Zpe-LBnw5cnS--6Ig2NTZgfw7DTapnUlJzQrfpcYPT8lzxa7EDMgqw",
      title: "Quản lý Phát triển Kinh doanh",
    },
    timestamp: "3 giờ trước",
    title: "Chiến lược bán hàng trong quý 4/2024",
    excerpt:
      "Quý 4 là thờ điểm vàng cho ngành bảo hiểm. Dưới đây là các chiến lược đã được kiểm chứng giúp tăng doanh số bán hàng trong giai đoạn này...",
    thumbnail: {
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop",
      alt: "Chiến lược kinh doanh",
    },
    stats: {
      likes: 234,
      comments: 42,
    },
    isLiked: true,
    isFavorited: false,
  },
  {
    id: "5",
    author: {
      name: "Phạm Quốc Bảo",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCm42O5VVS1dTIZFqUrx6aXsFWZj-aOcU4BnXp1gt_A3YyiwrH_SQiSZL5dYLecAPOSKZ6VVPGP1r-f5azA-g3Q-1RS_UqZKcWlXsRREb0mU5K4qnTYQTUuV8IXey5UMrKQuXtu4NTIKEN5UGoRXq5fd3zw4mqYiZqJPu-tfCwI1cBxNXlEj2d7w2Op4P0nOOmiZYrumI1Dws-Y2EbdJyqOvGbWko8RImaU6vHom6IuMKmEGPrAZG7SQTkcdc_KPFQYvolqVM57rFg",
      title: "Giám đốc Đào tạo",
    },
    timestamp: "Hôm qua",
    title: "Cập nhật chính sách mới về Quy tắc Đạo đức",
    excerpt:
      "Công ty vừa ban hành chính sách mới về Quy tắc Đạo đức nghề nghiệp. Anh chị vui lòng đọc kỹ và tuân thủ trong quá trình làm việc...",
    thumbnail: {
      url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=225&fit=crop",
      alt: "Chính sách mới",
    },
    stats: {
      likes: 67,
      comments: 8,
    },
    isLiked: false,
    isFavorited: true,
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

import type { Category, ExplorePost } from "@/components/explore"

// Categories for Explore page
export const exploreCategories: Category[] = [
  {
    id: "1",
    slug: "kien-thuc-va-ky-nang",
    name: "Kiến thức và kỹ năng cơ bản dành cho Đại lý",
    description: "Các kiến thức nền tảng và kỹ năng cần thiết",
    thumbnail: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=200&h=200&fit=crop",
    postCount: 40,
  },
  {
    id: "2",
    slug: "m-talk",
    name: "M-Talk",
    description: "Chương trình chia sẻ kinh nghiệm",
    thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=200&h=200&fit=crop",
    postCount: 265,
  },
  {
    id: "3",
    slug: "m-action",
    name: "M-Action: Bứt Phá Cùng Nhau",
    description: "Các hoạt động và thử thách",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=200&fit=crop",
    postCount: 8,
  },
  {
    id: "4",
    slug: "podcast",
    name: "Podcast",
    description: "Nội dung audio hữu ích",
    thumbnail: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=200&h=200&fit=crop",
    postCount: 3,
  },
  {
    id: "5",
    slug: "xanh-spotlight",
    name: "Xanh Spotlight Podcast",
    description: "Podcast đặc biệt từ Xanh",
    thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=200&h=200&fit=crop",
    postCount: 3,
  },
  {
    id: "6",
    slug: "ban-tin-hoc-tap",
    name: "Bản tin học tập",
    description: "Thông tin học tập mới nhất",
    thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&h=200&fit=crop",
    postCount: 3,
  },
  {
    id: "7",
    slug: "tai-lieu-hoc-tap",
    name: "[Agency] Tài liệu học tập",
    description: "Tài liệu từ Agency",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop",
    postCount: 12,
  },
  {
    id: "8",
    slug: "so-hoa-hanh-trinh",
    name: "Số Hóa Hành Trình Đại lý",
    description: "Quá trình chuyển đổi số",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&h=200&fit=crop",
    postCount: 31,
  },
  {
    id: "9",
    slug: "m-share",
    name: "M-SHARE",
    description: "Chia sẻ từ cộng đồng",
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=200&fit=crop",
    postCount: 187,
  },
  {
    id: "10",
    slug: "tai-lieu-mit",
    name: "Tài liệu học tập MIT th...",
    description: "Tài liệu từ MIT",
    thumbnail: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=200&h=200&fit=crop",
    postCount: 10,
  },
  {
    id: "11",
    slug: "tram-nang-luong",
    name: "Trạm Năng Lượng",
    description: "Nạp năng lượng tích cực",
    thumbnail: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=200&h=200&fit=crop",
    postCount: 100,
  },
  {
    id: "12",
    slug: "chuong-trinh-phat-trien",
    name: "Chương trình Phát triển...",
    description: "Chương trình phát triển bản thân",
    thumbnail: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=200&h=200&fit=crop",
    postCount: 1,
  },
]

// Explore tags
export const exploreTags = [
  "Tài chính và Đầu tư",
  "Ôn thi MIT",
  "Kỹ năng tư vấn",
  "Sản phẩm",
  "Sản phẩm dừng bán",
  "Chính sách tuân thủ",
  "Claim",
  "Công cụ số hóa",
  "Cẩm nang ĐL",
  "Luật KDBH",
  "tuân thủ",
  "Đạo đức ĐL",
]

// Explore posts
export const explorePosts: ExplorePost[] = [
  {
    id: "e1",
    title: "Hướng dẫn ôn thi chứng chỉ ĐLBH Nhân thọ cơ bản (MIT)",
    excerpt: "Chào mừng anh chị đến với bộ tài liệu hướng dẫn ôn thi chứng chỉ ĐLBH Nhân thọ cơ bản (MIT)! Anh chị vui lòng lựa chọn nội...",
    thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
    author: {
      name: "Trịnh Thị Thu Hiền",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8iFqwbcNoMNf6AQao_BMFH1ERsJg_oyiXdJNcfxyZrZ46uFRhBSvsqXow6wFfuCFdCTEAGUVjfKbcBqDOlRxdLzPkjSn8ce2Ni-8gQEaRfG5lrUfwl2vnFioHZmd5uGjTd_IUTvxcXOZq-osusFxjver1QVg-o2PU_Nru3i79YjXiU5su5jR9SAs5NMGHNI0cbrVmUT-lJFlF_MlYz8f6Qp9ZoBg1F3jTDPqB8_qCLK2kQtHToeHLl96PQUr2yVxTkk1QredblMs",
    },
    timestamp: "một năm trước",
    stats: { likes: 110, comments: 23 },
    tags: ["Ôn thi MIT", "Kỹ năng tư vấn"],
  },
  {
    id: "e2",
    title: "Tóm tắt Quy tắc và Điều khoản Sản phẩm Bảo hiểm",
    excerpt: "Anh chị thân mến, Trong quá trình tư vấn sản phẩm bảo hiểm, Đại lý cần tư vấn điều khoản sản phẩm cho khách hàng. Vậy nội...",
    thumbnail: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop",
    author: {
      name: "Trịnh Thị Thu Hiền",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8iFqwbcNoMNf6AQao_BMFH1ERsJg_oyiXdJNcfxyZrZ46uFRhBSvsqXow6wFfuCFdCTEAGUVjfKbcBqDOlRxdLzPkjSn8ce2Ni-8gQEaRfG5lrUfwl2vnFioHZmd5uGjTd_IUTvxcXOZq-osusFxjver1QVg-o2PU_Nru3i79YjXiU5su5jR9SAs5NMGHNI0cbrVmUT-lJFlF_MlYz8f6Qp9ZoBg1F3jTDPqB8_qCLK2kQtHToeHLl96PQUr2yVxTkk1QredblMs",
    },
    timestamp: "31 phút trước",
    stats: { likes: 50, comments: 7 },
    tags: ["Sản phẩm", "Kỹ năng tư vấn"],
  },
  {
    id: "e3",
    title: "Kỹ năng xử lý từ chối từ khách hàng",
    excerpt: "Trong quá trình tư vấn bảo hiểm, việc bị khách hàng từ chối là điều bình thường. Bài viết này sẽ chia sẻ các kỹ năng xử lý...",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    author: {
      name: "Nguyễn Văn Minh",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDN5NVOqEkjX4kSOM-zOEBCl_3o4MjNufmgBQdVJXGA71atqzrVhGGA_hRCHdT8vsmpCRNsxQ3E8lAA4eFiGRCw-9ww2w-Wz_ikDLgT4b3hZcu9RwhScsPuywKcCOENGnMrR-6Zqecc-dKoJxNIedKBvElYVMCRbCe2gnJxYzALeTLNKAEcoN82NfPZuYVMFGtkUOrYmQ0ZQVLNTFMZPD22cxLc27KoOTyrUw9B9eKkhnoP93yAAJp0K7dJ6Qu5-gFxt3ELPKKjeHI",
    },
    timestamp: "2 giờ trước",
    stats: { likes: 86, comments: 15 },
    tags: ["Kỹ năng tư vấn"],
  },
  {
    id: "e4",
    title: "Quy trình Claim bảo hiểm chi tiết",
    excerpt: "Hướng dẫn chi tiết quy trình giải quyết Claim bảo hiểm cho khách hàng, từ tiếp nhận hồ sơ đến chi trả...",
    thumbnail: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop",
    author: {
      name: "Phạm Quốc Bảo",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCm42O5VVS1dTIZFqUrx6aXsFWZj-aOcU4BnXp1gt_A3YyiwrH_SQiSZL5dYLecAPOSKZ6VVPGP1r-f5azA-g3Q-1RS_UqZKcWlXsRREb0mU5K4qnTYQTUuV8IXey5UMrKQuXtu4NTIKEN5UGoRXq5fd3zw4mqYiZqJPu-tfCwI1cBxNXlEj2d7w2Op4P0nOOmiZYrumI1Dws-Y2EbdJyqOvGbWko8RImaU6vHom6IuMKmEGPrAZG7SQTkcdc_KPFQYvolqVM57rFg",
    },
    timestamp: "1 ngày trước",
    stats: { likes: 234, comments: 42 },
    tags: ["Claim", "Chính sách tuân thủ"],
  },
  {
    id: "e5",
    title: "Chính sách tuân thủ mới nhất 2024",
    excerpt: "Cập nhật những thay đổi trong chính sách tuân thủ của công ty năm 2024, anh chị cần lưu ý để thực hiện đúng...",
    thumbnail: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=300&fit=crop",
    author: {
      name: "Lê Thị Hương",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQjodZmAkkTfs44eeEqlCiCqS8D9EybkEv5EmY4ZKz1lckmTv8lrBBWt0554Xy6D-2287XM3QmY1qungL410zF0I8jcfojnEtTzgOzi71qG_eIG1rZvoT0puRcGr0T-uFyQlVCuMu4lOzTOATsHNbEBmQKfwoZQx_aMO-8MxWvFdjUn_vso63rdqM5wOlE0IUxo5dQc91qpMFgckxbHQ3N8Zpe-LBnw5cnS--6Ig2NTZgfw7DTapnUlJzQrfpcYPT8lzxa7EDMgqw",
    },
    timestamp: "3 ngày trước",
    stats: { likes: 156, comments: 28 },
    tags: ["Chính sách tuân thủ", "tuân thủ"],
  },
]

import type { OnlineClass } from "@/components/online-classes"

// Class Participants
export interface ClassParticipant {
  id: string
  name: string
  email: string
  avatar?: string
  status: "confirmed" | "pending"
}

export const classParticipants: Record<string, ClassParticipant[]> = {
  oc1: [
    { id: "p1", name: "Nguyễn Văn A", email: "nguyenvana@example.com", status: "confirmed" },
    { id: "p2", name: "Trần Thị B", email: "tranthib@example.com", status: "confirmed" },
    { id: "p3", name: "Lê Văn C", email: "levanc@example.com", status: "pending" },
    { id: "p4", name: "Phạm Thị D", email: "phamthid@example.com", status: "confirmed" },
    { id: "p5", name: "Hoàng Văn E", email: "hoangvane@example.com", status: "confirmed" },
  ],
  oc2: [
    { id: "p6", name: "Đỗ Thị F", email: "dothif@example.com", status: "confirmed" },
    { id: "p7", name: "Vũ Văn G", email: "vuvang@example.com", status: "pending" },
    { id: "p8", name: "Bùi Thị H", email: "buithih@example.com", status: "confirmed" },
  ],
  oc3: [
    { id: "p9", name: "Ngô Văn I", email: "ngovani@example.com", status: "confirmed" },
    { id: "p10", name: "Dương Thị K", email: "duongthik@example.com", status: "confirmed" },
    { id: "p11", name: "Lý Văn L", email: "lyvanl@example.com", status: "pending" },
  ],
  oc4: [
    { id: "p12", name: "Mai Thị M", email: "maithim@example.com", status: "confirmed" },
    { id: "p13", name: "Phan Văn N", email: "phanvann@example.com", status: "confirmed" },
  ],
  oc5: [
    { id: "p14", name: "Trương Thị O", email: "truongthio@example.com", status: "pending" },
    { id: "p15", name: "Lương Văn P", email: "luongvanp@example.com", status: "confirmed" },
  ],
  oc6: [
    { id: "p16", name: "Hồ Thị Q", email: "hothiq@example.com", status: "confirmed" },
    { id: "p17", name: "Tô Văn R", email: "tovanr@example.com", status: "confirmed" },
    { id: "p18", name: "Đinh Thị S", email: "dinhthis@example.com", status: "confirmed" },
    { id: "p19", name: "Chu Văn T", email: "chuvant@example.com", status: "confirmed" },
  ],
  oc7: [
    { id: "p20", name: "Tạ Thị U", email: "tathiu@example.com", status: "confirmed" },
    { id: "p21", name: "Lâm Văn V", email: "lamvanv@example.com", status: "confirmed" },
  ],
}

// Online Classes
export const onlineClasses: OnlineClass[] = [
  {
    id: "oc1",
    title: "MBA-iClass_22.04.2026",
    date: "2026-04-22",
    dayOfWeek: "T4",
    day: 22,
    month: "Thg 04",
    timeRange: "08:30 – 17:00",
    language: "Tiếng Việt",
    courseName: "SBW 3 DAYS",
    instructor: "Nguyễn Thùy Trang",
    status: "full",
    statusText: "Hết chỗ (Có sẵn Danh sách chờ)",
  },
  {
    id: "oc2",
    title: "MBA-iClass_25.04.2026",
    date: "2026-04-25",
    dayOfWeek: "T7",
    day: 25,
    month: "Thg 04",
    timeRange: "09:00 – 12:00",
    language: "Tiếng Việt",
    courseName: "Kỹ năng tư vấn cơ bản",
    instructor: "Trịnh Thị Thu Hiền",
    status: "available",
    statusText: "Còn chỗ",
  },
  {
    id: "oc3",
    title: "MBA-iClass_28.04.2026",
    date: "2026-04-28",
    dayOfWeek: "T3",
    day: 28,
    month: "Thg 04",
    timeRange: "14:00 – 17:00",
    language: "Tiếng Việt",
    courseName: "Sản phẩm bảo hiểm nhân thọ",
    instructor: "Phạm Quốc Bảo",
    status: "waitlist",
    statusText: "Sắp hết chỗ",
  },
  {
    id: "oc4",
    title: "MBA-iClass_05.05.2026",
    date: "2026-05-05",
    dayOfWeek: "T3",
    day: 5,
    month: "Thg 05",
    timeRange: "08:30 – 17:00",
    language: "Tiếng Việt",
    courseName: "Quy trình Claim bảo hiểm",
    instructor: "Lê Thị Hương",
    status: "available",
    statusText: "Còn chỗ",
  },
  {
    id: "oc5",
    title: "MBA-iClass_10.05.2026",
    date: "2026-05-10",
    dayOfWeek: "CN",
    day: 10,
    month: "Thg 05",
    timeRange: "09:00 – 16:00",
    language: "Tiếng Anh",
    courseName: "Advanced Sales Techniques",
    instructor: "John Smith",
    status: "available",
    statusText: "Còn chỗ",
    meetingLink: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: "oc6",
    title: "MBA-iClass_15.04.2026",
    date: "2026-04-15",
    dayOfWeek: "T4",
    day: 15,
    month: "Thg 04",
    timeRange: "08:30 – 17:00",
    language: "Tiếng Việt",
    courseName: "Đạo đức nghề nghiệp",
    instructor: "Nguyễn Văn Minh",
    status: "ended",
    statusText: "Đã kết thúc",
    meetingLink: null,
  },
  {
    id: "oc7",
    title: "MBA-iClass_10.04.2026",
    date: "2026-04-10",
    dayOfWeek: "T6",
    day: 10,
    month: "Thg 04",
    timeRange: "13:00 – 17:00",
    language: "Tiếng Việt",
    courseName: "Chăm sóc khách hàng VIP",
    instructor: "Trần Thị Lan",
    status: "ended",
    statusText: "Đã kết thúc",
    meetingLink: null,
  },
]
