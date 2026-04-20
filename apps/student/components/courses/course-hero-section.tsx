"use client"

import { Sparkles, ArrowRight, Clock, Star } from "lucide-react"

interface CourseHeroSectionProps {
  title?: string
  description?: string
}

export function CourseHeroSection({ 
  title = "Explore the Catalog",
  description = "Discover curated knowledge paths designed for the academic luminary. Expand your horizons with deep, rigorously structured courses."
}: CourseHeroSectionProps) {
  return (
    <>
      {/* Welcome & Intro */}
      <section className="mb-16">
        <h1 className="mb-4 text-4xl font-extrabold text-slate-900 dark:text-slate-100">
          {title}
        </h1>
        <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          {description}
        </p>
      </section>

      {/* Suggested for You (Bento Grid Style) */}
      <section className="mb-20">
        <h2 className="mb-8 flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
          <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          Suggested for You
        </h2>
        
        <div className="grid auto-rows-[240px] grid-cols-1 gap-6 md:grid-cols-12">
          {/* Hero Suggested Card */}
          <article className="group relative row-span-2 flex flex-col justify-end overflow-hidden rounded-xl bg-white transition-all duration-300 hover:scale-[1.01] hover:shadow-xl dark:bg-slate-900 md:col-span-8">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAr0Pasmis4EI_U4NPROB-AvXtv69A9RM_wFyvJsZRtXN8u23CgvjtYvz1K3iBRJ5HG9boGoylb_SZhWVBAqrlslXbEFeV6gIqCjZCppuf5DWbS-XcVBNFT32qJMNxyim73oPM9y_nOx4_MRYVpO3XPAsSh0WYwZVNI3PmeRR0cqZfgJyoF1bkVYLuSfI7Ul13lRJMuvtC7G3BexRTrGE0gM9n9LxFjpJ6n24Kh17tIxWpQDOx_Z3qWhOBYEE2IdlrIUyem12HLhfU')"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
            <div className="relative z-10 p-8">
              <div className="mb-4 flex gap-2">
                <span className="rounded-full bg-blue-600/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                  Masterclass
                </span>
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
                  Advanced
                </span>
              </div>
              <h3 className="mb-3 text-4xl font-bold text-white">
                Advanced Quantum Computing Topologies
              </h3>
              <p className="mb-6 max-w-xl text-slate-200 line-clamp-2">
                Delve into the theoretical frameworks of multi-qubit systems and their practical applications in next-generation cryptography.
              </p>
              <button className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700">
                Enroll Now 
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </article>

          {/* Secondary Suggestion 1 */}
          <article className="group relative row-span-1 flex flex-col overflow-hidden rounded-xl bg-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:bg-slate-900 md:col-span-4">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30 transition-opacity group-hover:opacity-40"
              style={{
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCZzRlXLxrUmK-KIujlapb79CXLdsJrmouw7btxUw3FysVFUP36Gt3RiCgywbhq-l_YfOENnwn0TO_d_bh2YhEwAOju1SP8FVpD69Qn1s6leJzadI_thMHgCagjXuOWItZ2iUVvuQM10rU6ucc7H8Qlgjw9FCnb4UrUbpQ8lQGk1V4krhVUXnpDwZrqZnuXw6CWkDaDGJ-tTLW1REnBP3LrB75cbAX2H558Z7tQH8L1sWeetRptqp3SiDqnbNzGC--c66vCLgcxsOs')"
              }}
            />
            <div className="relative z-10 flex h-full flex-col justify-between p-6">
              <div>
                <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Literature
                </span>
                <h3 className="mb-2 text-xl font-bold leading-tight text-slate-900 dark:text-slate-100">
                  The Architecture of Modern Poetry
                </h3>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-slate-200">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBS3gsmIBHvlU2IHqblHAnX2ay5wbG3HIGBf5D1XjfPfSRi5V1S9BZjstsn32OiiBtLMfomLaUzKSqULxuUg3mJfmFGC4fJgD9oufwhjG7waKmipcTMliaMM1s1t1WgdQY9LxEGVJK6gq0W-nJn9XJRAoNMS5FCEkOcm8wpqF3lDUqxp0FMThBLrTYWodYqBVbUSh99MtIHZcc-tPHgHqWdcSoSwwARNJf35UjeQaTkUKAk85tvsBKahET1Tlc6UWPesOixw7-T0_Q"
                      alt="Instructor"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-slate-200">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSMjAxS1kLntLDc-IuKrmPLN_7QcHQ-_E47xlVaIe0uQGwrBdD5ll8gIYeJfpv_p1O8yICwnrZ_YQ2CbWQGIv3O4mzaHxpV8i_j2G3FRjLQWlidKNpSC-kmF6QetF1nlxxwH4f3f3K-S4wRkvsxg2keDSGBYJZEyAXz8kJ5a7fb8IMlcQ8nNKSzw6IBgoty2t6xibCgJbgBypzBc8VwDSpyL1Jwwy1AaYMpVK4MlT9x15w2P_gsFO87yb5fd_mdc4sutc0f-StccM"
                      alt="Instructor"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-blue-600 dark:hover:text-white">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </article>

          {/* Secondary Suggestion 2 */}
          <article className="group relative row-span-1 flex flex-col overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg md:col-span-4">
            {/* Glass Pattern Overlay */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                backgroundSize: "24px 24px"
              }}
            />
            <div className="relative z-10 flex h-full flex-col justify-between p-6">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-200">
                    Highest Rated
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-bold leading-tight text-white">
                  Data Ethics & Society
                </h3>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-white/20 pt-4 text-sm">
                <span className="flex items-center gap-1 opacity-90">
                  <Clock className="h-4 w-4" />
                  8 Weeks
                </span>
                <span className="font-semibold">Beginner</span>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}