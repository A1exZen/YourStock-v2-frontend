import { content } from "@/components/pages/home/content";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { Factory, Warehouse, BarChart, Link2, FileText, Smartphone } from 'lucide-react';

export const Features = () => {
	const { features } = content;

	const featureIcons = [
		<Factory className="w-5 h-5 text-yellow-400" />,
		<Warehouse className="w-5 h-5 text-yellow-400" />,
		<BarChart className="w-5 h-5 text-yellow-400" />,
		<Link2 className="w-5 h-5 text-yellow-400" />,
		<FileText className="w-5 h-5 text-yellow-400" />,
		<Smartphone className="w-5 h-5 text-yellow-400" />,
	];

	return (
		<section className="relative py-16 px-4  overflow-hidden">

			<div className="absolute inset-0 pointer-events-none">
				<div
					className="absolute top-0 left-0 w-[600px] h-[600px] opacity-10 blur-3xl"
					style={{
						background: 'radial-gradient(circle at center, #3B82F6 0%, transparent 70%)',
					}}
				/>
				<div
					className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-15 blur-3xl"
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
					<h2 className="text-4xl mb-4 md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 text-transparent bg-clip-text">
						{features.title}
					</h2>
					<p className="mt-3 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
						{features.subtitle}
					</p>
				</motion.div>

				{features.items.map((item, index) => (
					<div
						key={index}
						className={`mt-12 flex flex-col md:flex-row items-center gap-8 max-w-6xl mx-auto ${
							index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
						}`}
					>
						<motion.div
							initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8, delay: 0.2 }}
							className="flex-1"
						>
							<h3 className="text-3xl font-semibold ">{item.title}</h3>
							<p className="mt-4 text-text-secondary leading-relaxed">{item.description}</p>
							<div className="mt-6 space-y-4">
								<div className="flex items-center gap-3">
									{featureIcons[index % featureIcons.length]}
									<span className="text-text-secondary">
                    {index === 0 && "Отслеживание этапов производства в реальном времени"}
										{index === 1 && "Автоматические уведомления о запасах"}
										{index === 2 && "Детализированные отчеты и визуальные дашборды"}
										{index === 3 && "Интеграция с  другими системами"}
										{index === 4 && "Эффективное отслеживание и координация заказов"}
										{index === 5 && "Доступ с любого устройства, в любом месте"}
                  </span>
								</div>
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8, delay: 0.4 }}
							className="flex-1"
						>
							<div className="relative mx-10 bg-gray-900/50 backdrop-blur-md rounded-xl shadow-xl border border-gray-800 transform rotate-1 hover:rotate-0 transition-transform duration-300">
								<div className="h-64 bg-gray-800 rounded-lg" />
							</div>
						</motion.div>
					</div>
				))}

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.5 }}
					className="mt-10 text-center"
				>
						<Button
							variant="outline"
							className=" border-gray-600 hover:bg-teal-500  hover:border-transparent hover:scale-110 transition-all duration-300 px-6 py-2 rounded-full"
						>
							{features.moreButton}
						</Button>
				</motion.div>
			</div>
		</section>
	);
};