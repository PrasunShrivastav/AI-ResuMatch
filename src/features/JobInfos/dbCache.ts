import { getGlobalTag, getIdTag, getUserTag } from "@/lib/dbCache";
import { revalidateTag } from "next/cache";

export function getJobInfoGlobalTag() {
  return getGlobalTag("jobInfo");
}

export function getJobInfoUserIdTag(userid: string) {
  return getUserTag("jobInfo", userid);
}
export function getJobInfoIdTag(id: string) {
  return getIdTag("jobInfo", id);
}

export function revalidateJobInfoCache({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) {
  revalidateTag(getJobInfoUserIdTag(userId));
  revalidateTag(getJobInfoGlobalTag());
  revalidateTag(getJobInfoIdTag(id));
}
