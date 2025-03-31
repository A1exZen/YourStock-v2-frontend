import { content } from "@/components/pages/home/content";
import { motion } from 'framer-motion';
import { Users, DollarSign, Clock, TrendingUp } from 'lucide-react';

export const Statistics = () => {
	const { statistics } = content;

	const statIcons = [
		<Users className="w-8 h-8 text-cyan-400" />,
		<DollarSign className="w-8 h-8 text-yellow-400" />,
		<Clock className="w-8 h-8 text-pink-400" />,
		<TrendingUp className="w-8 h-8 text-blue-400" />,
	];

	return (
		<section className="relative py-16 px-4 bg-card rounded-3xl  overflow-hidden">

			<div className="absolute inset-0 pointer-events-none">
				<div
					className="absolute top-0 left-0 w-[500px] h-[500px] opacity-10 blur-3xl"
					style={{
						background: 'radial-gradient(circle at center, #06B6D4 0%, transparent 70%)',
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
					<h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-500 to-cyan-600 text-transparent bg-clip-text">
						{statistics.title}
					</h2>
					<p className="mt-3 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
						{statistics.subtitle}
					</p>
				</motion.div>

				<div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
					{statistics.items.map((item, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							whileHover={{
								scale: 1.05,
								transition: { duration: 0.3, ease: 'easeInOut' },
							}}
							className="text-center p-6 bg-card/50 backdrop-blur-md rounded-xl border border-gray-800 shadow-lg"
						>
							<div className="flex justify-center mb-4">
								{statIcons[index % statIcons.length]}
							</div>
							<p className="text-5xl font-bold bg-primary  text-transparent bg-clip-text">
								{item.value}
							</p>
							<p className="mt-3 text-text-secondary">{item.description}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};