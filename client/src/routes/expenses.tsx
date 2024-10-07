import { createFileRoute } from "@tanstack/react-router";

import { ExpensesTable } from "@/components/expenses/expenses-table";
import { ExpensesUpsertDialog } from "@/components/expenses/expenses-upsert-dialog";
import { Button } from "@/components/ui/button";
import { useExpenseStore } from "@/store/expenses";

export const Route = createFileRoute("/expenses")({
  component: Expenses,
});

function Expenses() {
  const { setIsExpensesDialogOpen } = useExpenseStore();

  function openExpensesDialog() {
    setIsExpensesDialogOpen(true);
  }

  return (
    <section className="m-8 w-1/2 mx-auto">
      <div className="text-end">
        <Button size="sm" variant="outline" className="mb-4" onClick={openExpensesDialog}>
          Create Expense
        </Button>
      </div>

      <ExpensesTable />

      <ExpensesUpsertDialog />
    </section>
  );
}
