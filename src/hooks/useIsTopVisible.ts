import {useEffect, useState} from "react";

// !TODO - Change this - Its doesnt work
export const useIsTopVisible = (): boolean => {
	const [isTopVisible, setIsTopVisible] = useState(true);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsTopVisible(entry.isIntersecting);
			},
			{ threshold: 1.0 }
		);

		const sentinel = document.createElement('div');
		sentinel.style.position = 'absolute';
		sentinel.style.top = '0';
		sentinel.style.height = '1px';
		document.body.prepend(sentinel);
		observer.observe(sentinel);

		return () => {
			observer.disconnect();
			sentinel.remove();
		};
	}, []);

	return isTopVisible;
};