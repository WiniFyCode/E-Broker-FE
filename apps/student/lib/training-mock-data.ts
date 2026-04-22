import { Program, Specialization, Lesson, Game } from "./training-types"
import { QuizContent } from "@/components/lesson-player/games/quiz"

// Mock Games
const createQuizGame = (id: string, title: string): Game => ({
  id,
  type: "quiz",
  title,
  content: {
    scenario: {
      title: "Chiến lược Rút lui",
      subtitle: "Tình huống: Chấm dứt hợp đồng trong giai đoạn kiểm tra.",
      description: "Khách hàng đang trong quá trình mua căn hộ cao cấp",
      imageUrl:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
      badge: "Môi trường: Thỏa thuận",
    },
    context: {
      title: "Bối cảnh Pháp lý",
      description:
        "Khách hàng của bạn đang trong quá trình mua một căn hộ cao cấp. Tuy nhiên, sau khi nhận kết quả kiểm tra sơ bộ, họ cảm thấy lo lắng về chi phí bảo trì tiềm ẩn và muốn dừng giao dịch ngay lập tức.",
    },
    question: {
      text: '"Tôi có thể rút lui ngay bây giờ trong thời gian kiểm tra mà không phải đối mặt với hình phạt tài chính nào không?"',
    },
    options: [
      {
        id: "opt-a",
        label: "A",
        text: "Không, bạn sẽ mất toàn bộ số tiền đặt cọc bất kể lý do gì.",
      },
      {
        id: "opt-b",
        label: "B",
        text: "Có, nếu điều khoản kiểm tra (inspection contingency) vẫn còn hiệu lực.",
      },
      {
        id: "opt-c",
        label: "C",
        text: "Chỉ khi người bán đồng ý trả lại tiền đặt cọc một cách tự nguyện.",
      },
      {
        id: "opt-d",
        label: "D",
        text: "Có, nhưng bạn phải chứng minh được ngôi nhà có lỗi cấu trúc nghiêm trọng.",
      },
    ],
    correctAnswerId: "opt-b",
    explanation:
      "Đúng vậy! Nếu điều khoản kiểm tra (inspection contingency) vẫn còn hiệu lực, người mua có quyền rút lui khỏi giao dịch mà không bị phạt và được hoàn lại tiền đặt cọc.",
  } as QuizContent,
  score: null,
  status: "pending",
  passThreshold: 70,
  maxRetries: 3,
  currentRetries: 0,
})

const createFillBlankGame = (id: string, title: string): Game => ({
  id,
  type: "fill-blank",
  title,
  content: {
    text: "The capital of France is ___.",
    blanks: [{ index: 0, correctAnswer: "Paris" }],
  },
  score: null,
  status: "pending",
  passThreshold: 70,
  maxRetries: 3,
  currentRetries: 0,
})

const createMatchGame = (id: string, title: string): Game => ({
  id,
  type: "match",
  title,
  content: {
    pairs: [
      { left: "Apple", right: "Fruit" },
      { left: "Carrot", right: "Vegetable" },
    ],
  },
  score: null,
  status: "pending",
  passThreshold: 70,
  maxRetries: 3,
  currentRetries: 0,
})

// Mock Lessons
const createLesson = (
  id: string,
  title: string,
  gameCount: number = 5
): Lesson => {
  const games: Game[] = []
  for (let i = 1; i <= gameCount; i++) {
    if (i % 3 === 0) {
      games.push(createMatchGame(`${id}-game-${i}`, `Match Game ${i}`))
    } else if (i % 2 === 0) {
      games.push(createFillBlankGame(`${id}-game-${i}`, `Fill Blank ${i}`))
    } else {
      games.push(createQuizGame(`${id}-game-${i}`, `Quiz ${i}`))
    }
  }

  return {
    id,
    title,
    description: `Learn ${title}`,
    games,
    progress: 0,
    lastGameIndex: 0,
    isCompleted: false,
  }
}

// Mock Specializations
const createBasicSpecialization = (
  id: string,
  title: string,
  lessonCount: number = 8
): Specialization => {
  const lessons: Lesson[] = []
  for (let i = 1; i <= lessonCount; i++) {
    lessons.push(createLesson(`${id}-lesson-${i}`, `Lesson ${i}: ${title}`))
  }

  return {
    id,
    title,
    description: `Master ${title}`,
    type: "basic",
    lessons,
    isLocked: false,
    progress: 0,
    isCompleted: false,
  }
}

const createAdvancedSpecialization = (
  id: string,
  title: string,
  lessonCount: number = 10
): Specialization => {
  const lessons: Lesson[] = []
  for (let i = 1; i <= lessonCount; i++) {
    lessons.push(
      createLesson(`${id}-lesson-${i}`, `Advanced Lesson ${i}: ${title}`)
    )
  }

  return {
    id,
    title,
    description: `Advanced ${title}`,
    type: "advanced",
    lessons,
    isLocked: true,
    progress: 0,
    isCompleted: false,
  }
}

