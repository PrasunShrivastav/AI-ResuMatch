import { getGlobalTag, getId } from "@/lib/dbCache";
import { revalidateTag } from "next/cache";

export function revalidateUserCache(id: string) {
  revalidateTag(getUserGlobalTag());
  revalidateTag(getUserIdTag(id));
}
export function getUserGlobalTag() {
  return getGlobalTag("users");
}
export function getUserIdTag(id: string) {
  return getId("users", id);
}
