import { eme } from "../../assets";
import Button from "../ui/Button";

const PropsHero = () => {
  return (
    <div className='relative'>
      <div
        className='bg-cover bg-center bg-no-repeat w-full h-[650px] md:h-[800px] relative transition-opacity duration-1000 ease-in-out'
        style={{ backgroundImage: `url(${eme})` }}
      >
        {/* Optional overlay for text readability */}
        <div className='absolute inset-0 bg-black/60' />

        {/* Content */}
        <div className='relative z-10 flex items-center justify-center min-h-[800px]'>
          <div className='flex flex-col gap-8 text-white items-center mt-[-180px] md:mt-0 px-4'>
            <h1 className='text-center md:text-6xl text-3xl font-medium'>
              Our Properties
            </h1>
            <p className='text-center font-semibold text-2xl'>
              Nested in the heart of Westland, Nairobi, Kenya <br />
              Enjoy up to 30 months installment payment plan
            </p>
            <Button title={"Buy Now"} className={"py-4 px-10"} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default PropsHero;
