import {Toaster} from "react-hot-toast";
import {Outlet} from "react-router";

export const MainLayout = () => {
	return (
		<>
			<Toaster/>
			<main>
				<Outlet/>
			</main>
		</>
	)
}
