"use server";

import { UserTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { getUserIdTag } from "./dbCache";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { db } from "@/drizzle/db";

export async function getUser(id: string) {
  "use cache";
  cacheTag(getUserIdTag(id));
  return db.query.UserTable.findFirst({
    where: eq(UserTable.id, id),
  });
}
