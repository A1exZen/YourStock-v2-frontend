import { content } from "@/components/pages/home/content";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { Play, MessageSquare, Rocket } from 'lucide-react';

export const Cta = () => {
	const { cta } = content;

	return (
		<section className="relative py-20 mb-12 text-center bg-gradient-to-r from-emerald-600 to-teal-400 bg-blue-2xl rounded-2xl text-white overflow-hidden">

			<div className="absolute inset-0 pointer-events-none">
				<div
					className="absolute top-0 left-0 w-[600px] h-[600px] opacity-20 blur-3xl"
					style={{
						background: 'radial-gradient(circle at center, #ffffff 0%, transparent 70%)',
					}}
				/>
			</div>

			<div className="relative max-w-7xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
				>
					<h2 className="text-4xl md:text-5xl font-bold">{cta.title}</h2>
					<p className="mt-3 text-lg md:text-xl">{cta.subtitle}</p>
					<p className="mt-3 text-sm text-gray-200">{cta.description}</p>
				</motion.div>

				<div className="mt-8 flex justify-center gap-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.2 }}
						whileHover={{
							scale: 1.05,
							transition: { duration: 0.3 },
						}}
						whileTap={{ scale: 0.95 }}
					>
						<Button variant='default' className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-2 rounded-full flex items-center gap-2">
							<Rocket className="w-5 h-5" />
							{cta.buttons.startFree}
						</Button>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } }}
						viewport={{ once: true }}

						whileHover={{
							scale: 1.05,
							transition: { duration: 0.3 },
						}}
						whileTap={{ scale: 0.95 }}
					>
						<Button
							variant="outline"
							className="text-black border-white hover:bg-white hover:text-blue-400 px-6 py-2 rounded-full flex items-center gap-2"
						>
							<MessageSquare className="w-5 h-5" />
							{cta.buttons.contactUs}
						</Button>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.4 }}
						whileHover={{
							scale: 1.05,
							transition: { duration: 0.3 },
						}}
						whileTap={{ scale: 0.95 }}
					>
						<Button
							variant="link"
							className="text-white hover:text-gray-200 flex items-center gap-2"
						>
							<Play className="w-5 h-5" />
							{cta.buttons.watchVideo}
						</Button>
					</motion.div>
				</div>
			</div>
		</section>
	);
};