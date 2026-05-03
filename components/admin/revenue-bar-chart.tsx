"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  data: { name: string; revenue: number }[];
}

export default function RevenueBarChart({ data }: Props) {
  if (!data || data.length === 0 || data.every(d => d.revenue === 0)) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        No revenue data available
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10} />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tickFormatter={(value) => `$${value}`}
            tickMargin={10}
            width={60}
          />
          <Tooltip 
            formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
            cursor={{ fill: "rgba(0,0,0,0.05)" }}
            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
          />
          <Bar 
            dataKey="revenue" 
            fill="hsl(142.1 76.2% 36.3%)"
            radius={[4, 4, 0, 0]} 
            maxBarSize={50}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