// Mock Programs
export const mockPrograms: Program[] = [
  {
    id: "prog-1",
    title: "Kinh Doanh Bất Động Sản",
    description: "Chứng chỉ hoàn chỉnh về kinh doanh bất động sản",
    thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    progress: 64,
    totalSpecializations: 14,
    completedSpecializations: 0,
    specializations: [
      createBasicSpecialization("spec-1", "Cơ Bản Về Bất Động Sản"),
      createBasicSpecialization("spec-2", "Pháp Lý Nhà Đất"),
      createBasicSpecialization("spec-3", "Định Giá Bất Động Sản"),
      createBasicSpecialization("spec-4", "Kỹ Năng Thuyết Trình"),
      createBasicSpecialization("spec-5", "Quản Lý Giao Dịch"),
      createBasicSpecialization("spec-6", "Marketing Bất Động Sản"),
      createBasicSpecialization("spec-7", "Chăm Sóc Khách Hàng"),
      createBasicSpecialization("spec-8", "Đàm Phán Giá Cả"),
      createBasicSpecialization("spec-9", "Kiểm Tra Tài Liệu"),
      createBasicSpecialization("spec-10", "Hoàn Tất Giao Dịch"),
      createBasicSpecialization("spec-11", "Phân Tích Thị Trường"),
      createBasicSpecialization("spec-12", "Chiến Lược Mua Bán"),
      createAdvancedSpecialization("spec-13", "Bất Động Sản Cao Cấp"),
      createAdvancedSpecialization("spec-14", "Đầu Tư Bất Động Sản"),
    ],
  },
  {
    id: "prog-2",
    title: "Pháp Lý Nhà Đất",
    description: "Master pháp lý và thủ tục nhà đất",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    progress: 0,
    totalSpecializations: 14,
    completedSpecializations: 0,
    specializations: [
      createBasicSpecialization("spec-15", "Hợp Đồng Mua Bán"),
      createBasicSpecialization("spec-16", "Sổ Sổ Đỏ Sổ Hồng"),
      createBasicSpecialization("spec-17", "Thủ Tục Đăng Ký"),
      createBasicSpecialization("spec-18", "Phí Và Lệ Phí"),
      createBasicSpecialization("spec-19", "Giải Quyết Tranh Chấp"),
      createBasicSpecialization("spec-20", "Thừa Kế Nhà Đất"),
      createBasicSpecialization("spec-21", "Tái Định Cư"),
      createBasicSpecialization("spec-22", "Bất Động Sản Đã Qua Sử Dụng"),
      createBasicSpecialization("spec-23", "Chính Sách Nhà Nước"),
      createBasicSpecialization("spec-24", "Tư Vấn Pháp Lý"),
      createBasicSpecialization("spec-25", "Xử Lý Vụ Án"),
      createBasicSpecialization("spec-26", "Tài Liệu Pháp Lý"),
      createAdvancedSpecialization("spec-27", "Pháp Lý Dự Án"),
      createAdvancedSpecialization("spec-28", "Pháp Lý Quốc Tế"),
    ],
  },
  {
    id: "prog-3",
    title: "Đầu Tư Bất Động Sản",
    description: "Build and manage scalable cloud infrastructure",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    progress: 0,
    totalSpecializations: 14,
    completedSpecializations: 0,
    specializations: [
      createBasicSpecialization("spec-29", "Phân Tích ROI"),
      createBasicSpecialization("spec-30", "Rủi Ro Và Cách Phòng Ngừa"),
      createBasicSpecialization("spec-31", "Tài Chính Bất Động Sản"),
      createBasicSpecialization("spec-32", "Vay Mua Nhà"),
      createBasicSpecialization("spec-33", "Lãi Suất Vay"),
      createBasicSpecialization("spec-34", "Chiến Lược Cho Thuê"),
      createBasicSpecialization("spec-35", "Quản Lý Tài Sản"),
      createBasicSpecialization("spec-36", "Đầu Tư Căn Hộ"),
      createBasicSpecialization("spec-37", "Đầu Tư Đất Nền"),
      createBasicSpecialization("spec-38", "Chung Cư Cũ"),
      createBasicSpecialization("spec-39", "Biệt Thự"),
      createBasicSpecialization("spec-40", "Nhà Phố"),
      createAdvancedSpecialization("spec-41", "Quỹ Đầu Tư BĐS"),
      createAdvancedSpecialization("spec-42", "Tái Phát Triển Đô Thị"),
    ],
  },
]

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
