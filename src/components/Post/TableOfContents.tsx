import { normalizePostSlug } from "@/lib/normalize";
import { useTocStore } from "@/stores/useTocStore";
import classNames from "classnames";
import React, { FC } from "react";

type Props = {
	title: string;
	text: string;
};

const TocEntry: FC<{ title: string }> = ({ title }) => {
	const currentHeading = useTocStore(store => store.currentHeading);
	const isActive = normalizePostSlug(title) === currentHeading;

	return (
		<li>
			<a
				className={classNames(
					"TOC-entry text-gray-500 hover:text-gray-900",
					isActive && "text-black TOC-entry_highlighted"
				)}
				href={`#${normalizePostSlug(title)}`}
			>
				{title}
			</a>
		</li>
	);
};

export const TableOfContents: FC<Props> = ({ title, text }) => {
	const headings = text.split("\n").filter(line => /^#{1,6} /.test(line));
	const items = headings.map(line => {
		const [prefix, heading] = /(.*?) (.*)/.exec(line)!.slice(1);
		return [prefix.length, heading] as [number, string];
	});

	let index = 0;
	const parseHeadings = (depth: number = 0): any => {
		let values = [];
		while (index < items.length) {
			const [level, data] = items[index];
			if (level < depth) {
				break;
			} else if (level === depth) {
				values.push(data);
				index++;
			} else {
				values.push(parseHeadings(depth + 1));
			}
		}
		return values;
	};

	const renderList = (list: (string | string[])[], level: number = 0) => {
		return list.map((value, index) =>
			typeof value === "string" ? (
				<TocEntry title={value} key={index} />
			) : (
				<ul
					className={classNames("space-y-0.5", level > 0 && "ml-4")}
					key={index}
				>
					{renderList(value, level + 1)}
				</ul>
			)
		);
	};
	const root = renderList(parseHeadings());

	return (
		<div>
			<a className="text-gray-500 hover:text-gray-900" href="#">
				{title}
			</a>
			<hr className="my-2" />
			<div>{root}</div>
		</div>
	);
};
