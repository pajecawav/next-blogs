import { signupSchema } from "@/lib/schemas/auth";
import { UserResponse } from "@/lib/schemas/user";
import axios, { AxiosError } from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import * as yup from "yup";
import { Button } from "./Button";
import { FormError } from "./FormError";
import { Input } from "./Input";

type Props = { autofocus?: boolean };

const validationSchema = signupSchema.concat(
	yup.object({
		passwordRepeat: yup
			.string()
			.equals([yup.ref("password")], "Passwords must match"),
	})
);

export const SignupForm: React.FC<Props> = ({ autofocus }) => {
	const queryClient = useQueryClient();

	const {
		mutate: signup,
		error,
		isError,
	} = useMutation<
		unknown,
		Error,
		{
			username: string;
			password: string;
		}
	>(
		({ username, password }) => {
			return axios
				.post<UserResponse>("/api/auth/signup", {
					username,
					password,
				})
				.then(response => response.data)
				.catch(e => {
					throw new Error((e as AxiosError).response?.data.error);
				});
		},
		{
			onSuccess: user => {
				queryClient.setQueryData("me", user);
			},
		}
	);

	return (
		<Formik
			initialValues={{ username: "", password: "", passwordRepeat: "" }}
			onSubmit={(values, { setSubmitting }) => {
				signup(
					{ ...values },
					{
						onSettled: () => {
							setSubmitting(false);
						},
					}
				);
			}}
			validationSchema={validationSchema}
			validateOnBlur={false}
		>
			{({ isSubmitting }) => (
				<Form className="flex flex-col gap-1">
					<Field
						name="username"
						type="text"
						placeholder="username"
						autoFocus={autofocus}
						component={Input}
					/>
					<ErrorMessage name="username" component={FormError} />

					<Field
						name="password"
						type="password"
						placeholder="password"
						component={Input}
					/>
					<ErrorMessage name="password" component={FormError} />

					<Field
						name="passwordRepeat"
						type="password"
						placeholder="repeat password"
						component={Input}
					/>
					<ErrorMessage name="passwordRepeat" component={FormError} />

					{isError && <FormError>{error?.message}</FormError>}

					<Button
						type="submit"
						disabled={isSubmitting}
						isProcessing={isSubmitting}
					>
						Sign Up
					</Button>
				</Form>
			)}
		</Formik>
	);
};
