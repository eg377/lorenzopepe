export const linesToHighlight = (linesString: string) => {
	if (!linesString) {
		return [];
	}
	const linesStringArr = linesString.replace(/[\{\}]/g, "").split(",");
	const linesArr = [];

	for (let i = 0; i < linesStringArr.length; i++) {
		const str = linesStringArr[i];
		if (str.length === 1) {
			linesArr.push(Number(str) - 1);
		} else {
			const linesBoundaries = str
				.split("-")
				.map((lineStr) => Number(lineStr));
			let fromIndex = linesBoundaries[0] - 1;
			while (fromIndex < linesBoundaries[1]) {
				linesArr.push(fromIndex);
				fromIndex++;
			}
		}
	}

	return linesArr;
};
