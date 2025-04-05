import {ThemeToggle} from "@/components/ui/custom/ThemeToggle.tsx";

import {Link, useLocation, useNavigate} from "react-router";
import {Button} from "@/components/ui/button.tsx";
import cn from 'classnames'
import {motion} from "framer-motion";
import {useAuthStore} from "@/store/useAuthStore.ts";
import {useLogout} from "@/hooks/useAuth.ts";

export const Header = () => {
	const {username, role, logout: clearAuth} = useAuthStore();
	console.log(username, role, clearAuth);
	const {mutate: logout, isPending} = useLogout();
	const navigate = useNavigate();

	const location = useLocation();
	const isHomePage = location.pathname === "/";

	const handleLogout = () => {
		logout();
		clearAuth();
		navigate("/");
	};



	// !TODO Change routes links (styles)
	return (
		<motion.header
			className={cn("bg-card flex items-center justify-between px-4 py-2 m-2 rounded-lg  transition-all duration-300 dark:border-none", {
				'bg-transparent': isHomePage,
			})}>
			<Link to='/' className="flex items-center">
				<span style={{fontWeight: 900}}>Your</span>
				<span
					className="ml-1 px-2 py-1 bg-gradient-to-r from-teal-600 to-blue-600 rounded-lg text-white">Stock</span>
			</Link>
			<div className='flex  gap-12'>
				{
					username ? (
						<>
							{/*<Button*/}
							{/*	onClick={handleLogout}*/}
							{/*	disabled={isPending}*/}
							{/*	className="bg-red-900 hover:bg-red-700"*/}
							{/*>*/}
							{/*	{isPending ? "Выход..." : "Выйти"}*/}
							{/*</Button>*/}
						</>
					) : (
						<div className='flex gap-6'>
							<Link to='/login'>
								<Button
									className='border border-border text-foreground hover:text-gray-100  hover:bg-primary/90 bg-red=100 cursor-pointer'
								>
									Вход
								</Button>
							</Link>
							<Link to='/register'>
								<Button
									className='border border-border text-foreground hover:text-gray-100  hover:bg-primary/90 bg-red=100 cursor-pointer'
								>
									Регистрация
								</Button>
							</Link>
						</div>
					)
				}

				<div className="flex items-center gap-2">
					<ThemeToggle/>
				</div>
			</div>
		</motion.header>
	);
};