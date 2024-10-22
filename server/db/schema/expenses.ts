import { numeric, index, serial, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const expensesTable = pgTable(
  "expenses",
  {
    id: serial().primaryKey(),
    userId: varchar({ length: 100 }).notNull(),
    title: varchar({ length: 255 }).notNull(),
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
