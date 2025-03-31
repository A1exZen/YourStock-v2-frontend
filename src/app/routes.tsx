import {createBrowserRouter} from "react-router";
import {MainLayout} from "./MainLayout.tsx";
import {NotFound} from "../components/pages/NotFound.tsx";
import {Home} from "../components/pages/home/Home.tsx";
import Login from "@/components/pages/Login.tsx";
import Register from "@/components/pages/Register.tsx";

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
				path: '/login',
				element: <Login/>
			},
			{
				path: '/register',
				element: <Register/>
			}
		]
	}
])