import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("hiragana", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  hiragana: varchar({ length: 2 }).notNull(),
  latin: varchar({ length: 3 }).notNull()
});