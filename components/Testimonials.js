// components/Testimonials.js
import { motion } from 'framer-motion';
import TestimonialCard from './TestimonialCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'; 

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'; // Важно для работы пагинации
import 'swiper/css/autoplay';
import 'swiper/css/effect-coverflow';

const testimonialsData = [ 
  { name: 'Max Mustermann', role: 'Geschäftsführer, Tech Solutions GmbH', text: 'Seitdem wir die Dienste von Adlerauge nutzen, fühlen wir uns auf unserem Firmengelände rundum sicher. Professionell, zuverlässig und immer erreichbar. Absolut empfehlenswert!', avatar: null, },
  { name: 'Anna Schmidt', role: 'Privatkundin, Berlin', text: 'Der Personenschutz während meiner Veranstaltung war diskret und äußerst effektiv. Ich konnte mich voll und ganz auf meine Gäste konzentrieren. Vielen Dank an das Team!', avatar: null, },
  { name: 'Jürgen K.', role: 'Eventmanager', text: 'Für unsere Großveranstaltungen setzen wir seit Jahren auf Adlerauge. Die Planung ist detailgenau und die Durchführung stets tadellos. Ein starker Partner an unserer Seite.', avatar: null,  },
  { name: 'Sabine Weber', role: 'Hausbesitzerin, München', text: 'Die Installation der neuen Alarmanlage verlief schnell und reibungslos. Die Beratung war kompetent und auf meine Bedürfnisse zugeschnitten. Ich schlafe jetzt ruhiger!', avatar: null, },
  { name: 'Dr. Eva Lang', role: 'Ärztin, Hamburg', text: 'Höchste Professionalität und Diskretion. Die Sicherheitsanalyse für meine Praxis war sehr aufschlussreich und die Umsetzung der Maßnahmen perfekt.', avatar: null, }
];

// Варианты анимации (эти не менялись и должны быть у вас)
const sectionHeadingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.15, delayChildren: 0.1 } 
  }
};
const headingItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};
const swiperMotionContainerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, y: 0,
        transition: { duration: 0.5, delay: 0.2, ease: "easeOut" }
    }
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-brand-lightGray overflow-x-hidden"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={sectionHeadingVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2 variants={headingItemVariants} className="text-3xl sm:text-4xl font-extrabold text-brand-blue mb-4">
            Was unsere Kunden sagen
          </motion.h2>
          <motion.p variants={headingItemVariants} className="text-lg text-brand-darkGray max-w-2xl mx-auto">
            Vertrauen und Zufriedenheit unserer Klienten stehen für uns an erster Stelle.
          </motion.p>
        </motion.div>
      </div>

      <motion.div
          variants={swiperMotionContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
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
              640: { slidesPerView: 2.2, },
              1024: { slidesPerView: 3, },
              1280: { slidesPerView: 3.5, }
          }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          coverflowEffect={{
            rotate: 30,       
            stretch: -20, 
            depth: 100,       
            modifier: 1,     
            slideShadows: false,
          }}
          // ИСПРАВЛЕННАЯ ПАГИНАЦИЯ
          pagination={{ 
              clickable: true,
              bulletClass: 'swiper-pagination-bullet-custom', // Базовый класс
              bulletActiveClass: 'swiper-pagination-bullet-active-custom', // Класс для активного
              renderBullet: function (index, className) { 
                  // className теперь 'swiper-pagination-bullet-custom'
                  // Swiper добавит 'swiper-pagination-bullet-active-custom' к активному
                  return `<span class="${className} bg-brand-gray w-2.5 h-2.5 rounded-full inline-block mx-1.5 cursor-pointer transition-all duration-300 hover:bg-brand-teal/70"></span>`;
              }
          }}
          navigation={{
              nextEl: '.swiper-button-next-custom-testimonials',
              prevEl: '.swiper-button-prev-custom-testimonials',
          }}
          className="pb-12 md:pb-16 testimonial-swiper"
        >
          {testimonialsData.map((testimonial, index) => (
            <SwiperSlide key={index} className="h-auto !flex !justify-center">
              <div className="h-full w-full max-w-[300px] sm:max-w-[320px] md:max-w-[340px] p-1 testimonial-card-wrapper"> 
                  <TestimonialCard 
                      name={testimonial.name} role={testimonial.role} text={testimonial.text} avatar={testimonial.avatar}
                  />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Кнопки навигации */}
        <div className="swiper-button-prev-custom-testimonials absolute top-1/2 left-2 sm:left-4 md:left-6 lg:left-8 transform -translate-y-1/2 z-20 p-2 bg-brand-teal/60 hover:bg-brand-teal text-white rounded-full cursor-pointer transition-all shadow-lg hover:shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
        </div>
        <div className="swiper-button-next-custom-testimonials absolute top-1/2 right-2 sm:right-4 md:right-6 lg:right-8 transform -translate-y-1/2 z-20 p-2 bg-brand-teal/60 hover:bg-brand-teal text-white rounded-full cursor-pointer transition-all shadow-lg hover:shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
        </div>
      </motion.div>
      {/* Стили jsx global с исправлением для активного буллета */}
      <style jsx global>{`
        .testimonial-swiper {
          overflow: visible !important; 
        }
        .testimonial-swiper .swiper-slide {
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
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
        /* Базовый стиль для буллетов уже задан через Tailwind в renderBullet */
        /* Стиль для активного буллета */
        .testimonial-swiper .swiper-pagination-bullet-active-custom { /* Используем наш кастомный класс */
            background-color: #2CA58D !important; /* brand.teal */
            opacity: 1 !important;
            transform: scale(1.3);
        }
        .testimonial-swiper .swiper-pagination-bullet-custom { /* Общий класс для всех наших буллетов */
            transition: transform 0.2s ease-out, opacity 0.2s ease-out, background-color 0.2s ease-out !important;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;