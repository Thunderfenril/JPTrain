import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { kanjiTable } from "./database_kanji";
import { categoryTable } from "./database_category";

export const usersTable = pgTable("katakana", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  idKanji: integer().references(() => kanjiTable.id),
  idCat: integer().references(() => categoryTable.id)
});