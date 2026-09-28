export function getFileExtension(
  language:any
): string {
  return language === "typescript"
    ? "ts"
    : "js";
}