import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { wordsTable } from "./database_words";
import { categoryTable } from "./database_category";

export const nnWordsCatTable = pgTable("nn_words_cat", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  idWords: integer().references(() => wordsTable.id),
  idCat: integer().references(() => categoryTable.id)
});