import {Hero} from "@/components/pages/home/components/Hero.tsx";
import {Benifits} from "@/components/pages/home/components/Benifits.tsx";
import {motion} from 'framer-motion';
import {Statistics} from "@/components/pages/home/components/Statistics.tsx";
import {Features} from "./components/Features";
import {Gallery} from "@/components/pages/home/components/Gallery.tsx";
import {
	Testimonials
} from "@/components/pages/home/components/Testimonials.tsx";
import {Cta} from "@/components/pages/home/components/CTA.tsx";
import {Faq} from "@/components/pages/home/components/FAQ.tsx";
import {Footer} from "@/components/Footer.tsx";

export const Home = () => {
	return (
		<div className=" min-h-screen overflow-hidden">

			<div className="absolute inset-0 pointer-events-none">
				<motion.div
					className="absolute top-[10%] left-[10%] w-[500px] h-[500px] opacity-25 blur-3xl"
					style={{
						background: 'radial-gradient(circle at center, #06B6D4 0%, transparent 70%)',
					}}
					animate={{
						scale: [1, 1.2, 1],
						x: [-100, 120, -120],
						opacity: [0.2, 0.4, 0.2],
					}}
					transition={{
						duration: 6,
						ease: 'easeInOut',
						repeat: Infinity,
						delay: 0,
					}}
				/>
				<motion.div
					className="absolute bottom-[25%] right-[5%] w-[700px] h-[700px] opacity-25 blur-3xl"
					style={{
						background: 'radial-gradient(circle at center, #3B82F6 0%, transparent 60%)',
					}}
					animate={{
						scale: [1, 1.15, 1],
						y: [-130, 130, -130],
						opacity: [0.3, 0.4, 0.3],
					}}
					transition={{
						duration: 8,
						ease: 'easeInOut',
						repeat: Infinity,
						delay: 1,
					}}
				/>
				<motion.div
					className="absolute top-1/2 left-1/3 w-[400px] h-[400px] opacity-25 blur-2xl"
					style={{
						background: 'radial-gradient(circle at center, #1E3A8A 0%, transparent 80%)',
					}}
					animate={{
						scale: [1, 1.05, 1],
						x: [110, -110, 110],
						y: [120, -120, 120],
						opacity: [0.25, 0.25, 0.35],
					}}
					transition={{
						duration: 5,
						ease: 'easeInOut',
						repeat: Infinity,
						delay: 0.5,
					}}
				/>
			</div>

			<div className="relative max-w-7xl mx-auto z-10">
				<Hero/>
				<Benifits/>
				<Features/>
				<Statistics/>
				<Testimonials/>
				<Gallery/>
				<Faq/>
				<Cta/>
			</div>
			<div className=''>
				<Footer/>
			</div>
		</div>
	)
}
