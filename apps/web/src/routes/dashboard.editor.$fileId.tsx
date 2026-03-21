import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { RecordFormSidebar } from "~/components/record-form-sidebar";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

const DUMMY_RECORDS = [
  {
    id: 1,
    date: "2026-03-01",
    product: "Pro Glow Headphones",
    category: "Audio",
    qty: 142,
    revenue: "$14,200",
  },
  {
    id: 2,
    date: "2026-03-02",
    product: "Smart Watch v2",
    category: "Wearables",
    qty: 89,
    revenue: "$26,700",
  },
  {
    id: 3,
    date: "2026-03-03",
    product: "UltraClean Air Purifier",
    category: "Home",
    qty: 56,
    revenue: "$16,800",
  },
  {
    id: 4,
    date: "2026-03-04",
    product: 'NovaPad Tablet 12"',
    category: "Electronics",
    qty: 203,
    revenue: "$60,900",
  },
  {
    id: 5,
    date: "2026-03-05",
    product: "ErgoFlex Standing Desk",
    category: "Furniture",
    qty: 34,
    revenue: "$17,000",
  },
  {
    id: 6,
    date: "2026-03-06",
    product: "CloudBuds Wireless",
    category: "Audio",
    qty: 178,
    revenue: "$8,900",
  },
  {
    id: 7,
    date: "2026-03-07",
    product: "Zen Diffuser Pro",
    category: "Home",
    qty: 67,
    revenue: "$3,350",
  },
  {
    id: 8,
    date: "2026-03-08",
    product: "FitBand Ultra",
    category: "Wearables",
    qty: 245,
    revenue: "$24,500",
  },
  {
    id: 9,
    date: "2026-03-09",
    product: "PowerDock 5-in-1",
    category: "Electronics",
    qty: 112,
    revenue: "$5,600",
  },
  {
    id: 10,
    date: "2026-03-10",
    product: "LumiDesk Lamp",
    category: "Furniture",
    qty: 91,
    revenue: "$4,550",
  },
];

export const Route = createFileRoute("/dashboard/editor/$fileId")({
  component: EditorRouteComponent,
});

function EditorRouteComponent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const handleAdd = () => {
    setSelectedRecord(null);
    setIsSidebarOpen(true);
  };

  const handleEdit = (record: any) => {
    setSelectedRecord(record);
    setIsSidebarOpen(true);
  };

  return (
    <div className="w-full h-full space-y-6">
      <div className="flex items-center justify-between pb-2">
        <span className="text-sm font-medium text-muted-foreground">
          {DUMMY_RECORDS.length} records
        </span>

        <Button onClick={handleAdd} className="cursor-pointer">
          <Plus className="size-4" /> Add Record
        </Button>
      </div>

      <div className="border border-border/40 rounded-xl bg-card overflow-hidden shadow-sm">
        <Table className="w-full" table-fixed>
          <TableHeader>
            <TableRow className="border-border/40 hover:bg-transparent">
              <TableHead className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-5">
                Date
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-5">
                Product
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-5">
                Category
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-5">
                Qty
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-5">
                Revenue
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-widest text-muted-foreground text-right px-5">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DUMMY_RECORDS.map((record) => (
              <TableRow
                key={record.id}
                className="border-border/20 hover:bg-muted/10 transition-colors"
              >
                <TableCell className="text-sm text-muted-foreground font-medium px-5">
                  {record.date}
                </TableCell>
                <TableCell className="text-sm text-foreground px-5">
                  {record.product}
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-primary/10 text-primary border border-primary/20">
                    {record.category}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-foreground font-medium px-5">
                  {record.qty}
                </TableCell>
                <TableCell className="text-sm text-foreground font-medium px-5">
                  {record.revenue}
                </TableCell>
                <TableCell className="text-right px-5">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      onClick={() => handleEdit(record)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
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
        editData={selectedRecord}
      />
    </div>
  );
}
