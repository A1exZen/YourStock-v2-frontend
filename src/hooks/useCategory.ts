import {
	createCategory,
	deleteCategory, getAllCategories, getCategoriesByType,
	updateCategory
} from "@/api/categoryApi";
import { Category } from "@/types/entitiesTypes";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

export const useCategories = () => {
	return useQuery<Category[], Error>({
		queryKey: ["categories"],
		queryFn: getAllCategories,
	});
};

export const useCategoriesByType = (type: "PRODUCT" | "MATERIAL") => {
	return useQuery<Category[], Error>({
		queryKey: ["categories", type],
		queryFn: () => getCategoriesByType(type),
	});
};

export const useCreateCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
	});
};

export const useUpdateCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
	});
};

export const useDeleteCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
	});
};