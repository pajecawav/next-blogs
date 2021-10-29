import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { createPostSchema } from "@/lib/schemas/post";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import React from "react";

type Props<Values extends FormikValues = FormikValues> = {
	initialValues: Values;
	onSubmit: (
		values: Values,
		formikHelpers: FormikHelpers<Values>
	) => void | Promise<any>;
	submitText: string;
};

export const EditPostForm = <V,>({
	initialValues,
	onSubmit,
	submitText,
}: Props<V>) => {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={createPostSchema}
			validateOnBlur={false}
			validateOnMount
		>
			{({ isSubmitting, isValid }) => (
				<Form className="flex flex-col gap-4">
					<Input
						className="text-3xl"
						flat
						name="title"
						type="text"
						placeholder="Title"
					/>

					<Textarea
						name="body"
						minRows={6}
						flat
						placeholder="Write here"
					/>

					<div>
						<Button
							type="submit"
							disabled={!isValid || isSubmitting}
							isProcessing={isSubmitting}
						>
							{submitText}
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};
