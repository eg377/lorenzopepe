import { createPortal } from "react-dom";
import { Copy } from "../../assets/Copy";
import { useRef } from "react";
import { LanguageToIcon } from "./LanguageToIcon";

interface FileInfoProps {
	language: string;
	pathName: string | null;
	code: string;
}

// https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
function iOS() {
	return (
		[
			"iPad Simulator",
			"iPhone Simulator",
			"iPod Simulator",
			"iPad",
			"iPhone",
			"iPod",
		].includes(navigator.platform) ||
		// iPad on iOS 13 detection
		(navigator.userAgent.includes("Mac") && "ontouchend" in document)
	);
}

export const FileInfo: React.FC<FileInfoProps> = ({
	language,
	pathName,
	code,
}) => {
	const copiedRef = useRef<boolean>(false);

	return (
		<div className="file-info">
			<div className={language}>
				<LanguageToIcon language={language} />
			</div>
			{pathName && <span>{pathName}</span>}
			<button
				onClick={() => {
					if (!copiedRef.current) {
						console.log("am copy");
						const textarea = document.createElement("textarea");
						textarea.style.fontSize = "16px";
						textarea.value = code;
						document.body.appendChild(textarea);

						if (iOS()) {
							const range = document.createRange();
							range.selectNodeContents(textarea);
							const selection = window.getSelection();
							if (selection) {
								selection.removeAllRanges();
								selection.addRange(range);
							}
							textarea.setSelectionRange(0, 999999);
						} else {
							textarea.select();
						}
						const copied = document.execCommand("copy");

						document.body.removeChild(textarea);
						if (copied) {
							copiedRef.current = true;
							setTimeout(() => {
								copiedRef.current = false;
							}, 3000);
						}

						// TODO: add animation on success
					}
				}}
			>
				<Copy />
			</button>
		</div>
	);
};
