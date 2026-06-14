import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("katakana", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  kanji: varchar({ length: 255 }).notNull(),
  kunyomi: varchar({ length: 255 }),
  onyomi: varchar({ length: 255 }),
  traduction: varchar({ length: 255 }).notNull(),
  mnemotechnique: varchar({ length: 255 }).notNull(),
  information: varchar({ length: 32672 }).notNull(),
  type: varchar({ length: 32672 }).notNull()
});