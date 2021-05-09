interface LinkToProps {
	href: string;
	className?: string;
	style?: React.CSSProperties;
	label?: string;
}

export const LinkTo: React.FC<LinkToProps> = ({
	className,
	style,
	href,
	children,
	label,
}) => {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			style={style}
			className={className}
			data-label={label}
		>
			{children}
		</a>
	);
};
