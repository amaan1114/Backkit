import path from "node:path";



import { renderTemplate } from "../../utils/filesystem.js";
import { getFileExtension } from "../../utils/language.js";
import {
  addDependencies,
  addDevDependencies,
  addScripts,
} from "../../utils/package-json.js";
import { getTemplatesPath } from "../../utils/templates.js";

export async function generatePrisma(
  context: any,
): Promise<void> {
  const { projectPath, config } = context;
  const extension = getFileExtension(config.language);
  const clientTemplate =
    `client.${extension}.template`;

  const templatesPath = getTemplatesPath("prisma")
  
  await renderTemplate(
    path.join(
      templatesPath,
      "schema.prisma.template",
    ),
    path.join(
      projectPath,
      "prisma/schema.prisma",
    ),
    {
      PROJECT_NAME: config.name,
    },
  );

  await renderTemplate(
    path.join(
      templatesPath,
      clientTemplate,
    ),
    path.join(
      projectPath,
      `src/db/client.${extension}`,
    ),
    {},
  );

  await addDependencies(projectPath, {
    "@prisma/client": "latest",
    dotenv: "latest",
  });

  await addDevDependencies(projectPath, {
    prisma: "latest",
  });

  await addScripts(projectPath, {
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio",
  });
}