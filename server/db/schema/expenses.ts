import {
  numeric,
  index,
  serial,
  pgTable,
  varchar,
  timestamp,
  date,
} from "drizzle-orm/pg-core";

import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import z from "zod";

export const expensesTable = pgTable(
  "expenses",
  {
    id: serial().primaryKey(),
    userId: varchar({ length: 100 }).notNull(),
    title: varchar({ length: 255 }).notNull(),
    date: date().notNull(),
    amount: numeric({ precision: 12, scale: 2 }).notNull(),
    updatedAt: timestamp(),
    createdAt: timestamp().defaultNow().notNull(),
  },
  (expenses) => {
    return {
      userIndex: index("user_index").on(expenses.userId),
    };
  }
);

export const insertExpensesSchema = createInsertSchema(expensesTable);

export const selectExpensesSchema = createSelectSchema(expensesTable);
