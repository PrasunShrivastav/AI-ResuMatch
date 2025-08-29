import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/drizzle/db";
import { jobInfoTable } from "@/drizzle/schema";
import { getJobInfoUserIdTag } from "@/features/JobInfos/dbCache";
import { getCurrentUser } from "@/services/clerk/lib/user";
import { desc, eq } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

export default async function JobInfos() {
  const { userId, redirectToSignIn } = await getCurrentUser();
  if (userId == null) return redirectToSignIn();
  async function getJobInfos(userId: string) {
    "use cache";
    cacheTag(getJobInfoUserIdTag(userId));
    await db.query.jobInfoTable.findMany({
      where: eq(jobInfoTable.userId, userId),
      orderBy: desc(jobInfoTable.updatedAt),
    });
  }
  const jobInfos = await getJobInfos(userId);
  if (jobInfos == null) return <NoJobInfos />;
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
          <CardContent>hi</CardContent>
        </Card>
      </div>
    );
  }
}
