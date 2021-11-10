import { createContext, FC, PropsWithChildren, useState } from "react";

type TocContextValue = {
	currentHeading: string;
	pushHeading: (heading: string) => void;
	popHeading: () => void;
};

export const TocContext = createContext<TocContextValue | null>(null);

export const TocProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
	const [headings, setHeadings] = useState<string[]>([]);

	const pushHeading = (heading: string) => {
		setHeadings([...headings, heading]);
	};

	const popHeading = () => {
		setHeadings(headings.slice(0, -1));
	};

	const currentHeading = headings[headings.length - 1];

	return (
		<TocContext.Provider
			value={{
				currentHeading,
				pushHeading,
				popHeading,
			}}
		>
			{children}
		</TocContext.Provider>
	);
};
