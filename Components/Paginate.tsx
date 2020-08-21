import { useMemo } from "react";
import { Back, Forward } from "../assets/Chevrons";
import { UpdateQuery } from "../pages";

interface PaginateProps {
	currentPage: number;
	maxPage: number;
	updateQuery: UpdateQuery;
}

export const Paginate: React.FC<PaginateProps> = ({
	currentPage,
	maxPage,
	updateQuery,
}) => {
	const isMin = currentPage === 1;
	const isMax = currentPage === maxPage;

	const pages: number[] = useMemo(() => {
		let pagesArr = [
			currentPage - 3,
			currentPage - 2,
			currentPage - 1,
			currentPage,
			currentPage + 1,
			currentPage + 2,
			currentPage + 3,
		].filter(
			(p) =>
				// remove pages before 1 and after max
				p >= 1 && p <= maxPage
		);

		// ideal is 1 before and 1 after
		if (currentPage !== 1 || currentPage !== maxPage) {
			pagesArr = pagesArr.filter(
				(p) => p >= currentPage - 1 && p <= currentPage + 1
			);
		}

		pagesArr.sort((a, b) => a - b);
		pagesArr.unshift(1);
		pagesArr.push(maxPage);

		return [...new Set(pagesArr)];
	}, [currentPage, maxPage]);

	return (
		<div className="pagination">
			<button
				className={`nav ${isMin ? "disabled" : ""}`}
				onClick={() => {
					if (!isMin) {
						updateQuery({ page: String(currentPage - 1) });
					}
				}}
			>
				<Back />
			</button>
			{pages.map((p) => (
				<button
					key={"pagination-" + p}
					className={p === currentPage ? "current" : undefined}
					onClick={() => updateQuery({ page: String(p) })}
				>
					{p}
				</button>
			))}
			<button
				className={`nav ${isMax ? "disabled" : ""}`}
				onClick={() => {
					if (!isMax) {
						updateQuery({ page: String(currentPage + 1) });
					}
				}}
			>
				<Forward />
			</button>
		</div>
	);
};
