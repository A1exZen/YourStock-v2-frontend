// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import api from "@/lib/axios";
// import toast from "react-hot-toast";
// import {Material} from "@/types/entitiesTypes.ts";
//
//
// const fetchMaterials = async (): Promise<Material[]> => {
// 	const response = await api.get("/api/warehouse/materials");
// 	return response.data;
// };
//
// const fetchMaterialsByCategory = async (categoryId: number): Promise<Material[]> => {
// 	const response = await api.get(`/api/warehouse/materials/category/${categoryId}`);
// 	return response.data;
// };
//
// const searchMaterials = async (name: string): Promise<Material[]> => {
// 	const response = await api.get(`/api/warehouse/materials/search?name=${name}`);
// 	return response.data;
// };
//
// export const useMaterials = () => {
// 	return useQuery({
// 		queryKey: ["materials"],
// 		queryFn: fetchMaterials,
// 	});
// };
//
// export const useMaterialsByCategory = (categoryId: number) => {
// 	return useQuery({
// 		queryKey: ["materials", categoryId],
// 		queryFn: () => fetchMaterialsByCategory(categoryId),
// 		enabled: !!categoryId,
// 	});
// };
//
// export const useSearchMaterials = (name: string) => {
// 	return useQuery({
// 		queryKey: ["materials", name],
// 		queryFn: () => searchMaterials(name),
// 		enabled: !!name,
// 	});
// };
//
// export const useAddMaterialStock = () => {
// 	const queryClient = useQueryClient();
// 	return useMutation({
// 		mutationFn: ({ id, quantity, unit }: { id: number; quantity: number; unit: string }) =>
// 			api.post(`/api/warehouse/materials/${id}/add`, null, { params: { quantity, unit } }),
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({ queryKey: ["materials"] });
// 			toast.success("Материал успешно добавлен на склад");
// 		},
// 		onError: (error) => {
// 			toast.error("Ошибка добавления материала: " + error.message);
// 		},
// 	});
// };
//
// export const useRemoveMaterialStock = () => {
// 	const queryClient = useQueryClient();
// 	return useMutation({
// 		mutationFn: ({ id, quantity, unit }: { id: number; quantity: number; unit: string }) =>
// 			api.post(`/api/warehouse/materials/${id}/remove`, null, { params: { quantity, unit } }),
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({ queryKey: ["materials"] });
// 			toast.success("Материал успешно списан со склада");
// 		},
// 		onError: (error) => {
// 			toast.error("Ошибка списания материала: " + error.message);
// 		},
// 	});
// };