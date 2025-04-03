// src/store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
	accessToken: string | null;
	username: string | null;
	role: string | null;
	setAuth: (accessToken: string, username: string, role: string) => void;
	setAccessToken: (accessToken: string) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			accessToken: null,
			username: null,
			role: null,
			setAuth: (accessToken: string, username: string, role: string) =>
				set({ accessToken, username, role }),
			setAccessToken: (accessToken: string) => set({ accessToken }),
			logout: () => set({ accessToken: null, username: null, role: null }),
		}),
		{
			name: "auth-storage",
		}
	)
);