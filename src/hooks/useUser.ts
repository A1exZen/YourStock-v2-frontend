import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



import toast from "react-hot-toast";
import {User} from "@/types/entitiesTypes.ts";
import {deleteUser, getAllUsers, updateUser} from "@/api/usersApi.ts";

export const useUsers = () => {
	return useQuery<User[], Error>({
		queryKey: ["users"],
		queryFn: getAllUsers,
		retry: 1,
	});
};

export const useUpdateUser = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }: { id: number; data: Omit<User, "id"> }) => updateUser(id, data),
		onSuccess: () => {
			toast.success("Пользователь успешно обновлён!");
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
		onError: (error: Error) => {
			toast.error(error.message);
		},
	});
};

export const useDeleteUser = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteUser,
		onSuccess: () => {
			toast.success("Пользователь успешно удалён!");
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
		onError: (error: Error) => {
			toast.error(error.message);
		},
	});
};