import {Header} from "@/components/Header";
import {Toaster} from "react-hot-toast";
import {Outlet} from "react-router";
import {useAuthStore} from "@/store/useAuthStore.ts";
import {Sidebar} from "@/components/sidebar/Sidebar.tsx";

export const MainLayout = () => {
const {username}= useAuthStore()
	return (
		<div className='flex h-screen overflow-hidden '>
			{
				username && <Sidebar />
			}
			<div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden '>
				<Header/>
				<main className='w-full max-w-9xl mx-auto'>
					<Outlet/>
				</main>
			</div>
			<Toaster position="bottom-right"/>
		</div>
	)
}
