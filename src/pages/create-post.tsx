import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { CreatePost, createPostSchema, PostResponse } from "@/lib/schemas/post";
import axios from "axios";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useMutation } from "react-query";

const CreatePostPage: NextPage = () => {
	const router = useRouter();

	const { mutate: createPost } = useMutation(
		(data: CreatePost) => {
			return axios
				.post<PostResponse>("/api/posts", data)
				.then(response => response.data);
		},
		{
			onSuccess: (post: PostResponse) => {
				router.replace(`/posts/${post.id}`);
			},
		}
	);

	return (
		<div className="bg-white pt-3 pb-5 px-5 rounded shadow-sm">
			<Formik
				initialValues={{ title: "", body: "" }}
				onSubmit={values => {
					createPost(values);
				}}
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
								Submit
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default CreatePostPage;
