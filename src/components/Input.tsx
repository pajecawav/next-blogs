import classNames from "classnames";
import { useField } from "formik";
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

type Props = DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
> & {
	name: string;
	flat?: boolean;
};

export const Input: React.FC<Props> = ({
	className,
	flat = false,
	...props
}) => {
	const [field, meta] = useField(props);

	return (
		<input
			className={classNames(
				"px-2 py-1 transition-colors duration-100 rounded outline-none appearance-none font-sm text-primary-200",
				flat
					? "border-0 bg-transparent border-b-2"
					: "border-2 border-gray-300 focus:border-gray-600",
				flat && meta.error ? "border-red-200" : "border-gray-200",
				className
			)}
			size={1}
			{...field}
			{...props}
		/>
	);
};
