interface TagProps {
	tag: string;
}

export const Tag: React.FC<TagProps> = ({ tag }) => {
	return <span className={`post-tag ${tag}`}>{tag.toUpperCase()}</span>;
};
