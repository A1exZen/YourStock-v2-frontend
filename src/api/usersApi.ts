import api from "@/lib/axios.ts";
import {User} from "@/types/entitiesTypes";
import {AxiosError} from "axios";

interface ErrorResponse {
	message: string;
}

export const getAllUsers = async (): Promise<User[]> => {
	try {
		const response = await api.get<User[]>("/api/users");
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError<ErrorResponse>;
		throw new Error(axiosError.response?.data?.message || "Ошибка при получении пользователей");
	}
}

export const getUserById = async (id: number): Promise<User> => {
	try {
		const response = await api.get<User>(`/api/users/${id}`);
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError<ErrorResponse>;
		throw new Error(axiosError.response?.data?.message || "Ошибка при получении пользователя");
	}
}

export const updateUser = async (id: number, data: Omit<User, "id">): Promise<User> => {
	try {
		const response = await api.put<User>(`/api/users/${id}`, data);
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError<ErrorResponse>;
		throw new Error(axiosError.response?.data?.message || "Ошибка при обновлении поставщика");
	}
}

export const deleteUser = async (id: number): Promise<void> => {
	try {
		await api.delete(`/api/users/${id}`);
	} catch (error) {
		const axiosError = error as AxiosError<ErrorResponse>;
		throw new Error(axiosError.response?.data?.message || "Ошибка при удалении пользователя");
	}
}