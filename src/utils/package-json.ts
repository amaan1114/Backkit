import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";



export async function addDependencies(
  projectPath: string,
  dependencies: Record<string, string>,
): Promise<void> {
  const packagePath = path.join(
    projectPath,
    "package.json",
  );

  const packageJson = JSON.parse(
    await readFile(packagePath, "utf8"),
  ) 

  packageJson.dependencies ??= {};

  Object.assign(
    packageJson.dependencies,
    dependencies,
  );

  await writeFile(
    packagePath,
    JSON.stringify(packageJson, null, 2) + "\n",
    "utf8",
  );
}

export async function addDevDependencies(
  projectPath: string,
  dependencies: Record<string, string>,
): Promise<void> {
  const packagePath = path.join(
    projectPath,
    "package.json",
  );

  const packageJson = JSON.parse(
    await readFile(packagePath, "utf8"),
  ) 

  packageJson.devDependencies ??= {};

  Object.assign(
    packageJson.devDependencies,
    dependencies,
  );

  await writeFile(
    packagePath,
    JSON.stringify(packageJson, null, 2) + "\n",
    "utf8",
  );
}

export async function addScripts(
  projectPath: string,
  scripts: Record<string, string>,
): Promise<void> {
  const packagePath = path.join(
    projectPath,
    "package.json",
  );

  const packageJson = JSON.parse(
    await readFile(packagePath, "utf8"),
  ) 

  packageJson.scripts ??= {};

  Object.assign(
    packageJson.scripts,
    scripts,
  );

  await writeFile(
    packagePath,
    JSON.stringify(packageJson, null, 2) + "\n",
    "utf8",
  );
}

