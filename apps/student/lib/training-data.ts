import { Program, Specialization, Lesson, Game } from "./training-types"

// Game types
type GameType =
  | "quiz"
  | "fill-blank"
  | "match"
  | "sequence"
  | "hotspot"
  | "label"
  | "memory"
  | "word-scramble"
  | "crossword"
  | "swipe"
  | "branching"
  | "timed-sprint"

type GameStatus = "pending" | "pass" | "fail"

interface Game {
  id: string
  type: GameType
  title: string
  content: any
  score: number | null
  status: GameStatus
  passThreshold: number
  maxRetries?: number
  currentRetries?: number
}

interface Lesson {
  id: string
  title: string
  description: string
  games: Game[]
  progress: number
  lastGameIndex: number
  isCompleted: boolean
}

// Lesson status
type LessonStatus = "completed" | "in-progress" | "pending"

// Create quiz game
const createQuizGame = (
  id: string,
  question: string,
  options: string[],
  correctAnswer: number
): Game => ({
  id,
  type: "quiz",
  title: `Câu hỏi: ${question.substring(0, 30)}...`,
  content: {
    question,
    options,
    correctAnswer,
  },
  score: null,
  status: "pending",
  passThreshold: 70,
  maxRetries: 3,
  currentRetries: 0,
})

// Create fill-blank game
const createFillBlankGame = (
  id: string,
  text: string,
  correctWord: string
): Game => ({
  id,
  type: "fill-blank",
  title: `Điền từ: ${text.substring(0, 25)}...`,
  content: {
    text,
    blanks: [{ index: 0, correctAnswer: correctWord }],
  },
  score: null,
  status: "pending",
  passThreshold: 70,
  maxRetries: 3,
  currentRetries: 0,
})

// Create match game
const createMatchGame = (
  id: string,
  pairs: { left: string; right: string }[]
): Game => ({
  id,
  type: "match",
  title: "Ghép cặp thuật ngữ",
  content: { pairs },
  score: null,
  status: "pending",
  passThreshold: 70,
  maxRetries: 3,
  currentRetries: 0,
})

// Create lesson with real estate content
const createLesson = (
  id: string,
  title: string,
  status: LessonStatus,
  _gameCount: number = 5
): Lesson => {
  const games: Game[] = []

  // Quiz about law
  games.push(
    createQuizGame(
      `${id}-game-1`,
      "Theo Luật Nhà ở 2023, thời hạn sở hữu nhà ở chung cư là bao lâu?",
      ["50 năm", "Không thời hạn", "70 năm", "30 năm"],
      1
    )
  )

  // Fill-blank about terminology
  games.push(
    createFillBlankGame(
      `${id}-game-2`,
      "___ là giá chủ sở hữu căn hộ phải trả cho người thuê khi cho thuê lại.",
      "Tiền thuê"
    )
  )

  // Match pairs
  games.push(
    createMatchGame(`${id}-game-3`, [
      { left: "Sổ đỏ", right: "Giấy chứng nhận QSH" },
      { left: "Phí quản lý", right: "Chi phí vận hành chung cư" },
      { left: "Shophouse", right: "Căn hộ thương mại" },
      { left: "Penthouse", right: "Căn hộ cao cấp tầng cao" },
    ])
  )

  // Quiz about finance
  games.push(
    createQuizGame(
      `${id}-game-4`,
      "Tỷ lệ cho vay tối đa với bất động sản theo quy định hiện hành là?",
      ["70%", "75%", "80%", "85%"],
      1
    )
  )

  // Quiz about market
  games.push(
    createQuizGame(
      `${id}-game-5`,
      "Chỉ số nào phản ánh cung - cầu bất động sản tại một khu vực?",
      ["Giá/m²", "Tỷ lệ hấp thụ", "Số giao dịch", "Tất cả đều đúng"],
      3
    )
  )

  // Calculate progress based on status
  let progress = 0
  let isCompleted = false
  let lastGameIndex = 0

  switch (status) {
    case "completed":
      progress = 100
      isCompleted = true
      lastGameIndex = games.length - 1
      break
    case "in-progress":
      progress = Math.floor(Math.random() * 60) + 30 // 30-90%
      isCompleted = false
      lastGameIndex = Math.floor(games.length / 2)
      break
    case "pending":
    default:
      progress = 0
      isCompleted = false
      lastGameIndex = 0
      break
  }

  return {
    id,
    title,
    description: `Học về: ${title}`,
    games,
    progress,
    lastGameIndex,
    isCompleted,
  }
}

// Create basic specialization with different lesson statuses
const createBasicSpecialization = (
  id: string,
  title: string,
  description: string,
  lessonStatuses: LessonStatus[]
): Specialization => {
  const lessons: Lesson[] = lessonStatuses.map((status, i) =>
    createLesson(`${id}-lesson-${i + 1}`, `Bài ${i + 1}: ${title}`, status)
  )

  // Calculate specialization progress
  const completedCount = lessons.filter((l) => l.isCompleted).length
  const progress = Math.round((completedCount / lessons.length) * 100)

  return {
    id,
    title,
    description,
    type: "basic",
    lessons,
    isLocked: false,
    progress,
    isCompleted: completedCount === lessons.length,
  }
}

