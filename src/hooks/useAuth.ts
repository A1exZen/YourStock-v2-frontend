import { useMutation } from "@tanstack/react-query";
import {useNavigate} from "react-router";
import {useAuthStore} from "@/store/useAuthStore.ts";
import {login, logout, register} from "@/api/authApi";
import toast from "react-hot-toast";


export const useLogin = () => {
	const navigate = useNavigate();
	const { setAuth } = useAuthStore();

	return useMutation({
		mutationFn: login,
		onSuccess: (data) => {
			setAuth(data.accessToken, data.username, data.role);
			toast.success(`Добро пожаловать, ${data.username}!`);
			navigate("/dashboard");
		},
		onError: (error: Error) => {
			toast.error(error.message);
		},
	});
};

export const useRegister = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: register,
		onSuccess: () => {
			toast.success("Регистрация прошла успешно! Пожалуйста, войдите.");
			navigate("/login");
		},
		onError: (error: Error) => {
			toast.error(error.message);
		},
	});
};

export const useLogout = () => {
	const navigate = useNavigate();
	const { logout: clearAuth } = useAuthStore();

	return useMutation({
		mutationFn: logout,
		onSuccess: () => {
			clearAuth();
			toast.success("Вы успешно вышли из системы.");
			navigate("/login");
		},
		onError: (error: Error) => {
			toast.error("Ошибка при выходе: " + error.message);
		},
	});
};