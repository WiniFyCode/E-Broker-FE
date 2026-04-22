"use client"

import { FileText } from "lucide-react"

interface ClassDescriptionProps {
  title: string
  courseName: string
  instructor: string
}

export function ClassDescription({ title, courseName, instructor }: ClassDescriptionProps) {
  return (
    <section className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-6">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
        <FileText className="h-5 w-5 text-primary" />
        Mô tả lớp học
      </h2>
      <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
        <p>
          Lớp học <strong>{title}</strong> là phần học thuộc khóa <strong>{courseName}</strong>. 
          Đây là cơ hội tuyệt vờ để nâng cao kiến thức và kỹ năng chuyên môn.
        </p>
        <p className="mt-4">
          Trong buổi học này, giảng viên <strong>{instructor}</strong> sẽ hướng dẫn 
          các nội dung quan trọng và chia sẻ kinh nghiệm thực tế. Học viên được khuyến khích 
          tương tác, đặt câu hỏi và thảo luận.
        </p>
      </div>
    </section>
  )
}
