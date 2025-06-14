import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { slides } from "../../utils/data";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const preloadedImages = useRef(new Map());

  // Preload all images on component mount
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = slides.map((slide, index) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            preloadedImages.current.set(index, img);
            setLoadedImages(prev => new Set([...prev, index]));
            resolve(img);
          };
          img.onerror = reject;
          img.src = slide.img;
          // Add high priority loading for first few images
          if (index < 2) {
            img.loading = 'eager';
          }
        });
      });

      try {
        await Promise.allSettled(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.warn('Some images failed to preload:', error);
        // Still allow component to function even if some images fail
        setImagesLoaded(true);
      }
    };

    preloadImages();
  }, [slides]);

  // Auto-play functionality with loading check
  useEffect(() => {
    if (!isAutoPlaying || !imagesLoaded) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length, imagesLoaded]);

  // Optimized slide change with transition state
  const changeSlide = (newIndex) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide(newIndex);
    
    // Reset transition state after animation
    setTimeout(() => setIsTransitioning(false), 1200);
  };

  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % slides.length;
    changeSlide(nextIndex);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    changeSlide(prevIndex);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index) => {
    changeSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
      <div className="flex items-center justify-center h-full">
        <div className="text-white/60 text-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-white/20 border-t-white/60 rounded-full mx-auto"
          />
          <p className="text-lg">Loading Premium Experience...</p>
        </div>
      </div>
    </div>
  );

  // Optimized image component with error handling
  const OptimizedImage = ({ slide, index, isActive }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
      <div className="relative h-full w-full">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
        )}
        
        {!imageError ? (
          <img
            src={slide.img}
            alt={slide.title}
            className={`h-full w-full object-cover transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading={index < 2 ? 'eager' : 'lazy'}
            decoding="async"
          />
        ) : (
          // Fallback gradient for failed images
          <div className={`h-full w-full bg-gradient-to-br ${slide.bgGradient || 'from-gray-800 to-gray-900'}`}>
            <div className="flex items-center justify-center h-full text-white/60">
              <Icon icon="mdi:image-broken" className="w-16 h-16" />
            </div>
          </div>
        )}

        {/* Dynamic Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient} backdrop-blur-[0.5px]`} />
        
        {/* Optimized Animated Particles - reduced count for performance */}
        {isActive && imageLoaded && (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`particle-${currentSlide}-${i}`}
                className="absolute w-1.5 h-1.5 bg-white/15 rounded-full"
                initial={{
                  x: -50,
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                }}
                animate={{
                  x: typeof window !== 'undefined' ? window.innerWidth + 50 : 1200,
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                }}
                transition={{
                  duration: 12 + Math.random() * 8,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  if (!imagesLoaded) {
    return (
      <section className="relative h-screen overflow-hidden">
        <LoadingSkeleton />
      </section>
    );
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Images with Parallax Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ scale: 1.02, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.98, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <OptimizedImage 
            slide={slides[currentSlide]} 
            index={currentSlide}
            isActive={true}
          />
        </motion.div>
      </AnimatePresence>

      {/* Preload next image in background */}
      <div className="absolute inset-0 opacity-0 pointer-events-none">
        {slides.map((slide, index) => {
          const nextIndex = (currentSlide + 1) % slides.length;
          if (index === nextIndex && !loadedImages.has(index)) {
            return (
              <img
                key={`preload-${index}`}
                src={slide.img}
                alt=""
                className="w-1 h-1"
                loading="lazy"
              />
            );
          }
          return null;
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center h-full">
            
            {/* Text Content */}
            <motion.div
              key={`content-${currentSlide}`}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-white space-y-6 md:space-y-8"
            >
              {/* Accent Badge */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2, type: "spring", bounce: 0.3 }}
                className="inline-block"
              >
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-white/20 backdrop-blur-sm border border-white/30">
                  <Icon icon="mdi:star" className="w-4 h-4 mr-2 text-yellow-400" />
                  {slides[currentSlide].accent}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
              >
                <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  {slides[currentSlide].title}
                </span>
              </motion.h1>

              {/* Body Text */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                className="text-base sm:text-lg lg:text-xl text-gray-100 max-w-2xl leading-relaxed"
              >
                {slides[currentSlide].body}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Button
                    title="Buy Now"
                    className="px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-white/25"
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Visual Elements - Optimized */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="hidden lg:flex justify-center items-center"
            >
              <div className="relative">
                {/* Floating Stats Cards */}
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-16 -left-16 bg-white/15 backdrop-blur-md p-4 lg:p-6 rounded-2xl border border-white/20"
                >
                  <div className="text-2xl lg:text-3xl font-bold text-white">12%</div>
                  <div className="text-xs lg:text-sm text-gray-200">Annual Returns</div>
                </motion.div>

                <motion.div
                  animate={{ y: [8, -8, 8] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-16 -right-16 bg-white/15 backdrop-blur-md p-4 lg:p-6 rounded-2xl border border-white/20"
                >
                  <div className="text-2xl lg:text-3xl font-bold text-white">5+</div>
                  <div className="text-xs lg:text-sm text-gray-200">Years Experience</div>
                </motion.div>

                {/* Central Glow Effect */}
                <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 backdrop-blur-3xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-4 lg:space-x-6">
          {/* Previous Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevSlide}
            disabled={isTransitioning}
            className="p-2 lg:p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300 disabled:opacity-50"
          >
            <Icon icon="mdi:chevron-left" className="w-5 h-5 lg:w-6 lg:h-6" />
          </motion.button>

          {/* Slide Indicators */}
          <div className="flex space-x-2 lg:space-x-3">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`relative w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full transition-all duration-500 ${
                  currentSlide === index
                    ? "bg-white scale-125"
                    : "bg-white/40 hover:bg-white/60"
                } disabled:opacity-50`}
              >
                {currentSlide === index && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
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
            disabled={isTransitioning}
            className="p-2 lg:p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300 disabled:opacity-50"
          >
            <Icon icon="mdi:chevron-right" className="w-5 h-5 lg:w-6 lg:h-6" />
          </motion.button>
        </div>
      </div>

      {/* Auto-play Indicator */}
      <div className="absolute top-6 lg:top-8 right-4 lg:right-8 z-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`p-2 lg:p-3 rounded-full backdrop-blur-sm border transition-all duration-300 ${
            isAutoPlaying
              ? "bg-green-500/20 border-green-500/30 text-green-400"
              : "bg-white/20 border-white/30 text-white"
          }`}
        >
          <Icon
            icon={isAutoPlaying ? "mdi:pause" : "mdi:play"}
            className="w-4 h-4 lg:w-5 lg:h-5"
          />
        </motion.button>
      </div>

      {/* Progress Bar */}
      {isAutoPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
          <motion.div
            key={currentSlide}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 6, ease: "linear" }}
            className="h-full bg-gradient-to-r from-blue-400 to-purple-400"
          />
        </div>
      )}
    </section>
  );
};

export default Hero;