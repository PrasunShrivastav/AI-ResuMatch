import { pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelper";
import { UserTable } from "./user";
import { relations } from "drizzle-orm";
import { questionTable } from "./question";

export const experienceLevels = ["Intern", "Entry", "Mid", "Senior"] as const;
export type ExperienceLevel = (typeof experienceLevels)[number];
export const experienceLevelEnum = pgEnum(
  "Job_Info_Experience_level",
  experienceLevels
);
export const jobInfoTable = pgTable("job_Info", {
  id,
  createdAt,
  updatedAt,
  name: varchar().notNull(),
  title: varchar("title"),
  experienceLevel: experienceLevelEnum("experience_level").notNull(),
  description: varchar("description").notNull(),
  userId: varchar()
    .references(() => UserTable.id, { onDelete: "cascade" })
    .notNull(),
});
export const jobInfoRelations = relations(jobInfoTable, ({ one, many }) => ({
  user: one(UserTable, {
    fields: [jobInfoTable.userId],
    references: [UserTable.id],
  }),
  questions: many(questionTable),
}));
