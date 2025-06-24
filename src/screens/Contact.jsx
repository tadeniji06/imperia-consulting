import { map } from "../assets";
import { socials } from "../utils/data";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const Contact = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, {
		once: true,
		margin: "-50px 0px",
	});

	const [formData, setFormData] = useState({
		name: "",
		message: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		setTimeout(() => {
			console.log("Form submitted:", formData);
			setIsSubmitting(false);
			setFormData({
				name: "",
				message: "",
			});
		}, 2000);
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.1,
			},
		},
	};

	const mapVariants = {
		hidden: {
			opacity: 0,
			scale: 0.8,
			y: 50,
		},
		visible: {
			opacity: 1,
			scale: 1,
			y: 0,
			transition: {
				duration: 0.8,
				ease: "easeOut",
			},
		},
	};

	const contentVariants = {
		hidden: {
			opacity: 0,
			y: 50,
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: "easeOut",
			},
		},
	};

	return (
		<motion.div
			ref={ref}
			initial='hidden'
			animate={isInView ? "visible" : "hidden"}
			variants={containerVariants}
			className='flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 sm:py-12 px-4 sm:px-6 lg:px-8'
		>
			{/* Map Section */}
			<motion.div
				variants={mapVariants}
				className='flex justify-center'
			>
				<div className='w-full h-[300px] sm:h-[400px] lg:h-[600px] rounded-2xl overflow-hidden'>
					<img
						className='w-full h-full object-cover'
						src={map}
						alt='Our Location'
					/>
				</div>
			</motion.div>

			{/* Contact Content */}
			<motion.div
				variants={containerVariants}
				className='max-w-4xl mx-auto w-full mt-10'
			>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
					{/* Socials Section */}
					<motion.div
						variants={contentVariants}
						className='space-y-8'
					>
						<div>
							<h2 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-4'>
								Connect with Us
							</h2>
							<p className='text-gray-600 mb-6'>
								Reach out through social media or send us a
								message below.
							</p>
							<ul className='space-y-4'>
								{socials.map((item, idx) => (
									<li
										key={idx}
										className='flex items-center space-x-3'
									>
										<Icon
											icon={item.icon}
											className='text-xl text-primary-red'
										/>
										<a
											href={item.link}
											target='_blank'
											rel='noopener noreferrer'
											className='text-gray-700 hover:underline'
										>
											{item.name}
										</a>
									</li>
								))}

								<li className='flex items-center space-x-3'>
									<Icon
										icon={"gg:phone"}
										className='text-xl text-primary-red'
									/>
									<a
										href='tel:+254116071190'
										className='hover:text-primary-red text-gray-700 transition-colors duration-200 cursor-pointer'
									>
										+254116071190
									</a>
								</li>
							</ul>
						</div>
					</motion.div>

					{/* Contact Form */}
					<motion.div
						variants={contentVariants}
						className='bg-white rounded-2xl shadow-xl p-6 sm:p-8'
					>
						<h2 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-6'>
							Send us a Message
						</h2>

						<form
							onSubmit={handleSubmit}
							className='space-y-6'
						>
							{/* Name */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4, duration: 0.5 }}
							>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									Full Name *
								</label>
								<input
									type='text'
									name='name'
									value={formData.name}
									onChange={handleInputChange}
									required
									className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent'
									placeholder='Your full name'
								/>
							</motion.div>

							{/* Message */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.5, duration: 0.5 }}
							>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									Message *
								</label>
								<textarea
									name='message'
									value={formData.message}
									onChange={handleInputChange}
									required
									rows={5}
									className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent resize-none'
									placeholder='How can we help you?'
								/>
							</motion.div>

							{/* Submit Button */}
							<motion.button
								type='submit'
								disabled={isSubmitting}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.6, duration: 0.5 }}
								className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
									isSubmitting
										? "bg-gray-400 cursor-not-allowed"
										: "bg-primary-red hover:bg-red-600 hover:shadow-lg"
								}`}
							>
								{isSubmitting ? (
									<div className='flex items-center justify-center'>
										<motion.div
											animate={{ rotate: 360 }}
											transition={{
												duration: 1,
												repeat: Infinity,
												ease: "linear",
											}}
											className='w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2'
										/>
										Sending Message...
									</div>
								) : (
									"Send Message"
								)}
							</motion.button>
						</form>
					</motion.div>
				</div>
			</motion.div>
		</motion.div>
	);
};

export default Contact;
