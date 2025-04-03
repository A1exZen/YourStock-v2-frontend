import {AxiosError} from "axios";
import api from "@/lib/axios.ts";

interface RegisterRequest {
	username: string;
	email: string;
	password: string;
	phoneNumber: string;
	firstName: string;
	lastName: string;
	position: string;
	city: string;
	role: string;
}

interface LoginRequest {
	username: string;
	password: string;
}

interface AuthResponse {
	accessToken: string;
	type: string;
	username: string;
	role: string;
}

interface ErrorResponse {
	message: string;
}

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
	try{
const response = await api.post<AuthResponse>('/api/auth/login', data);
return response.data;
	}catch(error){
		const axiosError = error as AxiosError<ErrorResponse>;
		throw new Error(
			axiosError.response?.data.message || "Ошибка авторизации",
		)
	}
}

export const register = async (data: RegisterRequest): Promise<string> => {
	try{
		const response = await api.post<string>('/api/auth/register', data);
		return response.data;
	}catch(error){
		const axiosError = error as AxiosError<ErrorResponse>;
		throw new Error(
			axiosError.response?.data.message || "Ошибка регистрации",
		)
	}
}

export const logout = async(): Promise<void> => {
	await api.post('/api/auth/logout');
}


