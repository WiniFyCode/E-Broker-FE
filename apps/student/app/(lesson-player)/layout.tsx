interface LessonPlayerLayoutProps {
  children: React.ReactNode
}

export default function LessonPlayerLayout({ children }: LessonPlayerLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {children}
    </div>
  )
}
