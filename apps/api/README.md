# MapleDB-Server

Fastify Server for MapleDB

## Installation

1. Make sure [node](https://nodejs.org/en/) and [pnpm](https://pnpm.io/installation) are installed on the system

2. Set up and launch [postgresql](https://www.postgresql.org/) database on `localhost:5432` with a db called `mooseical`

3. Create an **.env** file with the template provided below

4. Install packages `pnpm install`

5. Generate fake data with `pnpm faker`

6. Start dev server `pnpm dev`

## Scripts

Make sure the postgresql database is running

Open altair playground http://localhost:3002/

```
pnpm dev
```

Compile code

```
pnpm build
```

Start built code

```
pnpm start
```

Start prisma studio

```
pnpm db
```

Test any changes in db without creating a migration file

```
pnpm db:push
```

Migrate db
This will also run format and generate afterwards

```
pnpm db:migrate --name update_name
```

Reset database and seed it with fake data

```
pnpm db:reset
```

Sync DB with client

```
pnpm generate
```

Format the prisma file

```
pnpm format:prisma
```

Run eslint on the project

```
pnpm lint:code
```

Format project based on eslint, and prettier rule sets

```
pnpm format:code
```

Format project based on eslint, prisma, and prettier rule sets

```
pnpm format:all
```

## .env Template

create a file called **.env** with the following items

```bash
DATABASE_URL="postgresql://prisma:prisma@localhost:5432/mooseical?schema=public"

SECRET_QUERY_KEY="1234"
SECRET_MUTATION_KEY="1234"

NODE_ENV="development"

CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```
