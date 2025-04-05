import {useAuthStore} from "@/store/useAuthStore.ts";
import { Navigate } from "react-router";
import {ReactNode} from "react";

interface ProtectedRouteProps {
	element: ReactNode;
	allowedRoles: string[];
}

export const ProtectedRoute = ({ element, allowedRoles }: ProtectedRouteProps) => {
	const { role, username } = useAuthStore();

	if (allowedRoles && !username) {
		return <Navigate to="/login" replace />;
	}

	if (allowedRoles && !allowedRoles.includes(role as string)) {
		return <Navigate to="/dashboard" replace />;
	}

	return <>{element}</>;
};