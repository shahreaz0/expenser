import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";

import { db } from "../db";
import { expensesTable } from "../db/schema/expenses";
import { getUser } from "../configs/kinde";
import { and, desc, eq, sum } from "drizzle-orm";
import { createExpenseSchema } from "../types/expenses";

export const expensesRoute = new Hono()
  .get("/", getUser, async (c) => {
    const user = c.var.user;

    const expenses = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .orderBy(desc(expensesTable.createdAt))
      .limit(100);

    return c.json({ data: expenses });
  })
  .get("/:id{[0-9]+}", getUser, async (c) => {
    if (!c.req.param("id")) {
      throw new HTTPException(400, {
        message: "Invalid ID",
      });
    }

    const user = c.var.user;
    const id = +c.req.param("id");

    const expense = await db
      .select()
      .from(expensesTable)
      .where(and(eq(expensesTable.userId, user.id), eq(expensesTable.id, id)))
      .then((res) => res[0]);

    return c.json({
      message: "Success",
      data: expense,
    });
  })
  .get("/total", getUser, async (c) => {
    const user = c.var.user;

    const expense = await db
      .select({ total: sum(expensesTable.amount) })
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .then((res) => res[0]);

    return c.json({
      message: "Success",
      data: expense.total,
    });
  })
  .post("/", zValidator("json", createExpenseSchema), getUser, async (c) => {
    const expenseBody = c.req.valid("json");

    const user = c.var.user;

    const expense = await db
      .insert(expensesTable)
      .values({
        ...expenseBody,
        userId: user.id,
      })
      .returning();

    return c.json({ message: "Success", data: expense });
  })
  .put(
    "/:id{[0-9]+}",
    zValidator("json", createExpenseSchema.partial()),
    getUser,
    async (c) => {
      const id = c.req.param("id");
      const expenseBody = c.req.valid("json");

      const user = c.var.user;

      const expense = await db
        .update(expensesTable)
        .set({
          ...expenseBody,
        })
        .where(and(eq(expensesTable.userId, user.id), eq(expensesTable.id, +id)));

      return c.json({ message: "Success", data: expense });
    }
  )
  .delete("/:id{[0-9]+}", getUser, async (c) => {
    const id = c.req.param("id");

    // if (expenseIndex === -1) {
    //   throw new HTTPException(404, {
    //     message: "Expense not found",
    //   });
    // }

    const user = c.var.user;

    const expense = await db
      .delete(expensesTable)
      .where(and(eq(expensesTable.userId, user.id), eq(expensesTable.id, +id)))
      .returning()
      .then((res) => res[0]);

    return c.json({ message: "Success", data: expense });
  });
