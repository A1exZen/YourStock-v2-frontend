// src/components/pages/home/components/Footer.tsx
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Mail } from 'lucide-react';
import { content } from './pages/home/content';

export const Footer = () => {
	const {footer} = content;

	const socialIcons = [
		{ icon: <Twitter className="w-5 h-5" />, href: '#' },
		{ icon: <Linkedin className="w-5 h-5" />, href: '#' },
		{ icon: <Mail className="w-5 h-5" />, href: '#' },
	];

	return (
		<footer className="relative pt-12 pb-6 px-4 bg-gray-950 text-white overflow-hidden">
			{/* Градиентный фон */}
			<div className="absolute inset-0 pointer-events-none">
				<div
					className="absolute top-0 left-0 w-[400px] h-[400px] opacity-10 blur-3xl"
					style={{
						background: 'radial-gradient(circle at center, #3B82F6 0%, transparent 70%)',
					}}
				/>
			</div>

			<div className="relative max-w-7xl mx-auto">
				<div className="grid gap-8 md:grid-cols-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="md:col-span-1"
					>
						<h3 className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-emerald-600 text-transparent bg-clip-text">
							YourStock
						</h3>
						<p className="mt-4 text-gray-400">
							Ваш центр управления производством
						</p>
					</motion.div>

					<div className="md:col-span-3 grid gap-8 sm:grid-cols-3">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8, delay: 0.2 }}
						>
							<h4 className="text-lg font-semibold text-white">Компания</h4>
							<ul className="mt-4 space-y-2">
								{footer.company.map((link, index) => (
									<motion.li
										key={index}
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
									>
										<a
											href={link.href}
											className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
										>
											{link.label}
										</a>
									</motion.li>
								))}
							</ul>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8, delay: 0.3 }}
						>
							<h4 className="text-lg font-semibold text-white">Product</h4>
							<ul className="mt-4 space-y-2">
								{footer.product.map((link, index) => (
									<motion.li
										key={index}
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
									>
										<a
											href={link.href}
											className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
										>
											{link.label}
										</a>
									</motion.li>
								))}
							</ul>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8, delay: 0.4 }}
						>
							<h4 className="text-lg font-semibold text-white">Social</h4>
							<ul className="mt-4 space-y-2">
								{footer.social.map((link, index) => (
									<motion.li
										key={index}
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
									>
										<a
											href={link.href}
											className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
										>
											{link.label}
										</a>
									</motion.li>
								))}
							</ul>
							<div className="mt-4 flex gap-3">
								{socialIcons.map((social, index) => (
									<motion.a
										key={index}
										href={social.href}
										initial={{ opacity: 0, scale: 0.8 }}
										whileInView={{ opacity: 1, scale: 1 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
										whileHover={{
											scale: 1.2,
											rotate: 10,
											transition: { duration: 0.3 },
										}}
										className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300"
									>
										{social.icon}
									</motion.a>
								))}
							</div>
						</motion.div>
					</div>
				</div>

				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 0.6 }}
					className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm"
				>
					<p>{footer.copyright}</p>
				</motion.div>
			</div>
		</footer>
	);
};