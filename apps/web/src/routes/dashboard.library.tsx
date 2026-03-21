import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  CalendarDays,
  Columns,
  FileText,
  MoreVertical,
  Plus,
  RefreshCw,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Skeleton } from "~/components/ui/skeleton";
import { useDeleteDataset, useGetDatasets } from "~/hooks/use-dataset";
import { useUploadModal } from "~/hooks/use-upload-modal";
import { formatDate } from "~/lib/utils";

export const Route = createFileRoute("/dashboard/library")({
  component: LibraryRouteComponent,
});

function LibraryRouteComponent() {
  const onOpen = useUploadModal((state) => state.onOpen);
  const { data: datasets, isLoading, isError, refetch } = useGetDatasets();
  const deleteMutation = useDeleteDataset();
  const navigate = useNavigate();

  const handleViewData = (id: string) => {
    localStorage.setItem("lastFileId", id);
    navigate({
      to: "/dashboard/visualize/$fileId",
      params: { fileId: id },
    });
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-start">
        {Array.from({ length: 4 }).map((_, i) => (
          <DatasetCardSkeletonComponent key={i.toString()} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <DatasetErrorStateComponent onRetry={() => refetch()} />;
  }

  return (
    <div className="w-full h-full space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground mb-0.5">
            Dataset Library
          </h1>
          <p className="text-base text-muted-foreground font-medium">
            Manage your uploaded data repositories
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={onOpen}
          >
            <Plus className="h-4 w-4" /> Upload
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-start">
        {datasets?.map((dataset) => (
          <Card
            key={dataset._id.toString()}
            className="group hover:border-slate-400 shadow-sm transition-all"
          >
            <CardContent className="px-4">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="size-6 text-primary" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => handleViewData(dataset._id.toString())}
                    >
                      View Data
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:bg-destructive focus:text-destructive-foreground cursor-pointer transition-colors"
                      onClick={() =>
                        deleteMutation.mutate(dataset._id.toString())
                      }
                      disabled={deleteMutation.isPending}
                    >
                      {deleteMutation.isPending &&
                      deleteMutation.variables === dataset._id.toString()
                        ? "Deleting..."
                        : "Delete"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mb-5">
                <h3
                  className="font-medium text-foreground truncate"
                  title={dataset.fileName}
                >
                  {dataset.fileName}
                </h3>
                <div className="flex items-center gap-1.5 mt-1.5 text-muted-foreground">
                  <CalendarDays className="size-4" />
                  <span className="text-sm font-medium">
                    {formatDate(dataset.createdAt)}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3.5 border-t border-primary-foreground/15">
                <div className="flex items-center gap-2 text-accent-foreground">
                  <Columns className="size-4 opacity-70" />
                  <span className="text-xs font-medium">
                    {dataset.columns.length} Columns
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <button
          onClick={onOpen}
          className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-muted-foreground/20 dark:border-muted bg-muted/30 hover:bg-muted/50 hover:border-primary/50 transition-all group cursor-pointer h-50"
          type="button"
        >
          <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary">
            <Plus className="size-6" />
          </div>
          <p className="text-sm font-medium text-foreground">Add New Dataset</p>
        </button>
      </div>
    </div>
  );
}

function DatasetCardSkeletonComponent() {
  return (
    <Card className="shadow-sm border-border/40">
      <CardContent className="px-4 py-0">
        <div className="flex justify-between items-start mb-4">
          <Skeleton className="size-10 rounded-lg bg-primary/5" />
          <Skeleton className="size-8 rounded-full" />
        </div>

        <div className="mb-5 space-y-2">
          <Skeleton className="h-5 w-[80%]" />
          <div className="flex items-center gap-1.5 mt-1.5">
            <Skeleton className="size-4 rounded-sm" />
            <Skeleton className="h-4 w-[40%]" />
          </div>
        </div>

        <div className="flex items-center justify-between pt-3.5 border-t border-border/10">
          <div className="flex items-center gap-2">
            <Skeleton className="size-4 rounded-sm" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DatasetErrorStateComponent({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center pt-20 px-4">
      <Alert
        variant="destructive"
        className="max-w-md bg-destructive/5 border-destructive/20"
      >
        <AlertTitle className="text-base font-medium flex items-center gap-2">
          <AlertCircle className="size-5" />
          Connection Error
        </AlertTitle>
        <AlertDescription className="mt-2 text-sm">
          We couldn't retrieve your datasets. This might be due to a network
          issue or an expired session.
        </AlertDescription>
      </Alert>

      <div className="mt-4.5">
        <Button
          variant="destructive"
          size="sm"
          onClick={onRetry}
          className="border-destructive/30 hover:bg-destructive/10"
        >
          Try Again
          <RefreshCw className="mr-2 h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
