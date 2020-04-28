export const Tag = ({ tag }) => {
	return <span className={`tag ${tag}`}>{tag.toUpperCase()}</span>;
};
