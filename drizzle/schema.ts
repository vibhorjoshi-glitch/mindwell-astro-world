import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const tarotReadings = mysqlTable("tarotReadings", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  question: varchar("question", { length: 500 }).notNull(),
  spread: varchar("spread", { length: 64 }).notNull(),
  cards: text("cards").notNull(),
  reading: text("reading").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type TarotReading = typeof tarotReadings.$inferSelect;
export type InsertTarotReading = typeof tarotReadings.$inferInsert;
