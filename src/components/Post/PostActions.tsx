import { PostWithUserResponse } from "@/lib/schemas/post";
import { Menu, Transition } from "@headlessui/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import { useRouter } from "next/router";
import { FC, Fragment, useState } from "react";
import { DeletePostConfirmation } from "../DeletePostCofirmation";
import { WrappedLink } from "../WrappedLink";

type Props = {
	post: PostWithUserResponse;
};

export const PostActions: FC<Props> = ({ post }) => {
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
				<Menu.Items className="absolute left-0 origin-top-left flex flex-col shadow-lg z-10 py-1 w-40 border bg-white rounded-md">
					<Menu.Item>
						{({ active }) => (
							<WrappedLink
								href={`/edit-post/${post.id}`}
								className={classNames(
									"flex gap-2 items-center text-left px-2 py-1",
									active && "bg-gray-100"
								)}
							>
								<PencilIcon className="inline w-4 h-4" />
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
								<TrashIcon className="inline w-4 h-4" />
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
