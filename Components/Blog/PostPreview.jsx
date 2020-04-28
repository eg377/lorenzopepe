import { Tag } from "./Tag";
import Link from "next/link";

export const PostPreview = ({ href, title, dateString, tags, children }) => {
	return (
		<li>
			<div className="head">
				<Link href={`/blog${href}`}>
					<a>
						<h3>{title}</h3>
					</a>
				</Link>
				<span className="date">{dateString}</span>
			</div>
			<div className="body">
				{tags.map((tag) => (
					<Tag key={tag} tag={tag} />
				))}
				<p>{children}</p>
			</div>
		</li>
	);
};
