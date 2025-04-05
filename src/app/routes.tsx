import {createBrowserRouter} from "react-router";
import {MainLayout} from "./MainLayout.tsx";
import {NotFound} from "../components/pages/NotFound.tsx";
import {Home} from "../components/pages/home/Home.tsx";
import Login from "@/components/pages/Login.tsx";
import Register from "@/components/pages/Register.tsx";
import {ProtectedRoute} from "@/app/ProtectedRoute.tsx";
import {Dashboard} from "@/components/pages/dashboard/Dashboard.tsx";
import Suppliers from "@/components/pages/suppliers/Suppliers.tsx";



export const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout/>,
		errorElement: <NotFound/>,
		children: [
			{
				index: true,
				element: <Home/>
			},
			{
				path: "/dashboard",
				element: <ProtectedRoute element={<Dashboard />} allowedRoles={["ADMIN", "MANAGER", "EMPLOYEE"]} />,
			},
			{
				path: '/login',
				element: <Login/>
			},
			{
				path: '/register',
				element: <Register/>
			},
			{
				path: "/suppliers",
				element: <ProtectedRoute element={<Suppliers />} allowedRoles={["MANAGER", "ADMIN"]} />,
			},
		]
	}
])