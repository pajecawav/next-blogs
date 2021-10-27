import Link from "next/link";
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
	username: string;
}>;

export const UserLink: React.FC<Props> = ({ username, children }) => {
	return <Link href={`/users/${username.toLowerCase()}`}>{children}</Link>;
};
