import { Post } from "@/components/Post";
import { UserLink } from "@/components/UserLink";
import { formatDate } from "@/lib/dates";
import { PostWithUserResponse } from "@/lib/schemas/post";
import { GetServerSideProps } from "next";
import Head from "next/head";
import db from "prisma/client";
import React from "react";

type Props = {
	post: PostWithUserResponse;
};

const PostPage: React.FC<Props> = ({ post }) => {
	return (
		<>
			<Head>
				<title>{post.title}</title>
			</Head>
			<div className="pt-4 pb-4 px-6 bg-white shadow-sm">
				<h1 className="text-4xl mb-3">{post.title}</h1>
				<article className="bg-white prose-sm">
					<div className="flex gap-5 items-center mb-8">
						<span>
							by{" "}
							<UserLink username={post.author.username}>
								<a className="font-bold hover:opacity-50">
									{post.author.username}
								</a>
							</UserLink>
						</span>
						<span
							className="text-gray-400 text-sm"
							title={`Created at ${post.createdAt.toLocaleString()}`}
						>
							{formatDate(post.createdAt)}
						</span>
					</div>
					<Post>{post.body}</Post>
				</article>
			</div>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async context => {
	// allow urls in the form of '/:id/:post-title'
	const slug = context.params!.slug as string[] | undefined;
	if (!slug || slug.length > 2) {
		return { notFound: true };
	}

	const id = parseInt(slug[0], 10);

	if (Number.isNaN(id)) {
		return { notFound: true };
	}

	const post = await db.post.findUnique({
		where: { id },
		include: { author: true },
	});

	if (!post) {
		return { notFound: true };
	}

	return {
		props: {
			post,
		},
	};
};

export default PostPage;
