import { PostWithUserResponse } from "@/lib/schemas/post";
import { Menu, Transition } from "@headlessui/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { FC, Fragment, useState } from "react";
import { DeletePostConfirmation } from "../DeletePostCofirmation";
import { MenuItemIcon } from "../MenuItemIcon";
import { WrappedLink } from "../WrappedLink";

type Props = {
	post: PostWithUserResponse;
	position?: "left" | "right";
};

export const PostActions: FC<Props> = ({ post, position = "left" }) => {
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);

	const router = useRouter();

	return (
		<>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-50"
				enterFrom="opacity-0 translate-y-0.5"
				leave="transition ease-in duration-50"
				leaveTo="opacity-0 translate-y-0.5"
			>
				<Menu.Items
					className={classNames(
						"absolute origin-top-left flex flex-col shadow-lg z-10 py-1 w-40 border bg-white rounded-md text-xl sm:text-base",
						position === "left" ? "right-0" : "left-0"
					)}
				>
					<Menu.Item>
						{({ active }) => (
							<WrappedLink
								href={`/edit-post/${post.id}`}
								className={classNames(
									"flex gap-2 items-center text-left px-2 py-1",
									active && "bg-gray-100"
								)}
							>
								<MenuItemIcon icon={PencilIcon} />
								<span>Edit</span>
							</WrappedLink>
						)}
					</Menu.Item>
					<Menu.Item>
						{({ active }) => (
							<button
								className={classNames(
									"flex gap-2 items-center text-left px-2 py-1",
									active && "bg-gray-100"
								)}
								onClick={() => setIsDeleteOpen(true)}
							>
								<MenuItemIcon icon={TrashIcon} />
								<span>Delete</span>
							</button>
						)}
					</Menu.Item>
				</Menu.Items>
			</Transition>

			<DeletePostConfirmation
				postId={post.id}
				isOpen={isDeleteOpen}
				onClose={() => setIsDeleteOpen(false)}
				onDelete={() => {
					// TODO: post can be cached in 'posts' query
					router.replace("/");
				}}
			/>
		</>
	);
};
