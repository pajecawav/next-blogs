import * as yup from "yup";
import { ObjectToOptionalBooleans } from "../types";

export const userResponseSchema = yup.object({
	id: yup.number().required(),
	username: yup.string().required(),
	bio: yup.string().nullable(true),
	createdAt: yup.date().required(),
});

export type UserResponse = yup.Asserts<typeof userResponseSchema>;

export const userResponseSelect: ObjectToOptionalBooleans<UserResponse> = {
	id: true,
	username: true,
	bio: true,
	createdAt: true,
};
