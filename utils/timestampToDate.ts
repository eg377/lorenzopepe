import dayjs from "dayjs";

export const timestampToDate = (timestamp: number) => {
	return dayjs.unix(timestamp).format("MMMM D, YYYY");
};
