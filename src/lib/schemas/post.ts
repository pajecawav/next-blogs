import { Post, User } from ".prisma/client";
import * as yup from "yup";
import { ObjectToBooleans } from "../types";
import { MakeUndefinesOptional, orderBySchema } from "./utils";

export type PostResponse = Post & {
	createdAt: string;
	updatedAt: string | null;
};

export type PostWithUserResponse = PostResponse & { author: User };

export const postResponseSelect: ObjectToBooleans<PostResponse> = {
	id: true,
	title: true,
	body: true,
	authorId: true,
	createdAt: true,
	updatedAt: true,
};

export const postsQuerySchema = yup.object({}).shape({
	take: yup.number().positive().max(50).notRequired(),
	skip: yup.number().positive().notRequired(),
	authorId: yup.number().notRequired(),
	createdAt: orderBySchema.notRequired(),
});

export type PostsQuery = MakeUndefinesOptional<
	yup.InferType<typeof postsQuerySchema>
>;
