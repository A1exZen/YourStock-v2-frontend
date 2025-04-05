import {AxiosError} from "axios";
import api from "@/lib/axios.ts";
import { Supplier } from "@/types/entitiesTypes";

interface ErrorResponse {
	message: string;
}

export const getSuppliers = async (): Promise<Supplier[]> => {
	try{
    const response = await api.get<Supplier[]>("/api/suppliers");
		return response.data;
	}catch(error){
		const axiosError = error as AxiosError<ErrorResponse>;
		throw new Error(axiosError.response?.data?.message || "Ошибка при получении поставщиков");
	}
}
export const createSupplier = async (data: Omit<Supplier, "id">): Promise<Supplier> => {
	try {
		const response = await api.post<Supplier>("/api/suppliers", data);
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError<ErrorResponse>;
		throw new Error(axiosError.response?.data?.message || "Ошибка при создании поставщика");
	}
};

export const updateSupplier = async (id: number, data: Omit<Supplier, "id">): Promise<Supplier> => {
	try {
		const response = await api.put<Supplier>(`/api/suppliers/${id}`, data);
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError<ErrorResponse>;
		throw new Error(axiosError.response?.data?.message || "Ошибка при обновлении поставщика");
	}
};

export const deleteSupplier = async (id: number): Promise<void> => {
	try {
		await api.delete(`/api/suppliers/${id}`);
	} catch (error) {
		const axiosError = error as AxiosError<ErrorResponse>;
		throw new Error(axiosError.response?.data?.message || "Ошибка при удалении поставщика");
	}
};