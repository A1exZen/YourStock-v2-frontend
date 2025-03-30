import {create} from 'zustand'
import {persist} from "zustand/middleware";

interface IThemeStore {
	theme: 'light' | 'dark',
	toggleTheme: () => void
}

export const useThemeStore = create<IThemeStore>()(persist(set => ({
	theme: 'light',
	toggleTheme: () => set(state => {
		const newTheme = state.theme === 'light' ? 'dark' : 'light';
		document.documentElement.classList.toggle('dark', newTheme === 'dark');
		return {theme: newTheme};
	}),
}), {
	name: 'theme-storage'
}));