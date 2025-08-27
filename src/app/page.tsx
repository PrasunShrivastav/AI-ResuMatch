import { ThemeToggle } from "@/components/ui/themetoggle";
import { SignInButton, UserButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <>
      <SignInButton />
      <ThemeToggle />
      <UserButton></UserButton>
    </>
  );
}
