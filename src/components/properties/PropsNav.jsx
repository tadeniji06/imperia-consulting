import { useState } from "react";
import {
  emeraldOneBed,
  emeraldTwoBed,
  oakOneBedPlusStudy,
  oakOneBed,
  oakTwoBed,
  oakThreeBed,
} from "../../utils/listings";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import PropsFacilities from "./PropsFacilities";

const PropsNav = () => {
  const [activeProperty, setActiveProperty] = useState("emerald");

  // Combine listings by property type
  const emeraldListings = [...emeraldOneBed, ...emeraldTwoBed];
  const oakListings = [...oakOneBed,...oakOneBedPlusStudy, ...oakTwoBed, ...oakThreeBed];

  return (
    <>
      <div className='z-10 relative flex flex-col p-4 sm:p-6 md:p-8 lg:p-10 sm:px-6 md:px-12 lg:px-24 xl:px-48'>
        {/* Centralized Toggle - Above Header */}
        <div className='flex justify-center mb-6 sm:mb-8'>
          <div className='bg-gray-100 p-1 rounded-lg inline-flex w-full max-w-sm'>
            <button
              type='button'
              onClick={() => setActiveProperty("emerald")}
              onTouchStart={() => {}}
              className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-md text-sm sm:text-base lg:text-lg font-medium transition-all duration-300 cursor-pointer touch-manipulation ${
                activeProperty === "emerald"
                  ? "bg-gray-900 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50 active:bg-gray-200"
              }`}
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              Emerald Springs
            </button>
            <button
              type='button'
              onClick={() => setActiveProperty("oak")}
              onTouchStart={() => {}}
              className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-md text-sm sm:text-base lg:text-lg font-medium transition-all duration-300 cursor-pointer touch-manipulation ${
                activeProperty === "oak"
                  ? "bg-gray-900 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50 active:bg-gray-200"
              }`}
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              Oak West
            </button>
          </div>
        </div>

        {/* Header Section */}
        <div className='flex flex-col items-center text-center gap-2'>
          <span className='text-xl sm:text-2xl font-semibold'>
            {activeProperty === "emerald"
              ? "Emerald Apartments"
              : "Oak West"}
          </span>

          <p className='text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl'>
            {activeProperty === "emerald"
              ? "Emerald consists of 1 and 2 bedroom apartments, having 2 blocks of 25 floors with each floor "
              : "Oak West is a short walk from JW Marriott, GTC, the Sarit Centre and Westgate Mall and MP Shah hospital. It's also 15 mins drive from the Jomo Kenyatta International Airport, Nairobi."}
          </p>
        </div>

        {/* Listings Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-6'>
          {(activeProperty === "emerald"
            ? emeraldListings
            : oakListings
          ).map((apartment) => (
            <div key={apartment.id} className='space-y-4 sm:space-y-6'>
              <Link
                to={`/property/${apartment.id}`}
                className='block p-3 sm:p-4 border rounded-lg hover:shadow-lg transition-shadow'
              >
                <img
                  src={apartment.mainImg}
                  alt={apartment.title}
                  className='w-full h-40 sm:h-48 object-cover rounded-lg mb-3 sm:mb-4'
                />
                <h3 className='text-lg sm:text-xl font-semibold mb-2'>
                  {apartment.title} (
                  {activeProperty === "emerald" ? "Emerald" : "Oak"})
                </h3>
                <p className='text-gray-600 mb-2 text-sm sm:text-base font-medium'>
                  {apartment.avgPrice}
                </p>
                <span className='text-gray-500 text-sm sm:text-base'>
                  {apartment.location}
                </span>
                <Button
                  className={
                    "w-full mt-3 py-3 sm:py-4 text-sm sm:text-base"
                  }
                  title={"Secure Your Spot"}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <PropsFacilities activeProperty={activeProperty} />
    </>
  );
};

export default PropsNav;
