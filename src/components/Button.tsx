import classNames from "classnames";
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { LoadingPlaceholder } from "./LoadingPlaceholder";

const colorClassnames = {
	default:
		"text-gray-300 bg-black disabled:bg-opacity-50 hover:bg-opacity-75 active:bg-opacity-50",
	outlined:
		"border border-black bg-white hover:bg-gray-100 active:bg-gray-200 disabled:bg-gray-200",
	danger: "bg-red-600 text-white hover:bg-red-700",
};

type ButtonProps = DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> & {
	isProcessing?: boolean;
	color?: keyof typeof colorClassnames;
};

export const Button: React.FC<ButtonProps> = ({
	className,
	isProcessing,
	color = "default",
	children,
	...props
}) => {
	return (
		<button
			className={classNames(
				"relative px-6 py-1 transition-all duration-100 rounded disabled:cursor-auto",
				colorClassnames[color],
				className
			)}
			{...props}
		>
			{children}
			{isProcessing && (
				<div
					className={classNames(
						"absolute inset-0 grid place-items-center rounded",
						colorClassnames[color]
					)}
				>
					<LoadingPlaceholder className="w-5 h-5" />
				</div>
			)}
		</button>
	);
};
