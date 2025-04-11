export interface LoginResponse {
	accessToken: string;
	type: string;
	username: string;
	role: string;
	userId: number;
}

export interface LoginRequest {
	username: string;
	password: string;
}

export interface RegisterRequest {
	username: string;
	password: string;
	email: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	city: string;
}