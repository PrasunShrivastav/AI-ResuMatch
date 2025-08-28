import { getCurrentUser } from "@/services/clerk/lib/user";
import { redirect } from "next/navigation";
import { OnboardingClient } from "./_client";

export default async function OnboardingPage() {
  const { userId, user } = await getCurrentUser({ allData: true });
  if (userId == null) return redirect("/");
  if (userId != null) return redirect("/app");
  return (
    <div className="container flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">Setting up your account</h1>
      <OnboardingClient userId={userId} />
    </div>
  );
}
