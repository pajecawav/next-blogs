import { Prisma } from "@prisma/client";
import faker from "faker";
import { getPasswordHash } from "../src/lib/security";
import db from "./client";

async function randomUserInput(
	passwordHash?: string
): Promise<Prisma.UserCreateInput> {
	passwordHash = passwordHash || (await getPasswordHash("password"));
	return {
		username: faker.internet.userName(),
		passwordHash,
		bio: faker.lorem.paragraphs(2, "\n"),
	};
}

async function randomUsersInput(
	length: number,
	passwordHash?: string
): Promise<Prisma.UserCreateInput[]> {
	const promises = Array.from({ length }).map(async () => {
		return await randomUserInput(passwordHash);
	});
	return await Promise.all(promises);
}

function randomPostInput(authorId: number): Prisma.PostCreateManyInput {
	return {
		title: faker.lorem.words(6),
		body: faker.lorem.paragraphs(10, "\n\n"),
		authorId,
	};
}

async function main() {
	const passwordHash = await getPasswordHash("password");
	const users: Prisma.UserCreateInput[] = await randomUsersInput(
		100,
		passwordHash
	);
	await db.user.createMany({
		data: users,
	});

	const posts: Prisma.PostCreateManyInput[] = Array.from({ length: 20 }).map(
		(_, index) => randomPostInput(index + 1)
	);
	await db.post.createMany({ data: posts });
}

main();
