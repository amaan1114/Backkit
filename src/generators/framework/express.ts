import path from "node:path";

import type { GeneratorContext } from "../../types/config.js";
import { renderTemplate } from "../../utils/filesystem.js";
import { getFileExtension } from "../../utils/language.js";

export async function generateExpress(
  context: GeneratorContext,
): Promise<void> {
  const { projectPath, config } = context;

  const templatesPath = path.resolve(
    process.cwd(),
    "src/templates/express",
  );

  const extension = getFileExtension(config.language);

  await renderTemplate(
    path.join(
      templatesPath,
      `app.${extension}.template`,
    ),
    path.join(
      projectPath,
      `src/app.${extension}`,
    ),
    {},
  );

  await renderTemplate(
    path.join(
      templatesPath,
      `server.${extension}.template`,
    ),
    path.join(
      projectPath,
      `src/server.${extension}`,
    ),
    {},
  );
}