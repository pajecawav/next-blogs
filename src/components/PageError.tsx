import classNames from "classnames";
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
	className?: string;
}>;

export const PageError: React.FC<Props> = ({ className, children }) => {
	return (
		<div
			className={classNames(
				"text-center text-3xl text-red-500",
				className
			)}
		>
			{children}
		</div>
	);
};
