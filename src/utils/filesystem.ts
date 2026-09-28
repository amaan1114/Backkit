import {
  mkdir,
  cp,
  writeFile,
  readFile,
} from "node:fs/promises";
import path from "node:path";

export async function createDirectory(
  directoryPath: string,
): Promise<void> {
  await mkdir(directoryPath, {
    recursive: true,
  });
}

export async function copyTemplate(
  source: string,
  destination: string,
): Promise<void> {
  await cp(source, destination, {
    recursive: true,
  });
}

export async function createFile(
  filePath: string,
  content: string,
): Promise<void> {
  await mkdir(path.dirname(filePath), {
    recursive: true,
  });

  await writeFile(filePath, content, "utf8");
}

export async function renderTemplate(
  templatePath: string,
  destinationPath: string,
  variables: Record<string, string>,
): Promise<void> {
  let content = await readFile(templatePath, "utf8");

  for (const [key, value] of Object.entries(variables)) {
    content = content.replaceAll(
      `{{${key}}}`,
      value,
    );
  }

  await createFile(destinationPath, content);
}