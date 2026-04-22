import { Program, Specialization } from "./training-types"
import { QuizContent } from "@/components/lesson-player/games/quiz"
import { FillBlankContent } from "@/components/lesson-player/games/fill-blank"
import { MatchContent } from "@/components/lesson-player/games/match"
import { SequenceContent } from "@/components/lesson-player/games/sequence"
import { HotspotContent } from "@/components/lesson-player/games/hotspot"
import { LabelContent } from "@/components/lesson-player/games/label"
import { MemoryContent } from "@/components/lesson-player/games/memory"
import { WordScrambleContent } from "@/components/lesson-player/games/word-scramble"
import { CrosswordContent } from "@/components/lesson-player/games/crossword"
import { SwipeContent } from "@/components/lesson-player/games/swipe"
import { BranchingContent } from "@/components/lesson-player/games/branching"
import { TimedSprintContent } from "@/components/lesson-player/games/timed-sprint"

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
      text: question,
    },
    options: options.map((text, idx) => ({
      id: `opt-${String.fromCharCode(97 + idx)}`, // opt-a, opt-b, opt-c, opt-d
      label: String.fromCharCode(65 + idx), // A, B, C, D
      text,
    })),
    correctAnswerId: `opt-${String.fromCharCode(97 + correctAnswer)}`,
    explanation:
      "Đúng vậy! Nếu điều khoản kiểm tra (inspection contingency) vẫn còn hiệu lực, người mua có quyền rút lui khỏi giao dịch mà không bị phạt và được hoàn lại tiền đặt cọc.",
  } as QuizContent,
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
    title: "Nghĩa vụ Tín thác",
    context: {
      title: "Bối cảnh Pháp lý",
      description:
        "Trong lĩnh vực luật đại lý, nghĩa vụ tín thác đại diện cho tiêu chuẩn chăm sóc cao nhất. Nghĩa vụ đạo đức và pháp lý này đảm bảo rằng các lợi ích của khách hàng được đặt lên trên tất cả những người khác.",
    },
    hint: "Cụm từ này đề cập đến việc phải báo cáo đầy đủ mọi sự thật quan trọng có thể ảnh hưởng đến quyết định của khách hàng.",
    text: "Khi đại diện cho người mua trong một giao dịch bất động sản, người môi giới có một ___ pháp lý tối cao. Điều này đòi hỏi đại lý phải thực hiện việc ___ đầy đủ đối với tất cả các sự thật vật chất có thể ảnh hưởng đến giá trị của tài sản. Nếu đại lý cố tình che giấu thông tin về lỗi kết cấu của ngôi nhà, họ đã vi phạm nghiêm trọng nguyên tắc ___ và có thể phải chịu trách nhiệm bồi thường thiệt hại trước pháp luật.",
    blanks: [
      { index: 0, correctAnswer: "nghĩa vụ tín thác" },
      { index: 1, correctAnswer: "công khai thông tin" },
      { index: 2, correctAnswer: "trung thực" },
    ],
  } as FillBlankContent,
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
  content: {
    title: "Xác Định Công Cụ Pháp Lý Bất Động Sản",
    description:
      "Ghép nối các công cụ pháp lý phức tạp với định nghĩa chính xác để hoàn thành báo cáo thẩm định tài sản.",
    leftLabel: "Công Cụ Pháp Lý",
    rightLabel: "Định Nghĩa Chi Tiết",
    pairs,
  } as MatchContent,
  score: null,
  status: "pending",
  passThreshold: 70,
  maxRetries: 3,
  currentRetries: 0,
})

// Create sequence game
const createSequenceGame = (id: string): Game => ({
  id,
  type: "sequence",
  title: "Sắp xếp quy trình",
  content: {
    title: "Quy trình Giao dịch BĐS",
    description:
      "Một chuyên gia tư vấn bất động sản xuất sắc phải nắm rõ từng bước trong hành trình mua nhà. Hãy sắp xếp các cột mốc quan trọng dưới đây theo đúng trình tự thời gian từ khi bắt đầu đến khi hoàn tất.",
    hint: "Lưu ý rằng việc kiểm tra tình trạng nhà thường diễn ra ngay sau khi các điều khoản mua bán được thống nhất sơ bộ để bảo vệ quyền lợi người mua.",
    items: [
      {
        id: "step-1",
        title: "Chấp nhận đề nghị (Offer Accepted)",
        description: "Ký kết biên bản thỏa thuận sơ bộ",
        correctOrder: 0,
      },
      {
        id: "step-2",
        title: "Kiểm tra nhà (Home Inspection)",
        description: "Đánh giá cấu trúc và hệ thống",
        correctOrder: 1,
      },
      {
        id: "step-3",
        title: "Thẩm định giá (Appraisal)",
        description: "Xác định giá trị thực của tài sản",
        correctOrder: 2,
      },
      {
        id: "step-4",
        title: "Đóng giao dịch/Giải ngân",
        description: "Chuyển quyền sở hữu & Thanh toán",
        correctOrder: 3,
      },
    ],
  } as SequenceContent,
  score: null,
  status: "pending",
  passThreshold: 70,
  maxRetries: 3,
  currentRetries: 0,
})

