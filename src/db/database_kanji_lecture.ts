import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { kanjiTable } from "./database_kanji";

export const kanjiLectureTable = pgTable("kanji_lecture", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  idKanji: integer().references(() => kanjiTable.id),
  type: varchar({length: 10}).notNull(),
  lecture: varchar({length:255}).notNull()
});