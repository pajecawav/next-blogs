export const normalizePostSlug = (slug: string) => {
	return slug
		.replaceAll(/\W/gu, " ")
		.replaceAll(/\s+/gu, "-")
		.replaceAll(/^-|-$/gu, "")
		.toLowerCase();
};
