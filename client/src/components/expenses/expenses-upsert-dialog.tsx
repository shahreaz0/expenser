import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useExpenseStore } from "@/store/expenses";
import { ExpensesUpsertForm } from "./expenses-upsert-form";

export function ExpensesUpsertDialog() {
  const { isExpensesDialogOpen, setIsExpensesDialogOpen } = useExpenseStore();

  return (
    <Dialog open={isExpensesDialogOpen} onOpenChange={setIsExpensesDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Expenses</DialogTitle>
          <DialogDescription>
            Fill the necessary field to create expense.
          </DialogDescription>

          <ExpensesUpsertForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
