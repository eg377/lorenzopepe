import Head from "next/head";
import { GetStaticProps } from "next";
import { Fragment } from "react";
import { PostPreview } from "../Components/Blog/PostPreview";
import { extractMetadata } from "../utils/extractMetadata";
import { timestampToDate } from "../utils/timestampToDate";

const BlogList = ({ postsData }) => {
	return (
		<Fragment>
			<Head>
				<title>Blog</title>
				<meta name="description" content="Lorenzo Pepe Blog" />
			</Head>
			<ul className="blog-post-list-preview">
				{postsData.map((postData) => (
					<PostPreview
						key={postData.timestamp}
						title={postData.title}
						dateString={timestampToDate(postData.timestamp)}
						tags={postData.tags}
						href={postData.href}
					>
						{postData.description}
					</PostPreview>
				))}
			</ul>
		</Fragment>
	);
};

export default BlogList;

export const getStaticProps: GetStaticProps = async () => {
	const postsData = await extractMetadata();

	return {
		props: {
			postsData,
		},
	};
};
