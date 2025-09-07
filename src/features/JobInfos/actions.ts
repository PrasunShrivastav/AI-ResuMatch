"use server";

import z from "zod";
import { redirect } from "next/navigation";
import { db } from "@/drizzle/db";
import { and, eq } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { getJobInfoIdTag } from "./dbCache";
import { getCurrentUser } from "@/services/clerk/lib/user";
import { JobInfoFormSchema } from "./JobInfoFormSchema";
import { jobInfoTable } from "@/drizzle/schema";
import { insertJobInfo, updateJobInfoInDb } from "./db";

async function validateJobInfoData(
  givenData: z.infer<typeof JobInfoFormSchema>
) {
  const { userId } = await getCurrentUser();
  if (userId == null) {
    return {
      error: true,
      message: "You don't have permission to do this",
    } as const;
  }
  const { success, data } = JobInfoFormSchema.safeParse(givenData);
  if (!success) {
    return {
      error: true,
      message: "Invalid job data",
    } as const;
  }
  return { error: false, userId, data } as const;
}
export async function createJobInfo(
  givenData: z.infer<typeof JobInfoFormSchema>
) {
  const validation = await validateJobInfoData(givenData);
  if (validation.error) return validation;
  const { userId, data } = validation;
  const jobInfo = await insertJobInfo({ userId, ...data });
  redirect(`/app/job-infos/${jobInfo.id}`);
}

export async function updateJobInfo(
  id: string,
  givenData: z.infer<typeof JobInfoFormSchema>
) {
  const validation = await validateJobInfoData(givenData);
  if (validation.error) return validation;
  const { userId, data } = validation;
  const existingJobInfo = await getJobInfo(id, userId);
  if (existingJobInfo == null) {
    return {
      error: true,
      message: "You don't have permission to do this",
    };
  }
  const jobInfo = await updateJobInfoInDb(id, data);
  redirect(`/app/job-infos/${jobInfo.id}`);
}

async function getJobInfo(id: string, userId: string) {
  "use cache";
  cacheTag(getJobInfoIdTag(id));
  return db.query.jobInfoTable.findFirst({
    where: and(eq(jobInfoTable.id, id), eq(jobInfoTable.userId, userId)),
  });
}
