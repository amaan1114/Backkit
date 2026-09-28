import path from "node:path";
import { renderTemplate } from "../../utils/filesystem.js";
import { getTemplatesPath } from "../../utils/templates.js";

export async function generatePostgres(
  context: any,
): Promise<void> {
  const { projectPath } = context;

  await renderTemplate(
      path.join(
        getTemplatesPath("postgres"),
        "database.env.template",
      ),
      path.join(
        projectPath,
        ".env.database.example",
      ),
      {
        PROJECT_NAME: context.config.name,
      },
);
}