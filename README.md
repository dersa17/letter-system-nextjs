# Letter System Next.js

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### 1. Setup environment variables

Copy the `.env.example` file into `.env.local`:

```bash
cp .env.example .env.local
```
Then fill in the values according to your database, auth, and service configuration. Example:
```
# DATABASE
DATABASE_URL="postgres://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
DATABASE_URL_UNPOOLED="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"

# Connection parameters
PGHOST="HOST"
PGHOST_UNPOOLED="HOST_UNPOOLED"
PGUSER="USER"
PGDATABASE="DATABASE"
PGPASSWORD="PASSWORD"

# Vercel/Postgres
POSTGRES_URL="postgres://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
POSTGRES_URL_NON_POOLING="postgres://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
POSTGRES_USER="USER"
POSTGRES_HOST="HOST"
POSTGRES_PASSWORD="PASSWORD"
POSTGRES_DATABASE="DATABASE"
POSTGRES_URL_NO_SSL="postgres://USER:PASSWORD@HOST:PORT/DATABASE"
POSTGRES_PRISMA_URL="postgres://USER:PASSWORD@HOST:PORT/DATABASE?connect_timeout=15&sslmode=require"

# Blob token example
BLOB_READ_WRITE_TOKEN="your_blob_rw_token_here"

# NextAuth.js
NEXTAUTH_SECRET="your_nextauth_secret_here"
NEXTAUTH_URL="http://localhost:3000"
NODE_ENV=development
```

### 2. run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Live Demo

Project is deployed on Vercel:  
👉 [https://your-project-name.vercel.app](https://your-project-name.vercel.app)

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)
![Auth.js](https://img.shields.io/badge/Auth.js-000?logo=auth0&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?logo=storybook&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
