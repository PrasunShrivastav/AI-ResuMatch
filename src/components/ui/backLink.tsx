import { cn } from "@/lib/utils";
import { Button } from "./button";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

export function BackLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Button asChild variant={"ghost"} className={cn("-ml-3", className)}>
      <Link
        href={href}
        className="flex gap-2 text-muted-foreground text-sm items-center"
      >
        <ArrowLeftIcon />
        {children}
      </Link>
    </Button>
  );
}
