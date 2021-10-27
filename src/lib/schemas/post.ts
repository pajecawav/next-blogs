import { Post, User } from ".prisma/client";

export type PostResponse = Post & {
	createdAt: string;
	updatedAt: string | null;
};

export type PostWithUserResponse = PostResponse & { author: User };
