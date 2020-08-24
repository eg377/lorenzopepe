import { LinkTo } from "../LinkTo";

interface TechItemProps {
	title: string;
	href: string;
	required: boolean;
}

export const TechItem: React.FC<TechItemProps> = ({
	title,
	href,
	required,
}) => {
	return (
		<li className="tech-item">
			<h5>{title}</h5>
			<span className={required ? "required" : undefined}>
				{required ? "REQUIRED" : "DEV"}
			</span>
			<LinkTo href={href}>{href}</LinkTo>
		</li>
	);
};
