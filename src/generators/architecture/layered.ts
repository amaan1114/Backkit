import path from "node:path";
import { createDirectory } from "../../utils/filesystem.js";

export async function generateLayered(
  context: any,
): Promise<void> {
  const { projectPath } = context;

  const directories = [
    "src/controllers",
    "src/services",
    "src/routes",
    "src/models",
    "src/middleware",
    "src/config",
    "src/utils",
  ];

  for (const directory of directories) {
    await createDirectory(
      path.join(projectPath, directory),
    );
  }
}