import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

interface DataTableProps {
  columns: string[];
  data: Record<string, any>[];
}

export function DataTable({ columns, data }: DataTableProps) {
  if (!columns.length) {
    return null;
  }

  return (
    <div className="rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border/50 bg-muted/5">
            {columns.map((col) => (
              <TableHead
                key={col}
                className="text-xs font-semibold uppercase tracking-widest text-muted-foreground whitespace-nowrap"
              >
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center py-8 text-muted-foreground"
              >
                No records found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, idx) => (
              <TableRow
                key={row._id || idx.toString()}
                className="border-border/40 hover:bg-muted/30 transition-colors"
              >
                {columns.map((col) => (
                  <TableCell
                    key={col}
                    className="font-medium text-sm text-foreground"
                  >
                    {row[col] ?? "-"}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
