import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TestimonialCard from "./TestimonialCard";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";
import { testimonialsData } from '../data/testimonials';

const sectionHeadingVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const headingItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
};

const swiperMotionContainerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.3, ease: "easeOut" },
  },
};

const Testimonials = () => {
  // --- Логика для Scroll-linked анимации линии под заголовком секции ---
  const sectionHeaderRef = useRef(null);
  const { scrollYProgress: lineScrollYProgress } = useScroll({
    target: sectionHeaderRef,
    offset: ["start 0.85", "start 0.1"],
  });

  const pathLength = useTransform(lineScrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(
    lineScrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0]
  );

  return (
    <section
      id="testimonials"
      className="py-20 bg-brand-lightGray overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={sectionHeaderRef}
          className="relative text-center mb-12 sm:mb-16"
        >
          <motion.div
            variants={sectionHeadingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2 }}
          >
            <motion.h2
              variants={headingItemVariants}
              className="text-3xl sm:text-4xl font-extrabold text-brand-blue mb-2"
            >
              Was unsere Kunden sagen
            </motion.h2>

            {/* Анимированная SVG линия */}
            <div className="max-w-[800px] h-[4px] mx-auto mb-3 overflow-hidden">
              {" "}
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 4"
                preserveAspectRatio="none"
              >
                <motion.line
                  x1="0"
                  y1="2"
                  x2="100"
                  y2="2"
                  stroke="currentColor"
                  className="text-brand-teal"
                  strokeWidth="4"
                  strokeLinecap="round"
                  style={{
                    pathLength: pathLength,
                    opacity: opacity,
                  }}
                />
              </svg>
            </div>

            <motion.p
              variants={headingItemVariants}
              className="text-lg text-brand-darkGray max-w-2xl mx-auto"
            >
              Vertrauen und Zufriedenheit unserer Klienten stehen für uns an
              erster Stelle.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <motion.div
        variants={swiperMotionContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.1 }}
        className="relative px-4 sm:px-0"
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={1.4}
          breakpoints={{
            640: { slidesPerView: 1.8 },
            1024: { slidesPerView: 2.5 },
            1280: { slidesPerView: 2.8 },
          }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          coverflowEffect={{
            rotate: 30,
            stretch: -20,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet-custom",
            bulletActiveClass: "swiper-pagination-bullet-active-custom",
            renderBullet: function (index, className) {
              return `<span class="${className} bg-brand-gray w-2.5 h-2.5 rounded-full inline-block mx-1.5 cursor-pointer transition-all duration-300 hover:bg-brand-teal/70"></span>`;
            },
          }}
          navigation={{
            nextEl: ".swiper-button-next-custom-testimonials",
            prevEl: ".swiper-button-prev-custom-testimonials",
          }}
          className="pb-12 md:pb-16 testimonial-swiper"
        >
          {testimonialsData.map((testimonial, index) => (
            <SwiperSlide key={index} className="h-auto !flex !justify-center">
              <div className="h-full w-full max-w-[300px] sm:max-w-[320px] md:max-w-[340px] p-1 testimonial-card-wrapper">
                <TestimonialCard
                  name={testimonial.name}
                  role={testimonial.role}
                  text={testimonial.text}
                  avatar={testimonial.avatar}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Кнопки навигации */}
        <div className="swiper-button-prev-custom-testimonials absolute top-1/2 left-2 sm:left-4 md:left-6 lg:left-8 transform -translate-y-1/2 z-20 p-2 bg-brand-teal/60 hover:bg-brand-teal text-white rounded-full cursor-pointer transition-all shadow-lg hover:shadow-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </div>
        <div className="swiper-button-next-custom-testimonials absolute top-1/2 right-2 sm:right-4 md:right-6 lg:right-8 transform -translate-y-1/2 z-20 p-2 bg-brand-teal/60 hover:bg-brand-teal text-white rounded-full cursor-pointer transition-all shadow-lg hover:shadow-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </motion.div>
      <style jsx global>{`
        .testimonial-swiper {
          overflow: visible !important;
        }
        .testimonial-swiper .swiper-slide {
          transition:
            transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            filter 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          opacity: 0.55;
          transform: scale(0.85);
          filter: blur(1.5px);
          display: flex;
          justify-content: center;
        }
        .testimonial-swiper .swiper-slide-active {
          opacity: 1;
          transform: scale(1);
          filter: blur(0px);
          z-index: 10 !important;
        }
        .testimonial-swiper .swiper-pagination-bullet-custom {
          transition:
            transform 0.2s ease-out,
            opacity 0.2s ease-out,
            background-color 0.2s ease-out !important;
        }
        .testimonial-swiper .swiper-pagination-bullet-active-custom {
          background-color: #2ca58d !important; /* brand.teal */
          opacity: 1 !important;
          transform: scale(1.3);
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
