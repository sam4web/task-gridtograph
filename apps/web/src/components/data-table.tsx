import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export function DataTable({ data }: { data: any[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-border/50">
          <TableHead className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Product Name
          </TableHead>
          <TableHead className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Category
          </TableHead>
          <TableHead className="text-xs font-semibold uppercase tracking-widest text-right text-muted-foreground">
            Revenue
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, idx) => (
          <TableRow
            key={idx.toString()}
            className="border-border/40 hover:bg-muted/30 transition-colors"
          >
            <TableCell className="font-medium text-sm text-foreground">
              {item.name}
            </TableCell>
            <TableCell>
              <span className="px-2 py-0.5 rounded bg-muted text-[10px] font-bold text-muted-foreground uppercase">
                {item.category}
              </span>
            </TableCell>
            <TableCell className="text-right font-bold text-sm text-foreground">
              ${item.revenue.toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
