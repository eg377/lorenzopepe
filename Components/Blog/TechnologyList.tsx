import { useState, useEffect, useRef } from "react";
import { Hide, Show } from "../../assets/Chevrons";

interface TechnologyListProps {
	initState?: boolean;
}

export const TechnologyList: React.FC<TechnologyListProps> = ({
	initState = false,
	children,
}) => {
	const [isOpen, setOpen] = useState(initState);
	const listRef = useRef<HTMLDivElement | null>(null);
	const animate = useRef<boolean>(false);

	useEffect(() => {
		if (animate.current && listRef.current) {
			listRef.current.classList.add("animate");
			if (isOpen) {
				listRef.current.classList.add("expanded");
			} else {
				listRef.current.classList.remove("expanded");
			}
		} else {
			if (isOpen && listRef.current) {
				listRef.current.classList.add("expanded");
			}
			animate.current = true;
		}
	}, [isOpen]);

	return (
		<div ref={listRef} className="tech-list">
			<div className="list-header">
				<h5>Technologies we are going to use</h5>
				<button onClick={() => setOpen(!isOpen)}>
					{isOpen ? <Hide /> : <Show />}
				</button>
			</div>
			<ul
				className={isOpen ? "expanded" : "hidden"}
				aria-hidden={!isOpen}
			>
				{children}
			</ul>
		</div>
	);
};