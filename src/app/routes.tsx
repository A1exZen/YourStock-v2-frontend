import {createBrowserRouter} from "react-router";
import {MainLayout} from "./MainLayout.tsx";
import {NotFound} from "../components/pages/NotFound.tsx";
import {Home} from "../components/pages/home/Home.tsx";
import Login from "@/components/pages/Login.tsx";
import Register from "@/components/pages/Register.tsx";
import {ProtectedRoute} from "@/app/ProtectedRoute.tsx";
import {Dashboard} from "@/components/pages/dashboard/Dashboard.tsx";
import Suppliers from "@/components/pages/suppliers/Suppliers.tsx";
import {Customers} from "@/components/pages/customers/Customers.tsx";
import Users from "@/components/pages/users/Users.tsx";
import Warehouse from "@/components/pages/warehose/Warehouse.tsx";
import Categories from "@/components/categories/Categories.tsx";



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
			{
				path: "/customers",
				element: <ProtectedRoute element={<Customers />} allowedRoles={["MANAGER", "ADMIN"]} />,
			},
			{
				path: "/users",
				element: <ProtectedRoute element={<Users />} allowedRoles={["ADMIN"]} />,
			},
			{
				path: "/warehouse",
				element: <ProtectedRoute element={<Warehouse />} allowedRoles={["ADMIN", "MANAGER", "EMPLOYEE"]} />,
			},
			{
				path: "/categories",
				element: <ProtectedRoute element={<Categories />} allowedRoles={["ADMIN", "MANAGER"]} />,
			},
		]
	}
])