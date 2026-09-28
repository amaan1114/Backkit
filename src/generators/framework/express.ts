import path from "node:path";

import { renderTemplate } from "../../utils/filesystem.js";
import { getFileExtension } from "../../utils/language.js";
import { getTemplatesPath } from "../../utils/templates.js";

export async function generateExpress(
  context: any,
): Promise<void> {
  const { projectPath, config } = context;

  const templatesPath = getTemplatesPath("express");

  const extension = getFileExtension(config.language);

  const authImport =
    config.authentication === "jwt"
      ? config.architecture === "modular"
        ? `import authRoutes from "./modules/auth/auth.routes.js";`
        : `import authRoutes from "./routes/auth.routes.js";`
      : "";

  const authRoute =
    config.authentication === "jwt"
      ? `app.use("/api/auth", authRoutes);`
      : "";

  await renderTemplate(
      path.join(
        templatesPath,
        `app.${extension}.template`,
      ),
      path.join(
        projectPath,
        `src/app.${extension}`,
      ),
      {
        AUTH_IMPORT: authImport,
        AUTH_ROUTE: authRoute,
        ERROR_IMPORT: `import { errorHandler } from "./middleware/error.middleware.js";`,
      },
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