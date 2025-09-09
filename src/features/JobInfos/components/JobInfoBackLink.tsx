import { BackLink } from "@/components/ui/backLink";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { getJobInfoIdTag } from "../dbCache";
import { jobInfoTable } from "@/drizzle/schema";
import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";

export function JobInfoBackLink({
  jobInfoId,
  className,
}: {
  jobInfoId: string;
  className?: string;
}) {
  return (
    <BackLink
      href={`/app/job-infos/${jobInfoId}`}
      className={cn(className, "mb-4")}
    >
      <Suspense fallback="Job Description">
        <JobName jobInfoId={jobInfoId} />
      </Suspense>
    </BackLink>
  );
}
async function JobName({ jobInfoId }: { jobInfoId: string }) {
  const jobInfo = await getJobInfo(jobInfoId);
  return jobInfo?.name ?? "Job Description";
}
async function getJobInfo(jobInfoId: string) {
  "use cache";
  cacheTag(getJobInfoIdTag(jobInfoId));
  return db.query.jobInfoTable.findFirst({
    where: eq(jobInfoTable.id, jobInfoId),
  });
}
