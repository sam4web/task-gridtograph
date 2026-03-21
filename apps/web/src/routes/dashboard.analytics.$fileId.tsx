import { createFileRoute } from "@tanstack/react-router";
import {
  Axis3d,
  BarChart3,
  LayoutGrid,
  LineChartIcon,
  PieChartIcon,
  Search,
} from "lucide-react";
import { useState } from "react";
import { BarChartComponent } from "~/components/bar-chart";
import { DataTable } from "~/components/data-table";
import { LineChartComponent } from "~/components/line-cart";
import { PieChartComponent } from "~/components/pie-chart";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

export const Route = createFileRoute("/dashboard/analytics/$fileId")({
  component: AnalyticsRouteComponent,
});

// Primary Action: Clicking the "FileName" or a "Visualize" button on a card should navigate the user to /editor/69bd7e56....
// Sidebar State: Once a file is "Active," the Sidebar's Editor link should become highlighted and store that fileId in your Global State (Zustand/Redux) or URL params.
// Default State: If no file is selected, clicking "Editor" in the sidebar should either:
//     Redirect the user back to the Library with a toast message: "Please select a dataset to edit."
//     Open the Most Recent file automatically.

const DUMMY_DATA = [
  {
    name: "Pro Glow Headphones",
    category: "Audio",
    quantity: 142,
    revenue: 14200,
  },
  {
    name: "Smart Watch v2",
    category: "Wearables",
    quantity: 89,
    revenue: 26700,
  },
  { name: "UltraClean Air", category: "Home", quantity: 56, revenue: 16800 },
  {
    name: "NovaPad Tablet",
    category: "Electronics",
    quantity: 203,
    revenue: 60900,
  },
  {
    name: "Standing Desk",
    category: "Furniture",
    quantity: 34,
    revenue: 17000,
  },
];

function AnalyticsRouteComponent() {
  const [chartType, setChartType] = useState("bar");
  const [xAxis, setXAxis] = useState("name");
  const [yAxis, setYAxis] = useState("revenue");

  return (
    <div className="flex h-full w-full overflow-hidden bg-background text-foreground font-sans rounded-xl border border-border">
      <aside className="w-72 border-r border-border bg-card/20 p-5 flex flex-col gap-6 shrink-0">
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">
            <Axis3d className="size-4" /> Mapping
          </div>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <label
                htmlFor="x-select"
                className="text-xs font-semibold text-muted-foreground ml-1"
              >
                X-Axis
              </label>
              <Select value={xAxis} onValueChange={setXAxis}>
                <SelectTrigger
                  id="x-select"
                  className="w-full h-9 bg-background"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Product Name</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="y-select"
                className="text-xs font-semibold text-muted-foreground ml-1"
              >
                Y-Axis
              </label>
              <Select value={yAxis} onValueChange={setYAxis}>
                <SelectTrigger
                  id="y-select"
                  className="w-full h-9 bg-background"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="quantity">Quantity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">
            <LayoutGrid className="size-4" /> Chart Type
          </div>
          <ToggleGroup
            type="single"
            value={chartType}
            onValueChange={(v) => v && setChartType(v)}
            className="w-full grid grid-cols-3 gap-1 bg-muted/20 p-1 rounded-lg"
          >
            <ToggleGroupItem
              value="bar"
              className="w-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground rounded-md!"
            >
              <BarChart3 className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="pie"
              className="w-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground rounded-md!"
            >
              <PieChartIcon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="line"
              className="w-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground rounded-md!"
            >
              <LineChartIcon className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </aside>

      <main className="flex-1 h-full overflow-y-auto bg-muted/5 p-8 relative">
        <div className="max-w-5xl mx-auto space-y-8">
          <Card className="border-border/40 bg-card shadow-xl rounded-xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 bg-muted/10">
              <CardTitle className="text-sm font-medium tracking-tight text-foreground/90 px-1">
                Visualizing {yAxis} by{" "}
                {xAxis === "name" ? "Product" : "Category"}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-112.5 p-2">
              {chartType === "bar" && (
                <BarChartComponent
                  data={DUMMY_DATA}
                  xAxis={xAxis}
                  yAxis={yAxis}
                />
              )}
              {chartType === "line" && (
                <LineChartComponent
                  data={DUMMY_DATA}
                  xAxis={xAxis}
                  yAxis={yAxis}
                />
              )}
              {chartType === "pie" && (
                <PieChartComponent
                  data={DUMMY_DATA}
                  xAxis={xAxis}
                  yAxis={yAxis}
                />
              )}
            </CardContent>
          </Card>

          <Card className="border-border/40 bg-card shadow-xl rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium tracking-tight text-foreground/90 px-1">
                Raw Records
              </CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-9 h-9 bg-background/50 border-border/50 text-foreground"
                />
              </div>
            </CardHeader>
            <CardContent>
              <DataTable data={DUMMY_DATA} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
