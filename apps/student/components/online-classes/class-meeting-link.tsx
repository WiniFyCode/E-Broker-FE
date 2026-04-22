"use client"

import { Video, ExternalLink, Copy, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@workspace/ui/components/button"

interface ClassMeetingLinkProps {
  meetingLink?: string | null
}

export function ClassMeetingLink({ meetingLink }: ClassMeetingLinkProps) {
  const [copied, setCopied] = useState(false)

  if (!meetingLink) {
    return (
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
            <Video className="h-5 w-5 text-slate-500" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Link tham gia
            </p>
            <p className="text-sm text-slate-500">
              Chưa có thông tin - sẽ cập nhật sau
            </p>
          </div>
        </div>
      </div>
    )
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(meetingLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isGoogleMeet = meetingLink.includes("meet.google.com")
  const isZoom = meetingLink.includes("zoom.us")
  const platformName = isGoogleMeet ? "Google Meet" : isZoom ? "Zoom" : "Online Meeting"

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
          <Video className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
            Link tham gia {platformName}
          </p>
          <p className="text-sm text-slate-500 truncate">
            {meetingLink}
          </p>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="flex-1 rounded-lg gap-2"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-500" />
              Đã sao chép
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Sao chép
            </>
          )}
        </Button>
        <Button
          size="sm"
          asChild
          className="flex-1 rounded-lg gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <a href={meetingLink} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
            Tham gia ngay
          </a>
        </Button>
      </div>
    </div>
  )
}
