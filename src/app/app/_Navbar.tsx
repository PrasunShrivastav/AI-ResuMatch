"use client";

import { LogOut, User, FileUser } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/feature/ThemeToggle";
import { UserAvatar } from "@/components/feature/UserAvatar";

export function Navbar({ user }: { user: { name: string; imageUrl: string } }) {
  const { openUserProfile } = useClerk();

  return (
    <nav className="h-header border-b">
      <div className="container h-header mx-auto flex items-center justify-between">
        <Link href="/app" className="flex items-center gap-2">
          <FileUser className="size-8 text-primary" />
          <span className="text-xl font-bold">Ai - Resumatch</span>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <UserAvatar user={user} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => openUserProfile()}>
                <User className="mr-2" />
                Profile
              </DropdownMenuItem>
              <SignOutButton>
                <DropdownMenuItem>
                  <LogOut className="mr-2" />
                  Logout
                </DropdownMenuItem>
              </SignOutButton>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
