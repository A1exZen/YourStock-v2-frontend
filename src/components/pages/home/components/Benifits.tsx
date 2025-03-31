import {content} from "@/components/pages/home/content.ts";
import {motion} from 'framer-motion'
export const Benifits = () => {
	const {benefits} = content;

	return (
		<section className="py-16 px-4 ">

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.8 }}
				className="text-center"
			>
				<h2 className="text-4xl md:text-5xl font-bold">{benefits.title}</h2>
				<p className="mt-3 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
					{benefits.subtitle}
				</p>
			</motion.div>

			<div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto ">
				{benefits.items.map((item, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } }}
						viewport={{ once: true }}
						whileHover={{ scale: 1.05,  transition: { duration: 0.3 , ease: 'easeInOut' } }}
						className="relative p-6 bg-card rounded-xl shadow-lg overflow-hidden border border-gray-800"
					>
						<motion.div
							className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 `}
							whileHover={{ scaleX: 1.05, transition: { duration: 0.3 } }}
						/>
						<h3 className="text-xl font-semibold ">{item.title}</h3>
						<p className="mt-3 text-text-secondary leading-relaxed">{item.description}</p>
					</motion.div>
				))}
			</div>
		</section>
	)
}
