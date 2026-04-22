"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ThumbsUp, MessageCircle, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

export interface ExplorePost {
    id: string
    title: string
    excerpt: string
    thumbnail: string
    author: {
        name: string
        avatar: string
    }
    timestamp: string
    stats: {
        likes: number
        comments: number
    }
    tags?: string[]
}

interface ExplorePostCardProps {
    post: ExplorePost
    viewMode?: "grid" | "list"
}

export function ExplorePostCard({ post, viewMode = "list" }: ExplorePostCardProps) {
    const [isLiked, setIsLiked] = useState(false)
    const [isFavorited, setIsFavorited] = useState(false)
    const [likesCount, setLikesCount] = useState(post.stats.likes)

    const handleLike = () => {
        setIsLiked(!isLiked)
        setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1))
    }

    const isGrid = viewMode === "grid"

    return (
        <article
            className={cn(
                "group bg-surface-container-lowest rounded-xl border border-outline-variant/15 overflow-hidden",
                "hover:shadow-lg transition-all duration-300",
                isGrid ? "flex flex-col" : "flex flex-col sm:flex-row gap-5 p-5"
            )}
        >
            {/* Thumbnail */}
            <div
                className={cn(
                    "relative overflow-hidden bg-slate-100 flex-shrink-0",
                    isGrid ? "w-full h-48" : "w-full sm:w-48 h-48 sm:h-32 rounded-lg"
                )}
            >
                <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Content */}
            <div className={cn("flex flex-col flex-1 min-w-0", isGrid && "p-5")}>
                {/* Title */}
                <Link href={`/timeline/${post.id}`}>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                    </h3>
                </Link>

                {/* Excerpt */}
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                </p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
                    {/* Author */}
                    <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                            <AvatarImage src={post.author.avatar} alt={post.author.name} />
                            <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                {post.author.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                        </Avatar>
                        <div className="text-xs">
                            <p className="font-medium text-slate-700 dark:text-slate-300">
                                {post.author.name}
                            </p>
                            <p className="text-slate-500">{post.timestamp}</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLike}
                            className={cn(
                                "h-8 px-2 gap-1.5 rounded-full text-xs",
                                isLiked
                                    ? "text-blue-600 bg-blue-50"
                                    : "text-slate-500 hover:bg-slate-100"
                            )}
                        >
                            <ThumbsUp className={cn("h-3.5 w-3.5", isLiked && "fill-current")} />
                            <span>{likesCount}</span>
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 gap-1.5 rounded-full text-xs text-slate-500 hover:bg-slate-100"
                        >
                            <MessageCircle className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">Bình luận</span>
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsFavorited(!isFavorited)}
                            className={cn(
                                "h-8 px-2 gap-1.5 rounded-full text-xs",
                                isFavorited
                                    ? "text-amber-500 bg-amber-50"
                                    : "text-slate-500 hover:bg-slate-100"
                            )}
                        >
                            <Star className={cn("h-3.5 w-3.5", isFavorited && "fill-current")} />
                            <span className="hidden sm:inline">Yêu thích</span>
                        </Button>
                    </div>
                </div>
            </div>
        </article>
    )
}
