import api from "@/lib/axios";
import { Category } from "@/types/entitiesTypes";

export const getAllCategories = async (): Promise<Category[]> => {
	const response = await api.get<Category[]>("/api/categories");
	return response.data;
}
export const getCategoriesByType = async (type: "PRODUCT" | "MATERIAL"): Promise<Category[]> => {
	const response = await api.get<Category[]>(`/api/categories/type/${type}`);
	return response.data;
}
export const createCategory = async (data: Omit<Category, "id" | "createdAt">): Promise<Category> => {
	const response = await api.post<Category>("/api/categories", data);
	return response.data;
}
export const updateCategory = async ({id, data}: {
	id: number;
	data: Omit<Category, "id" | "createdAt">
}): Promise<Category> => {
	const response = await api.put<Category>(`/api/categories/${id}`, data);
	return response.data;
}
export const deleteCategory = async (id: number): Promise<void> => {
	await api.delete(`/api/categories/${id}`);
}