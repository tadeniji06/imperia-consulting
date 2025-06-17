import { featured } from "../../utils/listings";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";

const Featured = () => {
  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  // Animation variants for header
  const headerVariants = {
    hidden: { 
      opacity: 0, 
      y: -30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Animation variants for cards
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  // Animation variants for image
  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  // Animation variants for location button
  const locationVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "#dc2626", // Slightly darker red on hover
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="px-4 sm:px-6 lg:px-8"
    >
      {/* Header Section */}
      <motion.div 
        variants={headerVariants}
        className='flex justify-center mt-8'
      >
        <div className='flex flex-col items-center max-w-2xl'>
          <motion.span 
            className='font-bold text-2xl sm:text-3xl lg:text-4xl text-center mb-4'
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Featured Projects
          </motion.span>
          <motion.p 
            className='text-center text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Explore handpicked project developments and apartments designed for luxury,
            comfort, and long-term value.
          </motion.p>
        </div>
      </motion.div>

      {/* Cards Section */}
      <motion.div 
        variants={containerVariants}
        className='mt-8 sm:mt-12 flex flex-col lg:flex-row gap-6 lg:gap-10 justify-center items-center lg:items-start'
      >
        {featured.map((feat, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover="hover"
            className='flex flex-col w-full max-w-sm sm:max-w-md lg:w-[600px] lg:max-w-none h-auto lg:h-[500px] bg-white rounded-xl hover:shadow-xl transition-shadow duration-300 overflow-hidden'
          >
            {/* Image Container */}
            <motion.div 
              className="w-full h-[250px] sm:h-[280px] lg:h-[340px] overflow-hidden rounded-t-xl"
              whileHover="hover"
              variants={imageVariants}
            >
              <motion.img 
                className="w-full h-full object-cover" 
                src={feat.img}
                alt={feat.title}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>

            {/* Content Container */}
            <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
              {/* Title */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <span className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 leading-tight">
                  {feat.title}
                </span>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mt-2 sm:mt-3"
              >
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>

              {/* Location Button */}
              <motion.div
                variants={locationVariants}
                whileHover="hover"
                whileTap="tap"
                className="flex items-center justify-center text-white bg-primary-red rounded-xl p-3 sm:p-4 w-full sm:w-[200px] mt-4 cursor-pointer group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon icon={"tdesign:location"} className="mr-2 text-lg" />
                </motion.div>
                <p className="text-sm sm:text-base font-medium group-hover:font-semibold transition-all duration-200">
                  {feat.location}
                </p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Featured;