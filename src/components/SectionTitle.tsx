import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{}>;

export const SectionTitle: React.FC<Props> = ({ children }) => {
	return <h1 className="text-2xl mb-3">{children}</h1>;
};
