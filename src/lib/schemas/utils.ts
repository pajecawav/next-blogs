import * as yup from "yup";

export type MakeUndefinesOptional<T> = {
	[K in keyof T as undefined extends T[K] ? never : K]: T[K];
} & { [K in keyof T as undefined extends T[K] ? K : never]?: T[K] };

export const orderBySchema = yup.mixed<"asc" | "desc">().oneOf(["asc", "desc"]);
