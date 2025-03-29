import {createBrowserRouter} from "react-router";
import {MainLayout} from "./MainLayout.tsx";
import {NotFound} from "../components/pages/NotFound.tsx";
import {Home} from "../components/pages/Home.tsx";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout/>,
		errorElement: <NotFound/>,
		children: [
			{
				index: true,
				element: <Home/>
			}
		]
	}
])