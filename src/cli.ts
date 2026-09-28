#!/usr/bin/env node
import { initCommand } from "./commands/init.js";
import { getTemplatesPath } from "./utils/templates.js";
async function main(): Promise<void> {
  console.log("\n🚀 Welcome to Backkit!\n");

  await initCommand();
}

main().catch((error) => {
  console.error("\n❌ Something went wrong.");
  console.error(error);
  process.exit(1);
});
