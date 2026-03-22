import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const PIE_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export function PieChartComponent({
  data,
  xAxis,
  yAxis,
}: {
  data: any[];
  xAxis: string;
  yAxis: string;
}) {
  const chartData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      [yAxis]: parseFloat(item[yAxis]) || 0,
    }));
  }, [data, yAxis]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={100}
          outerRadius={160}
          paddingAngle={5}
          dataKey={yAxis}
          nameKey={xAxis}
          stroke="none"
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index.toString()}`}
              fill={PIE_COLORS[index % PIE_COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip
          cursor={{
            fill: "currentColor",
            className: "text-primary-foreground opacity-5",
          }}
          contentStyle={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
            borderRadius: "8px",
          }}
          itemStyle={{
            color: "var(--foreground)",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
