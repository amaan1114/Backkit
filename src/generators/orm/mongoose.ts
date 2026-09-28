import path from "node:path";



import { renderTemplate } from "../../utils/filesystem.js";
import {
  addDependencies,
  addScripts,
} from "../../utils/package-json.js";
import { getFileExtension } from "../../utils/language.js";
import { getTemplatesPath } from "../../utils/templates.js";

export async function generateMongoose(
  context: any
): Promise<void> {
  const { projectPath, config } = context;

  const templatesPath =getTemplatesPath("mongoose")

  const extension = getFileExtension(
    config.language,
  );

  await renderTemplate(
    path.join(
      templatesPath,
      `connection.${extension}.template`,
    ),
    path.join(
      projectPath,
      `src/db/connection.${extension}`,
    ),
    {},
  );

  await renderTemplate(
    path.join(
      templatesPath,
      `user.model.${extension}.template`,
    ),
    path.join(
      projectPath,
      `src/models/user.model.${extension}`,
    ),
    {},
  );

  await addDependencies(projectPath, {
    mongoose: "latest",
    dotenv: "latest",
  });

  await addScripts(projectPath, {
    "db:connect": `node -e "import('./dist/db/connection.${extension}')"`
  });
}