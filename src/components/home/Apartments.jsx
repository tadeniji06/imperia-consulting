import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import {
  oakOneBed,
  emeraldOneBed,
  emeraldTwoBed,
} from "../../utils/listings";
import Button from "../ui/Button";

const Apartments = () => {
  return (
    <div className='flex flex-col p-4 sm:p-6 md:p-8 lg:p-10 sm:px-6 md:px-12 lg:px-24 xl:px-48'>
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-0'>
        <div>
          <span className='text-xl sm:text-2xl font-semibold'>
            Featured Apartments
          </span>
        </div>
        <div className='flex items-center'>
          <Link to={"/properties"} className='text-sm sm:text-base hover:underline'>
            View All Listings
          </Link>
          <Icon
            icon={"ri-arrow-right-s-line"}
            className='ml-2 text-gray-500'
          />
        </div>
      </div>
      
      <div className='mt-3 sm:mt-4'>
        <p className='text-sm sm:text-base text-gray-600 leading-relaxed'>
          Explore handpicked project developments and apartments designed for luxury,
          comfort, and long-term value.
        </p>
      </div>
      
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-6'>
        {/* Emerald One Bed */}
        <div className='space-y-4 sm:space-y-6'>
          {emeraldOneBed.map((apartment) => (
            <Link
              to={`/property/${apartment.id}`}
              key={apartment.id}
              className='block p-3 sm:p-4 border rounded-lg hover:shadow-lg transition-shadow'
            >
              <img
                src={apartment.mainImg}
                alt={apartment.title}
                className='w-full h-40 sm:h-48 object-cover rounded-lg mb-3 sm:mb-4'
              />
              <h3 className='text-lg sm:text-xl font-semibold mb-2'>
                {apartment.title} (Emerald)
              </h3>
              <p className='text-gray-600 mb-2 text-sm sm:text-base font-medium'>
                {apartment.avgPrice}
              </p>
              <span className='text-gray-500 text-sm sm:text-base'>
                {apartment.location}
              </span>
              <Button 
                className={'w-full mt-3 py-3 sm:py-4 text-sm sm:text-base'} 
                title={"Secure Your Spot"} 
              />
            </Link>
          ))}
        </div>

        {/* Emerald Two Bed */}
        <div className='space-y-4 sm:space-y-6'>
          {emeraldTwoBed.map((apartment) => (
            <Link
              to={`/property/${apartment.id}`}
              key={apartment.id}
              className='block p-3 sm:p-4 border rounded-lg hover:shadow-lg transition-shadow'
            >
              <img
                src={apartment.mainImg}
                alt={apartment.title}
                className='w-full h-40 sm:h-48 object-cover rounded-lg mb-3 sm:mb-4'
              />
              <h3 className='text-lg sm:text-xl font-semibold mb-2'>
                {apartment.title} (Emerald)
              </h3>
              <p className='text-gray-600 mb-2 text-sm sm:text-base font-medium'>
                {apartment.avgPrice}
              </p>
              <span className='text-gray-500 text-sm sm:text-base'>
                {apartment.location}
              </span>
              <Button 
                className={'w-full mt-3 py-3 sm:py-4 text-sm sm:text-base'} 
                title={"Secure Your Spot"} 
              />
            </Link>
          ))}
        </div>

        {/* Oak One Bed */}
        <div className='space-y-4 sm:space-y-6'>
          {oakOneBed.map((apartment) => (
            <Link
              to={`/property/${apartment.id}`}
              key={apartment.id}
              className='block p-3 sm:p-4 border rounded-lg hover:shadow-lg transition-shadow'
            >
              <img
                src={apartment.mainImg}
                alt={apartment.title}
                className='w-full h-40 sm:h-48 object-cover rounded-lg mb-3 sm:mb-4'
              />
              <h3 className='text-lg sm:text-xl font-semibold mb-2'>
                {apartment.title} (Oak West)
              </h3>
              <p className='text-gray-600 mb-2 text-sm sm:text-base font-medium'>
                {apartment.avgPrice}
              </p>
              <span className='text-gray-500 text-sm sm:text-base'>
                {apartment.location}
              </span>
              <Button 
                className={'w-full mt-3 py-3 sm:py-4 text-sm sm:text-base'} 
                title={"Secure Your Spot"} 
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Apartments;