import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelper";
import { jobInfoTable } from "./jobInfo";
import { relations } from "drizzle-orm";

export const interviewTable = pgTable("interview", {
  id,
  createdAt,
  updatedAt,
  jobId: uuid()
    .references(() => jobInfoTable.id, { onDelete: "cascade" })
    .notNull(),
  duration: varchar().notNull(),
  humChartId: varchar(),
  feedback: varchar(),
});

export const interviewTableRelations = relations(interviewTable, ({ one }) => ({
  job: one(jobInfoTable, {
    fields: [interviewTable.jobId],
    references: [jobInfoTable.id],
  }),
}));
