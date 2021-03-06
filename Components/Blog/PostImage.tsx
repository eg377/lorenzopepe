import NextImage from "next/image";
interface ImageData {
	src: string;
	alt: string;
	placeholderSvg?: string;
	placeholderColor?: string;
	width?: number;
	height?: number;
	quality?: number;
}

export const PostImage: React.FC<{ imageData: ImageData }> = ({
	imageData,
	children,
}) => {
	const {
		src,
		placeholderSvg,
		placeholderColor,
		alt,
		width = 740,
		height = 400,
		quality = 75,
	} = imageData;

	return (
		<figure className="post-image">
			<div
				className="image-container"
				// unfortunately the image is not exposed by next and it's not possible to use a ref there
				// using a placeholder as a background image
				ref={(node) => {
					if (node !== null) {
						const image = node.querySelector("img") as
							| HTMLImageElement
							| undefined;
						if (!image) return;

						if (placeholderSvg) {
							image.style.backgroundSize = "cover";
							image.style.backgroundImage = `url("${placeholderSvg}")`;
						}

						if (placeholderColor) {
							image.style.backgroundColor = placeholderColor;
						}
					}
				}}
			>
				{/* REMOVE WHEN MERGED INTO IMAGE COMPONENT */}
				<noscript>
					<img
						src={src}
						alt={alt}
						className="article-image"
						style={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
						}}
					/>
				</noscript>

				<NextImage
					src={src}
					alt={alt}
					layout="responsive"
					width={width}
					height={height}
					loading="lazy"
					className="article-image"
					decoding="async"
					quality={quality}
					onLoad={(e) => {
						setTimeout(() => {
							const image = e.currentTarget as
								| HTMLImageElement
								| undefined;

							if (!image || image.tagName !== "IMG") {
								return;
							}

							image.style.backgroundImage = "none";
							image.style.backgroundColor = "none";
						}, 300);
					}}
				/>
			</div>
			{children ? <figcaption>{children}</figcaption> : null}
		</figure>
	);
};
