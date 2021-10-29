import { LinkProps } from "next/link";
import React, { AnchorHTMLAttributes, DetailedHTMLProps } from "react";
import { WrappedLink } from "./WrappedLink";

type Props = {
	username: string;
} & Omit<LinkProps, "href"> &
	DetailedHTMLProps<
		AnchorHTMLAttributes<HTMLAnchorElement>,
		HTMLAnchorElement
	>;

export const UserLink: React.FC<Props> = ({ username, children, ...props }) => {
	return (
		<WrappedLink href={`/users/${username.toLowerCase()}`} {...props}>
			{children}
		</WrappedLink>
	);
};
