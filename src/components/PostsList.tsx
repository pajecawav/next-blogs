import { PostsQuery, PostWithUserResponse } from "@/lib/schemas/post";
import axios from "axios";
import classNames from "classnames";
import React from "react";
import { useQuery } from "react-query";
import { LoadingPlaceholder } from "./LoadingPlaceholder";
import { PostListEntry } from "./PostListEntry";

type Props = {
	query?: PostsQuery;
	showAuthor?: boolean;
};

export const PostsList: React.FC<Props> = ({ query, showAuthor = true }) => {
	// TODO: 'load more' button

	const { data: posts, isLoading } = useQuery<PostWithUserResponse[]>(
		["posts", query],
		() => {
			// TODO: convert to reusable function?
			return axios
				.get<PostWithUserResponse[]>("/api/posts", { params: query })
				.then(response => response.data);
		},
		{ staleTime: 5 * 60 * 1000 }
	);

	return isLoading ? (
		<div className="grid place-items-center h-24">
			<LoadingPlaceholder className="w-8 my-4 mx-auto" />
		</div>
	) : (
		<ol
			className={classNames(
				"divide-y divide-gray-200 rounded",
				posts?.length && "bg-white shadow-sm"
			)}
		>
			{posts?.map(post => (
				<PostListEntry
					post={post}
					showAuthor={showAuthor}
					key={post.id}
				/>
			))}
			{posts && posts.length === 0 && (
				<div className="h-28 ml-3 text-gray-500 italic">
					No posts to display
				</div>
			)}
		</ol>
	);
};
