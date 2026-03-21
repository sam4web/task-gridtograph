import { AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

interface DeleteRecordModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isPending: boolean;
}

export function DeleteRecordModal({
  isOpen,
  onOpenChange,
  onConfirm,
  isPending,
}: DeleteRecordModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-112.5 p-0 overflow-hidden border-none shadow-2xl">
        <div className="p-8 space-y-6 bg-background">
          <DialogHeader className="space-y-0.5">
            <DialogTitle className="flex items-center gap-2">
              <div className="flex items-center justify-center size-8 rounded-full bg-destructive/10">
                <AlertTriangle className="size-4.5 text-destructive" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                Delete Record
              </span>
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              Are you sure you want to delete this record? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-row gap-2 ml-auto max-w-50 pt-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant={"outline"}
                className="flex-1 cursor-pointer"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={onConfirm}
              disabled={isPending}
              className="flex-1 cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Record"
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
