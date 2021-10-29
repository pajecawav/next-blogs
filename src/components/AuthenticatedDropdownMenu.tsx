import { useLogout } from "@/hooks/useLogout";
import { useUser } from "@/hooks/useUser";
import { Menu, Transition } from "@headlessui/react";
import { LogoutIcon, UserIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import React, { Fragment } from "react";
import { UserLink } from "./UserLink";
import { WrappedLink } from "./WrappedLink";

export const AuthenticatedDropdownMenu: React.FC = () => {
	const { user } = useUser();
	const { logout } = useLogout();

	return (
		<Menu as="span" className="relative">
			<Menu.Button className="transition-opacity duration-100 hover:opacity-50">
				{user!.username}
			</Menu.Button>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-50"
				enterFrom="opacity-0 translate-y-0.5"
				leave="transition ease-in duration-50"
				leaveTo="opacity-0 translate-y-0.5"
			>
				<Menu.Items className="flex flex-col shadow-lg absolute z-10 mt-4 py-1 px-2 w-40 transform -translate-x-full left-full border bg-white rounded-sm">
					<Menu.Item>
						{({ active }) => (
							<WrappedLink
								href="/create-post"
								className={classNames(
									"flex gap-1 items-center text-left px-2 py-1 rounded-md transition-colors duration-100",
									active && "bg-gray-200"
								)}
							>
								New Post
							</WrappedLink>
						)}
					</Menu.Item>
					<Menu.Item>
						{({ active }) => (
							<UserLink
								username={user!.username}
								className={classNames(
									"flex gap-1 items-center text-left px-2 py-1 rounded-md transition-colors duration-100",
									active && "bg-gray-200"
								)}
							>
								<UserIcon className="inline w-5 h-5" />
								<span>My profile</span>
							</UserLink>
						)}
					</Menu.Item>
					<Menu.Item>
						{({ active }) => (
							<button
								className={classNames(
									"flex gap-1 items-center text-left px-2 py-1 rounded-md transition-colors duration-100",
									active && "bg-gray-200"
								)}
								onClick={() => logout()}
							>
								<LogoutIcon className="inline w-5 h-5" />
								<span>Log out</span>
							</button>
						)}
					</Menu.Item>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};
