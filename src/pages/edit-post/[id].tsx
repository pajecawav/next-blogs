import { Post } from ".prisma/client";
import { EditPostForm } from "@/components/EditPostForm";
import { PageError } from "@/components/PageError";
import { UnauthenticatedError } from "@/components/UnauthenticatedError";
import { useUser } from "@/hooks/useUser";
import { getCurrentUser } from "@/lib/api/utils";
import { CreatePost, UpdatePost } from "@/lib/schemas/post";
import { GetServersidePropsIronContext, withSession } from "@/lib/session";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useMutation } from "react-query";
import * as yup from "yup";
import db from "prisma/client";

type Props = {
	error?: string;
	post: Post;
};

const EditPostPage: NextPage<Props> = ({ error, post }) => {
	const { isLoggedIn } = useUser();
	const router = useRouter();

	const { mutate: editPost } = useMutation(
		(data: CreatePost) => {
			return axios.patch<unknown, unknown, UpdatePost>("/api/posts", {
				id: post.id,
				...data,
			});
		},
		{
			onSuccess: () => {
				router.replace(`/posts/${post.id}`);
			},
		}
	);

	if (!isLoggedIn) {
		return <UnauthenticatedError />;
	}

	if (error) {
		return <PageError>{error}</PageError>;
	}

	return (
		<div className="bg-white pt-3 pb-5 px-5 rounded shadow-sm">
			<EditPostForm
				initialValues={{
					title: post.title,
					body: post.body,
				}}
				onSubmit={values => {
					editPost(values);
				}}
				submitText="Save"
			/>
		</div>
	);
};

const paramsSchema = yup.object({ id: yup.number().required() });

export const getServerSideProps = withSession(
	async (context: GetServersidePropsIronContext) => {
		let params;
		try {
			params = await paramsSchema.validate(context.params);
		} catch (e) {
			return { notFound: true };
		}
		const { id } = params;

		const user = await getCurrentUser(context.req.session);
		const post = await db.post.findFirst({
			where: { id },
		});

		if (!post) {
			return { notFound: true };
		}

		if (!user || post.authorId !== user.id) {
			return {
				props: {
					error: "Not authorized to edit this post",
				},
			};
		}

		return {
			props: {
				post,
			},
		};
	}
);

export default EditPostPage;
