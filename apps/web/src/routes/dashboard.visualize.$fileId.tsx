import { createFileRoute, useParams } from "@tanstack/react-router";
import {
  ArrowRight,
  Axis3d,
  BarChart3,
  LayoutGrid,
  LineChartIcon,
  PieChartIcon,
  RefreshCw,
} from "lucide-react";
import { useEffect, useState } from "react";
import { BarChartComponent } from "~/components/bar-chart";
import { DataTable } from "~/components/data-table";
import { DatasetErrorState } from "~/components/dataset-error-state";
import { LineChartComponent } from "~/components/line-cart";
import { PieChartComponent } from "~/components/pie-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Skeleton } from "~/components/ui/skeleton";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { useGetDatasetById } from "~/hooks/use-dataset";

export const Route = createFileRoute("/dashboard/visualize/$fileId")({
  component: VisualizeRouteComponent,
});

function VisualizeRouteComponent() {
  const { fileId } = useParams({ from: "/dashboard/visualize/$fileId" });
  const {
    data: dataset,
    isLoading,
    isError,
    refetch,
  } = useGetDatasetById(fileId);

  const [chartType, setChartType] = useState("bar");
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");

  useEffect(() => {
    if (!dataset?._id || !dataset?.columns || dataset.columns.length === 0) {
      return;
    }
    const stored = localStorage.getItem(`visualize_axes_${dataset._id}`);
    let initialX = "";
    let initialY = "";

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (dataset.columns.includes(parsed.x)) initialX = parsed.x;
        if (dataset.columns.includes(parsed.y)) initialY = parsed.y;
      } catch (e) {
        console.error("Failed to parse stored axes", e);
      }
    }

    const fallbackX = dataset.columns[0] ?? "";
    const fallbackY = dataset.columns[1] ?? fallbackX;

    setXAxis(initialX || fallbackX);
    setYAxis(initialY || fallbackY);
  }, [dataset?._id, dataset?.columns]);

  useEffect(() => {
    if (dataset?._id && xAxis && yAxis) {
      localStorage.setItem(
        `visualize_axes_${dataset._id}`,
        JSON.stringify({ x: xAxis, y: yAxis }),
      );
    }
  }, [dataset?._id, xAxis, yAxis]);

  if (isLoading) {
    return <VisualizeSkeletonComponent />;
  }

  if (isError) {
    return (
      <DatasetErrorState
        title="Failed to Load Visualization"
        description="We encountered an error while fetching the data for your charts. Please check your connection."
        action={{
          type: "button",
          label: "Retry Fetching",
          onClick: () => refetch(),
          icon: RefreshCw,
        }}
      />
    );
  }

  if (!dataset) {
    return (
      <DatasetErrorState
        title="Visualization Data Missing"
        description="The dataset you're trying to visualize could not be found. It may have been deleted."
        action={{
          type: "link",
          label: "Return to Library",
          to: "/dashboard/library",
          icon: ArrowRight,
        }}
      />
    );
  }

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
                  {dataset.columns.map((col) => (
                    <SelectItem key={col} value={col}>
                      {col}
                    </SelectItem>
                  ))}
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
                  {dataset.columns.map((col) => (
                    <SelectItem key={col} value={col}>
                      {col}
                    </SelectItem>
                  ))}
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

      <div className="flex-1 h-full overflow-y-auto bg-muted/5 p-8 relative">
        <div className="max-w-5xl mx-auto space-y-8">
          <Card className="border-border/40 bg-card shadow-xl rounded-xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 bg-muted/10">
              <CardTitle className="text-base font-medium tracking-tight text-foreground/90 px-1">
                Visualizing <span className="font-semibold">{yAxis}</span> by{" "}
                <span className="font-semibold">{xAxis}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-112.5 p-2">
              {chartType === "bar" && (
                <BarChartComponent
                  data={dataset.data}
                  xAxis={xAxis}
                  yAxis={yAxis}
                />
              )}
              {chartType === "line" && (
                <LineChartComponent
                  data={dataset.data}
                  xAxis={xAxis}
                  yAxis={yAxis}
                />
              )}
              {chartType === "pie" && (
                <PieChartComponent
                  data={dataset.data}
                  xAxis={xAxis}
                  yAxis={yAxis}
                />
              )}
            </CardContent>
          </Card>

          <Card className="border-border/40 bg-card shadow-xl rounded-xl">
            <CardHeader>
              <div className="px-1 space-y-0.5">
                <CardTitle className="text-base font-medium tracking-tight text-foreground/90">
                  Records data table
                </CardTitle>
                <CardDescription className="text-sm font-semibold">
                  {dataset.columns.length} Records
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable columns={dataset.columns} data={dataset.data} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function VisualizeSkeletonComponent() {
  return (
    <div className="flex h-full w-full overflow-hidden bg-background text-foreground font-sans rounded-xl border border-border">
      <aside className="w-72 border-r border-border bg-card/20 p-5 flex flex-col gap-6 shrink-0">
        <div className="space-y-4 mb-6">
          <Skeleton className="h-4 w-24 opacity-70" />
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-1.5">
                <Skeleton className="h-3 w-12 ml-1" />
                <Skeleton className="h-9 w-full rounded-md" />{" "}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Skeleton className="h-4 w-28 opacity-70" />
          <div className="w-full grid grid-cols-3 gap-1 bg-muted/20 p-1 rounded-lg">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-9 w-full rounded-md" />
            ))}
          </div>
        </div>
      </aside>

      <div className="flex-1 h-full overflow-y-auto bg-muted/5 p-8 relative">
        <div className="max-w-5xl mx-auto space-y-8">
          <Card className="border-border/40 bg-card shadow-xl rounded-xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 bg-muted/10 h-14">
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent className="h-112.5 p-6 flex items-end gap-4">
              {[...Array(12)].map((_, i) => (
                <Skeleton
                  key={i.toString()}
                  className="w-full bg-primary/10"
                  style={{ height: `${Math.random() * 60 + 20}%` }}
                />
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/40 bg-card shadow-xl rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-9 w-64 rounded-md" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 border-b border-border pb-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-4 flex-1" />
                ))}
              </div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-4">
                  {[1, 2, 3, 4].map((j) => (
                    <Skeleton key={j} className="h-8 flex-1 opacity-50" />
                  ))}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
