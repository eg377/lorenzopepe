import { LinkTo } from "../LinkTo";

interface TechnologyItemProps {
	title: string;
	href: string;
}

export const TechnologyItem: React.FC<TechnologyItemProps> = ({
	title,
	href,
	children,
}) => {
	return (
		<li className="tech-item">
			<div>
				<h5>{title}</h5>
				<LinkTo href={href}>{href}</LinkTo>
			</div>
			<p>{children}</p>
		</li>
	);
};
