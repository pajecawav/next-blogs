import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { CreatePost, createPostSchema } from "@/lib/schemas/post";
import { Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import { Post } from "./Post";

type Props = {
	initialValues: CreatePost;
	onSubmit: (
		values: CreatePost,
		formikHelpers: FormikHelpers<CreatePost>
	) => void | Promise<any>;
	submitText: string;
};

export const EditPostForm: React.FC<Props> = ({
	initialValues,
	onSubmit,
	submitText,
}) => {
	const [preview, setPreview] = useState(false);

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={createPostSchema}
			validateOnBlur={false}
			validateOnMount
		>
			{({ isSubmitting, isValid, values }) => (
				<Form className="flex flex-col gap-4">
					{preview ? (
						<Post>{values.body}</Post>
					) : (
						<>
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
						</>
					)}

					<div className="flex gap-4">
						<Button
							type="button"
							secondary={true}
							onClick={() => setPreview(!preview)}
						>
							{preview ? "Edit" : "Preview"}
						</Button>

						<Button
							className="ml-auto"
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
