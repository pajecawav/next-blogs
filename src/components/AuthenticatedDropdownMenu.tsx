import { useLogout } from "@/hooks/useLogout";
import { useUser } from "@/hooks/useUser";
import { Popover, Transition } from "@headlessui/react";
import { LogoutIcon, UserIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React, { Fragment } from "react";
import { UserLink } from "./UserLink";

export const AuthenticatedDropdownMenu: React.FC = () => {
	const { user } = useUser();
	const { logout } = useLogout();

	return (
		<Popover className="relative">
			<Popover.Button className="transition-opacity duration-100 hover:opacity-50">
				{user!.username}
			</Popover.Button>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-50"
				enterFrom="opacity-0 translate-y-0.5"
				leave="transition ease-in duration-50"
				leaveTo="opacity-0 translate-y-0.5"
			>
				<Popover.Panel className="flex flex-col shadow-lg absolute z-10 mt-4 py-1 px-2 w-40 transform -translate-x-full left-full border bg-white rounded-sm">
					<Link href="/create-post">
						<a className="flex gap-1 items-center text-left px-2 py-1 rounded-md transition-colors duration-100 hover:bg-gray-200">
							<span>New Post</span>
						</a>
					</Link>
					<UserLink username={user!.username}>
						<a className="flex gap-1 items-center text-left px-2 py-1 rounded-md transition-colors duration-100 hover:bg-gray-200">
							<UserIcon className="inline w-5 h-5" />
							<span>My profile</span>
						</a>
					</UserLink>
					<button
						className="flex gap-1 items-center text-left px-2 py-1 rounded-md transition-colors duration-100 hover:bg-gray-200"
						onClick={() => logout()}
					>
						<LogoutIcon className="inline w-5 h-5" />
						<span>Log out</span>
					</button>
				</Popover.Panel>
			</Transition>
		</Popover>
	);
};
