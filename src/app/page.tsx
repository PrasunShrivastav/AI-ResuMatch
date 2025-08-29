import { ThemeToggle } from "@/components/ThemeToggle";
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
