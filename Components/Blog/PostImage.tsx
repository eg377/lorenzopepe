import NextImage from "next/image";
import { useEffect, useRef } from "react";

interface ImageData {
	src: string;
	alt: string;
	placeholderImage?: string;
	placeholderColor?: string;
	width?: number;
	height?: number;
}

export const PostImage: React.FC<{ imageData: ImageData }> = ({
	imageData,
	children,
}) => {
	const {
		src,
		placeholderImage,
		placeholderColor,
		alt,
		width = 740,
		height = 400,
	} = imageData;

	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		if (canvasRef.current) {
			const ctx = canvasRef.current.getContext("2d");
			if (ctx) {
				if (placeholderImage) {
					const image = new Image();
					image.onload = function () {
						ctx.drawImage(image, 0, 0, width, height);
					};
					image.src = placeholderImage;
				} else if (placeholderColor) {
					ctx.fillStyle = placeholderColor;
					ctx.fillRect(0, 0, width, height);
					ctx.fill();
				}
			}
		}
	}, [placeholderImage, placeholderColor, width, height]);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				marginBottom: "2rem",
			}}
		>
			<div className="image-container">
				<canvas
					width={width}
					height={height}
					className="placeholder-canvas"
					ref={canvasRef}
				/>
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
					onLoad={() => {
						canvasRef.current?.classList.add("unblur");
						canvasRef.current?.setAttribute("role", "presentation");
						canvasRef.current?.setAttribute("aria-hidden", "true");
					}}
				/>
			</div>
			{children ? <div className="image-credits">{children}</div> : null}
		</div>
	);
};
