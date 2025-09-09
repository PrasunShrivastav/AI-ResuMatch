import { Card, CardContent } from "@/components/ui/card";
import JobInfoForm from "@/features/JobInfos/components/JobInfoForm";
import { JobInfoBackLink } from "@/features/JobInfos/components/JobInfoBackLink";

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
          <JobInfoForm />
        </CardContent>
      </Card>
    </div>
  );
}
