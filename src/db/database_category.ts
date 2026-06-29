import { boolean, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const categoryTable = pgTable("katakana", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 15 }).notNull(),
  on: boolean().default(true)
});