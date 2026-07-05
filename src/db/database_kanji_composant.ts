import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { kanjiTable } from "./database_kanji";

export const kanjiComposantTable = pgTable("kanji_composant", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  idKanjiParent: integer().references(() => kanjiTable.id),
  idKanjiEnfant: integer().references(() => kanjiTable.id),
  ordre: integer().notNull(),
  position: varchar({ length: 30 }).notNull()
});