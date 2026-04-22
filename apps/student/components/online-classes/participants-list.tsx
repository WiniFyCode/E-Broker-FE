"use client"

import { Users, CheckCircle2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import { cn } from "@workspace/ui/lib/utils"
import type { ClassParticipant } from "@/lib/mock-data"

interface ParticipantsListProps {
  participants: ClassParticipant[]
}

export function ParticipantsList({ participants }: ParticipantsListProps) {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Danh sách người tham dự
        </h2>
        <Badge variant="secondary">{participants.length} người</Badge>
      </div>

      {participants.length > 0 ? (
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {participants.map((participant, index) => (
            <div
              key={participant.id}
              className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={participant.avatar} />
                    <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {participant.status === "confirmed" && (
                    <CheckCircle2 className="h-4 w-4 text-green-500 absolute -bottom-0.5 -right-0.5 bg-white dark:bg-slate-900 rounded-full" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    {participant.name}
                  </p>
                  <p className="text-sm text-slate-500">{participant.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs",
                    participant.status === "confirmed"
                      ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400"
                      : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400"
                  )}
                >
                  {participant.status === "confirmed" ? "Đã xác nhận" : "Chờ xác nhận"}
                </Badge>
                <span className="text-sm text-slate-400 w-8 text-right">
                  #{index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="h-12 w-12 mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500">Chưa có ngườ đăng ký tham dự</p>
        </div>
      )}
    </div>
  )
}
