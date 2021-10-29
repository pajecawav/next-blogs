import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { AuthenticatedDropdownMenu } from "./AuthenticatedDropdownMenu";
import { UnauthenticatedDropdownMenu } from "./UnauthenticatedDropdownMenu";

export const Header: React.FC = () => {
	const { isLoggedIn } = useUser();

	return (
		<header className="flex px-4 md:px-8 py-2 items-center sticky top-0 shadow-sm bg-white z-30">
			<Link href="/">
				<a className="text-2xl transition-opacity duration-100 hover:opacity-50">
					Blogs
				</a>
			</Link>

			<div className="ml-auto flex gap-2 items-center justify-between">
				{isLoggedIn ? (
					<AuthenticatedDropdownMenu />
				) : (
					<UnauthenticatedDropdownMenu />
				)}
			</div>
		</header>
	);
};
