import { normalizePostSlug } from "@/lib/normalize";
import classNames from "classnames";
import { DetailedHTMLProps, HTMLAttributes } from "react";

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

export const Heading: React.FC<Props> = ({ level, children, ...props }) => {
	const Component = `h${level}` as "h1";

	const text = (children as string[])?.[0];
	const id = text ? normalizePostSlug(text) : undefined;

	return (
		<Component
			id={id}
			className={classNames(levelClassNames[level])}
			{...props}
		>
			{children}
		</Component>
	);
};
