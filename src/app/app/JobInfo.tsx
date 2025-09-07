import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/drizzle/db";
import { jobInfoTable } from "@/drizzle/schema";
import JobInfoForm from "@/features/JobInfos/components/JobInfoForm";
import { getJobInfoUserIdTag } from "@/features/JobInfos/dbCache";
import { getCurrentUser } from "@/services/clerk/lib/user";
import { desc, eq } from "drizzle-orm";
import { ArrowRightIcon, PlusIcon } from "lucide-react";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import Link from "next/link";

export default async function JobInfos() {
  const { userId, redirectToSignIn } = await getCurrentUser();
  if (userId == null) return redirectToSignIn();
  async function getJobInfos(userId: string) {
    "use cache";
    cacheTag(getJobInfoUserIdTag(userId));
    return await db.query.jobInfoTable.findMany({
      where: eq(jobInfoTable.userId, userId),
      orderBy: desc(jobInfoTable.updatedAt),
    });
  }
  const jobInfos = await getJobInfos(userId);
  if (jobInfos.length === 0) return <NoJobInfos />;
  return (
    <div className="container my-4 ">
      <div className="flex gap-2 justify-between mb-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl">
          Select a job description
        </h1>
        <Button asChild>
          <Link href="/app/job-infos/new">
            <PlusIcon />
            Create Job Description
          </Link>
        </Button>
      </div>
      <div className="grid grind-cols-1  lg:grid-cols-2 gap-6 has-hover:*:not-hover:opacity-70">
        {jobInfos.map((jobInfo) => (
          <Link
            className="hover:scale-[1.02] transition-[transform_opacity]"
            href={`/app/job-infos/${jobInfo.id}`}
            key={jobInfo.id}
          >
            <Card className="h-full">
              <div className="flex items-center justify-between h-full">
                <div className="space-y-4 h-full">
                  <CardHeader className="text-lg">
                    <CardTitle>{jobInfo.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground line-clamp-3">
                    {jobInfo.description}
                  </CardContent>
                  <CardFooter className="flex flex-wrap gap-2">
                    <Badge variant={"outline"}>{jobInfo.experienceLevel}</Badge>
                    {jobInfo.title && (
                      <Badge variant="outline">{jobInfo.title}</Badge>
                    )}
                  </CardFooter>
                </div>
                <CardContent>
                  <ArrowRightIcon className="size-6" />
                </CardContent>
              </div>
            </Card>
          </Link>
        ))}
        <Link className="transition-opacity" href="/app/job-infos/new">
          <Card className="h-full flex items-center justify-center border-dashed border-3 bg-transparent hover:border-primary/50 transition-colors shadow-none">
            <div className="text-lg flex items-center gap-2">
              <PlusIcon className="size-6" />
              Add New Job Info
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
  function NoJobInfos() {
    return (
      <div className="container my-4 max-w-5xl text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4 font-bold">
          Welcome to Ai - Resumatch
        </h1>
        <p className="text-muted-foreground mb-8">
          To get started , enter information about the job you want to apply
          for. For better results, enter as much information as possible eg :
          the job title, the company name, the job description , tech stack ,
          etc .
          <br />
          The better the information you provide, the more accurate the
          interviews and questions will be will be.
        </p>
        <Card>
          <CardContent>
            <JobInfoForm />
          </CardContent>
        </Card>
      </div>
    );
  }
}
