"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface Props {
  data: { name: string; value: number }[];
}

const COLORS = {
  CONFIRMED: "#22c55e", // text-green-500
  PENDING: "#eab308", // text-yellow-500
  CANCELLED: "#ef4444", // text-red-500
};

export default function StatusPieChart({ data }: Props) {
  // If no data, show a placeholder
  if (!data || data.length === 0 || data.every(d => d.value === 0)) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        No booking data available
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || "#8884d8"} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: any) => [`${value} bookings`, "Count"]}
            contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