// Create hotspot game
const createHotspotGame = (id: string): Game => ({
  id,
  type: "hotspot",
  title: "Xác định vị trí trên bản đồ",
  content: {
    title: "Phân Tích Vị Trí Bất Động Sản",
    subtitle: "Xác định các khu vực quan trọng",
    description:
      "Xác định các khu vực quan trọng trên bản đồ quy hoạch để đánh giá tiềm năng đầu tư.",
    imageUrl:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80",
    hotspots: [
      { id: "hs-1", x: 25, y: 30, label: "Trung tâm thương mại", icon: "shopping_cart", type: "primary" },
      { id: "hs-2", x: 60, y: 45, label: "Trường học quốc tế", icon: "school", type: "primary" },
      { id: "hs-3", x: 40, y: 70, label: "Bệnh viện đa khoa", icon: "local_hospital", type: "error" },
    ],
  } as HotspotContent,
  score: null,
  status: "pending",
  passThreshold: 70,
  maxRetries: 3,
  currentRetries: 0,
})

// Create label image game
const createLabelImageGame = (id: string): Game => ({
  id,
  type: "label",
  title: "Gắn nhãn các bộ phận",
  content: {
    title: "Cấu Trúc Pháp Lý Hợp Đồng",
    description:
      "Xác định và gắn nhãn các điều khoản quan trọng trong hợp đồng mua bán bất động sản.",
    imageUrl:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80",
    labels: [
      { id: "lbl-1", text: "Điều khoản thanh toán" },
      { id: "lbl-2", text: "Thời hạn bàn giao" },
      { id: "lbl-3", text: "Điều khoản phạt" },
    ],
    zones: [
      { id: "zone-1", x: 1, y: 1, width: 2, height: 1, correctLabelId: "lbl-1", label: "Khu vực 1" },
      { id: "zone-2", x: 3, y: 2, width: 2, height: 1, correctLabelId: "lbl-2", label: "Khu vực 2" },
      { id: "zone-3", x: 5, y: 3, width: 2, height: 1, correctLabelId: "lbl-3", label: "Khu vực 3" },
    ],
  } as LabelContent,
  score: null,
  status: "pending",
  passThreshold: 70,
  maxRetries: 3,
  currentRetries: 0,
})

// Create memory flip game
const createMemoryFlipGame = (id: string): Game => ({
  id,
  type: "memory",
  title: "Ghép cặp thuật ngữ",
  content: {
    title: "Trí Nhớ Thuật Ngữ Bất Động Sản",
    description:
      "Lật các thẻ và ghép đúng cặp thuật ngữ tiếng Anh với nghĩa tiếng Việt.",
    pairs: [
      { icon: "account_balance", text: "Escrow - Ký quỹ" },
      { icon: "assessment", text: "Appraisal - Thẩm định giá" },
      { icon: "description", text: "Deed - Giấy chứng nhận" },
      { icon: "gavel", text: "Lien - Quyền thế chấp" },
      { icon: "map", text: "Zoning - Phân vùng quy hoạch" },
      { icon: "account_balance_wallet", text: "Equity - Vốn chủ sở hữu" },
    ],
  } as MemoryContent,
  score: null,
  status: "pending",
  passThreshold: 70,
  maxRetries: 3,
  currentRetries: 0,
})

// Create word scramble game
const createWordScrambleGame = (id: string): Game => ({
  id,
  type: "word-scramble",
  title: "Sắp xếp chữ cái",
  content: {
    title: "Giải Mã Thuật Ngữ Pháp Lý",
    subtitle: "Sắp xếp lại các chữ cái",
    description:
      "Sắp xếp lại các chữ cái để tạo thành thuật ngữ bất động sản chính xác.",
    correctWord: "SỔĐỎ",
    scrambledLetters: ["Ổ", "Đ", "S", "Ỏ"],
    hint: "Giấy chứng nhận quyền sử dụng đất",
    timeLimit: 180,
  } as WordScrambleContent,
  score: null,
  status: "pending",
  passThreshold: 70,
  maxRetries: 3,
  currentRetries: 0,
})

