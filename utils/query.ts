import { UpdateQuery } from "../pages";
import { NextRouter } from "next/router";

export const getSearch = (router: NextRouter): string => {
	// fallback to asPath if no query exists (happens on first render)
	if (router.query.hasOwnProperty("q")) {
		return Array.isArray(router.query.q) ? "" : (router.query.q as string);
	} else {
		const searchMatch = router.asPath.match(/(\?|\&)q=\w*/gm);
		const initSearch = searchMatch
			? searchMatch[0].replace("?q=", "").replace("&q=", "")
			: "";

		return initSearch;
	}
};

export const getPage = (
	router: NextRouter,
	maxPage: number | undefined
): string => {
	// fallback to asPath if no query exists (happens on first render)
	let page = "1";
	if (router.query.hasOwnProperty("p")) {
		const p = Array.isArray(router.query.p)
			? "1"
			: (router.query.p as string);
		const pageMatch = p.match(/\d*$/gm);
		if (pageMatch && pageMatch[0]) {
			page = pageMatch[0];
		}
	} else {
		const pageMatch = router.asPath.match(/(\?|\&)p=\d*$/gm);
		page = pageMatch
			? pageMatch[0].replace("?p=", "").replace("&p=", "")
			: "1";
	}

	if (maxPage) {
		const pageNum = Number(page);
		return pageNum > maxPage ? String(maxPage) : page;
	}

	return page;
};

export const buildQuery = ({
	search,
	page,
}: {
	search?: string;
	page?: string;
}): string | null => {
	let query = "";
	if (search) {
		query += `q=${search}`;
	}

	if (page) {
		const join = query ? "&" : "";
		query += `${join}p=${page}`;
	}
	return query ? query : null;
};
