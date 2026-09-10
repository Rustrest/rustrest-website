import type { ReactNode } from "react";

export interface DataTableColumn<T> {
  header: string;
  cell: (row: T) => ReactNode;
}

export function DataTable<T extends { id: string }>({
  columns,
  rows,
}: {
  columns: DataTableColumn<T>[];
  rows: T[];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-muted">
            {columns.map((col) => (
              <th key={col.header} className="px-4 py-3 font-medium">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-border last:border-0">
              {columns.map((col) => (
                <td key={col.header} className="px-4 py-3 text-foreground">
                  {col.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
