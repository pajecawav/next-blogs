import classNames from "classnames";
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{ className?: string }>;

export const FormError: React.FC<Props> = ({ className, children }) => {
	return (
		<div className={classNames("text-red-600 text-sm", className)}>
			{children}
		</div>
	);
};
