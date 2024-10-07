import { createLazyFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useGetTotalExpenses } from "@/hooks/rq/expenses/use-get-total-expense";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { data: totalExpenses, isLoading } = useGetTotalExpenses();

  return (
    <section className="m-10">
      <Card className="mx-auto w-1/4">
        <CardHeader>
          <CardTitle>Total Expenses</CardTitle>
          <CardDescription>Your monthly total expenses</CardDescription>
        </CardHeader>
        <CardContent>{isLoading ? <p>...</p> : <p>{totalExpenses?.data}</p>}</CardContent>
      </Card>
    </section>
  );
}
