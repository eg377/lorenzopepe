import dayjs from "dayjs";

export const timestampToDate = (timestamp) => {
	return dayjs.unix(timestamp).format("MMMM D, YYYY");
};
