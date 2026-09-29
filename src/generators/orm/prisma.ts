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

  await renderTemplate(
    path.join(
      templatesPath,
      "prisma.config.ts.template",
    ),
    path.join(
      projectPath,
      "prisma.config.ts",
    ),
    {},
  );

  // Pin to the same major: prisma's "latest" npm tag can point at a
  // prerelease that doesn't match @prisma/client.
  await addDependencies(projectPath, {
    "@prisma/client": "^7.10.0",
    "@prisma/adapter-pg": "^7.10.0",
    pg: "latest",
    dotenv: "latest",
  });

  await addDevDependencies(projectPath, {
    prisma: "^7.10.0",
    "@types/pg": "latest",
  });

  await addScripts(projectPath, {
    postinstall: "prisma generate",
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
  });
}