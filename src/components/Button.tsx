import classNames from "classnames";
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { LoadingPlaceholder } from "./LoadingPlaceholder";

type ButtonProps = DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> & { isProcessing?: boolean; secondary?: boolean };

export const Button: React.FC<ButtonProps> = ({
	className,
	isProcessing,
	secondary,
	children,
	...props
}) => {
	return (
		<button
			className={classNames(
				"relative px-6 py-1 transition-all duration-100 rounded disabled:cursor-auto",
				secondary
					? "border border-black hover:bg-gray-100 active:bg-gray-200 disabled:bg-gray-200"
					: "text-gray-300 bg-black disabled:bg-opacity-50 hover:bg-opacity-75 active:bg-opacity-50",
				className
			)}
			{...props}
		>
			{children}
			{isProcessing && (
				<div className="absolute inset-0 grid place-items-center bg-black rounded">
					<LoadingPlaceholder className="w-5 h-5" />
				</div>
			)}
		</button>
	);
};
