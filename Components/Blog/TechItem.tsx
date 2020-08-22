import { LinkTo } from "../LinkTo";

interface TechItemProps {
	title: string;
	href: string;
}

export const TechItem: React.FC<TechItemProps> = ({
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
