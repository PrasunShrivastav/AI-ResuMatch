import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";
import JobInfos from "./JobInfo";

export default function AppPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen-header flex items-center justify-center">
          <Loader2Icon className="animate-spin h-10 w-10 text-gray-600" />
          <div className="container ">
            <h1 className="text-3xl font-bold">Welcome to Ai - Resumatch</h1>
          </div>
        </div>
      }
    >
      <JobInfos />
    </Suspense>
  );
}
