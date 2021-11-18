import classNames from "classnames";
import Link from "next/link";
import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { CodeBlock } from "./CodeBlock";
import { Heading } from "./Heading";
import { ImageWithPreview } from "./ImageWithPreview";

type Props = {
	children: string;
};

export const Post: React.FC<Props> = ({ children }) => {
	useEffect(() => {
		const id = window.location.hash;
		if (id) {
			document
				.getElementById(id.slice(1))
				?.scrollIntoView({ behavior: "smooth" });
		}
	}, []);

	return (
		<ReactMarkdown
			className="leading-8"
			components={{
				a: ({ node, children, href, ...props }) => (
					<Link href={href as string} {...props}>
						<a
							className="text-blue-500 hover:opacity-75"
							title={href}
						>
							{children}
						</a>
					</Link>
				),
				blockquote: ({ node, ...props }) => (
					<blockquote
						className="border-l-4 border-gray-200 pl-4"
						{...props}
					/>
				),
				h1: ({ node, ...props }) => <Heading {...props} />,
				h2: ({ node, ...props }) => <Heading {...props} />,
				h3: ({ node, ...props }) => <Heading {...props} />,
				h4: ({ node, ...props }) => <Heading {...props} />,
				h5: ({ node, ...props }) => <Heading {...props} />,
				h6: ({ node, ...props }) => <Heading {...props} />,
				hr: ({ node, ...props }) => <hr {...props} className="my-4" />,
				li: ({ node, children, index, ordered, ...props }) => (
					<li
						className={classNames(
							ordered ? "list-decimal" : "list-disc"
						)}
						{...props}
					>
						{children}
					</li>
				),
				ol: ({ node, depth, ordered, ...props }) => (
					<ol className="ml-5 list-inside list-decimal" {...props} />
				),
				ul: ({ node, depth, ordered, ...props }) => (
					<ul className="ml-5 list-inside list-disc" {...props} />
				),
				p: ({ node, ...props }) => <p {...props} className="my-4" />,
				code: ({ node, inline, ...props }) =>
					inline ? (
						<code
							className="px-2 py-1 rounded bg-gray-200 text-blue-500"
							{...props}
						/>
					) : (
						<CodeBlock {...props} />
					),
				pre: ({ node, ...props }) => (
					<pre
						className="rounded bg-gray-100 leading-normal"
						{...props}
					/>
				),
				img: ({ src, alt }) => (
					<ImageWithPreview
						src={src!}
						alt={alt!}
						width="300"
						height="200"
						loading="lazy"
					/>
				),
			}}
		>
			{children}
		</ReactMarkdown>
	);
};
