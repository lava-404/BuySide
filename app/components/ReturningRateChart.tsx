"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Mar", returning: 4000, newUsers: 2400 },
  { month: "Apr", returning: 3000, newUsers: 1398 },
  { month: "May", returning: 5000, newUsers: 2000 },
  { month: "Jun", returning: 4500, newUsers: 2780 },
  { month: "Jul", returning: 3100, newUsers: 1890 },
  { month: "Aug", returning: 4700, newUsers: 2390 },
  { month: "Oct", returning: 4200, newUsers: 3490 },
  { month: "Dec", returning: 6200, newUsers: 4100 },
];

export default function ReturningRateChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 20, bottom: 10, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
          <XAxis dataKey="month" tick={{ fill: "#999" }} />
          <YAxis hide />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="returning"
            stroke="#000"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="newUsers"
            stroke="#ccc"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
