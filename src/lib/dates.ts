import dayjs from "dayjs";

const SECOND = 1;
const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const MONTH = 30 * DAY;
const YEAR = 12 * MONTH;

export function formatShortTimeAgo(date: Date | number | string) {
	const diff = dayjs().diff(date, "seconds");
	let suffix = "y";
	let unit = YEAR;

	if (diff < MINUTE) {
		suffix = "s";
		unit = SECOND;
	} else if (diff < HOUR) {
		suffix = "m";
		unit = MINUTE;
	} else if (diff < DAY) {
		suffix = "h";
		unit = HOUR;
	} else if (diff < MONTH) {
		suffix = "d";
		unit = DAY;
	} else if (diff < YEAR) {
		suffix = "mo";
		unit = MONTH;
	}

	const value = Math.floor(diff / unit);
	return `${value}${suffix}`;
}

export function formatDate(date: Date | number | string) {
	return dayjs(date).format("D MMM YYYY");
}
