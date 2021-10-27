import { useLogin } from "@/hooks/useLogin";
import { LoginSchema } from "@/lib/schemas/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { Button } from "./Button";
import { FormError } from "./FormError";
import { Input } from "./Input";

type Props = { autofocus?: boolean };

const validationSchema: LoginSchema = yup.object({
	username: yup.string().required("Username is required"),
	password: yup.string().required("Password is required"),
});

export const LoginForm: React.FC<Props> = ({ autofocus }) => {
	const { login, isError, error } = useLogin();

	return (
		<Formik
			initialValues={{ username: "", password: "" }}
			onSubmit={(values, { setSubmitting }) => {
				login(
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

					{isError && <FormError>{error!.message}</FormError>}

					<Button
						type="submit"
						disabled={isSubmitting}
						isProcessing={isSubmitting}
					>
						Log In
					</Button>
				</Form>
			)}
		</Formik>
	);
};
