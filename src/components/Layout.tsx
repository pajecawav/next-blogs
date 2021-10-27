import { useUser } from "@/hooks/useUser";
import React, { PropsWithChildren } from "react";
import { Header } from "./Header";
import { LoadingPlaceholder } from "./LoadingPlaceholder";

type Props = PropsWithChildren<{}>;

export const Layout: React.FC<Props> = ({ children }) => {
	const { isLoading } = useUser();

	if (isLoading) {
		return (
			<div className="w-screen h-screen grid place-items-center text-red-200">
				<LoadingPlaceholder className="h-10 w-10" />
			</div>
		);
	}

	return (
		<div>
			<Header />
			<div className="w-full max-w-3xl mx-auto mt-4 px-1 md:px-0">
				{children}
			</div>
		</div>
	);
};
