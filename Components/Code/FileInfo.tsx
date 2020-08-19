import { Copy } from "../../assets/Copy";
import { useRef } from "react";
import { LanguageToIcon } from "./LanguageToIcon";

interface FileInfoProps {
	language: string;
	pathName: string | null;
	code: string;
}

export const FileInfo: React.FC<FileInfoProps> = ({
	language,
	pathName,
	code,
}) => {
	const codeRef = useRef<HTMLTextAreaElement | null>(null);
	return (
		<div className="file-info">
			<div className={language}>
				<LanguageToIcon language={language} />
			</div>
			{pathName && <span>{pathName}</span>}
			<button
				onClick={() => {
					if (codeRef.current) {
						codeRef.current.focus();
						document.execCommand("copy");
					}
				}}
			>
				<Copy />
			</button>

			<textarea
				ref={codeRef}
				style={{
					visibility: "hidden",
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
					if (e.clipboardData && codeRef.current) {
						e.clipboardData.setData(
							"text/plain",
							codeRef.current.textContent as string
						);
					}
				}}
			/>
		</div>
	);
};
