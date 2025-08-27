import { pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelper";
import { relations } from "drizzle-orm";
import { jobInfoTable } from "./jobInfo";
import { interviewTable } from "./interview";

export const questionLevels = ["Easy", "Medium", "Hard"] as const;
export type questionLevel = (typeof questionLevels)[number];
export const questionLevelEnum = pgEnum(
  "question_question_level",
  questionLevels
);
export const questionTable = pgTable("question", {
  id,
  createdAt,
  updatedAt,
  text: varchar("title").notNull(),
  questionLevel: questionLevelEnum("experience_level").notNull(),
  jobId: uuid()
    .references(() => jobInfoTable.id, { onDelete: "cascade" })
    .notNull(),
});
export const questionTableRelations = relations(
  questionTable,
  ({ one, many }) => ({
    job: one(jobInfoTable, {
      fields: [questionTable.jobId],
      references: [jobInfoTable.id],
    }),
    interview: many(interviewTable),
  })
);
