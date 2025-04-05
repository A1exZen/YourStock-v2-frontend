import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Customer} from "@/types/entitiesTypes.ts";
import api from "@/lib/axios.ts";
import {AxiosError} from "axios";
import toast from "react-hot-toast";

interface ErrorResponse {
	message: string;
}

const fetchCustomers = async (): Promise<Customer[]> => {
	try {
		const response = await api.get("/api/customers");
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError<ErrorResponse>;
		throw new Error(axiosError.response?.data?.message || "Ошибка при получении покупателей");
	}
};

const createCustomer = async (data: Omit<Customer, "id">): Promise<Customer> => {
	try {
		const response = await api.post("/api/customers", data);
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError<ErrorResponse>;
		throw new Error(axiosError.response?.data?.message || "Ошибка при создании покупателя");
	}

};

const updateCustomer = async ({id, data}: {
	id: number;
	data: Omit<Customer, "id">
}): Promise<Customer> => {
	try {

		const response = await api.put(`/api/customers/${id}`, data);
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError<ErrorResponse>;
		throw new Error(axiosError.response?.data?.message || "Ошибка при обновлении покупателя");
	}
};

const deleteCustomer = async (id: number): Promise<void> => {
	try {
		await api.delete(`/api/customers/${id}`);
	} catch (error) {
		const axiosError = error as AxiosError<ErrorResponse>;
		throw new Error(axiosError.response?.data?.message || "Ошибка при удалении покупателя");
	}
};

export const useCustomers = () => {
	return useQuery<Customer[], Error>({
		queryKey: ["customers"],
		queryFn: fetchCustomers,
		onError: (error: Error) => toast.error(error.message),
		retry: 1,
	});
};

export const useCreateCustomer = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createCustomer,
		onSuccess: () => {
			toast.success("Покупатель успешно создан!");
			queryClient.invalidateQueries({queryKey: ["customers"]});
		},
		onError: (error: Error) => {
			toast.error(error.message);
		},
	});
};

export const useUpdateCustomer = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateCustomer,
		onSuccess: () => {
			toast.success("Покупатель успешно обновлён!");
			queryClient.invalidateQueries({queryKey: ["customers"]});
		},
		onError: (error: Error) => {
			toast.error(error.message);
		},
	});
};

export const useDeleteCustomer = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteCustomer,
		onSuccess: () => {
			toast.success("Покупатель успешно удалён!");
			queryClient.invalidateQueries({queryKey: ["customers"]});
		},
		onError: (error: Error) => {
			toast.error(error.message);
		},
	});
};