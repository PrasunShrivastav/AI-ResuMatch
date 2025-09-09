import { Card, CardContent } from "@/components/ui/card";
import JobInfoForm from "@/features/JobInfos/components/JobInfoForm";
import { JobInfoBackLink } from "@/features/JobInfos/components/JobInfoBackLink";
import { Suspense } from "react";
import { Loader2Icon } from "lucide-react";
import { getCurrentUser } from "@/services/clerk/lib/user";
import { getJobInfo } from "@/features/JobInfos/getJobInfo";

export default async function JobInfosNewPage({
  params,
}: {
  params: Promise<{ jobInfoId: string }>;
}) {
  const { jobInfoId } = await params;
  return (
    <div className="my-4 container max-w-5xl space-y-4">
      <h1 className="text-3xl md:text-4xl font-bold">
        Edit existing Job Information
      </h1>
      <JobInfoBackLink jobInfoId={jobInfoId} />
      <Card>
        <CardContent>
          <Suspense
            fallback={<Loader2Icon className="size-24 animate-spin mx-auto" />}
          >
            <SuspendedForm jobInfoId={jobInfoId} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
async function SuspendedForm({ jobInfoId }: { jobInfoId: string }) {
  const { userId, redirectToSignIn } = await getCurrentUser();
  if (userId == null) return redirectToSignIn();
  const jobInfo = await getJobInfo(jobInfoId, userId);
  return <JobInfoForm jobInfo={jobInfo} />;
}
