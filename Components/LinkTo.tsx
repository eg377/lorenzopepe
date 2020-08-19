interface LinkToProps {
	href: string;
	className?: string;
	style?: React.CSSProperties;
}

export const LinkTo: React.FC<LinkToProps> = ({
	className,
	style,
	href,
	children,
}) => {
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
