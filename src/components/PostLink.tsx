import { normalizePostSlug } from "@/lib/normalize";
import Link from "next/link";
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
	id: string | number;
	title?: string;
}>;

export const Postlink: React.FC<Props> = ({ id, title, children }) => {
	let href = `/posts/${id}`;
	if (title) {
		href += "/" + normalizePostSlug(title);
	}

	return <Link href={href}>{children}</Link>;
};
