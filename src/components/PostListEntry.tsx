import { formatShortTimeAgo } from "@/lib/dates";
import { PostWithUserResponse } from "@/lib/schemas/post";
import { Menu } from "@headlessui/react";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { PostActions } from "./Post/PostActions";
import { Postlink } from "./PostLink";
import { UserLink } from "./UserLink";
import { UserPreviewPopover } from "./UserPreviewPopover";

type PostListEntryProps = {
	post: PostWithUserResponse;
	showActions?: boolean;
	showAuthor?: boolean;
};

export const PostListEntry: React.FC<PostListEntryProps> = ({
	post,
	showActions = false,
	showAuthor = true,
}) => {
	const [showPreview, setShowPreview] = useState(false);

	const createdAt = new Date(post.createdAt);

	return (
		<li className="relative flex justify-between items-center px-3 py-3 gap-2 group hover:bg-gray-50">
			<span className="w-5 text-gray-500 mr-1 text-sm text-center">
				{post.rating}
			</span>
			<span className="flex-grow truncate">
				<Postlink id={post.id} title={post.title}>
					<a className="hover:opacity-50 ">{post.title}</a>
				</Postlink>
			</span>
			{showAuthor && (
				<div className="relative">
					<div
						onMouseEnter={() => setShowPreview(true)}
						onMouseLeave={() => setShowPreview(false)}
					>
						<UserLink
							username={post.author.username}
							className="text-sm text-gray-500 hover:opacity-50"
						>
							{post.author.username}
						</UserLink>
					</div>
					{showPreview && <UserPreviewPopover id={post.authorId} />}
				</div>
			)}
			<span
				className="text-sm"
				title={`Created at ${createdAt.toLocaleString()}`}
			>
				{formatShortTimeAgo(createdAt)}
			</span>

			{showActions && (
				<Menu
					as="div"
					className="relative md:absolute md:-right-7 md:pl-2 top-0 bottom-0"
				>
					<Menu.Button className="h-full align-middle">
						<DotsHorizontalIcon className="w-5 h-5 text-gray-400 transition-opacity duration-100 rotate-0 md:opacity-0 md:rotate-90 group-hover:opacity-100" />
					</Menu.Button>
					<PostActions post={post} position="left" />
				</Menu>
			)}
		</li>
	);
};
