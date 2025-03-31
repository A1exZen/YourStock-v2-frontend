import {content} from "@/components/pages/home/content";
import {motion} from 'framer-motion';
import {Star, Quote} from 'lucide-react';

export const Testimonials = () => {
	const {testimonials} = content;

	return (
		<section className="relative py-16 px-4 overflow-hidden">

			<div className="absolute inset-0 pointer-events-none">
				<div
					className="absolute top-0 right-0 w-[500px] h-[500px] opacity-15 blur-3xl"
					style={{
						background: 'radial-gradient(circle at center, #F472B6 0%, transparent 70%)',
					}}
				/>
			</div>

			<div className="relative max-w-7xl mx-auto">
				<motion.div
					initial={{opacity: 0, y: 20}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true}}
					transition={{duration: 0.8}}
					className="text-center"
				>
					<h2
						className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-500 to-cyan-600 text-transparent bg-clip-text">
						{testimonials.title}
					</h2>
					<p
						className="mt-3 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
						{testimonials.subtitle}
					</p>
				</motion.div>

				<div
					className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
					{testimonials.items.map((item, index) => (
						<motion.div
							key={index}
							initial={{opacity: 0, y: 20}}
							whileInView={{
								opacity: 1,
								y: 0,
								transition: {duration: 0.5, delay: index * 0.1}
							}}
							viewport={{once: true}}
							whileHover={{
								scale: 1.02,
								boxShadow: '0 0 15px rgba(2, 89, 89, 0.3)',
								transition: {duration: 0.3},
							}}
							className="relative p-6 bg-card backdrop-blur-md rounded-xl border border-border shadow-lg"
						>
							<div className="absolute top-4 right-4">
								<Quote className="w-6 h-6 text-emerald-500 opacity-50"/>
							</div>
							<div className="flex items-center gap-4 mb-4">
								<div
									className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-xl font-semibold text-gray-400">
                    {item.name.charAt(0)}
                  </span>
								</div>
								<div>
									<p className="font-semibold">{item.name}</p>
									<p className="text-sm text-text-secondary">{item.role}</p>
								</div>
							</div>
							<div className="flex gap-1 mb-3">
								{[...Array(5)].map((_, i) => (
									<Star key={i}
									      className="w-4 h-4 text-yellow-400 fill-current"/>
								))}
							</div>
							<p className="italic text-text-secondary">"{item.text}"</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};