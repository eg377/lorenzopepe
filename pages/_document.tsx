import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render(): JSX.Element {
		return (
			<Html lang="en" data-theme="light">
				<Head>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/apple-touch-icon.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/favicon-16x16.png"
					/>

					<link rel="manifest" href="/site.webmanifest" />
					<link rel="mask-icon" href="/safari-pinned-tab.svg" />
					<script
						src="/js-enabled.js"
						type="text/javascript"
					></script>
				</Head>
				<body>
					<Main />
					<div id="modals-root"></div>
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
