import { LoadingPlaceholder } from "@/components/LoadingPlaceholder";
import { Post } from "@/components/Post";
import { PostActions } from "@/components/Post/PostActions";
import { TableOfContents } from "@/components/Post/TableOfContents";
import { UserLink } from "@/components/UserLink";
import { TocProvider } from "@/contexts/TocContext";
import { useUser } from "@/hooks/useUser";
import { formatDate } from "@/lib/dates";
import { PostWithUserResponse } from "@/lib/schemas/post";
import { Menu } from "@headlessui/react";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import axios from "axios";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";

const PostPage: React.FC = () => {
	const { user } = useUser();
	const router = useRouter();

	const slug = router.query.slug as string[];
	const postId = parseInt(slug?.[0], 10);

	const {
		data: post,
		isLoading,
		isError,
	} = useQuery<PostWithUserResponse>(["post", postId], async () =>
		axios
			.get<PostWithUserResponse>(`/api/posts/${postId}`)
			.then(response => response.data)
	);

	if (isError) {
		// TODO: extract status code?
		return <DefaultErrorPage statusCode={404} />;
	}

	if (isLoading || !post) {
		return (
			<div className="w-screen h-40 grid place-items-center">
				<LoadingPlaceholder className="h-10 w-10" />
			</div>
		);
	}

	const isMyPost = post && user && post.authorId === user.id;

	return (
		<TocProvider>
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
		</TocProvider>
	);
};

export default PostPage;
