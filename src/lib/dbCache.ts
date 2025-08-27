type CacheTag = "users" | "jobInfo" | "interview" | "question";
export function getGlobalTag(tag: CacheTag) {
  return `global-${tag}` as const;
}
export function getUserTag(tag: CacheTag, userid: string) {
  return `user:${userid}:${tag}` as const;
}
export function getId(tag: CacheTag, id: string) {
  return `id:${id}:${tag}` as const;
}
