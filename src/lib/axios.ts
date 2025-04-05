// src/lib/axios.ts
import axios, {AxiosInstance} from "axios";
import {useAuthStore} from "@/store/useAuthStore.ts";

const api: AxiosInstance = axios.create({
	baseURL: "http://localhost:8080",
	withCredentials: true,
});

api.interceptors.request.use(
	(config) => {
		const {accessToken} = useAuthStore.getState();
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const response = await axios.post(
					"http://localhost:8080/api/auth/refresh",
					{},
					{ withCredentials: true }
				);

				const newAccessToken = response.data.accessToken;
				useAuthStore.getState().setAccessToken(newAccessToken);
				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				return api(originalRequest);
			} catch (refreshError) {
				useAuthStore.getState().logout();
				window.location.href = "/login";
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	}
);

export default api;