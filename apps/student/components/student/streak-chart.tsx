"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts"

interface StreakChartProps {
  data?: Array<{
    day: string
    minutes: number
  }>
}

const defaultData = [
  { day: "T2", minutes: 25 },
  { day: "T3", minutes: 45 },
  { day: "T4", minutes: 60 },
  { day: "T5", minutes: 30 },
  { day: "T6", minutes: 90 },
  { day: "T7", minutes: 50 },
  { day: "CN", minutes: 75 },
]

const COLORS = [
  "rgba(245, 158, 11, 0.7)",
  "rgba(245, 158, 11, 0.4)",
  "rgba(245, 158, 11, 0.7)",
  "rgba(245, 158, 11, 0.4)",
  "rgba(245, 158, 11, 1)",
  "rgba(245, 158, 11, 0.6)",
  "rgba(245, 158, 11, 0.8)",
]

export function StreakChart({ data = defaultData }: StreakChartProps) {
  return (
    <div className="relative h-28 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          barSize={28}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        >
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 10,
              fill: "#64748b",
              fontWeight: "normal",
            }}
          />
          <YAxis domain={[0, 120]} hide />
          <Tooltip
            cursor={false}
            content={({ active, payload }) => {
              if (active && payload && payload.length > 0 && payload[0]) {
                const item = payload[0].payload
                return (
                  <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs shadow-lg dark:border-slate-700 dark:bg-slate-800">
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      {item.day}
                    </span>
                    <span className="ml-1 text-slate-500">{item.minutes} phút</span>
                  </div>
                )
              }
              return null
            }}
          />
          <Bar dataKey="minutes" radius={[4, 4, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}