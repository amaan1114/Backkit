import path from "node:path";
import { renderTemplate } from "../../utils/filesystem.js";
import { getTemplatesPath } from "../../utils/templates.js";



export async function generateBase(
  context: any
): Promise<void> {
  const { config, projectPath } = context;

  const templatesPath = getTemplatesPath("base");
  const variables = {
    PROJECT_NAME: config.name,
  };
  
  const extension = config.language === "typescript" ? "ts" : "js";

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

  await renderTemplate(
    path.join(
      templatesPath,
      `error.middleware.${extension}.template`,
    ),
    path.join(
      projectPath,
      "src/middleware",
      `error.middleware.${extension}`,
    ),
    variables,
  );

  await renderTemplate(
    path.join(
      templatesPath,
      `response.${extension}.template`,
    ),
    path.join(
      projectPath,
      "src/utils",
      `response.${extension}`,
    ),
    variables,
  );

  const templateFiles = [
    [`httpResponse.${extension}.template`, `src/utils/httpResponse.${extension}`],
    [`httpError.${extension}.template`, `src/utils/httpError.${extension}`],
    [`constants/messages.${extension}.template`, `src/constants/messages.${extension}`],
    [`utils/logger.${extension}.template`, `src/utils/logger.${extension}`],
  ] as const;

  for (const [template, destination] of templateFiles) {
    await renderTemplate(
    path.join(templatesPath, template),
    path.join(projectPath, destination),
    variables,
    );
  }

  if (config.language === "typescript") {
    for (const typeName of ["thttpResponse", "thttpError"]) {
    await renderTemplate(
      path.join(templatesPath, `types/${typeName}.ts.template`),
      path.join(projectPath, `src/types/${typeName}.ts`),
      variables,
    );
    }
  }
}