import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("katakana", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  katakana: varchar({ length: 2 }).notNull(),
  latin: varchar({ length: 3 }).notNull()
});