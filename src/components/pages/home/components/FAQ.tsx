import { content } from "@/components/pages/home/content";
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

export const Faq = () => {
	const { faq } = content;

	return (
		<section className="relative py-16 px-4  overflow-hidden">

			<div className="absolute inset-0 pointer-events-none">
				<div
					className="absolute top-0 left-0 w-[500px] h-[500px] opacity-10 blur-3xl"
					style={{
						background: 'radial-gradient(circle at center, #10B981 0%, transparent 70%)',
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
					<h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 text-transparent bg-clip-text">
						{faq.title}
					</h2>
					<p className="mt-3 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
						{faq.subtitle}
					</p>
				</motion.div>

				<div className="mt-12 space-y-6 max-w-3xl mx-auto">
					{faq.items.map((item, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className="p-6 bg-card/50 backdrop-blur-md rounded-xl border border-border shadow-lg"
						>
							<div className="flex items-center gap-3">
								<HelpCircle className="w-6 h-6 text-emerald-400" />
								<h3 className="text-xl font-semibold ">{item.question}</h3>
							</div>
							<p className="mt-3 text-text-secondary leading-relaxed">{item.answer}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};