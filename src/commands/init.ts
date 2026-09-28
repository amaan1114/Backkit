import { getProjectConfig } from "../prompts/project-prompts.js";
import { generateProject } from "../generators/project-generator.js";

export async function initCommand(): Promise<void> {
  const config = await getProjectConfig();

  await generateProject(config);
}