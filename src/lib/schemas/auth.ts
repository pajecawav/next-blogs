import * as yup from "yup";

export const loginSchema = yup.object({
	username: yup.string().required("Username is required"),
	password: yup.string().required("Password is required"),
});

export const signupSchema = yup.object({
	username: yup
		.string()
		.max(60, "Should be shorter than 60 character")
		.matches(/^[a-zA-Z0-9]+$/, "Should only contain letters and digits")
		.required("Username is required"),
	password: yup
		.string()
		.max(60, "Should be shorter than 60 character")
		.required("Password is required"),
});
