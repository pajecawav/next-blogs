export type ObjectToBooleans<T extends Record<string, any>> = {
	[Key in keyof T]: boolean;
};

export type ObjectToOptionalBooleans<T extends Record<string, any>> = Partial<
	ObjectToBooleans<T>
>;
