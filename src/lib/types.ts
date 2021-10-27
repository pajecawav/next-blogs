export type ObjectToBooleans<T extends Record<string, any>> = {
	[Key in keyof T]: boolean;
};
