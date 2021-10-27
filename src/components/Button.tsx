import classNames from "classnames";
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { LoadingPlaceholder } from "./LoadingPlaceholder";

type ButtonProps = DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> & { isProcessing?: boolean };

export const Button: React.FC<ButtonProps> = ({
	className,
	isProcessing,
	children,
	...props
}) => {
	return (
		<button
			className={classNames(
				"relative px-6 py-1 transition-all duration-100 text-gray-300 bg-black rounded disabled:cursor-auto hover:bg-opacity-75 active:bg-opacity-50",
				className
			)}
			{...props}
		>
			{children}
			{isProcessing && (
				<div className="absolute inset-0 grid place-items-center bg-black">
					<LoadingPlaceholder className="w-5 h-5" />
				</div>
			)}
		</button>
	);
};
