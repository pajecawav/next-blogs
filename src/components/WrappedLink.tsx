import Link, { LinkProps } from "next/link";
import React, { AnchorHTMLAttributes, DetailedHTMLProps } from "react";

type Props = LinkProps &
	DetailedHTMLProps<
		AnchorHTMLAttributes<HTMLAnchorElement>,
		HTMLAnchorElement
	>;

export const WrappedLink: React.FC<Props> = props => {
	const { href, children, ...rest } = props;
	return (
		<Link href={href}>
			<a {...rest}>{children}</a>
		</Link>
	);
};
