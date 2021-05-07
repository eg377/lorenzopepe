import * as React from "react";

interface PostVideoProps {
	alt: string;
	src: string;
	type: "mp4";
	width: number;
	height: number;
	loop?: boolean;
}

export const PostVideo: React.FC<PostVideoProps> = ({
	alt,
	src,
	type,
	width = 740,
	height = 400,
	children,
	loop = false,
}) => {
	return (
		<figure className="post-video">
			<div
				className="video-container"
				style={{ maxWidth: `${width}px`, maxHeight: `${height}px` }}
			>
				<video
					controls={true}
					autoPlay={true}
					muted={true}
					loop={loop}
					playsInline={true}
					aria-label={alt}
				>
					<source src={src} type={`video/${type}`} />
					Sorry, your browser doesn't support embedded videos.
				</video>
			</div>
			{children ? <figcaption>{children}</figcaption> : null}
		</figure>
	);
};