// Create advanced specialization
const createAdvancedSpecialization = (
  id: string,
  title: string,
  description: string,
  lessonCount: number = 10
): Specialization => {
  const lessons: Lesson[] = []
  for (let i = 1; i <= lessonCount; i++) {
    lessons.push(
      createLesson(`${id}-lesson-${i}`, `${title} - Phần ${i}`, "pending")
    )
  }

  return {
    id,
    title,
    description,
    type: "advanced",
    lessons,
    isLocked: true,
    progress: 0,
    isCompleted: false,
  }
}

// Mock data for real estate agent training programs
export const mockPrograms: Program[] = [
  {
    id: "prog-1",
    title: "Chứng Chỉ Môi Giới Bất Động Sản Cấp Độ 1",
    description:
      "Chương trình đào tạo toàn diện cho người mới bắt đầu trong ngành môi giới bất động sản, cung cấp kiến thức nền tảng về pháp lý, tài chính và kỹ năng giao dịch.",
    thumbnail:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
    progress: 35,
    totalSpecializations: 10,
    completedSpecializations: 0,
    specializations: [
      // Specialization 1: Land Law - has all 3 statuses
      createBasicSpecialization(
        "spec-1",
        "Luật Đất Đai & Nhà Ở",
        "Nắm vững các quy định pháp luật về đất đai, quyền sử dụng đất, và các loại giấy tờ nhà đất theo quy định hiện hành.",
        [
          "completed",
          "completed",
          "in-progress",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
        ]
      ),
      // Specialization 2: Planning & Construction - some completed
      createBasicSpecialization(
        "spec-2",
        "Quy Hoạch & Xây Dựng",
        "Hiểu biết về quy hoạch đô thị, quy chuẩn xây dựng, và các thủ tục cấp phép xây dựng.",
        [
          "completed",
          "completed",
          "completed",
          "in-progress",
          "pending",
          "pending",
          "pending",
          "pending",
        ]
      ),
      // Specialization 3: Real Estate Market - in progress
      createBasicSpecialization(
        "spec-3",
        "Thị Trường Bất Động Sản",
        "Phân tích xu hướng thị trường, đọc hiểu chỉ số thị trường, và dự báo cung - cầu.",
        [
          "in-progress",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
        ]
      ),
      // Specialization 4: Valuation - not started
      createBasicSpecialization(
        "spec-4",
        "Định Giá & Thẩm Định",
        "Phương pháp định giá bất động sản, thẩm định giá trị tài sản, và các yếu tố ảnh hưởng đến giá.",
        [
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
        ]
      ),
      // Specialization 5: Finance
      createBasicSpecialization(
        "spec-5",
        "Tài Chính Bất Động Sản",
        "Hiểu biết về tín dụng bất động sản, lãi suất, phương thức thanh toán, và các sản phẩm tài chính liên quan.",
        [
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
        ]
      ),
      // Specialization 6: Trading Skills
      createBasicSpecialization(
        "spec-6",
        "Kỹ Năng Giao Dịch",
        "Kỹ năng đàm phán, chốt deal, xử lý objections, và xây dựng mối quan hệ khách hàng.",
        [
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
        ]
      ),
      // Specialization 7: Marketing
      createBasicSpecialization(
        "spec-7",
        "Marketing Bất Động Sản",
        "Chiến lược marketing cho môi giới, sử dụng digital marketing, và xây dựng thương hiệu cá nhân.",
        [
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
        ]
      ),
      // Specialization 8: Taxes
      createBasicSpecialization(
        "spec-8",
        "Thuế & Phí Liên Quan",
        "Nắm các quy định về thuế thu nhập, lệ phí trước bạ, và các chi phí khi giao dịch bất động sản.",
        [
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
        ]
      ),
      // Advanced specializations
      createAdvancedSpecialization(
        "spec-9",
        "Đầu Tư Bất Động Sản Chuyên Nghiệp",
        "Phân tích cơ hội đầu tư, đánh giá rủi ro, và xây dựng chiến lược đầu tư sinh lời.",
        12
      ),
      createAdvancedSpecialization(
        "spec-10",
        "Phát Triển Dự Án Bất Động Sản",
        "Quy trình phát triển dự án, từ khảo sát thị trường đến bàn giao sản phẩm.",
        15
      ),
    ],
  },
  {
    id: "prog-2",
    title: "Chứng Chỉ Môi Giới Bất Động Sản Cấp Độ 2",
    description:
      "Chương trình nâng cao dành cho môi giới có kinh nghiệm, tập trung vào phân tích đầu tư và phát triển dự án.",
    thumbnail:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    progress: 0,
    totalSpecializations: 8,
    completedSpecializations: 0,
    specializations: [
      createBasicSpecialization(
        "spec-11",
        "Phân Tích Đầu Tư Nâng Cao",
        "Các phương pháp phân tích đầu tư bất động sản, tính toán IRR, NPV và ROI.",
        [
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
        ]
      ),
      createBasicSpecialization(
        "spec-12",
        "REITs & Quỹ Bất Động Sản",
        "Hiểu về Quỹ đầu tư bất động sản, cấu trúc và cơ hội đầu tư.",
        [
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
        ]
      ),
      createBasicSpecialization(
        "spec-13",
        "Cho Thuê & Vận Hành",
        "Quản lý cho thuê bất động sản, tối ưu hóa doanh thu cho thuê.",
        [
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
        ]
      ),
      createBasicSpecialization(
        "spec-14",
        "Pháp Lý Tranh Chấp",
        "Xử lý các tranh chấp bất động sản, kiến thức tố tụng và giải quyết tranh chấp.",
        [
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
        ]
      ),
      createAdvancedSpecialization(
        "spec-15",
        "M&A Bất Động Sản",
        "Sáp nhập và mua bán doanh nghiệp bất động sản, định giá doanh nghiệp.",
        12
      ),
      createAdvancedSpecialization(
        "spec-16",
        "Phát Triển Dự Án Cao Cấp",
        "Chiến lược phát triển các dự án bất động sản cao cấp, villa, resort.",
        15
      ),
      createAdvancedSpecialization(
        "spec-17",
        "Bất Động Sản Công Nghiệp",
        "Thị trường bất động sản kho, nhà xưởng, logistics và các xu hướng mới.",
        10
      ),
      createAdvancedSpecialization(
        "spec-18",
        "PropTech & Chuyển Đổi Số",
        "Ứng dụng công nghệ trong bất động sản, PropTech và xu hướng số hóa.",
        8
      ),
    ],
  },
  {
    id: "prog-3",
    title: "Kỹ Sư Định Giá Bất Động Sản",
    description:
      "Chương trình chuyên sâu về định giá và thẩm định bất động sản, được công nhận bởi các tổ chức chuyên môn.",
    thumbnail:
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200&q=80",
    progress: 0,
    totalSpecializations: 8,
    completedSpecializations: 0,
    specializations: [
      createBasicSpecialization(
        "spec-19",
        "Nguyên Lý Thẩm Định Giá",
        "Các nguyên tắc và tiêu chuẩn thẩm định giá bất động sản theo quy định.",
        [
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
        ]
      ),
      createBasicSpecialization(
        "spec-20",
        "Phương Pháp So Sánh",
        "Phương pháp định giá so sánh thị trường, thu thập và phân tích dữ liệu.",
        [
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
        ]
      ),
      createBasicSpecialization(
        "spec-21",
        "Phương Pháp Chi Phí",
        "Định giá theo chi phí xây dựng, khấu hao và giá trị đất.",
        [
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
        ]
      ),
      createBasicSpecialization(
        "spec-22",
        "Phương Pháp Thu Nhập",
        "Định giá dựa trên dòng tiền, CAP Rate, NOI và các chỉ số tài chính.",
        [
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
          "pending",
        ]
      ),
      createBasicSpecialization(
        "spec-23",
        "Báo Cáo Thẩm Định",
        "Kỹ năng lập báo cáo thẩm định chuyên nghiệp, đạt chuẩn quốc tế.",
        ["pending", "pending", "pending", "pending", "pending", "pending"]
      ),
      createAdvancedSpecialization(
        "spec-24",
        "Thẩm Định Phức Tạp",
        "Định giá các loại tài sản đặc biệt: khách sạn, trung tâm thương mại, nhà máy.",
        12
      ),
      createAdvancedSpecialization(
        "spec-25",
        "Thẩm Định Cho Vay",
        "Định giá tài sản bảo đảm cho ngân hàng và các tổ chức tín dụng.",
        10
      ),
      createAdvancedSpecialization(
        "spec-26",
        "Phân Tích Rủi Ro BĐS",
        "Đánh giá rủi ro trong định giá, phân tích kịch bản và độ nhạy.",
        8
      ),
    ],
  },
]

// Helper functions
export const getProgramById = (id: string): Program | undefined => {
  return mockPrograms.find((p) => p.id === id)
}

export const getSpecializationById = (
  programId: string,
  specializationId: string
): Specialization | undefined => {
  const program = getProgramById(programId)
  return program?.specializations.find((s) => s.id === specializationId)
}

export const getLessonById = (
  programId: string,
  specializationId: string,
  lessonId: string
): Lesson | undefined => {
  const specialization = getSpecializationById(programId, specializationId)
  return specialization?.lessons.find((l) => l.id === lessonId)
}

export const getGameById = (
  programId: string,
  specializationId: string,
  lessonId: string,
  gameId: string
): Game | undefined => {
  const lesson = getLessonById(programId, specializationId, lessonId)
  return lesson?.games.find((g) => g.id === gameId)
}
