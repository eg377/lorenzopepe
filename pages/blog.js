import { PostPreview } from "../Components/Blog/PostPreview";
import { extractMetadata } from "../utils/extractMetadata";
import { timestampToDate } from "../utils/timestampToDate";

const BlogList = ({ postsData }) => {
	return (
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
