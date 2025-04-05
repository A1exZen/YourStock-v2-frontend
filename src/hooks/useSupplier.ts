import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createSupplier,
	deleteSupplier,
	getSuppliers,
	updateSupplier
} from "@/api/supplier";
import toast from "react-hot-toast";
import {Supplier} from "@/types/entitiesTypes.ts";

export const useSuppliers = () => {
	return useQuery({
		queryKey: ["suppliers"],
		queryFn: getSuppliers,
		onError: (error: Error) => toast.error(error.message),
		retry: 1,
	});
};

export const useCreateSupplier = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createSupplier,
		onSuccess: () => {
			toast.success("Поставщик успешно создан!");
			queryClient.invalidateQueries({ queryKey: ["suppliers"] });
		},
		onError: (error: Error) => {
			toast.error(error.message);
		},
	});
};

export const useUpdateSupplier = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }: { id: number; data: Omit<Supplier, "id"> }) => updateSupplier(id, data),
		onSuccess: () => {
			toast.success("Поставщик успешно обновлён!");
			queryClient.invalidateQueries({ queryKey: ["suppliers"] });
		},
		onError: (error: Error) => {
			toast.error(error.message);
		},
	});
};

export const useDeleteSupplier = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteSupplier,
		onSuccess: () => {
			toast.success("Поставщик успешно удалён!");
			queryClient.invalidateQueries({ queryKey: ["suppliers"] });
		},
		onError: (error: Error) => {
			toast.error(error.message);
		},
	});
};