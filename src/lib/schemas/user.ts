import * as yup from "yup";
import { ObjectToBooleans } from "../types";

export const userResponseSchema = yup.object({
	id: yup.number().required(),
	username: yup.string().required(),
	bio: yup.string().nullable(true),
	createdAt: yup.date().required(),
});

export type UserResponse = yup.Asserts<typeof userResponseSchema>;

export const userResponseSelect: ObjectToBooleans<UserResponse> = {
	id: true,
	username: true,
	bio: true,
	createdAt: true,
};

export const userStatsSchema = yup.object({
	rating: yup.number().required(),
	posts: yup.number().required(),
});

export type UserStats = yup.Asserts<typeof userStatsSchema>;
