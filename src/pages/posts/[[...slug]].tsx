import { LoadingPlaceholder } from "@/components/LoadingPlaceholder";
import { Post } from "@/components/Post";
import { PostActions } from "@/components/Post/PostActions";
import { TableOfContents } from "@/components/Post/TableOfContents";
import { UpvoteButtons } from "@/components/Post/UpvoteButtons";
import { UserLink } from "@/components/UserLink";
import { useUser } from "@/hooks/useUser";
import { formatDate } from "@/lib/dates";
import { PostWithUserResponse } from "@/lib/schemas/post";
import { useTocStore } from "@/stores/useTocStore";
import { Menu } from "@headlessui/react";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import axios from "axios";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { useQuery } from "react-query";

const PostPage: React.FC = () => {
	const { user } = useUser();
	const router = useRouter();
	const postRef = useRef<HTMLDivElement>(null);
	const setCurrentHeading = useTocStore(store => store.setCurrentHeading);

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

	useEffect(() => {
		if (post && postRef.current) {
			const elements = postRef.current.querySelectorAll(
				"h1, h2, h3, h4, h5, h6"
			);

			const observer = new IntersectionObserver(
				entries => {
					entries.forEach(entry => {
						if (entry.isIntersecting && entry.target.id) {
							setCurrentHeading(entry.target.id);
						}
					});
				},
				{ rootMargin: `0% 0% -80% 0%` }
			);

			elements.forEach(elem => {
				observer.observe(elem);
			});

			return () => {
				elements.forEach(elem => {
					observer.unobserve(elem);
				});
			};
		}
	}, [post, postRef, setCurrentHeading]);

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
		<>
			<Head>
				<title>{post.title}</title>
			</Head>
			<div className="w-full max-w-[96rem] mx-auto flex gap-2 md:px-2">
				<div className="w-72 flex-shrink-0 hidden lg:block">
					<div className="px-4 py-2 bg-white rounded-md sticky top-20">
						<TableOfContents title={post.title} text={post.body} />
					</div>
				</div>
				<div
					className="min-w-0 max-w-60 flex-grow flex-shrink pt-4 pb-4 px-2 bg-white shadow-sm rounded-md md:px-6"
					ref={postRef}
				>
					<div className="flex gap-4 mb-8">
						<div className="flex flex-col gap-4 flex-grow">
							<h1 className="text-4xl">
								{post.draft && (
									<span className="text-gray-400">
										[Draft]{" "}
									</span>
								)}
								{post.title}
							</h1>
							<div className="space-x-2">
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
									<Menu as="span" className="relative">
										<Menu.Button className="align-middle">
											<DotsHorizontalIcon className="w-5 h-5 text-gray-400" />
										</Menu.Button>
										<PostActions
											post={post}
											// TODO: use 'left' for mobile and 'right' otherwise
											position="left"
										/>
									</Menu>
								)}
							</div>
						</div>
						<UpvoteButtons
							postId={post.id}
							rating={post.rating}
							placedRating={post.placedRating}
						/>
					</div>
					<article>
						<Post>{post.body}</Post>
					</article>
				</div>
				<div className="w-72 flex-shrink-0 hidden xl:block" />
			</div>
		</>
	);
};

export default PostPage;
