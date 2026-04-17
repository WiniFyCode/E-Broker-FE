"use client"

import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import type { BlogPost } from "@/lib/types"

interface BlogCardProps {
  post: BlogPost
}

const categoryColors: Record<BlogPost["category"], string> = {
  Technology: "text-blue-600 dark:text-blue-400",
  Research: "text-amber-600 dark:text-amber-400",
  Community: "text-emerald-600 dark:text-emerald-400",
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white transition-shadow duration-300 hover:shadow-md dark:border-slate-700/80 dark:bg-slate-900">
      {/* Cover Image */}
      <img
        src={post.coverImage}
        alt={post.title}
        className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Content */}
      <div className="flex flex-grow flex-col p-5">
        <span
          className={`mb-2 block text-[0.6875rem] font-bold uppercase tracking-wider ${categoryColors[post.category]}`}
        >
          {post.category}
        </span>
        <h3 className="mb-2 text-lg font-semibold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
          {post.title}
        </h3>
        <p className="mb-4 line-clamp-3 flex-grow text-sm text-slate-500 dark:text-slate-400">
          {post.excerpt}
        </p>
        <Link
          href="#"
          className="mt-auto flex items-center gap-1 text-sm font-semibold text-blue-600 transition-all group-hover:gap-2 dark:text-blue-400"
        >
          Read More
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

interface BlogSectionProps {
  title?: string
  viewAllLabel?: string
  viewAllHref?: string
  posts: BlogPost[]
}

export function BlogSection({
  title = "From the Blog",
  viewAllLabel = "View All Articles",
  viewAllHref = "#",
  posts,
}: BlogSectionProps) {
  return (
    <section className="mt-4 flex w-full flex-col gap-6">
      <div className="flex items-end justify-between border-b border-slate-200/20 pb-3 dark:border-slate-700/20">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {title}
        </h2>
        <Link
          href={viewAllHref}
          className="text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {viewAllLabel}
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
