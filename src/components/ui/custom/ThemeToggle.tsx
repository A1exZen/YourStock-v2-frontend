
import { Button } from "@/components/ui/button";
import { Moon, Sun } from 'lucide-react';
import {useThemeStore} from "@/store/useThemeStore.ts";

export const ThemeToggle = () => {

	const theme = useThemeStore(state => state.theme);
	const toggleTheme = useThemeStore(state => state.toggleTheme);

	return (
		<Button
			variant="outline"
			size="icon"
			onClick={toggleTheme}
			className="top-5 right-7 z-50 rounded-full"
		>
			{theme === 'light' ? (
				<Moon className="h-5 w-5 fill-primary " />
			) : (
				<Sun className="h-5 w-5 fill-primary" />
			)}
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
};