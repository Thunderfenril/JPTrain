import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { wordsTable } from "./database_mots";
import { categoryTable } from "./database_category";

export const usersTable = pgTable("katakana", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  idKanji: integer().references(() => wordsTable.id),
  idCat: integer().references(() => categoryTable.id)
});