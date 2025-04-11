// import { useQuery } from "@tanstack/react-query";
// import api from "@/lib/axios";
// import {Category} from "@/types/entitiesTypes.ts";
//
// const fetchCategories = async (): Promise<Category[]> => {
// 	const response = await api.get("/api/warehouse/categories");
// 	return response.data;
// };
//
// export const useCategories = () => {
// 	return useQuery({
// 		queryKey: ["categories"],
// 		queryFn: fetchCategories,
// 	});
// };