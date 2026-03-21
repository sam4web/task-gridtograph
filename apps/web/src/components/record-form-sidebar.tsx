import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";

interface RecordFormSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  editData?: any;
}

export function RecordFormSidebar({
  isOpen,
  onClose,
  editData,
}: RecordFormSidebarProps) {
  const isEditing = !!editData;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md border-l border-border/50 bg-background/95 backdrop-blur-xl p-6 flex flex-col gap-6">
        <SheetHeader className="text-left space-y-1 px-0">
          <SheetTitle className="text-xl font-semibold text-foreground">
            {isEditing ? "Edit Record" : "Add Record"}
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            {isEditing
              ? "Update the details of this sales record."
              : "Enter new sales record details."}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-5 py-4">
          <div className="space-y-2">
            <Label
              htmlFor="product"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
            >
              Product Name
            </Label>
            <Input
              id="product"
              placeholder="e.g. Pro Glow Headphones"
              className="bg-muted/20 border-border/50 focus-visible:ring-primary"
              defaultValue={editData?.product || ""}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="category"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
            >
              Category
            </Label>
            <Select defaultValue={editData?.category?.toLowerCase() || ""}>
              <SelectTrigger className="bg-muted/20 border-border/50 focus:ring-primary">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="audio">Audio</SelectItem>
                <SelectItem value="wearables">Wearables</SelectItem>
                <SelectItem value="home">Home</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="quantity"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
            >
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              placeholder="0"
              className="bg-muted/20 border-border/50 focus-visible:ring-primary"
              defaultValue={editData?.qty || ""}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="revenue"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
            >
              Revenue ($)
            </Label>
            <Input
              id="revenue"
              type="number"
              step="0.01"
              placeholder="0.00"
              className="bg-muted/20 border-border/50 focus-visible:ring-primary"
              defaultValue={editData?.revenue?.replace(/[^0-9.-]+/g, "") || ""}
            />
          </div>
        </div>

        <SheetFooter className="flex flex-row sm:justify-start gap-2 mt-auto">
          <Button
            className="bg-primary text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.3)] hover:shadow-[0_0_20px_rgba(var(--primary),0.5)] transition-all"
            onClick={onClose}
          >
            Save Changes
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            Cancel
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
