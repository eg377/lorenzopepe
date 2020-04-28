export const LinkTo = ({ className, style, href, children }) => {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			style={style}
			className={className}
		>
			{children}
		</a>
	);
};
