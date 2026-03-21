import { FILE_UPLOAD_CONSTANTS } from "@repo/shared";
import { useForm } from "@tanstack/react-form";
import { FileSpreadsheet, Loader2, UploadCloud, X } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { useUploadDataset } from "~/hooks/use-dataset";

interface UploadModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UploadDatasetsModal({
  isOpen,
  onOpenChange,
}: UploadModalProps) {
  const uploadMutation = useUploadDataset();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    defaultValues: {
      dataset: null as File | null,
    },
    onSubmit: async ({ value }) => {
      if (!value.dataset) {
        toast.error("Please select a file first");
        return;
      }
      await uploadMutation.mutateAsync(value.dataset);
      form.reset();
      onOpenChange(isOpen);
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-150 p-0 overflow-hidden border-none shadow-2xl">
        <div className="p-8 space-y-6 bg-background">
          <DialogHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold tracking-tight text-foreground">
                Upload Dataset
              </DialogTitle>
            </div>
            <DialogDescription className="text-muted-foreground">
              Select a single .csv or .xlsx file to process.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-6 mt-4"
          >
            <form.Field
              name="dataset"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return undefined;
                  if (value.size > FILE_UPLOAD_CONSTANTS.MAX_SIZE_BYTES) {
                    return `File is too large (Max ${FILE_UPLOAD_CONSTANTS.MAX_SIZE_MB}MB)`;
                  }
                  if (
                    !FILE_UPLOAD_CONSTANTS.ACCEPTED_FILE_TYPES.includes(
                      value.type as any,
                    )
                  ) {
                    return "Unsupported file format";
                  }
                  return undefined;
                },
              }}
              children={(field) => (
                <div className="space-y-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept={FILE_UPLOAD_CONSTANTS.ACCEPT_STR}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) field.handleChange(file);
                    }}
                  />

                  {!field.state.value ? (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className={`w-full flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-xl transition-all
                                  bg-muted/20 hover:bg-muted/30 border-muted hover:border-primary/50
                                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                                  ${field.state.meta.errors.length ? "border-destructive bg-destructive/5" : ""}`}
                    >
                      <div className="mb-4 p-4 rounded-full bg-primary/10 text-primary">
                        <UploadCloud className="size-7" />
                      </div>
                      <p className="text-base font-medium text-foreground">
                        Click to{" "}
                        <span className="text-primary underline underline-offset-4 font-bold">
                          browse
                        </span>{" "}
                        your files
                      </p>
                      <p className="text-xs text-muted-foreground mt-2 uppercase tracking-widest font-medium">
                        {FILE_UPLOAD_CONSTANTS.MAX_SIZE_MB}MB Limit
                      </p>
                    </button>
                  ) : (
                    <div className="flex items-center gap-4 p-4 rounded-lg border border-primary/20 bg-primary/5">
                      <div className="p-2 bg-primary/10 rounded">
                        <FileSpreadsheet className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-semibold truncate text-foreground mb-1">
                          {field.state.value.name}
                        </p>
                        <p className="text-xs font-medium text-muted-foreground">
                          {(field.state.value.size / (1024 * 1024)).toFixed(2)}{" "}
                          MB
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="hover:text-destructive hover:bg-destructive/10"
                        onClick={() => {
                          field.handleChange(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm font-sefont-semibold text-destructive px-1 animate-in fade-in slide-in-from-top-1">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              )}
            />

            <div className="max-w-50 flex items-center gap-2 ml-auto">
              <DialogClose asChild>
                <Button type="button" variant={"outline"} className="flex-1">
                  Cancel
                </Button>
              </DialogClose>

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit || !form.getFieldValue("dataset")}
                    className="flex-1"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Confirm Upload"
                    )}
                  </Button>
                )}
              />
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
