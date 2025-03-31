import {content} from "@/components/pages/home/content.ts";
import {Button} from "@/components/ui/button.tsx";
import {motion} from "framer-motion";

export const Hero = () => {
	const {hero} = content;

	return (
		<section
			className="py-20 text-center max-w-3xl mx-auto flex flex-col items-center"

		>
			<motion.h1
				initial={{opacity: 0, y: -20}}
				animate={{opacity: 1, y: 0}}
				viewport={{once: true}}
				transition={{duration: 0.8}}
				className="text-6xl font-bold">{hero.title}</motion.h1>
			<motion.p
				initial={{opacity: 0, y: 0}}
				animate={{opacity: 1, y: 0}}
				viewport={{once: true}}
				transition={{duration: 0.8, delay: 0.3}}
				className="mt-6 text-lg text-text-secondary max-w-2xl">{hero.subtitle}</motion.p>
			<motion.p
				initial={{opacity: 0, y: 0}}
				animate={{opacity: 1, y: 0}}
				viewport={{once: true}}
				transition={{duration: 0.8, delay: 0.5}}
				className="mt-4 text-md  text-text-secondary max-w-lg">{hero.description}</motion.p>
			<div className="mt-6 flex flex-wrap  justify-center gap-4">
				<Button
					className="bg-gradient-to-r from-blue-500 to-green-500 text-white cursor-pointer">{hero.buttons.startFree}</Button>
				<Button className='cursor-pointer'
				        variant="outline">{hero.buttons.demo}</Button>
				<Button className='w-full cursor-pointer'
				        variant="link">{hero.buttons.learnMore}</Button>
			</div>

		</section>
	)
}
