import { PostsQuery, PostsResponse } from "@/lib/schemas/post";
import axios from "axios";
import classNames from "classnames";
import React, { Fragment } from "react";
import { useInfiniteQuery } from "react-query";
import { LoadingPlaceholder } from "./LoadingPlaceholder";
import { PostListEntry } from "./PostListEntry";

type Props = {
	query?: PostsQuery;
	showAuthor?: boolean;
};

export const PostsList: React.FC<Props> = ({ query, showAuthor = true }) => {
	const {
		data: posts,
		isLoading,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery<PostsResponse>(
		["posts", query],
		({ pageParam: cursor = undefined }) => {
			// TODO: convert to reusable function?
			return axios
				.get<PostsResponse>("/api/posts", {
					params: { ...query, cursor },
				})
				.then(response => response.data);
		},
		{
			getNextPageParam: lastPage => lastPage.nextCursor ?? false,
			staleTime: 5 * 60 * 1000,
		}
	);

	const isEmpty =
		!isLoading && !isFetchingNextPage && posts?.pages[0].posts.length === 0;

	return (
		<div>
			<ol
				className={classNames(
					"divide-y divide-gray-200 rounded",
					!isEmpty && "bg-white shadow-sm"
				)}
			>
				{posts?.pages?.map((group, index) => (
					<Fragment key={index}>
						{group.posts.map(post => (
							<PostListEntry
								post={post}
								showAuthor={showAuthor}
								key={post.id}
							/>
						))}
					</Fragment>
				))}

				{isEmpty && (
					<div className="h-28 ml-3 text-gray-500 italic">
						No posts to display
					</div>
				)}
			</ol>

			{(isLoading || isFetchingNextPage) && (
				<div
					className={classNames(
						"grid place-items-center",
						isLoading ? "h-24" : "h-18"
					)}
				>
					<LoadingPlaceholder className="w-8 my-4 mx-auto" />
				</div>
			)}

			{hasNextPage && !isFetchingNextPage && (
				<button
					className="ml-1 mt-2 text-gray-500 transition-opacity duration-75 hover:opacity-50"
					onClick={() => fetchNextPage()}
				>
					Load more
				</button>
			)}
		</div>
	);
};
