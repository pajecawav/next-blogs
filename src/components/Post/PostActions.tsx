import { PostWithUserResponse } from "@/lib/schemas/post";
import { Menu, Transition } from "@headlessui/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, Fragment, useState } from "react";
import { DeletePostConfirmation } from "../DeletePostCofirmation";

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
				<Menu.Items className="absolute left-0 origin-top-left flex flex-col shadow-lg z-10 py-1 px-2 w-40 border bg-white rounded-md">
					<Menu.Item>
						{({ active }) => (
							<Link href={`/edit-post/${post.id}`}>
								<a
									className={classNames(
										"flex gap-2 items-center text-left px-2 py-1 rounded-md hover:bg-gray-200",
										active && "bg-gray-200"
									)}
								>
									<PencilIcon className="inline w-4 h-4" />
									<span>Edit</span>
								</a>
							</Link>
						)}
					</Menu.Item>
					<Menu.Item>
						{({ active }) => (
							<button
								className={classNames(
									"flex gap-2 items-center text-left px-2 py-1 rounded-md hover:bg-gray-200",
									active && "bg-gray-200"
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
