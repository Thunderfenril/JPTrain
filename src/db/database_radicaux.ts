import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const radicalTable = pgTable("radical", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  radical: varchar({ length: 255 }).notNull(),
  signification: varchar({ length: 255 }).notNull()
});