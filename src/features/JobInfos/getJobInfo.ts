import { db } from "@/drizzle/db";
import { jobInfoTable } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { getJobInfoIdTag } from "./dbCache";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

export async function getJobInfo(id: string, userId: string) {
  "use cache";
  cacheTag(getJobInfoIdTag(id));
  return db.query.jobInfoTable.findFirst({
    where: and(eq(jobInfoTable.id, id), eq(jobInfoTable.userId, userId)),
  });
}
