import Link from "next/link";
import { Back } from "../../assets/Back";

export const PostHeader = ({ title, dateString }) => {
	return (
		<div className="post-header">
			<Link href={`/blog`}>
				<a>
					<Back />
				</a>
			</Link>
			<h1>{title}</h1>
			<span className="date">{dateString}</span>
		</div>
	);
};
