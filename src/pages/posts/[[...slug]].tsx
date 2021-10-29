import { Post } from "@/components/Post";
import { UserLink } from "@/components/UserLink";
import { useUser } from "@/hooks/useUser";
import { formatDate } from "@/lib/dates";
import { PostWithUserResponse } from "@/lib/schemas/post";
import { Menu, Transition } from "@headlessui/react";
import { DotsHorizontalIcon, PencilIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import db from "prisma/client";
import React, { Fragment } from "react";

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
			<div className="pt-4 pb-4 px-6 bg-white shadow-sm">
				<h1 className="text-4xl mb-3">{post.title}</h1>
				<article className="bg-white prose-sm">
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
								<Transition
									as={Fragment}
									enter="transition ease-out duration-50"
									enterFrom="opacity-0 translate-y-0.5"
									leave="transition ease-in duration-50"
									leaveTo="opacity-0 translate-y-0.5"
								>
									<Menu.Items className="absolute right-0 origin-top-right flex flex-col shadow-lg z-10 py-1 px-2 w-40 border bg-white rounded-md">
										<Menu.Item>
											{({ active }) => (
												<Link
													href={`/edit-post/${post.id}`}
												>
													<a
														className={classNames(
															"flex gap-2 items-center text-left px-2 py-1 rounded-md hover:bg-gray-200",
															active &&
																"bg-gray-200"
														)}
													>
														<PencilIcon className="inline w-4 h-4" />
														<span>Edit</span>
													</a>
												</Link>
											)}
										</Menu.Item>
									</Menu.Items>
								</Transition>
							</Menu>
						)}
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
