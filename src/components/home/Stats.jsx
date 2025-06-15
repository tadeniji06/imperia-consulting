import { about } from "../../assets";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const Stats = () => {
  const stats = [
    {
      number: 20,
      label: "Active listings",
      suffix: "+"
    },
    {
      number: 100,
      label: "Properties sold",
      suffix: "+"
    },
    {
      number: 50,
      label: "Happy clients",
      suffix: "+"
    },
    {
      number: 5,
      label: "Years in business",
      suffix: ""
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative">
              <img
                src={about}
                alt="About our company"
                className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover rounded-2xl shadow-2xl"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              
              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 bg-red-500 rounded-full opacity-20"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360] 
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-red-600 rounded-full opacity-30"
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  y: [0, -10, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>

          {/* Right Side - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900"
              >
                Our Success
                <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent"> Story</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-gray-600 leading-relaxed"
              >
                Building dreams and creating lasting value for our clients across Kenya. 
                Here's what we've achieved together.
              </motion.p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 sm:gap-8">
              {stats.map((stat, index) => (
                <StatCard key={index} stat={stat} index={index} />
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="pt-4"
            >
              <p className="text-gray-600 text-base">
                <span className="font-semibold text-red-600">Join our growing community</span>{" "}
                of satisfied property owners and investors who trust us with their real estate journey.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Individual Stat Card Component with Animation
const StatCard = ({ stat, index }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCount();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isVisible]);

  const animateCount = () => {
    const duration = 2000; // 2 seconds
    const steps = 50;
    const increment = stat.number / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.number) {
        setCount(stat.number);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1 + 0.5,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      className="group"
    >
      <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-red-200 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/10 to-transparent rounded-bl-full"></div>
        
        <div className="relative z-10">
          {/* Number */}
          <div className="mb-3">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              {count}
            </span>
            <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-600">
              {stat.suffix}
            </span>
          </div>
          
          {/* Label */}
          <p className="text-gray-600 font-medium text-sm sm:text-base group-hover:text-gray-700 transition-colors duration-300">
            {stat.label}
          </p>
        </div>

        {/* Hover Effect */}
        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-red-500 to-red-600 group-hover:w-full transition-all duration-500"></div>
      </div>
    </motion.div>
  );
};

export default Stats;