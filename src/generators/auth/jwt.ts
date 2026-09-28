import path from "node:path";


import { addEnvVariable } from "../../utils/env.js";

import { renderTemplate } from "../../utils/filesystem.js";
import {
  addDependencies,
  addDevDependencies,
} from "../../utils/package-json.js";
import { getFileExtension } from "../../utils/language.js";
import { getTemplatesPath } from "../../utils/templates.js";

export async function generateJWT(
  context: any,
): Promise<void> {
  const { projectPath, config } = context;

  const templatesPath = getTemplatesPath("jwt");
  const extension = getFileExtension(config.language);

  /*
   * Modular architecture:
   * src/modules/auth/
   *
   * Layered architecture:
   * service    → src/services/
   * controller → src/controllers/
   * routes     → src/routes/
   * middleware → src/middleware/
   */

  if (config.architecture === "modular") {
    const authPath = path.join(
      projectPath,
      "src/modules/auth",
    );

    await renderTemplate(
      path.join(
        templatesPath,
        `auth.service.${extension}.template`,
      ),
      path.join(
        authPath,
        `auth.service.${extension}`,
      ),
      {},
    );

    await renderTemplate(
      path.join(
        templatesPath,
        `auth.controller.${extension}.template`,
      ),
      path.join(
        authPath,
        `auth.controller.${extension}`,
      ),
      {},
    );

    await renderTemplate(
      path.join(
        templatesPath,
        `auth.routes.${extension}.template`,
      ),
      path.join(
        authPath,
        `auth.routes.${extension}`,
      ),
      {},
    );

    await renderTemplate(
      path.join(
        templatesPath,
        `auth.middleware.${extension}.template`,
      ),
      path.join(
        authPath,
        `auth.middleware.${extension}`,
      ),
      {},
    );
  }

  if (config.architecture === "layered") {
    await renderTemplate(
      path.join(
        templatesPath,
        `auth.service.${extension}.template`,
      ),
      path.join(
        projectPath,
        "src/services",
        `auth.service.${extension}`,
      ),
      {},
    );

    await renderTemplate(
      path.join(
        templatesPath,
        `auth.controller.${extension}.template`,
      ),
      path.join(
        projectPath,
        "src/controllers",
        `auth.controller.${extension}`,
      ),
      {},
    );

    await renderTemplate(
      path.join(
        templatesPath,
        `auth.routes.${extension}.template`,
      ),
      path.join(
        projectPath,
        "src/routes",
        `auth.routes.${extension}`,
      ),
      {},
    );

    await renderTemplate(
      path.join(
        templatesPath,
        `auth.middleware.${extension}.template`,
      ),
      path.join(
        projectPath,
        "src/middleware",
        `auth.middleware.${extension}`,
      ),
      {},
    );
  }

  await addDependencies(projectPath, {
    bcrypt: "latest",
    jsonwebtoken: "latest",
  });

  if (config.language === "typescript") {
    await addDevDependencies(projectPath, {
      "@types/bcrypt": "latest",
      "@types/jsonwebtoken": "latest",
    });
  }

    await addEnvVariable(
        projectPath,
        "JWT_SECRET=your-super-secret-key",
    );
}