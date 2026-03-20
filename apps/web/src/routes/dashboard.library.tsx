import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarDays,
  Columns,
  FileText,
  MoreVertical,
  Plus,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useUploadModal } from "~/hooks/use-upload-modal";
import { formatDate } from "~/lib/utils";

export const Route = createFileRoute("/dashboard/library")({
  component: LibraryRouteComponent,
});

const dummyDatasets = [
  {
    _id: "69bd7e56f6db0afef3501f20",
    userId: "9ad889fa-1b93-4a2b-a011-3c2b49e4575c",
    fileName: "sample-data.xlsx",
    columns: [
      "Product Name",
      "Category",
      "Quantity Sold",
      "Revenue",
      "Sales Data",
    ],
    createdAt: "2026-03-20T17:05:26.447Z",
    updatedAt: "2026-03-20T17:05:26.447Z",
  },
  {
    _id: "69bd7e56f6db0afef3501f3d",
    userId: "9ad889fa-1b93-4a2b-a011-3c2b49e4575c",
    fileName: "sample-data.xlsx",
    columns: [
      "Product Name",
      "Category",
      "Quantity Sold",
      "Revenue",
      "Sales Data",
    ],
    createdAt: "2026-03-20T17:05:26.447Z",
    updatedAt: "2026-03-20T17:05:26.447Z",
  },
  {
    _id: "69bd7e56fefb0afef3501f20",
    userId: "9ad889fa-1b93-4a2b-a011-3c2b49e4575c",
    fileName: "sample-data.xlsx",
    columns: [
      "Product Name",
      "Category",
      "Quantity Sold",
      "Revenue",
      "Sales Data",
    ],
    createdAt: "2026-03-20T17:05:26.447Z",
    updatedAt: "2026-03-20T17:05:26.447Z",
  },
];

function LibraryRouteComponent() {
  const onOpen = useUploadModal((state) => state.onOpen);

  return (
    <div className="w-full space-y-8">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {dummyDatasets.map((file) => (
          <Card
            key={file._id}
            className="group hover:border-slate-400 transition-colors shadow-sm"
          >
            <CardContent className="px-4">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-primary-foreground rounded-lg">
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
                    <DropdownMenuItem>View Data</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mb-5">
                <h3
                  className="font-medium text-foreground truncate"
                  title={file.fileName}
                >
                  {file.fileName}
                </h3>
                <div className="flex items-center gap-1.5 mt-1.5 text-muted-foreground">
                  <CalendarDays className="size-4" />
                  <span className="text-sm font-mono font-medium">
                    {formatDate(file.createdAt)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3.5 border-t border-primary-foreground/20">
                <div className="flex items-center gap-2 text-accent-foreground">
                  <Columns className="size-4 opacity-70" />
                  <span className="text-xs font-medium font-mono">
                    {file.columns.length} Columns
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <button
          onClick={onOpen}
          className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-muted bg-muted/30 hover:bg-muted/50 hover:border-primary/50 transition-all group cursor-pointer"
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
