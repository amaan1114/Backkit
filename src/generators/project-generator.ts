import path from "node:path";
import process from "node:process";

import { generateModular } from "./architecture/modular.js";
import { generateLayered } from "./architecture/layered.js";
import { createDirectory } from "../utils/filesystem.js";
import { generateBase } from "./base/generator.js";
import { generateExpress } from "./framework/express.js";
import { generatePostgres } from "./database/postgres.js";
import { generateMongo } from "./database/mongo.js";
import { generateDrizzle } from "./orm/drizzle.js";
import { generatePrisma } from "./orm/prisma.js";
import { generateJWT } from "./auth/jwt.js";
import { generateMongoose } from "./orm/mongoose.js";

export async function generateProject(
  config: any
): Promise<void> {
  const projectPath = path.resolve(
    process.cwd(),
    config.name,
  );

  await createDirectory(projectPath);

  const context:any = {
    config,
    projectPath,
  };

  await generateBase(context);
  if (config.framework === "express") {
    await generateExpress(context);
  }
  
  if (config.architecture === "modular") {
    await generateModular(context);
  } 

  if (config.architecture === "layered") {
    await generateLayered(context);
  }
  if (config.database === "postgres") {
    await generatePostgres(context);
  }

  if (config.database === "mongo") {
    await generateMongo(context);
  }
  if (config.orm === "drizzle") {
    await generateDrizzle(context);
  }
  if (config.orm === "prisma") {
    await generatePrisma(context);
  }
  if (config.orm === "mongoose") {
    await generateMongoose(context);
  }
  if (config.authentication === "jwt") {
    await generateJWT(context);
  }

  console.log(`\n✓ Created ${config.name}`);
  console.log(`  ${projectPath}`);
}