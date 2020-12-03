interface EmojiProps {
	description: string;
	value: string;
}

export const Emoji: React.FC<EmojiProps> = ({ description, value }) => (
	<span role="img" aria-label={description}>
		{value}
	</span>
);
