"use server";

import z from "zod";
import { JobInfoFormSchema } from "./JobInfoFormSchema";
import { getCurrentUser } from "@/services/clerk/lib/user";
import { redirect } from "next/navigation";

export async function createJobInfo(
  givenData: z.infer<typeof JobInfoFormSchema>
) {
  const { userId } = await getCurrentUser();
  if (userId == null)
    return {
      error: true,
      message: "You must be signed in to create a job info.",
    };
  const { success, data } = JobInfoFormSchema.safeParse(givenData);
  if (!success) return { error: true, message: "Given data is Invalid" };
  const jobInfo = await insertJobInfo({ userId, ...data });
  redirect(`/app/job-infos/${jobInfo.id}`);
}
