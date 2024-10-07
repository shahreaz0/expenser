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

export function ExpensesTable() {
  const { data: expenseList, isLoading } = useGetExpenseList();

  console.log(expenseList);

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
                </TableRow>
              ))}
          </>
        ) : (
          <>
            {expenseList?.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{expense.id}</TableCell>
                <TableCell className="font-medium">{expense.title}</TableCell>
                <TableCell>{expense.amount}</TableCell>
              </TableRow>
            ))}
          </>
        )}
      </TableBody>
    </Table>
  );
}
