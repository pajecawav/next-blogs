import create from "zustand";

type Store = {
	currentHeading: string | undefined;
	setCurrentHeading: (heading: string) => void;
};

export const useTocStore = create<Store>(set => ({
	currentHeading: undefined,
	setCurrentHeading: (heading: string) =>
		set(() => ({ currentHeading: heading })),
}));
