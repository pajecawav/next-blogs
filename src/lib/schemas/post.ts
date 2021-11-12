import { Post } from ".prisma/client";
import * as yup from "yup";
import { ObjectToBooleans } from "../types";
import { UserResponse } from "./user";
import { MakeUndefinesOptional, orderBySchema } from "./utils";

export type PostResponse = Post & {
	createdAt: string;
	updatedAt: string | null;
	placedRating?: -1 | 1;
};

export type PostWithUserResponse = PostResponse & { author: UserResponse };

export const postResponseSelect: ObjectToBooleans<Post> = {
	id: true,
	title: true,
	body: true,
	draft: true,
	authorId: true,
	createdAt: true,
	updatedAt: true,
	rating: true,
};

export const postsQuerySchema = yup.object({}).shape({
	take: yup.number().positive().max(50).notRequired(),
	cursor: yup.number().positive().notRequired(),
	authorId: yup.number().notRequired(),
	createdAt: orderBySchema.notRequired(),
	draft: yup.boolean().notRequired(),
});

export type PostsQuery = MakeUndefinesOptional<
	yup.InferType<typeof postsQuerySchema>
>;

export type PostsResponse = {
	posts: PostWithUserResponse[];
	nextCursor?: number;
};

export const createPostSchema = yup.object({}).shape({
	title: yup.string().trim().required(),
	body: yup.string().trim().required(),
	draft: yup.boolean().optional(),
});

export type CreatePost = yup.Asserts<typeof createPostSchema>;

export const updatePostSchema = yup.object({}).shape({
	id: yup.number().required(),
	title: yup.string().trim(),
	body: yup.string().trim(),
});

export type UpdatePost = yup.Asserts<typeof updatePostSchema>;

export const ratePostSchema = yup.object({}).shape({
	rating: yup.number().oneOf([-1, 1]).required(),
});

export type RatePostSchema = yup.Asserts<typeof ratePostSchema>;
