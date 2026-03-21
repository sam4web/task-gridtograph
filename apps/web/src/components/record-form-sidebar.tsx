import { useForm } from "@tanstack/react-form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";

interface RecordFormSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  columns: string[];
  initialData?: Record<string, any> | null;
  onSubmit: (data: Record<string, any>) => void;
  isSubmitting?: boolean;
}

export function RecordFormSidebar({
  isOpen,
  onClose,
  columns,
  initialData,
  onSubmit,
  isSubmitting,
}: RecordFormSidebarProps) {
  const form = useForm({
    defaultValues: (initialData ||
      Object.fromEntries(columns.map((col) => [col, ""]))) as Record<
      string,
      any
    >,
    onSubmit: async ({ value }) => {
      onSubmit(value);
      onClose();
    },
  });

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md border-l border-border/50 bg-background/95 backdrop-blur-xl p-6 flex flex-col gap-6">
        <SheetHeader className="text-left space-y-1 px-0">
          <SheetTitle className="text-xl font-semibold text-foreground">
            {initialData ? "Edit Record" : "Add New Record"}
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            {initialData
              ? "Update the details of this record."
              : "Enter new record details."}
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          {columns.map((column) => (
            <form.Field key={column} name={column as any}>
              {(field) => (
                <div className="space-y-2">
                  <Label className="capitalize">
                    {column.replace(/_/g, " ")}
                  </Label>
                  <Input
                    name={field.name}
                    value={(field.state.value as string | number) ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={`Enter ${column}...`}
                  />
                </div>
              )}
            </form.Field>
          ))}

          <div className="flex gap-2 pt-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Record"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
