import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const wordsTable = pgTable("katakana", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  mots: varchar({ length: 255 }).notNull(),
  traduction: varchar({ length: 255 }).notNull(),
  mnemotechnique: varchar({ length: 255 }).notNull(),
  information: varchar({ length: 32672 }).notNull()
});