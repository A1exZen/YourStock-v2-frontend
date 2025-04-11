// import { useQuery } from "@tanstack/react-query";
// import api from "@/lib/axios";
// import {WarehouseTransaction} from "@/types/entitiesTypes.ts";
//
//
//
// const fetchTransactions = async (filters: {
// 	type?: string;
// 	materialId?: number;
// 	productId?: number;
// 	employeeId?: number;
// 	startDate?: string;
// 	endDate?: string;
// }): Promise<WarehouseTransaction[]> => {
// 	const params = new URLSearchParams();
// 	if (filters.type) params.append("type", filters.type);
// 	if (filters.materialId) params.append("materialId", filters.materialId.toString());
// 	if (filters.productId) params.append("productId", filters.productId.toString());
// 	if (filters.employeeId) params.append("employeeId", filters.employeeId.toString());
// 	if (filters.startDate) params.append("startDate", filters.startDate);
// 	if (filters.endDate) params.append("endDate", filters.endDate);
//
// 	const response = await api.get(`/api/warehouse/transactions?${params.toString()}`);
// 	return response.data;
// };
//
// export const useWarehouseTransactions = (filters: {
// 	type?: string;
// 	materialId?: number;
// 	productId?: number;
// 	employeeId?: number;
// 	startDate?: string;
// 	endDate?: string;
// }) => {
// 	return useQuery({
// 		queryKey: ["transactions", filters],
// 		queryFn: () => fetchTransactions(filters),
// 	});
// };