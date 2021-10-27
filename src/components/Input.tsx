import classNames from "classnames";
import { FieldProps } from "formik";
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

type Props = DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
> &
	FieldProps;

export const Input: React.FC<Props> = ({
	className,
	field,
	form,
	...props
}) => {
	return (
		<input
			className={classNames(
				"px-2 py-1 transition-colors duration-100 rounded outline-none appearance-none font-sm text-primary-200 border-2 border-gray-300 focus:border-gray-600",

				className
			)}
			size={1}
			{...field}
			{...props}
		/>
	);
};
