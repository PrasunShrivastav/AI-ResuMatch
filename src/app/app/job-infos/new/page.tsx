import { Card, CardContent } from "@/components/ui/card";
import { BackLink } from "@/components/ui/backLink";
import JobInfoForm from "@/features/JobInfos/components/JobInfoForm";

export default function JobInfosNewPage() {
  return (
    <div className="my-4 container max-w-5xl space-y-4">
      <h1 className="text-3xl md:text-4xl font-bold">
        Create New Job Information
      </h1>
      <BackLink href="/app">DashBoard</BackLink>
      <Card>
        <CardContent>
          <JobInfoForm />
        </CardContent>
      </Card>
    </div>
  );
}
