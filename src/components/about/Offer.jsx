import { offers } from "../../utils/data";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Offer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px 0px",
  });

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  // Header animation variants
  const headerVariants = {
    hidden: {
      opacity: 0,
      y: -50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Description animation variants
  const descriptionVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };

  // Offers container variants
  const offersContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4,
      },
    },
  };

  // Individual offer card variants
  const offerVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 0.8,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      y: -15,
      scale: 1.03,
      rotateX: 5,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  // Text content animation variants
  const textVariants = {
    hidden: {
      opacity: 0,
      x: -30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Icon animation variants
  const iconVariants = {
    hidden: {
      scale: 0,
      rotate: -180,
    },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.3,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 360,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className='flex flex-col gap-10 sm:gap-16 px-4 sm:px-6 lg:px-8 py-8 sm:py-12'
    >
      {/* Header Section */}
      <motion.div
        variants={headerVariants}
        className='flex flex-col justify-center items-center max-w-4xl mx-auto'
      >
        <motion.h2
          className='text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4 sm:mb-6 text-gray-800'
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 },
          }}
        >
          What We Offer
        </motion.h2>

        <motion.p
          variants={descriptionVariants}
          className='text-center text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed max-w-3xl'
        >
          We provide premium real estate solutions that combine luxury
          living, flexible installment plans, and high-return investment
          opportunities. From elegantly designed apartments to
          fast-appreciating land projects, our properties are crafted for
          comfort, security, and long-term value.
        </motion.p>
      </motion.div>

      {/* Offers Grid Section */}
      <motion.div
        variants={offersContainerVariants}
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto'
      >
        {offers.map((offer, index) => (
          <motion.div
            key={index}
            variants={offerVariants}
            whileHover='hover'
            className='flex flex-col items-center text-center bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group p-6 sm:p-8'
          >
            {/* Icon Container */}
            <motion.div
              variants={iconVariants}
              whileHover='hover'
              className='w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-primary-red text-white flex justify-center items-center shadow-lg mb-6'
            >
              <Icon
                className='text-3xl sm:text-4xl lg:text-5xl'
                icon={offer.icon}
              />
            </motion.div>

            {/* Title */}
            <motion.div variants={textVariants} className='mb-4 sm:mb-6'>
              <h3 className='text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 leading-tight group-hover:text-primary-red transition-colors duration-300'>
                {offer.title}
              </h3>
            </motion.div>

            {/* Description */}
            <motion.div variants={textVariants} className='flex-1 mb-6'>
              <p className='text-sm sm:text-base text-gray-600 leading-relaxed'>
                {offer.desc}
              </p>
            </motion.div>

            {/* Bottom accent line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "80%" }}
              transition={{
                duration: 0.8,
                delay: 1 + index * 0.2,
                ease: "easeInOut",
              }}
              className='h-1 bg-gradient-to-r from-primary-red to-red-400 rounded-full mt-6'
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Offer;
