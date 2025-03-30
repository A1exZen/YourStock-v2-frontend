import { Header } from "@/components/Header";
import {Toaster} from "react-hot-toast";
import {Outlet} from "react-router";

export const MainLayout = () => {
	return (
		<div className=' h-screen overflow-hidden '>
			<Header/>
			<Toaster/>
			<main>
				<Outlet/>
			</main>
		</div>
	)
}
