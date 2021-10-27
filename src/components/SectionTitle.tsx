import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{}>;

export const SectionTitle: React.FC<Props> = ({ children }) => {
	return <h2 className="text-3xl mb-3">{children}</h2>;
};