// Create crossword game
const createCrosswordGame = (id: string): Game => ({
  id,
  type: "crossword",
  title: "Ô chữ thuật ngữ",
  content: {
    title: "Trò Chơi Ô Chữ: Pháp Lý Bất Động Sản",
    description:
      "Hoàn thiện sơ đồ bằng cách điền các thuật ngữ tiếng Việt chuyên ngành chính xác.",
    gridSize: 10,
    clues: [
      {
        id: "clue-1",
        number: 1,
        direction: "down",
        clue: "Giấy chứng nhận quyền sử dụng đất có bìa màu đỏ",
        answer: "SỔĐỎ",
        startRow: 0,
        startCol: 5,
        length: 4,
      },
      {
        id: "clue-2",
        number: 2,
        direction: "across",
        clue: "Từ lóng chỉ việc sở hữu sổ đỏ chính chủ",
        answer: "QUYỀNĐỎ",
        startRow: 2,
        startCol: 0,
        length: 7,
      },
    ],
    timeLimit: 480,
    hintsAvailable: 3,
  } as CrosswordContent,
  score: null,
  status: "pending",
  passThreshold: 70,
  maxRetries: 3,
  currentRetries: 0,
})

// Create swipe game
const createSwipeGame = (id: string): Game => ({
  id,
  type: "swipe",
  title: "Phân tích tình huống",
  content: {
    title: "Phân tích Tình huống",
    subtitle:
      "Hãy chú ý đến các thuật ngữ ám chỉ sự phân biệt đối xử dựa trên tình trạng gia đình.",
    description:
      "Phân tích đoạn hội thoại và đưa ra quyết định: Liệu hành động này có vi phạm Luật Công bằng Nhà ở?",
    cards: [
      {
        id: "card-1",
        quote:
          "Chúng tôi chủ yếu giới thiệu khu vực này cho các gia đình có trẻ nhỏ vì ở đây có rất nhiều sân chơi và trường học tốt.",
        recordNumber: "Bản ghi âm số 442",
      },
      {
        id: "card-2",
        quote:
          "Tôi nghĩ căn hộ này phù hợp hơn với người trẻ tuổi, không có gia đình.",
        recordNumber: "Bản ghi âm số 443",
      },
    ],
    leftLabel: "VI PHẠM",
    rightLabel: "HỢP LỆ",
  } as SwipeContent,
  score: null,
  status: "pending",
  passThreshold: 70,
  maxRetries: 3,
  currentRetries: 0,
})

// Create branching game
const createBranchingGame = (id: string): Game => ({
  id,
  type: "branching",
  title: "Kịch bản đàm phán",
  content: {
    title: "Kịch bản đàm phán",
    subtitle: "Cuộc đối đầu tại bàn đàm phán",
    description:
      "Đối tác bất ngờ thay đổi điều khoản thanh toán vào phút chót. Bạn sẽ xử lý như thế nào?",
    startNodeId: "node-1",
    nodes: {
      "node-1": {
        id: "node-1",
        title: "Cuộc đối đầu tại bàn đàm phán",
        description:
          "Đối tác bất ngờ thay đổi điều khoản thanh toán vào phút chót. Không khí trong phòng trở nên căng thẳng.",
        imageUrl:
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
        choices: [
          {
            id: "choice-1a",
            label: "A",
            text: "Tiếp cận Cứng rắn: Từ chối thẳng thừng yêu cầu giảm giá",
            nextNodeId: "node-2",
            isOptimal: false,
          },
          {
            id: "choice-1b",
            label: "B",
            text: "Tìm kiếm Điểm chung: Đề xuất giữ nguyên mức giá nhưng điều chỉnh tiến độ",
            nextNodeId: "node-3",
            isOptimal: true,
          },
          {
            id: "choice-1c",
            label: "C",
            text: "Tạm hoãn Chiến thuật: Đề nghị nghỉ giải lao 15 phút",
            nextNodeId: "node-4",
            isOptimal: true,
          },
        ],
      },
      "node-2": {
        id: "node-2",
        title: "Kết quả: Đàm phán đổ vỡ",
        description:
          "Cách tiếp cận cứng rắn đã khiến đối tác rút lui. Thỏa thuận không thành.",
        isEndNode: true,
        choices: [],
      },
      "node-3": {
        id: "node-3",
        title: "Kết quả: Thành công",
        description:
          "Đối tác đồng ý với đề xuất của bạn. Thỏa thuận được ký kết thành công.",
        isEndNode: true,
        choices: [],
      },
      "node-4": {
        id: "node-4",
        title: "Kết quả: Cần thêm thời gian",
        description:
          "Sau khi nghỉ giải lao, cả hai bên đã tìm được tiếng nói chung.",
        isEndNode: true,
        choices: [],
      },
    },
  } as BranchingContent,
  score: null,
  status: "pending",
  passThreshold: 70,
  maxRetries: 3,
  currentRetries: 0,
})

