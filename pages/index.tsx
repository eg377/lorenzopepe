import Head from "next/head";
import { GetStaticProps } from "next";
import { Fragment, useCallback, useMemo } from "react";
import { PostPreview } from "../Components/Blog/PostPreview";
import { extractMetadata } from "../utils/extractMetadata";
import { Search } from "../Components/Search";
import { useRouter } from "next/router";
import { getSearch, getPage, buildQuery } from "../utils/query";
import build from "next/dist/build";
import { Paginate } from "../Components/Paginate";

interface IndexProps {
	postsMetadata: PostMetadata[];
}

export type UpdateQuery = ({
	search,
	page,
}: {
	search?: string;
	page?: string;
}) => void;

const Index: React.FC<IndexProps> = ({ postsMetadata }) => {
	const router = useRouter();
	// const postsAmount = postsMetadata.length;
	const postsAmount = 90;
	const maxPage = Math.ceil(postsAmount / 10);

	const updateQuery: UpdateQuery = useCallback(
		({ search, page }) => {
			const prevSearch = router.query.q || "";
			const prevPage = router.query.p || "1";
			if (
				(search !== undefined && prevSearch !== search) ||
				(page !== undefined && prevPage !== page)
			) {
				const query = buildQuery({
					search:
						search !== undefined ? search : (prevSearch as string),
					page: page !== undefined ? page : (prevPage as string),
				});
				router.replace({ query }, undefined, {
					shallow: true,
				});

				// scroll to top to mimic page load
				if (page) {
					window.scrollTo({ top: 0, behavior: "auto" });
				}
			}
		},
		[router]
	);

	const page = useMemo(() => getPage(router, maxPage), [router, maxPage]);
	const tags: string[] = useMemo(() => {
		const tagsArr: string[] = [];
		for (let i = 0; i < postsMetadata.length; i++) {
			const tags = postsMetadata[i].tags;
			for (let j = 0; j < tags.length; j++) {
				const tag = tags[j];
				if (tagsArr.indexOf(tag) < 0) {
					tagsArr.push(tag);
				}
			}
		}

		return tagsArr;
	}, [postsMetadata]);

	const initSearch = getSearch(router);

	return (
		<Fragment>
			<Head>
				<title>Blog</title>
				<meta name="description" content="Lorenzo Pepe Blog" />
			</Head>
			<Search
				updateQuery={updateQuery}
				initSearch={initSearch}
				tags={tags}
			/>
			<ul className="blog-post-list-preview">
				{postsMetadata.map((d) => (
					<PostPreview key={d.timestamp} metadata={d}>
						{d.description}
					</PostPreview>
				))}
			</ul>

			{maxPage > 1 && (
				<Paginate
					maxPage={maxPage}
					currentPage={Number(page)}
					updateQuery={updateQuery}
				/>
			)}
		</Fragment>
	);
};

export default Index;

export interface PostMetadata {
	tags: string[];
	timestamp: number;
	href: string;
	title: string;
	description: string;
}

export const getStaticProps: GetStaticProps = async () => {
	const postsMetadata = await extractMetadata();

	return {
		props: {
			postsMetadata,
		},
	};
};
