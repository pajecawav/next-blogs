import { useLogin } from "@/hooks/useLogin";
import { loginSchema } from "@/lib/schemas/auth";
import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import { Button } from "./Button";
import { FormError } from "./FormError";
import { Input } from "./Input";

type Props = { autofocus?: boolean };

const validationSchema = loginSchema;

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
					<Input
						name="username"
						type="text"
						placeholder="username"
						autoFocus={autofocus}
					/>
					<ErrorMessage name="username" component={FormError} />

					<Input
						name="password"
						type="password"
						placeholder="password"
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
