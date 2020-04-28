import { Copy } from "../../assets/Copy";
import { useRef } from "react";
import { LanguageToIcon } from "./LanguageToIcon";

export const FileInfo = ({ language, pathName, code }) => {
	const codeRef = useRef(null);
	const buttonRef = useRef(null);
	return (
		<div className="file-info">
			<div className={language}>
				<LanguageToIcon language={language} />
			</div>
			{pathName && <span>{pathName}</span>}
			<button
				ref={buttonRef}
				onClick={() => {
					codeRef.current.focus();
					document.execCommand("copy");
				}}
			>
				<Copy />
			</button>

			<textarea
				ref={codeRef}
				style={{
					visbility: "hidden",
					width: "0px",
					height: "0px",
					color: "transparent",
					backgroundColor: "transparent",
					pointerEvents: "none",
					opacity: "0.00001",
				}}
				value={code}
				readOnly={true}
				onCopy={(e) => {
					e.preventDefault();
					if (e.clipboardData) {
						e.clipboardData.setData(
							"text/plain",
							codeRef.current.textContent
						);
					}
				}}
			/>
		</div>
	);
};
