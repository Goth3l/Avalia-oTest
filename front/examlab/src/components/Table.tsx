import React from "react";

type TableProps = {
  columns: string[];
  emptyText?: string;
  children?: React.ReactNode;
};

export default function Table({ columns, emptyText = "Sem dados", children }: TableProps) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>{columns.map((c) => <th key={c}>{c}</th>)}</tr>
        </thead>
        <tbody>
          {children ?? (
            <tr>
              <td colSpan={columns.length} className="muted">{emptyText}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
