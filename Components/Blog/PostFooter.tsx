import { timestampToDate } from "../../utils/timestampToDate";
import { Emoji } from "../Emoji";

interface PostFooterProps {
	timestamp: number;
	title: string;
	href: string;
}

export const PostFooter: React.FC<PostFooterProps> = ({
	timestamp,
	title,
	href,
}) => {
	const escapedTitle = globalThis.encodeURI(title);
	const encodedHref = globalThis.encodeURI(
		`https://lorenzopepe.dev/blog${href}`
	);
	const twitterHandle = "@lorenzopepe98";
	return (
		<footer>
			<time
				className="date"
				dateTime={new Date(timestamp * 1000).toDateString()}
			>
				<Emoji value="⌛" description="Published on" />{" "}
				{timestampToDate(timestamp)}
			</time>
			<div>
				<p>
					<Emoji value="💡" description="Feeling enlightened?" />{" "}
					Found this post helpful?{" "}
				</p>
				<p>
					Let me know on{" "}
					<a
						className="blog-link"
						href={`https://twitter.com/intent/tweet?text=${escapedTitle} ${encodedHref} by ${twitterHandle}`}
						rel="noreferrer noopener canonical"
						target="_blank"
					>
						Twitter
					</a>
				</p>
			</div>
		</footer>
	);
};
