git # Backkit

Backkit is an interactive CLI for scaffolding customizable Node.js backends.
Choose the language, framework, architecture, database, ORM or ODM, and authentication setup for each project.

## Features

- TypeScript or JavaScript
- Express
- Modular or layered architecture
- PostgreSQL with Drizzle or Prisma
- MongoDB with Mongoose
- Optional JWT authentication
- Error handling and response helpers

## Quick Start

Run Backkit with `npx`:

```bash
npx backkit
```

Follow the prompts, then install dependencies and start the generated project:

```bash
cd <project-name>
npm install
npm run dev
```

The generated Express server runs on `http://localhost:5000` by default.

## Options

| Option | Choices |
| --- | --- |
| Language | TypeScript, JavaScript |
| Framework | Express |
| Architecture | Modular, Layered |
| Database | PostgreSQL, MongoDB |
| ORM / ODM | Drizzle, Prisma, Mongoose |
| Authentication | JWT, None |

Database integrations are selected automatically:

- PostgreSQL: Drizzle or Prisma
- MongoDB: Mongoose

## Generated Project

Backkit generates an Express application with:

- Application and server entry points
- Environment configuration
- Shared error middleware
- Response helpers
- The selected architecture and database integration
- Optional JWT authentication files

The exact file structure depends on the options selected during initialization.

## Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/amaan1114/backkit.git
cd backkit
npm install
```

Run the CLI from source:

```bash
npm run dev
```

Build and run the compiled CLI:

```bash
npm run build
npm start
```

## License

MIT