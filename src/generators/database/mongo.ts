import path from "node:path";

import type { GeneratorContext } from "../../types/config.js";
import { renderTemplate } from "../../utils/filesystem.js";

export async function generateMongo(
  context: GeneratorContext,
): Promise<void> {
  const { projectPath } = context;

  await renderTemplate(
    path.resolve(
      process.cwd(),
      "src/templates/mongo/database.env.template",
    ),
    path.join(projectPath, ".env.database.example"),
    {
      PROJECT_NAME: context.config.name,
    },
  );
}