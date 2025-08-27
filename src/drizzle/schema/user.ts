import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelper";
import { relations } from "drizzle-orm";
import { jobInfoTable } from "./jobInfo";

export const UserTable = pgTable("user", {
  id: varchar().primaryKey(),
  name: varchar().notNull(),
  email: varchar().notNull(),
  imageUrl: varchar().notNull(),
  createdAt,
  updatedAt,
});
export const userRelations = relations(UserTable, ({ many }) => ({
  jobInfos: many(jobInfoTable),
}));
