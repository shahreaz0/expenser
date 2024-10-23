import { insertExpensesSchema } from "../db/schema/expenses";
import { z } from "zod";

export const createExpenseSchema = insertExpensesSchema.omit({
  userId: true,
  createdAt: true,
  id: true,
  updatedAt: true,
});

export type CreateExpense = z.infer<typeof createExpenseSchema>;
