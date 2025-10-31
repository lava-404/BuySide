"use client"
import React from "react"

import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "January", desktop: 4000, mobile: 2400 },
  { month: "February", desktop: 5000, mobile: 2600 },
  { month: "March", desktop: 4800, mobile: 2200 },
  { month: "April", desktop: 3000, mobile: 2000 },
  { month: "May", desktop: 2600, mobile: 2100 },
  { month: "June", desktop: 5200, mobile: 2900 },
]

export default function RevenueChart() {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#888", fontSize: 12 }}
          />
          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.05)" }}
            contentStyle={{
              borderRadius: "10px",
              border: "1px solid #eee",
              backgroundColor: "#fff",
            }}
          />
          <Bar
            dataKey="desktop"
            fill="#111"
            radius={[6, 6, 0, 0]}
            barSize={20}
          />
          <Bar
            dataKey="mobile"
            fill="#555"
            radius={[6, 6, 0, 0]}
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

