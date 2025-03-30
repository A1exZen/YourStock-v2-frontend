import {ThemeToggle} from "@/components/ui/custom/ThemeToggle.tsx";

import {Link, useNavigate} from "react-router";
import {Button} from "@/components/ui/button.tsx";



export const Header = () => {

	const navigate = useNavigate();

	return (
		<header
			className="flex items-center justify-between px-4 py-2 bg-card m-2 rounded-lg  dark:border-none">
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
		</header>
	);
};