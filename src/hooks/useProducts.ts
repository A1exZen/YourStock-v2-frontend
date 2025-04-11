// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import api from "@/lib/axios";
// import toast from "react-hot-toast";
// import {Product} from "@/types/entitiesTypes.ts";
//
//
//
// const fetchProducts = async (): Promise<Product[]> => {
// 	const response = await api.get("/api/warehouse/products");
// 	return response.data;
// };
//
// const fetchProductsByCategory = async (categoryId: number): Promise<Product[]> => {
// 	const response = await api.get(`/api/warehouse/products/category/${categoryId}`);
// 	return response.data;
// };
//
// const searchProducts = async (name: string): Promise<Product[]> => {
// 	const response = await api.get(`/api/warehouse/products/search?name=${name}`);
// 	return response.data;
// };
//
// export const useProducts = () => {
// 	return useQuery({
// 		queryKey: ["products"],
// 		queryFn: fetchProducts,
// 	});
// };
//
// export const useProductsByCategory = (categoryId: number) => {
// 	return useQuery({
// 		queryKey: ["products", categoryId],
// 		queryFn: () => fetchProductsByCategory(categoryId),
// 		enabled: !!categoryId,
// 	});
// };
//
// export const useSearchProducts = (name: string) => {
// 	return useQuery({
// 		queryKey: ["products", name],
// 		queryFn: () => searchProducts(name),
// 		enabled: !!name,
// 	});
// };
//
// export const useProduceProduct = () => {
// 	const queryClient = useQueryClient();
// 	return useMutation({
// 		mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
// 			api.post(`/api/warehouse/products/${id}/produce`, null, { params: { quantity } }),
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({ queryKey: ["products"] });
// 			queryClient.invalidateQueries({ queryKey: ["materials"] });
// 			toast.success("Продукт успешно произведён");
// 		},
// 		onError: (error) => {
// 			toast.error("Ошибка производства продукта: " + error.message);
// 		},
// 	});
// };
//
// export const useRemoveProductStock = () => {
// 	const queryClient = useQueryClient();
// 	return useMutation({
// 		mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
// 			api.post(`/api/warehouse/products/${id}/remove`, null, { params: { quantity } }),
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({ queryKey: ["products"] });
// 			toast.success("Продукт успешно списан со склада");
// 		},
// 		onError: (error) => {
// 			toast.error("Ошибка списания продукта: " + error.message);
// 		},
// 	});
// };