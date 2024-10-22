import { pgTable, index, serial, varchar, numeric } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"




export const expenses = pgTable("expenses", {
	id: serial().primaryKey().notNull(),
	userId: varchar({ length: 100 }).notNull(),
	title: varchar({ length: 255 }).notNull(),
	amount: numeric({ precision: 12, scale:  2 }).notNull(),
},
(table) => {
	return {
		userIdx: index("user_index").using("btree", table.userId.asc().nullsLast()),
	}
});
