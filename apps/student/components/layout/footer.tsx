"use client"

import Link from "next/link"
import { School, Globe, Share2, Mail, Heart } from "lucide-react"

const footerLinks = {
  platform: [
    { label: "Khóa học", href: "#" },
    { label: "Bảng giá", href: "#" },
    { label: "Hướng dẫn", href: "#" },
    { label: "Dành cho doanh nghiệp", href: "#" },
  ],
  resources: [
    { label: "Blog", href: "#" },
    { label: "Trung tâm hỗ trợ", href: "#" },
    { label: "Cộng đồng", href: "#" },
    { label: "Sự kiện", href: "#" },
  ],
  company: [
    { label: "Về chúng tôi", href: "#" },
    { label: "Tuyển dụng", href: "#" },
    { label: "Chính sách bảo mật", href: "#" },
    { label: "Điều khoản dịch vụ", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="mt-8 w-full border-t border-slate-200/80 bg-slate-50 py-12 px-4 dark:border-slate-700/80 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 md:flex-row">
        {/* Thương hiệu */}
        <div className="flex max-w-sm flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <School className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-blue-900 dark:text-blue-100">
              E-Broker
            </span>
          </div>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            Trao quyền cho tư duy thông qua giáo dục số chất lượng cao, dễ tiếp cận.
            Tham gia cùng cộng đồng những người học suốt đời và những người đổi mới sáng tạo.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-slate-400 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Globe className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="text-slate-400 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Share2 className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="text-slate-400 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Liên kết */}
        <div className="flex flex-wrap gap-12 sm:gap-24">
          {/* Nền tảng */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Nền tảng
            </h4>
            {footerLinks.platform.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Tài nguyên */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Tài nguyên
            </h4>
            {footerLinks.resources.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Công ty */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Công ty
            </h4>
            {footerLinks.company.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Thanh dưới cùng */}
      <div className="mx-auto mt-12 flex max-w-screen-2xl flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-8 md:flex-row dark:border-slate-700/80">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} E-Broker. Mọi quyền được bảo lưu.
        </p>
        <p className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
          Được thiết kế với
          <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" />
          dành cho người học
        </p>
      </div>
    </footer>
  )
}
