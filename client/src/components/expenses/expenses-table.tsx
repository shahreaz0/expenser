import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useGetExpenseList } from "@/hooks/rq/expenses/use-get-expense-list";
import { Skeleton } from "../ui/skeleton";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ExpensesTableActions } from "./expenses-table-actions";

export function ExpensesTable() {
  const { data: expenseList, isLoading } = useGetExpenseList();

  const [rowIds, setRowIds] = useState([] as number[]);

  return (
    <Table>
      <TableCaption>A list of your recent expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <>
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                </TableRow>
              ))}
          </>
        ) : (
          <>
            {expenseList?.map((expense) => (
              <TableRow
                key={expense.id}
                className={cn(rowIds.includes(expense.id) && "text-gray-400")}
              >
                <TableCell className="font-medium">{expense.id}</TableCell>
                <TableCell className="font-medium">{expense.title}</TableCell>
                <TableCell>{expense.amount}</TableCell>
                <TableCell>
                  <ExpensesTableActions
                    rowId={expense.id}
                    deletedRowIds={rowIds}
                    setDeletedRowIds={setRowIds}
                  />
                </TableCell>
              </TableRow>
            ))}
          </>
        )}
      </TableBody>
    </Table>
  );
}
