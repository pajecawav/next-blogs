import { Popover, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

export const UnauthenticatedDropdownMenu: React.FC = () => {
	const [showLogInForm, setShowLogInForm] = useState(true);

	return (
		<Popover className="relative">
			<Popover.Button className="transition-opacity duration-100 hover:opacity-50">
				Log in
			</Popover.Button>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-200"
				enterFrom="opacity-0 translate-y-1"
				leave="transition ease-in duration-100"
				leaveTo="opacity-0 translate-y-1"
			>
				<Popover.Panel className="w-48 shadow-lg absolute z-10 mt-4 p-2 transform -translate-x-full left-full border bg-white rounded-sm">
					{showLogInForm ? (
						<LoginForm autofocus />
					) : (
						<SignupForm autofocus />
					)}

					<button
						className="mt-2 transition-opacity duration-100 hover:opacity-50"
						onClick={() => setShowLogInForm(!showLogInForm)}
					>
						{showLogInForm ? "Sign Up" : "Log In"}
					</button>
				</Popover.Panel>
			</Transition>
		</Popover>
	);
};
