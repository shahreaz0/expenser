import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

export function App() {
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    async function getTotalExpenses() {
      try {
        const resp = await fetch("/api/v1/expenses/total");
        const total = await resp.json();

        setTotalExpenses(total.data);
      } catch (error) {
        console.log({ error });
      }
    }

    getTotalExpenses();
  }, []);

  return (
    <section className="m-10">
      <Card className="mx-auto w-1/4">
        <CardHeader>
          <CardTitle>Total Expenses</CardTitle>
          <CardDescription>Your monthly total expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{totalExpenses}</p>
        </CardContent>
      </Card>
    </section>
  );
}
