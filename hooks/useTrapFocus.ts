import { useCallback, useEffect } from "react";

export const useTrapFocus = (
	active: boolean,
	focusableElements: HTMLElement[]
): void => {
	const listener = useCallback(
		(e: KeyboardEvent) => {
			if (focusableElements.length) {
				const firstElem = focusableElements[0];
				const lastElem =
					focusableElements[focusableElements.length - 1];

				if (e.key === "Tab") {
					e.preventDefault();
					const isShift = e.shiftKey;

					const activeElementIndex = document.activeElement
						? focusableElements.indexOf(
								document.activeElement as HTMLElement
						  )
						: 0;

					let positionShift = 1;
					if (!isShift) {
						if (e.target === lastElem) {
							firstElem && firstElem.focus();
							e.preventDefault();
							return;
						}
					} else {
						positionShift = -1;
						if (
							e.target === firstElem ||
							activeElementIndex + positionShift < 0
						) {
							lastElem && lastElem.focus();
							e.preventDefault();
							return;
						}
					}
					focusableElements[
						activeElementIndex + positionShift
					].focus();
				}
			}
		},
		[focusableElements]
	);

	useEffect(() => {
		if (active) {
			document.addEventListener("keydown", listener);
		} else {
			document.removeEventListener("keydown", listener);
		}
		return () => document.removeEventListener("keydown", listener);
	}, [active, listener]);
};
