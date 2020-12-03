import { Tag } from "./Tag";
import Link from "next/link";
import { PostMetadata } from "../../pages";
import { timestampToDate } from "../../utils/timestampToDate";

interface PostPreviewProps {
	metadata: PostMetadata;
}

export const PostPreview: React.FC<PostPreviewProps> = ({
	metadata,
	children,
}) => {
	const { href, title, timestamp, tags } = metadata;
	return (
		<li>
			<Link href={`/blog${href}`}>
				<a href={`/blog${href}`}>
					<h1>{title}</h1>
				</a>
			</Link>
			<span className="date">{timestampToDate(timestamp)}</span>
			<div className="body">
				{tags.map((tag) => (
					<Tag key={tag} tag={tag} />
				))}
				<p>{children}</p>
			</div>
		</li>
	);
};
