import { FileInfo } from "./FileInfo";
import { Children, ReactNode, ReactElement } from "react";
import { paramsFromMetastring } from "../../utils/code";

interface CodeBlockProps {
	background: string;
	language: string;
	metastring: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
	background,
	language,
	metastring,
	children,
}) => {
	const { numbered, linesHighlighted, filePath } = paramsFromMetastring(
		metastring
	);

	// extract code from nodes ?
	let code = "";

	// create arrays of arrays wit only spans inside
	const linesArr: ReactNode[][] = [[]];

	Children.forEach(children, (child) => {
		const index = linesArr.length - 1;

		if (typeof child === "string") {
			linesArr.push([]);
			// add to code
			code += child;
		} else {
			if (linesArr[index]) {
				linesArr[index].push(child);
			}

			// add content to code
			if (child && typeof child === "object") {
				code += (child as ReactElement).props.children;
			}
		}
	});

	// transform lines into divs > [span]
	const linesNodes = [];
	for (let i = 0; i < linesArr.length; i++) {
		const lineIndex = i + 1;
		const childs = numbered
			? [
					<Number key={`line-number-${lineIndex}`}>
						{lineIndex}
					</Number>,
					linesArr[i],
			  ]
			: linesArr[i];

		linesNodes.push(
			<Line
				key={`line-${lineIndex}`}
				highlight={linesHighlighted.indexOf(lineIndex) > -1}
			>
				{childs}
			</Line>
		);
	}

	return (
		<div className="code-wrapper">
			<FileInfo
				language={language.replace("language-", "")}
				code={code}
				pathName={filePath}
			/>
			<div
				className="code-scrollable"
				style={{ background: background.split(":")[1] }}
			>
				<pre>
					<code>{linesNodes}</code>
				</pre>
			</div>
		</div>
	);
};

export default CodeBlock;

const Line: React.FC<{ highlight?: boolean }> = ({ highlight, children }) => (
	<div className={highlight ? "code-line highlighted" : "code-line"}>
		{children}
	</div>
);

const Number: React.FC = ({ children }) => (
	<span className="line-number">{children}</span>
);
