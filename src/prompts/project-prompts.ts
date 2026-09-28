import {
  input,
  select,
  confirm,
} from "@inquirer/prompts";


export async function getProjectConfig(){
  const name = await input({
    message: "Project name:",
    default: "api",
  });

  const language = await select({
    message: "Language:",
    choices: [
      {
        name: "TypeScript",
        value: "typescript",
      },
      {
        name: "JavaScript",
        value: "javascript",
      },
    ],
  });

  const framework = await select({
    message: "Framework:",
    choices: [
      {
        name: "Express",
        value: "express",
      },
    ],
  });

  const architecture = await select({
    message: "Architecture:",
    choices: [
      {
        name: "Modular",
        value: "modular",
      },
      {
        name: "Layered",
        value: "layered",
      },
    ],
  });

  const database = await select({
    message: "Database:",
    choices: [
      {
        name: "PostgreSQL",
        value: "postgres",
      },
      {
        name: "MongoDB",
        value: "mongo",
      },
    ],
  });

const orm = await select({
  message: "ORM:",
  choices:
    database === "postgres"
      ? [
          {
            name: "Drizzle",
            value: "drizzle",
          },
          {
            name: "Prisma",
            value: "prisma",
          },
        ]
      : [
          {
            name: "Mongoose",
            value: "mongoose",
          },
        ],
});

  const authentication = await select({
    message: "Authentication:",
    choices: [
      {
        name: "JWT",
        value: "jwt",
      },
      {
        name: "None",
        value: "none",
      },
    ],
  });

  return {
    name,
    language,
    framework,
    architecture,
    database,
    orm,
    authentication,
  };
}