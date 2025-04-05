import {useEffect} from "react";
import {useThemeStore} from "@/store/useThemeStore.ts";
import * as React from "react";

export const ThemeProvider = ({children}: { children: React.ReactNode }) => {
	const theme = useThemeStore(state => state.theme);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
	}, [])
	return <>{children}</>
}
