import { useUser } from "@/hooks/useUser";
import React, { PropsWithChildren } from "react";
import { Header } from "./Header";
import { LoadingPlaceholder } from "./LoadingPlaceholder";

type Props = PropsWithChildren<{}>;

export const Layout: React.FC<Props> = ({ children }) => {
	const { isLoading } = useUser();

	if (isLoading) {
		return (
			<div className="w-screen h-screen grid place-items-center">
				<LoadingPlaceholder className="h-10 w-10" />
			</div>
		);
	}

	return (
		<div>
			<Header />
			<div className="mx-auto mt-3 mb-1 px-1 md:px-0 md:mt-10 md:mb-8">
				{children}
			</div>
		</div>
	);
};
