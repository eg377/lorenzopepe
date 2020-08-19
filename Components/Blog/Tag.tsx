interface TagProps {
	tag: string;
}

export const Tag: React.FC<TagProps> = ({ tag }) => {
	return <span className={`tag ${tag}`}>{tag.toUpperCase()}</span>;
};
