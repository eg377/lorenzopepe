import { LinkTo } from "../LinkTo";

export const TechnologyItem = ({ title, href, children }) => {
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
