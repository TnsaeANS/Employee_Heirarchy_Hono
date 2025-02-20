import { sql } from "drizzle-orm";
import { boolean } from "drizzle-orm/mysql-core";
import { int, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const positionTable = sqliteTable(
  "positions",
  {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    parentId: int().notNull().default(0),
    createdAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  
);

export type User = typeof positionTable.$inferSelect;
export type InsertUser = typeof positionTable.$inferInsert;