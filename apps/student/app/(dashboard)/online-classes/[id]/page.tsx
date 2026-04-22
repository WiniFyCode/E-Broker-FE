"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  ClassHeader,
  ClassTabs,
  ClassDescription,
  ClassAgenda,
  ClassMaterials,
  ParticipantsList,
  ClassSidebar,
  ClassMeetingLink,
  RegistrationModal,
} from "@/components/online-classes"
import { onlineClasses, classParticipants } from "@/lib/mock-data"

const tabs = [
  { id: "details", label: "Chi tiết" },
  { id: "participants", label: "Người tham dự" },
]

const agendaItems = [
  { time: "08:30 - 09:00", title: "Đăng ký và kiểm tra thiết bị", description: "Điểm danh và đảm bảo kết nối ổn định" },
  { time: "09:00 - 10:30", title: "Phần 1: Lý thuyết nền tảng", description: "Giới thiệu khái niệm và nguyên lý cơ bản" },
  { time: "10:30 - 10:45", title: "Giải lao" },
  { time: "10:45 - 12:00", title: "Phần 2: Thực hành và case study", description: "Phân tích tình huống thực tế và thảo luận nhóm" },
  { time: "12:00 - 12:30", title: "Tổng kết và Q&A", description: "Tóm tắt nội dung và giải đáp thắc mắc" },
]

const materials = [
  { name: "Slide bài giảng.pdf", size: "2.5 MB" },
  { name: "Tài liệu tham khảo.docx", size: "1.2 MB" },
  { name: "Bài tập về nhà.pdf", size: "500 KB" },
]

export default function OnlineClassDetailPage() {
  const params = useParams()
  const classId = params.id as string
  const [activeTab, setActiveTab] = useState("details")
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

  const classItem = onlineClasses.find((c) => c.id === classId)

  if (!classItem) {
    return (
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
            <Calendar className="h-8 w-8 text-slate-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Không tìm thấy lớp học
          </h1>
          <p className="mt-2 text-slate-500">
            Lớp học bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Link href="/online-classes">
            <Button className="mt-6 rounded-full bg-primary hover:bg-primary-container">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại Danh sách lớp học
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const participants = classParticipants[classItem.id] || []

  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      {/* Back Link */}
      <div>
        <Link href="/online-classes">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại Danh sách lớp học
          </Button>
        </Link>
      </div>

      {/* Header */}
      <ClassHeader
        classItem={classItem}
        participantCount={participants.length}
        onRegisterClick={() => setIsRegisterModalOpen(true)}
      />

      {/* Tabs */}
      <ClassTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          {activeTab === "details" ? (
            <div className="space-y-8">
              <ClassMeetingLink meetingLink={classItem.meetingLink} />
              <ClassDescription
                title={classItem.title}
                courseName={classItem.courseName}
                instructor={classItem.instructor}
              />
              <ClassAgenda items={agendaItems} />
              <ClassMaterials materials={materials} />
            </div>
          ) : (
            <ParticipantsList participants={participants} />
          )}
        </div>

        <div className="w-full lg:w-80 flex-shrink-0">
          <ClassSidebar instructor={classItem.instructor} />
        </div>
      </div>

      {/* Registration Modal */}
      <RegistrationModal
        classItem={classItem}
        open={isRegisterModalOpen}
        onOpenChange={setIsRegisterModalOpen}
      />
    </div>
  )
}
