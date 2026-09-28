import path from "node:path";

import { renderTemplate } from "../../utils/filesystem.js";
import { getFileExtension } from "../../utils/language.js";
import {
  addDependencies,
  addDevDependencies,
  addScripts,
} from "../../utils/package-json.js";

export async function generateDrizzle(
  context:any,
): Promise<void> {
  const { projectPath, config } = context;

  const extension = getFileExtension(config.language);
  const templatesPath = path.resolve(
    process.cwd(),
    "src/templates/drizzle",
  );
  
  const clientTemplate =
  `client.${extension}.template`;

  const schemaTemplate =
    `schema.${extension}.template`;

  await renderTemplate(
    path.join(
      templatesPath,
      "drizzle.config.ts.template",
    ),
    path.join(
      projectPath,
      "drizzle.config.ts",
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
      schemaTemplate,
    ),
    path.join(
      projectPath,
      `src/db/schema.${extension}`,
    ),
    {},
  );
  
  await addDependencies(projectPath, {
        "drizzle-orm": "latest",
        pg: "latest",
        dotenv: "latest",
  });

  await addDevDependencies(projectPath, {
    "drizzle-kit": "latest",
    "@types/pg": "latest",
  });

  await addScripts(projectPath, {
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio",
  });
}