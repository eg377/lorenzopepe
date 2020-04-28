// import Link from "next/link";
// import { Back } from "../../assets/Back";

export const PostHeader = ({ title, dateString }) => {
	return (
		<div className="post-header">
			<h1>{title}</h1>
			<span className="date">{dateString}</span>
		</div>
	);
};

// don'think it's very important as it's more of a webapp functionality
// pages will be cached anyway so it's not expensive to go back!

// <Link href={`/blog`}>
// <a>
// 	<Back />
// </a>
// </Link>
