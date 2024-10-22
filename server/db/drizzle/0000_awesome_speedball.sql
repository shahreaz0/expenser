CREATE TABLE IF NOT EXISTS "expenses" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" varchar(100) NOT NULL,
	"title" varchar(255) NOT NULL,
	"amount" numeric(12, 2) NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_index" ON "expenses" USING btree ("userId");