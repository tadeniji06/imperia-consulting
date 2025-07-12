import { useEffect } from "react";
import { eme } from "../../assets";
// import { useMeta } from "../../utils/MetaProvider";

const PropsHero = () => {
  // const { updateMeta } = useMeta();

  // useEffect(() => {
  //   updateMeta({
  //     title: 'Properties for Sale | Imperia Consulting Kenya',
  //     description: 'Explore high-end apartments and residential homes in Westlands, Nairobi. Enjoy flexible 30-month installment plans with Imperia Consulting.',
  //     keywords: 'Nairobi real estate, Westlands apartments, buy property Kenya, Imperia properties, Kenya housing',
  //     ogImage: 'https://imperiagrouponline.com/ilogo.svg',
  //     ogUrl: 'https://imperiagrouponline.com/properties',
  //     canonicalUrl: 'https://imperiagrouponline.com/properties'
  //   });
  // }, [updateMeta]);

  return (
    <div className='relative'>
      <div 
        className='bg-cover bg-center bg-no-repeat w-full h-[650px] md:h-[800px] relative transition-opacity duration-1000 ease-in-out'
        style={{ backgroundImage: `url(${eme})` }}
      >
        <div className='absolute inset-0 bg-black/60' />
        <div className='relative z-10 flex items-center justify-center min-h-[800px]'>
          <div className='flex flex-col gap-8 text-white items-center mt-[-180px] md:mt-0 px-4'>
            <h1 className='text-center md:text-6xl text-3xl font-medium'>
              Our Properties
            </h1>
            <p className='text-center font-semibold text-2xl'>
              Nested in the heart of Westland, Nairobi, Kenya <br />
              Enjoy up to 30 months installment payment plan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropsHero;