// Create timed sprint game
const createTimedSprintGame = (id: string): Game => ({
  id,
  type: "timed-sprint",
  title: "Thử thách tốc độ",
  content: {
    title: "Blitz Chứng Chỉ Chuyên Gia",
    subtitle: "Thử thách cuối cùng",
    description:
      "Trả lời nhanh các câu hỏi trong thời gian giới hạn để hoàn thành chứng chỉ.",
    questions: [
      {
        id: "q-1",
        question:
          "Trong bối cảnh pháp lý hiện tại, tài liệu nào sau đây được coi là minh chứng pháp lý cao nhất đối với quyền sở hữu nhà ở?",
        options: [
          "Hợp đồng mua bán có công chứng",
          "Giấy chứng nhận quyền sử dụng đất, quyền sở hữu nhà ở",
          "Bản trích đo địa chính",
          "Giấy phép xây dựng và biên bản hoàn công",
        ],
        correctAnswer: 1,
      },
      {
        id: "q-2",
        question: "Thuế thu nhập cá nhân khi chuyển nhượng BĐS là bao nhiêu?",
        options: ["2%", "5%", "10%", "15%"],
        correctAnswer: 0,
      },
      {
        id: "q-3",
        question: "Thời hạn sở hữu nhà ở tại Việt Nam là?",
        options: ["50 năm", "70 năm", "Không thời hạn", "99 năm"],
        correctAnswer: 2,
      },
    ],
    timeLimit: 60,
    passingScore: 70,
  } as TimedSprintContent,
  score: null,
  status: "pending",
  passThreshold: 70,
  maxRetries: 3,
  currentRetries: 0,
})

// Create lesson with real estate content - NOW WITH ALL 12 GAMES
const createLesson = (
  id: string,
  title: string,
  status: LessonStatus,
  _gameCount: number = 12
): Lesson => {
  const games: Game[] = []

  // Game 1: Quiz about law
  games.push(
    createQuizGame(
      `${id}-game-1`,
      "Theo Luật Nhà ở 2023, thời hạn sở hữu nhà ở chung cư là bao lâu?",
      ["50 năm", "Không thời hạn", "70 năm", "30 năm"],
      1
    )
  )

  // Game 2: Fill-blank about terminology
  games.push(
    createFillBlankGame(
      `${id}-game-2`,
      "___ là giá chủ sở hữu căn hộ phải trả cho người thuê khi cho thuê lại.",
      "Tiền thuê"
    )
  )

  // Game 3: Match pairs
  games.push(
    createMatchGame(`${id}-game-3`, [
      {
        left: "Easement",
        right:
          "Quyền sử dụng phần đất của người khác cho một mục đích cụ thể, chẳng hạn như để tiếp cận lối đi chung hoặc lắp đặt đường dây điện.",
      },
      {
        left: "Encroachment",
        right:
          "Việc xây dựng trái phép hoặc mở rộng một cấu trúc vật chất lên phần đất của người hàng xóm.",
      },
      {
        left: "Lien",
        right:
          "Một yêu cầu pháp lý đối với một tài sản như một vật bảo đảm cho việc thanh toán một khoản nợ hoặc nghĩa vụ thuế.",
      },
    ])
  )

  // Game 4: Sequence game
  games.push(createSequenceGame(`${id}-game-4`))

  // Game 5: Hotspot
  games.push(createHotspotGame(`${id}-game-5`))

  // Game 6: Label Image
  games.push(createLabelImageGame(`${id}-game-6`))

  // Game 7: Memory Flip
  games.push(createMemoryFlipGame(`${id}-game-7`))

  // Game 8: Word Scramble
  games.push(createWordScrambleGame(`${id}-game-8`))

  // Game 9: Crossword
  games.push(createCrosswordGame(`${id}-game-9`))

  // Game 10: Swipe
  games.push(createSwipeGame(`${id}-game-10`))

  // Game 11: Branching
  games.push(createBranchingGame(`${id}-game-11`))

  // Game 12: Timed Sprint
  games.push(createTimedSprintGame(`${id}-game-12`))
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
