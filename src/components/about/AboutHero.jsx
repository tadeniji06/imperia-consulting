import { about } from "../../assets";
import SEO from "../../utils/SEO";

const AboutHero = () => {
	return (
		<>
			<SEO
				title='About Imperia Consulting | Real Estate Development & Value Creation'
				description='Learn about Imperia Consulting’s mission, vision, and commitment to building elegant, community-driven properties in Nairobi.'
			/>
			<div className='relative'>
				<div
					className='bg-cover bg-center bg-no-repeat w-full h-[650px] md:h-[800px] relative transition-opacity duration-1000 ease-in-out'
					style={{ backgroundImage: `url(${about})` }}
				>
					<div className='absolute inset-0 bg-black/60' />

					<div className='relative z-10 flex items-center justify-center min-h-[800px]'>
						<div className='flex flex-col gap-8 text-white items-center mt-[-180px] md:mt-0 px-4'>
							<h1 className='text-center md:text-6xl text-3xl font-medium'>
								About Us
							</h1>
							<p className='text-center font-semibold text-2xl'>
								We build more than properties, we create value-driven{" "}
								<br />
								communities where elegance, comfort, and investment{" "}
								<br />
								opportunities meet.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AboutHero;
