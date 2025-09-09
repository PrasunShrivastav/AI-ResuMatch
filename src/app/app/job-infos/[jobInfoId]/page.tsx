import { BackLink } from "@/components/ui/backLink";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getJobInfo } from "@/features/JobInfos/getJobInfo";
import { getCurrentUser } from "@/services/clerk/lib/user";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import z from "zod";

export default async function JobInfoPage({
  params,
}: {
  params: Promise<{ jobInfoId: string }>;
}) {
  const { userId, redirectToSignIn } = await getCurrentUser();
  if (userId === null) return redirectToSignIn();
  const { jobInfoId } = await params;
  const jobInfoIdSchema = z.string().uuid();
  const { success } = jobInfoIdSchema.safeParse(jobInfoId);
  if (!success) return notFound();
  const jobInfo = await getJobInfo(jobInfoId, userId);

  console.log(jobInfo);
  if (jobInfo == null) return notFound();
  const options = [
    {
      label: "Answer Technical Questions",
      description:
        "Challenge your knowledge by answering technical questions tailored to your job description.",
      href: "questions",
    },
    {
      label: "Mock Interview",
      description:
        "Stimulated Interview based on the job description and your resume.",
      href: "interviews",
    },
    {
      label: "Refine your Resume",
      description:
        "Get detailed feedback on your resume based on the job description and how to increase the ats score of the resume.",
      href: "resume",
    },
    {
      label: "Update Job description / Info",
      description: "Use this to make minor changes to your job description.",
      href: "edit",
    },
  ];
  return (
    <div className="container my-4 space-y-4">
      <BackLink href="/app">DashBoard</BackLink>
      <div className="space-y-6">
        <header className="space-y-4">
          <div className="space-y-2">
            <h1 className="text 3xl md:text-4xl font-bold">{jobInfo.name}</h1>
            <div className="text-muted-foreground flex gap-2">
              <Badge variant={"secondary"}>{jobInfo.experienceLevel}</Badge>
              {jobInfo.title && (
                <Badge variant={"secondary"}>{jobInfo.title}</Badge>
              )}
            </div>
          </div>
          <p className="text-muted-foreground line-clamp-3">
            {jobInfo.description}
          </p>
        </header>
        <div className="grid grind-cols-1  lg:grid-cols-2 gap-6 has-hover:*:not-hover:opacity-70">
          {options.map((options) => (
            <Link
              className="hover:scale-[1.02] transition-[transform_opacity]"
              href={`/app/job-infos/${jobInfoId}/${options.href}`}
              key={options.label}
            >
              <Card className="h-full flex items-start justify-between flex-row">
                <CardHeader className=" flex-grow">
                  <CardTitle>{options.label}</CardTitle>
                  <CardDescription>{options.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ArrowRightIcon className="size-6" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
