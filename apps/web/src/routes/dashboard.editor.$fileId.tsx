import { createFileRoute, useParams } from "@tanstack/react-router";
import { ArrowRight, Pencil, Plus, RefreshCw, Trash2 } from "lucide-react";
import { useState } from "react";
import { DatasetErrorState } from "~/components/dataset-error-state";
import { DeleteRecordModal } from "~/components/delete-record-modal";
import { RecordFormSidebar } from "~/components/record-form-sidebar";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  useAddRow,
  useDeleteRow,
  useGetDatasetById,
  useUpdateRow,
} from "~/hooks/use-dataset";

export const Route = createFileRoute("/dashboard/editor/$fileId")({
  component: EditorRouteComponent,
});

function EditorRouteComponent() {
  const { fileId } = useParams({ from: "/dashboard/editor/$fileId" });

  const {
    data: dataset,
    isLoading,
    isError,
    refetch,
  } = useGetDatasetById(fileId);
  const addRow = useAddRow(fileId!);
  const updateRow = useUpdateRow(fileId!);
  const deleteRow = useDeleteRow(fileId!);

  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Record<
    string,
    any
  > | null>(null);

  if (isLoading) {
    return <EditorTableSkeletonComponent />;
  }

  if (isError) {
    return (
      <DatasetErrorState
        title="Failed to load editor"
        description="An error occurred while fetching the dataset records. Please check your connection and try again."
        action={{
          type: "button",
          label: "Retry Loading",
          onClick: () => refetch(),
          icon: RefreshCw,
        }}
      />
    );
  }

  if (!dataset) {
    return (
      <DatasetErrorState
        title="Dataset Not Found"
        description="The dataset you're trying to edit doesn't exist or may have been moved."
        action={{
          type: "link",
          label: "Return to Library",
          to: "/dashboard/library",
          icon: ArrowRight,
        }}
      />
    );
  }

  const handleOpenAdd = () => {
    setSelectedRecord(null);
    setIsSidebarOpen(true);
  };

  const handleOpenEdit = (record: Record<string, any>) => {
    setSelectedRecord(record);
    setIsSidebarOpen(true);
  };

  const confirmDelete = () => {
    if (!deleteTarget?._id) return;
    deleteRow.mutate(deleteTarget._id, {
      onSuccess: () => {
        setDeleteTarget(null);
      },
    });
  };

  const handleFormSubmit = (formData: Record<string, any>) => {
    console.log(selectedRecord);
    if (selectedRecord?._id) {
      updateRow.mutate({
        rowId: selectedRecord._id,
        data: formData,
      });
    } else {
      addRow.mutate(formData);
    }
  };

  return (
    <div className="w-full h-full space-y-6">
      <div className="flex items-center justify-between pb-2">
        <span className="text-sm font-medium text-muted-foreground">
          {dataset.data.length} records
        </span>

        <Button onClick={handleOpenAdd} className="cursor-pointer">
          <Plus className="size-4" /> Add Record
        </Button>
      </div>

      <div className="border border-border/40 rounded-xl bg-card overflow-hidden shadow-sm">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              {dataset.columns.map((col) => (
                <TableHead
                  key={col}
                  className="text-xs font-semibold capitalize tracking-widest text-muted-foreground text-left px-5"
                >
                  {col}
                </TableHead>
              ))}
              <TableHead className="text-xs font-semibold capitalize tracking-widest text-muted-foreground text-center px-5 w-[10%]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {dataset.data.map((row, idx) => (
              <TableRow
                key={idx.toString()}
                className="border-border/20 hover:bg-muted/10 transition-colors"
              >
                {dataset.columns.map((col) => (
                  <TableCell key={col} className="px-5">
                    {row[col] ?? "-"}
                  </TableCell>
                ))}
                <TableCell className="text-sm text-muted-foreground font-medium px-5">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-muted-foreground hover:text-foreground cursor-pointer"
                      onClick={() => handleOpenEdit(row)}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-muted-foreground hover:text-destructive cursor-pointer"
                      onClick={() => setDeleteTarget(row)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <RecordFormSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        columns={dataset.columns}
        initialData={selectedRecord}
        onSubmit={handleFormSubmit}
        isSubmitting={addRow.isPending || updateRow.isPending}
      />

      <DeleteRecordModal
        isOpen={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        onConfirm={confirmDelete}
        isPending={deleteRow.isPending}
      />
    </div>
  );
}

function EditorTableSkeletonComponent() {
  const skeletonRows = Array.from({ length: 8 });
  const skeletonCols = Array.from({ length: 5 });

  return (
    <div className="w-full h-full space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between pb-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
      <div className="border border-border/40 rounded-xl bg-card overflow-hidden shadow-sm">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              {skeletonCols.map((_, i) => (
                <TableHead key={i} className="px-5">
                  <Skeleton className="h-3 w-20" />
                </TableHead>
              ))}
              <TableHead className="w-[10%] px-5">
                <div className="flex justify-center">
                  <Skeleton className="h-3 w-12" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skeletonRows.map((_, rowIndex) => (
              <TableRow key={rowIndex.toString()} className="border-border/20">
                {skeletonCols.map((_, colIndex) => (
                  <TableCell key={colIndex.toString()} className="px-5 py-4">
                    <Skeleton className="h-4 w-full max-w-30" />
                  </TableCell>
                ))}
                <TableCell className="px-5">
                  <div className="flex items-center justify-end gap-2">
                    <Skeleton className="size-8 rounded-md" />
                    <Skeleton className="size-8 rounded-md" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
