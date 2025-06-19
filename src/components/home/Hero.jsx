import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { slides } from "../../utils/data";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  // Simplified slide change
  const changeSlide = (newIndex) => {
    setCurrentSlide(newIndex);
    // Temporarily pause auto-play when user interacts
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % slides.length;
    changeSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    changeSlide(prevIndex);
  };

  const goToSlide = (index) => {
    changeSlide(index);
  };

  // Optimized image component
  const SlideImage = ({ slide, index, isActive }) => {
    const [imageError, setImageError] = useState(false);

    return (
      <div className='relative h-full w-full'>
        {!imageError ? (
          <img
            src={slide.img}
            alt={slide.title}
            className='h-full w-full object-cover'
            onError={() => setImageError(true)}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ) : (
          <div
            className={`h-full w-full bg-gradient-to-br ${
              slide.bgGradient || "from-gray-800 to-gray-900"
            }`}
          >
            <div className='flex items-center justify-center h-full text-white/60'>
              <Icon icon='mdi:image-broken' className='w-16 h-16' />
            </div>
          </div>
        )}

        {/* Enhanced Dark Overlay for Better Text Readability */}
        <div className='absolute inset-0 bg-black/60' />
        
        {/* Dynamic Gradient Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient} opacity-40`}
        />

        {/* Simplified Animated Particles */}
        {isActive && (
          <div className='absolute inset-0 overflow-hidden pointer-events-none'>
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`particle-${currentSlide}-${i}`}
                className='absolute w-1 h-1 bg-white/20 rounded-full'
                initial={{
                  x: -20,
                  y: Math.random() * 100 + "%",
                }}
                animate={{
                  x: "100vw",
                  y: Math.random() * 100 + "%",
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className='relative h-screen overflow-hidden'>
      {/* Background Images */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className='absolute inset-0 z-0'
        >
          <SlideImage
            slide={slides[currentSlide]}
            index={currentSlide}
            isActive={true}
          />
        </motion.div>
      </AnimatePresence>

      {/* Main Content */}
      <div className='relative z-10 h-full flex items-center'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
          <div className='grid lg:grid-cols-2 gap-12 items-center h-full'>
            {/* Text Content */}
            <motion.div
              key={`content-${currentSlide}`}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className='text-white space-y-6 md:space-y-8'
            >
              {/* Accent Badge */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className='inline-block'
              >
                <span className='inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-black/40 backdrop-blur-sm border border-white/30 text-white'>
                  <Icon
                    icon='mdi:star'
                    className='w-4 h-4 mr-2 text-yellow-400'
                  />
                  {slides[currentSlide].accent}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight'
              >
                <span className='text-white drop-shadow-2xl'>
                  {slides[currentSlide].title}
                </span>
              </motion.h1>

              {/* Body Text */}
              <motion.p
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className='text-base sm:text-lg lg:text-xl text-gray-100 max-w-2xl leading-relaxed drop-shadow-lg'
              >
                {slides[currentSlide].body}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className='flex flex-col sm:flex-row gap-4 pt-4'
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                >
                  <Link to={'/properties'}>
                    <Button
                      title='Buy Now'
                      className='px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-white/25'
                    />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Visual Elements - Removed Large Circle */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='hidden lg:flex justify-center items-center'
            >
              <div className='relative w-64 h-64 lg:w-80 lg:h-80'>
                {/* Floating Stats Cards */}
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className='absolute -top-8 -left-8 bg-black/50 backdrop-blur-md p-4 lg:p-6 rounded-2xl border border-white/20 shadow-2xl'
                >
                  <div className='text-2xl lg:text-3xl font-bold text-white'>
                    12%
                  </div>
                  <div className='text-xs lg:text-sm text-gray-200'>
                    Annual Returns
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [6, -6, 6] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className='absolute -bottom-8 -right-8 bg-black/50 backdrop-blur-md p-4 lg:p-6 rounded-2xl border border-white/20 shadow-2xl'
                >
                  <div className='text-2xl lg:text-3xl font-bold text-white'>
                    5+
                  </div>
                  <div className='text-xs lg:text-sm text-gray-200'>
                    Years Experience
                  </div>
                </motion.div>

                {/* Subtle Geometric Shape Instead of Large Circle */}
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='w-32 h-32 lg:w-40 lg:h-40 border-2 border-white/20 rounded-full animate-pulse' />
                  <div className='absolute w-16 h-16 lg:w-20 lg:h-20 border border-white/30 rounded-full animate-ping' />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className='absolute bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-20'>
        <div className='flex items-center space-x-4 lg:space-x-6'>
          {/* Previous Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevSlide}
            className='p-2 lg:p-3 rounded-full bg-black/40 backdrop-blur-sm border border-white/30 text-white hover:bg-black/60 transition-all duration-300'
          >
            <Icon
              icon='mdi:chevron-left'
              className='w-5 h-5 lg:w-6 lg:h-6'
            />
          </motion.button>

          {/* Slide Indicators */}
          <div className='flex space-x-2 lg:space-x-3'>
            {slides.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => goToSlide(index)}
                className={`relative w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-white scale-125"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              >
                {currentSlide === index && (
                  <motion.div
                    layoutId='activeIndicator'
                    className='absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400'
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextSlide}
            className='p-2 lg:p-3 rounded-full bg-black/40 backdrop-blur-sm border border-white/30 text-white hover:bg-black/60 transition-all duration-300'
          >
            <Icon
              icon='mdi:chevron-right'
              className='w-5 h-5 lg:w-6 lg:h-6'
            />
          </motion.button>
        </div>
      </div>

      {/* Progress Bar */}
      {isAutoPlaying && (
        <div className='absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20'>
          <motion.div
            key={currentSlide}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 6, ease: "linear" }}
            className='h-full bg-gradient-to-r from-blue-400 to-purple-400'
          />
        </div>
      )}
    </section>
  );
};

export default Hero;