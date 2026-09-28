import path from "node:path";
import { appendFile } from "node:fs/promises";

export async function addEnvVariable(
  projectPath: string,
  variable: string,
): Promise<void> {
  await appendFile(
    path.join(projectPath, ".env.example"),
    `\n${variable}\n`,
    "utf8",
  );
}