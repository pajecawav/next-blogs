import { ComponentProps, ReactNode, useEffect, useState } from "react";

const Queries = {
	xs: {
		min: 0,
		max: 639,
		classNamesMin: "block",
		classNamesMax: "block sm:hidden",
	},
	sm: {
		min: 640,
		max: 767,
		classNamesMin: "hidden sm:block",
		classNamesMax: "block md:hidden",
	},
	md: {
		min: 768,
		max: 1023,
		classNamesMin: "hidden md:block",
		classNamesMax: "block lg:hidden",
	},
	lg: {
		min: 1024,
		max: 1279,
		classNamesMin: "hidden lg:block",
		classNamesMax: "block xl:hidden",
	},
	xl: {
		min: 1280,
		max: Infinity,
		classNamesMin: "hidden xl:block",
		classNamesMax: "block",
	},
} as const;

type Size = keyof typeof Queries;

export const useMediaQuery = (size: Size, useMax: boolean = false) => {
	const { min, max } = Queries[size];
	const mediaQuery = useMax
		? `(max-width: ${max}px)`
		: `(min-width: ${min}px)`;

	const [matches, setMatches] = useState(() =>
		typeof window !== "undefined"
			? window.matchMedia(mediaQuery).matches
			: true
	);

	useEffect(() => {
		const updateMatch = () =>
			setMatches(window.matchMedia(mediaQuery).matches);

		updateMatch();

		window.matchMedia(mediaQuery).addEventListener("change", updateMatch);
		return () => {
			window
				.matchMedia(mediaQuery)
				.removeEventListener("change", updateMatch);
		};
	}, [mediaQuery]);

	return matches;
};
