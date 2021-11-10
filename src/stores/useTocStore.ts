import create from "zustand";

type Store = {
	headings: string[];
	currentHeading: () => string | undefined;
	pushHeading: (heading: string) => void;
	popHeading: () => void;
};

export const useTocStore = create<Store>((set, get) => ({
	// TODO: should this be a stack on just setting the current heading is enough?
	headings: [],
	currentHeading: () => get().headings.at(-1),
	pushHeading: (heading: string) =>
		set(state => ({ headings: [...state.headings, heading] })),
	popHeading: () => set(state => ({ headings: state.headings.slice(0, -1) })),
}));
