import { normalizePostSlug } from "@/lib/normalize";
import { LinkIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";

type Props = DetailedHTMLProps<
	HTMLAttributes<HTMLHeadingElement>,
	HTMLHeadingElement
> & {
	level: number;
};

const levelClassNames: Record<number, string> = {
	1: "text-5xl my-6",
	2: "text-4xl my-4",
	3: "text-3xl my-2",
	4: "text-2xl my-1",
	5: "text-xl",
	6: "",
};

function flatten(text: string, child: any): string {
	return typeof child === "string"
		? text + child
		: React.Children.toArray(child.props.children).reduce(flatten, text);
}

// extract heading text from children: https://github.com/remarkjs/react-markdown/issues/69
export function extractTextFromChildren(children: React.ReactNode): string {
	const childrenArray = React.Children.toArray(children);
	const text = childrenArray.reduce(flatten, "");
	return text;
}

export const Heading: React.FC<Props> = ({ level, children, ...props }) => {
	const Component = `h${level}` as "h1";

	const text = extractTextFromChildren(children);
	const id = text ? normalizePostSlug(text) : undefined;

	return (
		<Component
			id={id}
			className={classNames("group", levelClassNames[level])}
			{...props}
		>
			<span className="mr-3">{children}</span>
			{id && (
				<a href={`#${id}`} className="inline-block align-middle">
					<LinkIcon className="w-5 h-5 opacity-0 transition-opacity duration-75 group-hover:opacity-100" />
				</a>
			)}
		</Component>
	);
};
