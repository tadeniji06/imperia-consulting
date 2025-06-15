import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const reasons = [
  {
    title: "Flexible Payment Plans",
    icon: "material-symbols:payments-outline",
    des: `Own your dream property with ease through tailored instalment options.
We offer flexible payment structures that fit your lifestyle, allowing you to spread payments monthly without financial strain. It's real estate ownership on your terms.`,
  },
  {
    title: "Guaranteed 12% Annual ROI",
    icon: "material-symbols:trending-up",
    des: `Grow your wealth confidently with our secured real estate investment scheme.
Our projects are backed by appreciating assets in fast-developing areas, giving you predictable 12% annual returns and long-term financial security.`,
  },
  {
    title: "Prime Locations",
    icon: "material-symbols:location-on-outline",
    des: `Strategically positioned in Kenya's most promising areas for maximum growth potential.
Our properties are located in rapidly developing neighborhoods with excellent infrastructure, ensuring both lifestyle convenience and investment appreciation.`,
  },
  {
    title: "Dual Purpose: Live or Invest",
    icon: "material-symbols:home-outline",
    des: `Whether you're settling in or scaling up, our properties deliver double value.
Choose to live in luxury or rent out for steady income, each property is a wealth-building opportunity wrapped in elegance.`,
  },
  {
    title: "Transparent & Professional Process",
    icon: "material-symbols:verified-user-outline",
    des: `No hidden charges. No surprises. Just smooth, secure transactions.
From property inspection to allocation and documentation, we guide you with clarity, integrity, and unmatched customer service.`,
  },
  {
    title: "Trusted by Clients Nationwide",
    icon: "material-symbols:group-outline",
    des: `Join a community of satisfied homeowners and investors who trust us.
With a proven track record and glowing testimonials, we are Kenya's trusted real estate partner, dedicated to making your property dreams a reality.`,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const WhyChooseUs = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Why Choose 
            <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent"> Us</span>
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Explore handpicked estates and apartments designed for luxury,
            comfort, and long-term value
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 sm:p-8 h-full border border-gray-100 transition-all duration-300 hover:border-red-200">
                {/* Icon */}
                <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon 
                    icon={reason.icon} 
                    className="text-2xl sm:text-3xl text-white"
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {reason.des}
                </p>

                {/* Hover Effect Bar */}
                <div className="mt-6 w-0 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full group-hover:w-full transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;