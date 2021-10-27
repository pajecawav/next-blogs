import { formatShortTimeAgo } from "@/lib/dates";
import { PostWithUserResponse } from "@/lib/schemas/post";
import React from "react";
import { Postlink } from "./PostLink";
import { UserLink } from "./UserLink";

type PostListEntryProps = {
	post: PostWithUserResponse;
};

export const PostListEntry: React.FC<PostListEntryProps> = ({ post }) => {
	const createdAt = new Date(post.createdAt);

	return (
		<li className="flex justify-between px-3 py-3 gap-2 hover:bg-gray-50">
			<span className="flex-grow truncate">
				<Postlink id={post.id} title={post.title}>
					<a className="hover:opacity-50 ">{post.title}</a>
				</Postlink>
			</span>
			<UserLink username={post.author.username}>
				<a className="text-sm text-gray-500 hover:opacity-50">
					{post.author.username}
				</a>
			</UserLink>
			<span
				className="text-sm"
				title={`Created at ${createdAt.toLocaleString()}`}
			>
				{formatShortTimeAgo(createdAt)}
			</span>
		</li>
	);
};
