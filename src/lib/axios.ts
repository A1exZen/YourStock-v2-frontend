// src/lib/axios.ts
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import {useAuthStore} from "@/store/useAuthStore.ts";

const api: AxiosInstance = axios.create({
	baseURL: "http://localhost:8080",
	withCredentials: true,
});

api.interceptors.request.use(
	(config) => {
		const accessToken = useAuthStore.getState().accessToken;
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

api.interceptors.response.use(
	(response: AxiosResponse) => {
		const newAccessToken = response.headers["x-new-access-token"];
		if (newAccessToken) {
			useAuthStore.getState().setAccessToken(newAccessToken);
		}
		return response;
	},
	async (error: AxiosError) => {
		if (error.response?.status === 401) {
			useAuthStore.getState().logout();
			window.location.href = "/login";
		}
		return Promise.reject(error);
	}
);

export default api;