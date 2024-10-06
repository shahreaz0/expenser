import { Hono } from "hono";
import z from "zod";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";

const expenseSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(3).max(100),
  amount: z.number().positive(),
});

const expenseCreateSchema = expenseSchema.omit({ id: true });

const expenseUpdateSchema = expenseSchema.partial().omit({ id: true });

const fakeExpenses = [
  {
    id: 1,
    title: "Groceries",
    amount: 200.0,
  },
  {
    id: 2,
    title: "Car",
    amount: 1000.0,
  },
  {
    id: 3,
    title: "Food",
    amount: 500.0,
  },
];

export const expensesRoute = new Hono()
  .get("/", (c) => {
    return c.json({ data: fakeExpenses });
  })
  .get("/:id{[0-9]+}", (c) => {
    if (!c.req.param("id")) {
      throw new HTTPException(400, {
        message: "Invalid ID",
      });
    }

    return c.json({
      message: "Success",
      data: fakeExpenses.find((expense) => expense.id === +c.req.param("id")),
    });
  })
  .get("/total", (c) => {
    return c.json({
      message: "Success",
      data: fakeExpenses.reduce((acc, cur) => acc + cur.amount, 0),
    });
  })
  .post("/", zValidator("json", expenseCreateSchema), (c) => {
    const expenses = c.req.valid("json");

    fakeExpenses.push({ id: fakeExpenses.length + 1, ...expenses });

    c.status(201);
    return c.json({ message: "Success", data: expenses });
  })
  .put("/:id{[0-9]+}", zValidator("json", expenseUpdateSchema), (c) => {
    const id = c.req.param("id");

    const expense = fakeExpenses.find((expense) => expense.id === +id);

    return c.json({ message: "Success", data: expense || [] });
  })
  .delete("/:id{[0-9]+}", (c) => {
    const id = c.req.param("id");

    const expenseIndex = fakeExpenses.findIndex((expense) => expense.id === +id);
    const expense = fakeExpenses.find((expense) => expense.id === +id);

    if (expenseIndex === -1) {
      throw new HTTPException(404, {
        message: "Expense not found",
      });
    }

    fakeExpenses.splice(expenseIndex, 1);

    return c.json({ message: "Success", data: expense });
  });
