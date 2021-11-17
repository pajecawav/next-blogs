import { LinkProps } from "next/link";
import React, {
	AnchorHTMLAttributes,
	DetailedHTMLProps,
	useState,
} from "react";
import { UserPreviewPopover } from "./UserPreviewPopover";
import { WrappedLink } from "./WrappedLink";

type Props = {
	id: number;
	username: string;
	preview?: boolean;
} & Omit<LinkProps, "href"> &
	Omit<
		DetailedHTMLProps<
			AnchorHTMLAttributes<HTMLAnchorElement>,
			HTMLAnchorElement
		>,
		"id"
	>;

export const UserLink = ({
	id,
	username,
	preview = false,
	children,
	...props
}: Props) => {
	const [showPreview, setShowPreview] = useState(false);

	const togglePreview = (value: boolean) => {
		if (preview) {
			setShowPreview(value);
		}
	};

	return (
		<span className="relative">
			<span
				onMouseEnter={() => togglePreview(true)}
				onMouseLeave={() => togglePreview(false)}
			>
				<WrappedLink
					href={`/users/${username.toLowerCase()}`}
					{...props}
				>
					{children}
				</WrappedLink>
			</span>
			{preview && showPreview && <UserPreviewPopover id={id} />}
		</span>
	);
};
