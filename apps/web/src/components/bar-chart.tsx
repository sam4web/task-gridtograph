import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function BarChartComponent({
  data,
  xAxis,
  yAxis,
}: {
  data: any[];
  xAxis: string;
  yAxis: string;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="currentColor"
          className="text-muted opacity-20"
        />
        <XAxis
          dataKey={xAxis}
          stroke="currentColor"
          className="text-muted-foreground text-xs"
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="currentColor"
          className="text-muted-foreground text-xs"
          tickLine={false}
          axisLine={false}
          tickFormatter={(val) => `$${val.toLocaleString()}`}
        />
        <Tooltip
          cursor={{
            fill: "currentColor",
            className: "text-primary-foreground opacity-5",
          }}
          contentStyle={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
            borderRadius: "8px",
            color: "var(--foreground)",
          }}
        />
        <Bar
          dataKey={yAxis}
          fill="currentColor"
          className="text-primary"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
