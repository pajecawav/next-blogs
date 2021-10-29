import Link from "next/link";
import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Heading } from "./Heading";

type Props = {
	children: string;
};

export const Post: React.FC<Props> = ({ children }) => {
	useEffect(() => {
		const id = window.location.hash;
		if (id) {
			document
				.getElementById(id.slice(1))
				?.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	}, []);

	return (
		<ReactMarkdown
			className="leading-8"
			components={{
				a: ({ node, children, href, ...props }) => (
					<Link href={href as string} {...props}>
						<a
							className="text-green-500 hover:opacity-50"
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
				li: ({ node, children, index, ...props }) => (
					<li className="list-inside list-decimal" {...props}>
						{children}
					</li>
				),
				ol: ({ node, depth, ...props }) => (
					<ol className="ml-5 list-inside list-decimal" {...props} />
				),
				ul: ({ node, depth, ...props }) => (
					<ul className="ml-5 list-inside list-disc" {...props} />
				),
				p: ({ node, ...props }) => <p {...props} className="my-4" />,
				pre: ({ node, ...props }) => (
					<pre
						className="rounded bg-gray-100 px-4 py-2 leading-normal"
						{...props}
					/>
				),
			}}
		>
			{children}
		</ReactMarkdown>
	);
};
