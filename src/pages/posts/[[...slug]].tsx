import { Post } from "@/components/Post";
import { PostActions } from "@/components/Post/PostActions";
import { TableOfContents } from "@/components/Post/TableOfContents";
import { UserLink } from "@/components/UserLink";
import { useUser } from "@/hooks/useUser";
import { formatDate } from "@/lib/dates";
import { PostWithUserResponse } from "@/lib/schemas/post";
import { Menu } from "@headlessui/react";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { GetServerSideProps } from "next";
import Head from "next/head";
import db from "prisma/client";
import React from "react";

type Props = {
	post: PostWithUserResponse;
};

const PostPage: React.FC<Props> = ({ post }) => {
	const { user } = useUser();

	const isMyPost = post.authorId === user?.id;

	return (
		<>
			<Head>
				<title>{post.title}</title>
			</Head>
			<div className="w-full max-w-[96rem] mx-auto flex gap-2 px-2">
				<div className="w-72 flex-shrink-0 hidden lg:block">
					<div className="px-4 py-2 bg-white rounded-md sticky top-20">
						<TableOfContents title={post.title} text={post.body} />
					</div>
				</div>
				<div className="max-w-60 flex-grow flex-shrink pt-4 pb-4 px-6 bg-white shadow-sm rounded-md">
					<h1 className="text-4xl mb-3">{post.title}</h1>
					<article>
						<div className="flex gap-4 items-center mb-8">
							<span>
								by{" "}
								<UserLink
									username={post.author.username}
									className="font-bold hover:opacity-50"
								>
									{post.author.username}
								</UserLink>
							</span>
							<span
								className="text-gray-400 text-sm"
								title={`Created at ${post.createdAt.toLocaleString()}`}
							>
								{formatDate(post.createdAt)}
							</span>
							{isMyPost && (
								<Menu as="div" className="relative">
									<Menu.Button className="align-middle">
										<DotsHorizontalIcon className="w-5 h-5 text-gray-400" />
									</Menu.Button>
									<PostActions post={post} position="right" />
								</Menu>
							)}
						</div>
						<Post>{post.body}</Post>
					</article>
				</div>
				<div className="w-72 flex-shrink-0 hidden xl:block" />
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
