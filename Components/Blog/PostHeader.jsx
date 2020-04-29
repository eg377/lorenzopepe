import { Fragment } from "react";
import Head from "next/head";
import { timestampToDate } from "../../utils/timestampToDate";

export const PostHeader = ({ metadata }) => {
	const { title, description, tags, timestamp } = metadata;
	return (
		<Fragment>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="author" content="Lorenzo Pepe" />
				<meta name="keywords" content={tags.join(" , ")} />
			</Head>
			<div className="post-header">
				<h1>{title}</h1>
				<span className="date">{timestampToDate(timestamp)}</span>
			</div>
		</Fragment>
	);
};
