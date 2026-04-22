"use client"

import { useState } from "react"
import {
  ProfileSidebar,
  ProfileOverview,
  ProfilePersonalInfo,
  ProfileWorkInfo,
  ProfileCourses,
  ProfileCertificates,
  ProfileSettings,
} from "@/components/profile"
import { currentUser } from "@/lib/mock-data"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <ProfileOverview user={currentUser} />
      case "personal":
        return <ProfilePersonalInfo user={currentUser} />
      case "work":
        return <ProfileWorkInfo />
      case "courses":
        return <ProfileCourses />
      case "certificates":
        return <ProfileCertificates />
      case "settings":
        return <ProfileSettings />
      default:
        return <ProfileOverview user={currentUser} />
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-headline font-bold text-slate-900 dark:text-slate-100">
          Hồ sơ cá nhân
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Quản lý thông tin cá nhân và cài đặt tài khoản
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar */}
        <div className="w-full lg:w-72 xl:w-80 flex-shrink-0">
          <ProfileSidebar
            user={currentUser}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Right Content */}
        <div className="flex-1 min-w-0">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}