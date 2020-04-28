import { PostPreview } from "../Components/Blog/PostPreview";
import { extractMetadata } from "../utils/extractMetadata";
import { timestampToDate } from "../utils/timestampToDate";
import Head from "next/head";
import { Fragment } from "react";

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

export const getStaticProps = async () => {
	const postsData = await extractMetadata();

	return {
		props: {
			postsData,
		},
	};
};
