import * as yup from "yup";

export const loginSchema = yup.object({
	username: yup.string().required(),
	password: yup.string().required(),
});

export type LoginSchema = typeof loginSchema;

// TODO: username validation
export const signupSchema = yup.object({
	username: yup.string().required(),
	password: yup.string().required(),
});

export type SignupSchema = typeof signupSchema;
