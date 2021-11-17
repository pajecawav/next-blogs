export function countWords(text: string): number {
	return text.split(" ").filter(Boolean).length;
}
