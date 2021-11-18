import { CheckIcon, DuplicateIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { extractTextFromChildren } from "./Heading";

type Props = ComponentPropsWithoutRef<"code">;

export const CodeBlock = ({ children, className, ...props }: Props) => {
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (copied) {
			const timeoutId = setTimeout(() => setCopied(false), 1000);
			return () => clearTimeout(timeoutId);
		}
	}, [copied]);

	const text = extractTextFromChildren(children);

	const copyToClipboard = async () => {
		await navigator.clipboard.writeText(text);
		setCopied(true);
	};

	return (
		<div className="relative group">
			<div className="p-4 overflow-x-auto">{text}</div>
			<button
				className={classNames(
					"absolute right-2 top-2 text-gray-600 opacity-0 transition-all duration-100 hidden md:block group-hover:opacity-100 focus-visible:opacity-100 active:text-gray-400"
				)}
				title="Copy"
				onClick={copyToClipboard}
			>
				{copied ? (
					<CheckIcon className="w-5 h-5" />
				) : (
					<DuplicateIcon className="w-5 h-5" />
				)}
			</button>
		</div>
	);
};
