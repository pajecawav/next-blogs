import classNames from "classnames";
import { useField } from "formik";
import React from "react";
import TextareaAutosize, {
	TextareaAutosizeProps,
} from "react-textarea-autosize";

type Props = TextareaAutosizeProps & {
	name: string;
	flat?: boolean;
};

export const Textarea: React.FC<Props> = ({
	className,
	flat = false,
	...props
}) => {
	const [field] = useField(props);

	return (
		<TextareaAutosize
			className={classNames(
				"px-2 py-1 resize-none transition-colors duration-100 rounded outline-none appearance-none font-sm text-primary-200",
				flat
					? "border-0 bg-transparent border-b-2 border-gray-200"
					: "border-2 border-gray-300 focus:border-gray-600",
				className
			)}
			{...field}
			{...props}
		/>
	);
};
