interface AsideProps {
	type: "info" | "success" | "warning" | "danger";
}

export const Aside: React.FC<AsideProps> = ({ type, children }) => {
	return (
		<aside className={`aside ${type}`}>
			<div className="svg-wrapper">
				{type === "info" ? (
					<Info />
				) : type === "success" ? (
					<Success />
				) : type === "warning" ? (
					<Warning />
				) : type === "danger" ? (
					<Danger />
				) : null}
			</div>
			<div className="content">{children}</div>
		</aside>
	);
};

const Success = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
		<title>Success</title>
		<desc>You are doing it right!</desc>
		<path
			d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
			strokeMiterlimit="10"
			strokeWidth="32"
		/>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="32"
			d="M352 176L217.6 336 160 272"
		/>
	</svg>
);

const Warning = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
		<title>Warning</title>
		<desc>Be Careful!</desc>
		<path
			d="M85.57 446.25h340.86a32 32 0 0028.17-47.17L284.18 82.58c-12.09-22.44-44.27-22.44-56.36 0L57.4 399.08a32 32 0 0028.17 47.17z"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="32"
		/>
		<path
			d="M250.26 195.39l5.74 122 5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 5.95z"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="32"
		/>
		<path
			d="M256 397.25a20 20 0 1120-20 20 20 0 01-20 20z"
			className="filled"
		/>
	</svg>
);

const Danger = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
		<title>Danger</title>
		<desc>Don't try this at home!</desc>
		<path
			d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
			strokeMiterlimit="10"
			strokeWidth="32"
		/>
		<path
			d="M250.26 166.05L256 288l5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 6z"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="32"
		/>
		<path
			d="M256 367.91a20 20 0 1120-20 20 20 0 01-20 20z"
			className="filled"
		/>
	</svg>
);

const Info = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
		<title>Information</title>
		<desc>You may find this useful!</desc>
		<path
			d="M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z"
			strokeMiterlimit="10"
			strokeWidth="32"
		/>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="32"
			d="M220 220h32v116"
		/>
		<path
			strokeLinecap="round"
			strokeMiterlimit="10"
			strokeWidth="32"
			d="M208 340h88"
		/>
		<path
			d="M248 130a26 26 0 1026 26 26 26 0 00-26-26z"
			className="filled"
		/>
	</svg>
);
