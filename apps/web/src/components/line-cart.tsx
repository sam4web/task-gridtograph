import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function LineChartComponent({
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
      <LineChart
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
        <Line
          type="monotone"
          dataKey={yAxis}
          stroke="currentColor"
          className="text-primary"
          strokeWidth={3}
          dot={{
            fill: "currentColor",
            stroke: "currentColor",
            className: "text-primary stroke-primary-foreground",
            strokeWidth: 2,
            r: 5,
          }}
          activeDot={{
            fill: "currentColor",
            stroke: "currentColor",
            className: "text-primary-foreground stroke-primary",
            r: 7,
            strokeWidth: 2,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
