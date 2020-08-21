import { useState, useEffect } from "react";
import { UpdateQuery } from "../pages";
import { SearchIcon } from "../assets/SearchIcon";

interface SearchProps {
	updateQuery: UpdateQuery;
	initSearch: string;
	tags: string[];
}

export const Search: React.FC<SearchProps> = ({
	updateQuery,
	initSearch,
	tags,
}) => {
	// console.log(initSearch);
	const [search, setSearch] = useState(initSearch);

	useEffect(() => {
		updateQuery({ search: search.trim() });
	}, [search, updateQuery]);

	return (
		<div className="blog-search">
			<div className="search-wrapper">
				<SearchIcon />
				<input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search blog posts"
				/>
			</div>
			<div className="search-tags">
				{tags.map((tag) => (
					<button key={tag}>{tag.toUpperCase()}</button>
				))}
			</div>
		</div>
	);
};
