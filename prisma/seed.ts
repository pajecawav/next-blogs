import { Prisma } from "@prisma/client";
import dayjs from "dayjs";
import faker from "faker";
import { getPasswordHash } from "../src/lib/security";
import db from "./client";

const NOW = dayjs();

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
		createdAt: faker.date.between(
			NOW.subtract(3, "year").toDate(),
			NOW.toDate()
		),
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

	const posts: Prisma.PostCreateManyInput[] = Array.from({ length: 100 }).map(
		() => randomPostInput(Math.floor(1 + Math.random() * users.length))
	);
	await db.post.createMany({ data: posts });
}

main();
