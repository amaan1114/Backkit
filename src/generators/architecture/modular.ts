import path from "node:path";
import { createDirectory } from "../../utils/filesystem.js";

export async function generateModular(
    context: any
): Promise<void> {
  const { projectPath } = context;

  const directories = [
    "src/modules",
    "src/config",
    "src/middleware",
    "src/utils",
  ];

  for (const directory of directories) {
    await createDirectory(
      path.join(projectPath, directory),
    );
  }
}