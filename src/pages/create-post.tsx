import { EditPostForm } from "@/components/EditPostForm";
import { UnauthenticatedError } from "@/components/UnauthenticatedError";
import { useUser } from "@/hooks/useUser";
import { CreatePost, PostResponse } from "@/lib/schemas/post";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useMutation } from "react-query";

const CreatePostPage: NextPage = () => {
	const { isLoggedIn } = useUser();
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

	return !isLoggedIn ? (
		<UnauthenticatedError />
	) : (
		<div className="w-full max-w-3xl mx-auto bg-white pt-3 pb-5 px-5 rounded shadow-sm">
			<EditPostForm
				initialValues={{ title: "", body: "" }}
				onSubmit={values => {
					createPost(values);
				}}
				submitText="Submit"
			/>
		</div>
	);
};

export default CreatePostPage;
