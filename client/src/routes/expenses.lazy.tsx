import { createLazyFileRoute } from "@tanstack/react-router";

import { ExpensesTable } from "@/components/expenses/expenses-table";

export const Route = createLazyFileRoute("/expenses")({
  component: Expenses,
});

function Expenses() {
  return (
    <section className="m-8 w-1/2 mx-auto">
      <ExpensesTable />
    </section>
  );
}
