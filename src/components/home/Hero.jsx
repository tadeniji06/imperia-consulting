import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { slides } from "../../utils/data";
import SEO from "../../utils/SEO";

const Hero = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);

	useEffect(() => {
		if (!isAutoPlaying) return;
		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % slides.length);
		}, 6000);
		return () => clearInterval(interval);
	}, [isAutoPlaying, slides.length]);

	const changeSlide = (newIndex) => {
		setCurrentSlide(newIndex);
		setIsAutoPlaying(false);
		setTimeout(() => setIsAutoPlaying(true), 8000);
	};

	const nextSlide = () =>
		changeSlide((currentSlide + 1) % slides.length);
	const prevSlide = () =>
		changeSlide((currentSlide - 1 + slides.length) % slides.length);

	const goToSlide = (index) => changeSlide(index);

	const SlideImage = ({ slide, index, isActive }) => {
		const [imageError, setImageError] = useState(false);
		return (
			<div className='relative h-full w-full'>
				{!imageError ? (
					<img
						src={slide.img}
						alt={slide.title}
						className='h-full w-full object-cover'
						onError={() => setImageError(true)}
						loading={index === 0 ? "eager" : "lazy"}
					/>
				) : (
					<div
						className={`h-full w-full bg-gradient-to-br ${
							slide.bgGradient || "from-gray-800 to-gray-900"
						}`}
					>
						<div className='flex items-center justify-center h-full text-white/60'>
							<Icon icon='mdi:image-broken' className='w-16 h-16' />
						</div>
					</div>
				)}
				<div className='absolute inset-0 bg-black/60' />
				<div
					className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient} opacity-40`}
				/>
			</div>
		);
	};

	return (
		<>
			<SEO
				title='Imperia Consulting | Luxury Homes & Investment Opportunities'
				description='Discover luxurious and profitable properties in Westlands, Nairobi. Explore our latest listings and schedule a viewing today.'
			/>
			<section className='relative h-screen overflow-hidden'>
				<AnimatePresence mode='wait'>
					<motion.div
						key={currentSlide}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.6 }}
						className='absolute inset-0 z-0'
					>
						<SlideImage
							slide={slides[currentSlide]}
							index={currentSlide}
							isActive={true}
						/>
					</motion.div>
				</AnimatePresence>

				{/* Main Content */}
				<div className='relative z-10 h-full flex items-center'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
						<div className='grid lg:grid-cols-2 gap-12 items-center h-full'>
							<motion.div
								key={`content-${currentSlide}`}
								initial={{ x: -30, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ duration: 0.5 }}
								className='text-white space-y-6 md:space-y-8'
							>
								<motion.div
									initial={{ scale: 0.9, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									transition={{ duration: 0.3, delay: 0.1 }}
									className='inline-block'
								>
									<span className='inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-black/40 border border-white/30 text-white'>
										<Icon
											icon='mdi:star'
											className='w-4 h-4 mr-2 text-yellow-400'
										/>
										{slides[currentSlide].accent}
									</span>
								</motion.div>

								<motion.h1
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.5, delay: 0.2 }}
									className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight'
								>
									{slides[currentSlide].title}
								</motion.h1>

								<motion.p
									initial={{ y: 15, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.5, delay: 0.3 }}
									className='text-lg text-gray-100 max-w-2xl'
								>
									{slides[currentSlide].body}
								</motion.p>

								<motion.div
									initial={{ y: 15, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.5, delay: 0.4 }}
									className='flex flex-col sm:flex-row gap-4 pt-4'
								>
									<Link to={"/properties"}>
										<Button
											title='Buy Now'
											className='px-8 py-4 text-lg font-semibold'
										/>
									</Link>
								</motion.div>
							</motion.div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Hero;
