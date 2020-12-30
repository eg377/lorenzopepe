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
			<article>
				<Link href={`/blog${href}`}>
					<a href={`/blog${href}`}>
						<h1>{title}</h1>
					</a>
				</Link>
				<time
					dateTime={new Date(timestamp * 1000).toDateString()}
					className="date"
				>
					{timestampToDate(timestamp)}
				</time>
				<div className="body">
					{tags
						.sort((a, b) => a.localeCompare(b))
						.map((tag) => (
							<Tag key={tag} tag={tag} />
						))}
					<p>{children}</p>
				</div>
			</article>
		</li>
	);
};
