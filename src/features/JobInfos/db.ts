import { db } from "@/drizzle/db";
import { jobInfoTable } from "@/drizzle/schema";
import { revalidateJobInfoCache } from "./dbCache";
import { eq } from "drizzle-orm";

export async function insertJobInfo(data: typeof jobInfoTable.$inferInsert) {
  const [newJobInfo] = await db.insert(jobInfoTable).values(data).returning({
    id: jobInfoTable.id,
    userId: jobInfoTable.userId,
  });
  revalidateJobInfoCache(newJobInfo);
  return newJobInfo;
}

export async function updateJobInfoInDb(
  id: string,
  data: Partial<typeof jobInfoTable.$inferInsert>
) {
  const [updatedJobInfo] = await db
    .update(jobInfoTable)
    .set(data)
    .where(eq(jobInfoTable.id, id))
    .returning({
      id: jobInfoTable.id,
      userId: jobInfoTable.userId,
    });
  revalidateJobInfoCache(updatedJobInfo);
  return updatedJobInfo;
}
