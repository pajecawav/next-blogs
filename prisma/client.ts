import { PrismaClient } from "@prisma/client";

declare global {
	var db: PrismaClient;
}

const db = global.db || new PrismaClient();

// https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices#problem
if (process.env.NODE_ENV !== "production") {
	global.db = db;
}

export default db;
