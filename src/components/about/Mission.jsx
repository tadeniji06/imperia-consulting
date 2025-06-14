import { Icon } from "@iconify/react/dist/iconify.js";
import { mission } from "../../utils/data";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Mission = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px 0px" // Trigger animation when element is 100px in viewport
  });

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  // Header animation variants
  const headerVariants = {
    hidden: { 
      opacity: 0, 
      y: -50,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Description animation variants
  const descriptionVariants = {
    hidden: { 
      opacity: 0, 
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  // Mission cards container variants
  const cardsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4
      }
    }
  };

  // Individual mission card variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 80,
      scale: 0.8,
      rotateY: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth feel
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -15,
      scale: 1.05,
      rotateY: 5,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  // Icon animation variants
  const iconVariants = {
    hidden: { 
      scale: 0,
      rotate: -180
    },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.3
      }
    },
    hover: {
      scale: 1.1,
      rotate: 360,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  // Text content animation variants
  const textVariants = {
    hidden: { 
      opacity: 0, 
      x: -30
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className='flex flex-col gap-10 sm:gap-16 px-4 sm:px-6 lg:px-8 py-8 sm:py-12'
    >
      {/* Header Section */}
      <motion.div 
        variants={headerVariants}
        className='flex flex-col justify-center items-center max-w-4xl mx-auto'
      >
        <motion.span 
          className='text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4 sm:mb-6'
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
        >
          Who We Are
        </motion.span>
        
        <motion.p 
          variants={descriptionVariants}
          className='text-center text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed max-w-3xl'
        >
          We are a forward-thinking real estate brand focused on delivering
          refined living experiences through thoughtfully developed
          properties and flexible ownership solutions. With a passion for
          quality, trust, and long-term value, we provide more than just
          buildings—we offer spaces to thrive, invest, and belong.
        </motion.p>
      </motion.div>

      {/* Mission Cards Section */}
      <motion.div 
        variants={cardsContainerVariants}
        className='flex flex-col lg:flex-row gap-8 lg:gap-10 justify-center items-center lg:items-start'
      >
        {mission.map((missionItem, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover="hover"
            className='flex flex-col gap-4 sm:gap-6 items-center text-center max-w-sm w-full p-6 sm:p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300'
          >
            {/* Icon Container */}
            <motion.div 
              variants={iconVariants}
              whileHover="hover"
              className='w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-primary-red text-white flex justify-center items-center shadow-lg'
            >
              <Icon 
                className='text-3xl sm:text-4xl lg:text-5xl' 
                icon={missionItem.icon} 
              />
            </motion.div>

            {/* Title */}
            <motion.div
              variants={textVariants}
            >
              <span className='font-semibold text-xl sm:text-2xl text-gray-800 leading-tight'>
                {missionItem.title}
              </span>
            </motion.div>

            {/* Description */}
            <motion.div
              variants={textVariants}
              className='flex-1'
            >
              <p className='text-sm sm:text-base text-gray-600 leading-relaxed'>
                {missionItem.desc}
              </p>
            </motion.div>

            {/* Subtle bottom accent */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ 
                duration: 0.8, 
                delay: 0.8 + (index * 0.2),
                ease: "easeInOut"
              }}
              className='h-1 bg-gradient-to-r from-primary-red to-red-400 rounded-full'
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Floating background elements */}
      <motion.div
        className='absolute inset-0 pointer-events-none overflow-hidden'
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2, delay: 1 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute bg-primary-red rounded-full'
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Mission;