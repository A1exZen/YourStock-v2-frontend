import {ThemeToggle} from "@/components/ui/custom/ThemeToggle.tsx";

import {Link, useLocation} from "react-router";
import {Button} from "@/components/ui/button.tsx";
import cn from 'classnames'
import {motion} from "framer-motion";

export const Header = () => {
	// const navigate = useNavigate();

	const location = useLocation();
	const isHomePage = location.pathname === "/";

	return (
		<motion.header
			className={cn("bg-card flex items-center justify-between px-4 py-2 m-2 rounded-lg  transition-all duration-300 dark:border-none",{
				'bg-transparent': isHomePage,
			})}>
			<Link to='/' className="flex items-center">
				<span style={{fontWeight: 900}}>Your</span>
				<span
					className="ml-1 px-2 py-1 bg-gradient-to-r from-teal-600 to-blue-600 rounded-lg text-white">Stock</span>
			</Link>
			<div className='flex gap-8'>
				<div className='flex gap-3'>

					<Link to='/login'>
						<Button
							variant='outline'
							className='border border-border bg-transparent'
						>
							Вход
						</Button>
					</Link>
					<Link to='/register'>
						<Button
							variant='outline'
							className='border border-border bg-transparent'
						>
							Регистрация
						</Button>
					</Link>


				</div>
				<div className="flex items-center gap-2">
					<ThemeToggle/>
				</div>
			</div>
		</motion.header>
	);
};