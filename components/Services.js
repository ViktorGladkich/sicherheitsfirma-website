import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ServiceModal from "./ServiceModal";
import { servicesData } from '../data/services';

const headingContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};
const headingItemVariants = {
  hidden: { opacity: 0, y: -20, skewX: "-6deg" },
  visible: {
    opacity: 1,
    y: 0,
    skewX: "0deg",
    transition: { type: "spring", stiffness: 130, damping: 16 },
  },
};

const cardsGridVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};
const cardItemVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    rotateX: -45,
    scale: 0.9,
    transformPerspective: "800px",
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      type: "tween",
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  hover: {
    scale: 1.06,
    y: -8,
    boxShadow: "0px 16px 32px rgba(44, 165, 141, 0.22)",
    transition: { type: "tween", duration: 0.2, ease: "circOut" },
  },
};
const cardIconVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -30 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 180, damping: 12 },
  },
  hover: {
    scale: 1.18,
    rotate: 12,
    transition: { type: "spring", stiffness: 280, damping: 10 },
  },
};
const cardTextVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "tween", duration: 0.45, ease: "easeOut" },
  },
};

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const openModal = (service) => {
    setSelectedService(service);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setSelectedService(null);
    document.body.style.overflow = "";
  };

  const lineContainerRef = useRef(null);
  const { scrollYProgress: lineScrollYProgress } = useScroll({
    target: lineContainerRef,
    offset: ["start end", "end start"],
  });
  const pathLength = useTransform(lineScrollYProgress, [0.1, 0.7], [0, 1]);
  const opacity = useTransform(lineScrollYProgress, [0, 0.1, 0.7, 0.8], [0, 1, 1, 0]);

  return (
    <>
      <section id="services" className="py-20 bg-brand-lightGray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={headingContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}
            className="text-center mb-14 sm:mb-16"
          >
            <motion.h2
              variants={headingItemVariants}
              className="text-3xl sm:text-4xl font-extrabold text-brand-blue mb-2"
            >
              Unsere Sicherheitsdienste
            </motion.h2>
            <div
              ref={lineContainerRef}
              className="relative max-w-[800px] h-[5px] mx-auto mb-3 overflow-hidden"
            >
              <svg width="100%" height="100%" viewBox="0 0 120 5" preserveAspectRatio="none">
                <motion.line
                  x1="0"
                  y1="2.5"
                  x2="120"
                  y2="2.5"
                  stroke="currentColor"
                  className="text-brand-teal"
                  strokeWidth="5"
                  strokeLinecap="round"
                  style={{ pathLength, opacity }}
                />
              </svg>
            </div>
            <motion.p
              variants={headingItemVariants}
              className="text-lg text-brand-darkGray max-w-2xl mx-auto"
            >
              Wir bieten ein breites Spektrum an Sicherheitslösungen, maßgeschneidert auf Ihre individuellen Bedürfnisse.
            </motion.p>
          </motion.div>

          <motion.div
            variants={cardsGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {servicesData.map((service) => (
              <motion.div
                key={service.id}
                variants={cardItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.3 }}
                whileHover="hover"
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col items-center text-center overflow-hidden group"
                role="button"
                aria-label={`Mehr erfahren über ${service.title}`}
              >
                <motion.div
                  variants={cardIconVariants}
                  className="bg-brand-teal text-white p-3.5 sm:p-4 rounded-full mb-5 sm:mb-6 inline-block"
                >
                  <service.icon className="h-8 w-8 sm:h-10 sm:w-10" />
                </motion.div>

                <motion.h3
                  variants={cardTextVariants}
                  className="text-xl font-semibold text-brand-blue mb-3 group-hover:text-brand-teal transition-colors"
                >
                  {service.title}
                </motion.h3>

                <motion.p
                  variants={cardTextVariants}
                  className="text-brand-gray text-sm leading-relaxed mb-4"
                >
                  {service.description}
                </motion.p>

                <motion.button
                  onClick={() => openModal(service)}
                  className="mt-auto px-4 py-2 bg-brand-teal text-white rounded hover:bg-brand-blue transition text-sm font-medium"
                >
                  Mehr erfahren
                </motion.button>

              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <ServiceModal service={selectedService} onClose={closeModal} />
    </>
  );
};

export default Services;
