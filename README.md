This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Local Installation

1. First, install the dependencies:

```bash
npm install
```

2. When running a database locally, the easiest way is to use Docker. You can run the following command to start a PostgreSQL database:

```bash
npm run docker
```

3. Create a .env.local file in the project root with the database url:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"
```

## Changing the database schema

If you need to add / modify the database layout, you should do so using prisma migrations.

1. Make your changes to the prisma schema locally (prisma/shema.prisma)
2. Run `npx prisma migrate dev --name NAME_OF_MIGRATION` to generate a migration file. This will also update your database with the new / modified fields and apply the migration.

In case you do not want to apply the migration, you can run `npx prisma migrate dev --name NAME_OF_MIGRATION --create-only` to only generate the migration file. You can then apply the migration at a later time by running `npx prisma migrate deploy`.

## API Routes

With the application running, you can access the following api routes:

- http://localhost:3000/api/yaml-config - returns all yaml configurations from the database