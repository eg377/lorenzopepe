export const timestampToDate = (timestamp: number) => {
	const formatted = Intl.DateTimeFormat(undefined, {
		month: "long",
		day: "numeric",
		year: "numeric",
	}).format(new Date(timestamp * 1000));

	// TODO: should month be uppercase in certain languages?
	return formatted;
};
