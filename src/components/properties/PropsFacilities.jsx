import { motion } from "framer-motion";
import { EmeraldFeat, OakFeat } from "../../utils/facility";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const PropsFacilities = ({ activeProperty }) => {
  const features = activeProperty === "emerald" ? EmeraldFeat : OakFeat;

  return (
    <div className='px-4 sm:px-8 lg:px-24 xl:px-48 py-12'>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className='text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12'
      >
        {activeProperty === "emerald"
          ? "Amenities at Emerald Springs"
          : "Amenities at Oak West"}
      </motion.h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8'>
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            custom={i}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            variants={fadeUp}
            className='bg-white rounded-xl border p-5 sm:p-6 lg:p-8 hover:shadow-lg transition-shadow max-w-3xl w-full mx-auto'
          >
            <img
              src={feature.img}
              alt={feature.title}
              className='w-full h-40 sm:h-52 lg:h-64 object-cover rounded-lg mb-5'
            />
            <h3 className='text-xl sm:text-2xl font-semibold mb-3'>
              {feature.title}
            </h3>
            <p className='text-base sm:text-lg text-gray-600 leading-relaxed'>
              {feature.body}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PropsFacilities;
