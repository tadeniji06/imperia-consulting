import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	emeraldOneBed,
	emeraldTwoBed,
	oakOneBed,
	oakTwoBed,
	oakThreeBed,
	oakOneBedPlusStudy,
} from "../../utils/listings";
import { WALink } from "../../utils/data";

const ViewProperty = () => {
	const { id } = useParams();
	const [property, setProperty] = useState(null);
	const [selectedImage, setSelectedImage] = useState(null);

	useEffect(() => {
		const allProperties = [
			...emeraldOneBed,
			...emeraldTwoBed,
			...oakOneBed,
			...oakTwoBed,
			...oakThreeBed,
			...oakOneBedPlusStudy,
		];

		const found = allProperties.find(
			(item) => item.id === id
		);
		setProperty(found || null);
	}, [id]);

	const openImageModal = (imageSrc) => {
		setSelectedImage(imageSrc);
	};

	const closeImageModal = () => {
		setSelectedImage(null);
	};

	const handleScheduleViewing = () => {
		// Add your scheduling logic here
		// alert("Schedule viewing functionality - connect to your booking system");
	};

	if (!property) {
		return (
			<div className='p-6 text-center text-lg text-gray-500'>
				Property not found or loading...
			</div>
		);
	}

	return (
		<div className='p-4 sm:p-6 md:p-8 lg:p-12 max-w-6xl mx-auto'>
			<img
				src={property.mainImg}
				alt={property.title}
				className='w-full h-64 sm:h-80 object-cover rounded-xl mb-6 cursor-pointer transition-transform hover:scale-[1.02]'
				onClick={() => openImageModal(property.mainImg)}
			/>

			<div className='flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 mb-6'>
				<div className='flex-1'>
					<h1 className='text-2xl sm:text-3xl font-bold mb-2'>
						{property.title}
					</h1>
					<p className='text-gray-500 text-sm mb-4'>
						{property.location}
					</p>

					<div className='mb-6'>
						<h2 className='text-xl font-semibold mb-2'>
							Price
						</h2>
						<p className='text-lg text-green-700 font-bold'>
							{property.avgPrice}
						</p>
					</div>

					<p className='text-lg text-gray-700 mb-4'>
						{property.desc}
					</p>

					<div className='mb-6'>
						<h2 className='text-xl font-semibold mb-2'>
							Highlights
						</h2>
						<ul className='list-disc pl-5 space-y-1 text-gray-600'>
							{property.highlights?.map((item, idx) => (
								<li key={idx}>{item}</li>
							))}
						</ul>
					</div>
				</div>
				<div className='lg:w-80 flex-shrink-0'>
					<div className='bg-gray-50 p-6 rounded-xl border'>
						<h3 className='text-lg font-semibold mb-4 text-center'>
							Interested in this property?
						</h3>
						<button
							// onClick={handleScheduleViewing}
							className='w-full bg-primary-red hover:bg-blue-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 mb-4'
						>
							<a href={WALink.link} target='_blank'>
								Schedule Viewing
							</a>
						</button>

						<div className='text-center text-sm text-gray-600'>
							<p>Get in touch to arrange a</p>
							<p>personalized property tour</p>
						</div>
					</div>
				</div>
			</div>

			{property.pricingPlan && (
				<div className='mb-8'>
					<h2 className='text-xl font-semibold mb-4'>
						Payment Plans
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						{property.pricingPlan.map((plan, idx) => (
							<div
								key={idx}
								className='border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-shadow'
							>
								<h3 className='text-lg font-medium mb-3 text-primary-red'>
									{plan.title}
								</h3>
								<p className='text-gray-700 mb-4 font-semibold text-xl'>
									{plan.price}
								</p>
								<ul className='list-disc pl-5 space-y-2 text-gray-600'>
									{plan.installmentPlan.map((step, i) => (
										<li
											key={i}
											className='text-lg font-semibold'
										>
											{step}
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
			)}

			<div className='mb-6'>
				<h2 className='text-xl font-semibold mb-4'>
					Property Gallery
				</h2>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4'>
					{property.photos?.map((img, idx) => (
						<img
							key={idx}
							src={img}
							alt={`Property ${idx + 1}`}
							className='w-full h-52 object-cover rounded-lg cursor-pointer transition-transform hover:scale-105 hover:shadow-lg'
							onClick={() => openImageModal(img)}
						/>
					))}
				</div>
			</div>

			{/* Image Modal */}
			{selectedImage && (
				<div
					className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4'
					onClick={closeImageModal}
				>
					<div className='relative max-w-4xl max-h-full'>
						<img
							src={selectedImage}
							alt='Property preview'
							className='max-w-full max-h-full object-contain rounded-lg'
						/>
						<button
							onClick={closeImageModal}
							className='absolute top-4 right-4 text-white bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all'
						>
							<svg
								className='w-6 h-6'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ViewProperty;
