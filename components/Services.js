import { motion } from 'framer-motion';
import { 
  BuildingOffice2Icon, 
  UserGroupIcon, 
  ShieldExclamationIcon, 
  VideoCameraIcon 
} from '@heroicons/react/24/outline';

const servicesData = [
  { icon: BuildingOffice2Icon, title: 'Objektschutz', description: 'Zuverlässiger Schutz für Ihre Immobilien, Firmengelände und Baustellen.'},
  { icon: UserGroupIcon, title: 'Veranstaltungsschutz', description: 'Sicherheit und reibungsloser Ablauf für Ihre Events, Konzerte und Messen.'},
  { icon: ShieldExclamationIcon, title: 'Personenschutz', description: 'Diskreter und professioneller Schutz für Privatpersonen und VIPs.'},
  { icon: VideoCameraIcon, title: 'Alarm- & Videotechnik', description: 'Moderne Sicherheitstechnik, Installation und Wartung von Alarmanlagen.'},
];

// Варианты для контейнера заголовков секции (остаются как есть)
const headingContainerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

// Варианты для каждого элемента заголовка (h2 и p) (остаются как есть)
const headingItemVariants = {
  hidden: { opacity: 0, y: -20, skewX: "-6deg" },
  visible: { 
    opacity: 1, y: 0, skewX: "0deg", 
    transition: { type: "spring", stiffness: 130, damping: 16 }
  }
};

// Варианты для контейнера (сетки) всех карточек
// ВРЕМЕННО УБРАН STAGGERCHILDREN для теста
const cardsGridVariants = {
  hidden: { opacity: 0 }, 
  visible: { opacity: 1, transition: { duration: 0.3 } } 
};

// Варианты для каждой отдельной карточки
const cardItemVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -45, scale: 0.9, transformPerspective: '800px' },
  visible: { 
    opacity: 1, y: 0, rotateX: 0, scale: 1,
    transition: { 
      type: "tween", 
      duration: 0.65, 
      ease: [0.16, 1, 0.3, 1],
      // StaggerChildren для элементов ВНУТРИ этой карточки (оставляем для теста)
      staggerChildren: 0.1, 
      delayChildren: 0.1 
    }
  },
  hover: { 
    scale: 1.06, y: -8,
    boxShadow: "0px 16px 32px rgba(44, 165, 141, 0.22)",
    transition: { type: "tween", duration: 0.2, ease: "circOut" }
  }
};

// Варианты для иконки ВНУТРИ карточки (остаются как есть)
const cardIconVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -30 },
  visible: { 
    opacity: 1, scale: 1, rotate: 0, 
    transition: { type: "spring", stiffness: 180, damping: 12 }
  },
  hover: { 
    scale: 1.18, rotate: 12,
    transition: { type: "spring", stiffness: 280, damping: 10 }
  }
};

// Варианты для текста (заголовка и описания) ВНУТРИ карточки (остаются как есть)
const cardTextVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.95 },
  visible: { 
    opacity: 1, y: 0, scale: 1, 
    transition: { type: "tween", duration: 0.45, ease: "easeOut" }
  }
};

const Services = () => {
  return (
    <section id="services" className="py-20 bg-brand-lightGray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Контейнер для заголовков */}
        <motion.div
          variants={headingContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center mb-14 sm:mb-16"
        >
          <motion.h2 
            variants={headingItemVariants}
            className="text-3xl sm:text-4xl font-extrabold text-brand-blue mb-4"
          >
            Unsere Sicherheitsdienste
          </motion.h2>
          <motion.p 
            variants={headingItemVariants}
            className="text-lg text-brand-darkGray max-w-2xl mx-auto"
          >
            Wir bieten ein breites Spektrum an Sicherheitslösungen, maßgeschneidert auf Ihre individuellen Bedürfnisse.
          </motion.p>
        </motion.div>

        {/* Контейнер (сетка) для всех карточек */}
        <motion.div
          variants={cardsGridVariants} // Используем тестовые variants без stagger
          initial="hidden"
          whileInView="visible" 
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {servicesData.map((service, index) => ( // Добавил index для custom, если понадобится
            // Каждая карточка теперь ИМЕЕТ СВОЙ whileInView для теста
            <motion.div
              key={service.title} 
              custom={index} // Добавил custom проп, может пригодиться позже
              variants={cardItemVariants} 
              initial="hidden"             // Явно задаем initial
              whileInView="visible"        // Явно задаем whileInView для каждой карточки
              viewport={{ once: true, amount: 0.3 }} // Порог для каждой карточки
              whileHover="hover"
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col items-center text-center cursor-pointer overflow-hidden"
            >
              {/* Иконка внутри карточки. Ее анимация должна запускаться от cardItemVariants родителя */}
              <motion.div 
                variants={cardIconVariants} 
                className="bg-brand-teal text-white p-3.5 sm:p-4 rounded-full mb-5 sm:mb-6 inline-block"
              >
                <service.icon className="h-8 w-8 sm:h-10 sm:w-10" />
              </motion.div>
              
              {/* Заголовок внутри карточки. */}
              <motion.h3 
                variants={cardTextVariants}
                className="text-xl font-semibold text-brand-blue mb-3"
              >
                {service.title}
              </motion.h3>
              {/* Описание внутри карточки. */}
              <motion.p 
                variants={cardTextVariants}
                className="text-brand-gray text-sm leading-relaxed"
              >
                {service.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;