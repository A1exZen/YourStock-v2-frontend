import { content } from "@/components/pages/home/content";
import { motion } from 'framer-motion';

export const Gallery = () => {
	const { gallery } = content;

	return (
		<section className="relative py-16 px-4   overflow-hidden">
			<div className="absolute inset-0 pointer-events-none">
				<div
					className="absolute bottom-0 left-0 w-[600px] h-[600px] opacity-10 blur-3xl"
					style={{
						background: 'radial-gradient(circle at center, #FBBF24 0%, transparent 70%)',
					}}
				/>
			</div>

			<div className="relative max-w-7xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="text-center"
				>
					<h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
						{gallery.title}
					</h2>
					<p className="mt-3 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
						{gallery.subtitle}
					</p>
				</motion.div>

				<div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
					{gallery.items.map((item, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							whileHover={{
								scale: 1.05,
								rotate: index % 2 === 0 ? 2 : -2,
								transition: { duration: 0.3 },
							}}
							className="relative h-64 bg-gray-800 rounded-xl overflow-hidden border border-gray-800 shadow-lg"
						>
							<div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-transparent" />
							<div className="h-full flex items-center justify-center p-4">
								<p className="text-center text-gray-300">{item.description}</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};