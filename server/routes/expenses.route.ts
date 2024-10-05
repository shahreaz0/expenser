import { Hono } from "hono";

export const expensesRoute = new Hono();

expensesRoute.get("/", (c) => {
  return c.json({ type: "expenses get route" });
});

expensesRoute.post("/", (c) => {
  return c.json({ type: "expenses post route" });
});

expensesRoute.put("/", (c) => {
  return c.json({ type: "expenses put route" });
});

expensesRoute.delete("/", (c) => {
  return c.json({ type: "expenses delete route" });
});
