# Backkit

Backkit is an interactive CLI for scaffolding customizable Node.js backends.

Choose the language, framework, architecture, database, ORM/ODM, and authentication setup for each project.

## Features

- TypeScript or JavaScript
- Express
- Modular or Layered architecture
- PostgreSQL with Drizzle or Prisma
- MongoDB with Mongoose
- Optional JWT authentication
- Environment configuration
- Error handling middleware
- Response helpers
- Customizable project generation

## Quick Start

Run Backkit directly with `npx`:

```bash
npx @ghost1411/backkit
```

Follow the interactive prompts to configure your backend.

Once the project is generated:

```bash
cd <project-name>
npm install
npm run dev
```

The generated Express server runs on:

```text
http://localhost:5000
```

by default.

## Configuration Options

| Option | Choices |
| --- | --- |
| Language | TypeScript, JavaScript |
| Framework | Express |
| Architecture | Modular, Layered |
| Database | PostgreSQL, MongoDB |
| ORM / ODM | Drizzle, Prisma, Mongoose |
| Authentication | JWT, None |

### Database Integrations

Backkit automatically selects the appropriate database integration based on your choices:

- **PostgreSQL**
  - Drizzle
  - Prisma
- **MongoDB**
  - Mongoose

## Generated Project

Backkit generates a ready-to-use Express backend based on your selected configuration.

Depending on your choices, the generated project can include:

- Application and server entry points
- Environment configuration
- Database configuration
- ORM/ODM setup
- Shared error middleware
- Response helpers
- Modular or layered architecture
- JWT authentication
- Authentication middleware
- Authentication routes and services

The exact project structure depends on the options selected during initialization.

## Example

Running:

```bash
npx @ghost1411/backkit
```

opens an interactive configuration flow:

```text
Project name
> my-api

Language
> TypeScript

Framework
> Express

Architecture
> Modular

Database
> PostgreSQL

ORM
> Drizzle

Authentication
> JWT
```

Backkit then generates the corresponding backend structure.

## Development

Clone the repository:

```bash
git clone https://github.com/amaan1114/backkit.git
cd backkit
```

Install dependencies:

```bash
npm install
```

Run the CLI directly from source:

```bash
npm run dev
```

Build the CLI:

```bash
npm run build
```

Run the compiled CLI:

```bash
npm start
```

## Project Structure

```text
backkit/
├── src/
│   ├── cli.ts
│   ├── commands/
│   ├── generators/
│   ├── prompts/
│   ├── templates/
│   └── utils/
├── package.json
├── tsconfig.json
└── README.md
```

## Why Backkit?

Most backend scaffolders generate a fixed project structure.

Backkit focuses on **customizable backend generation**.

Instead of starting with a predetermined boilerplate, you choose the technologies and architecture you want, and Backkit generates the corresponding project for you.

```text
Your choices
     ↓
  Backkit
     ↓
Customized backend
```

## Roadmap

Planned improvements include:

- More frameworks
- More database integrations
- Additional authentication providers
- Redis support
- API documentation generation
- Docker configuration
- More architecture patterns
- Additional backend components
- `backkit add` commands for adding components to existing projects

## License

MIT

