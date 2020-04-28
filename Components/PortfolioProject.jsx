import { Tag } from "./Blog/Tag";
import { Github } from "../assets/Tech";
import { LinkTo } from "./LinkTo";

export const PortfolioProject = ({
	imgAlt,
	smSrc,
	mdSrc,
	fallback,
	href,
	repo,
	tags,
	title,
	children,
}) => {
	return (
		<div className="project">
			<div className="img-wrapper">
				<PortfolioImage
					smSrc={smSrc}
					mdSrc={mdSrc}
					fallback={fallback}
					imgAlt={imgAlt}
				/>
			</div>
			<div className="project-body">
				<div className="project-header">
					<h4>{title}</h4>
					<div>
						<LinkTo href={repo}>
							<div>
								<Github />
							</div>
						</LinkTo>
						{href ? (
							<LinkTo className="link live">LIVE DEMO</LinkTo>
						) : (
							<span className="link disabled">LIVE DEMO</span>
						)}
					</div>
				</div>
				{tags.map((tag) => (
					<Tag key={tag} tag={tag} />
				))}
				<p>{children}</p>
			</div>
		</div>
	);
};

const PortfolioImage = ({ smSrc, mdSrc, fallback, imgAlt }) => {
	return (
		<picture>
			<source
				media="(max-width: 460px)"
				srcSet={smSrc}
				type="image/webp"
			/>
			<source
				media="(max-width: 760px)"
				srcSet={mdSrc}
				type="image/webp"
			/>
			<source srcSet={smSrc} type="image/webp" />
			<img alt={imgAlt} srcSet={fallback} type="image/png" />
		</picture>
	);
};
