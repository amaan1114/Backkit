import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderTemplate } from "../../utils/filesystem.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatesPath = path.resolve(
  __dirname,
  "../../templates/base",
);

export async function generateBase(
  context: any
): Promise<void> {
  const { config, projectPath } = context;

  const variables = {
    PROJECT_NAME: config.name,
  };

  const packageTemplate =
    config.language === "typescript"
      ? "package.json.ts.template"
      : "package.json.js.template";

  await renderTemplate(
    path.join(templatesPath, packageTemplate),
    path.join(projectPath, "package.json"),
    variables,
  );

  if (config.language === "typescript") {
    await renderTemplate(
      path.join(
        templatesPath,
        "tsconfig.json.template",
      ),
      path.join(
        projectPath,
        "tsconfig.json",
      ),
      variables,
    );
  }

  await renderTemplate(
    path.join(templatesPath, "gitignore.template"),
    path.join(projectPath, ".gitignore"),
    variables,
  );

  await renderTemplate(
    path.join(templatesPath, "env.example.template"),
    path.join(projectPath, ".env.example"),
    variables,
  );

  await renderTemplate(
    path.join(templatesPath, "README.md.template"),
    path.join(projectPath, "README.md"),
    variables,
  );
}