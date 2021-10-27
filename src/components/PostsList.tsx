import { PostWithUserResponse } from "@/lib/schemas/post";
import React from "react";
import { PostListEntry } from "./PostListEntry";

type Props = {
	posts: PostWithUserResponse[];
};

export const PostsList: React.FC<Props> = ({ posts }) => {
	return (
		<ol className="bg-white divide-y rounded shadow-sm">
			{posts.map(post => (
				<PostListEntry post={post} key={post.id} />
			))}
		</ol>
	);
};
