import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Ellipsis } from "lucide-react";
import { useDeleteExpense } from "@/hooks/rq/expenses/use-delete-expense";
import { Dispatch, SetStateAction } from "react";

export function ExpensesTableActions({
  rowId,
  deletedRowIds,
  setDeletedRowIds,
}: {
  rowId: number;
  deletedRowIds: number[];
  setDeletedRowIds: Dispatch<SetStateAction<number[]>>;
}) {
  const { mutate: deleteExpense, isPending } = useDeleteExpense();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Ellipsis className="size-4 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem
          disabled={deletedRowIds.includes(rowId) && isPending}
          className="text-red-500"
          onClick={() => {
            setDeletedRowIds((prev) => [...prev, rowId]);
            deleteExpense(rowId);
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
