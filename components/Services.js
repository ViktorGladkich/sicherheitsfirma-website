import { motion } from "framer-motion";
import {
  BuildingOffice2Icon,
  UserGroupIcon,
  ShieldExclamationIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";

const servicesData = [
  {
    icon: BuildingOffice2Icon,
    title: "Objektschutz",
    description:
      "Zuverlässiger Schutz für Ihre Immobilien, Firmengelände und Baustellen.",
  },
  {
    icon: UserGroupIcon,
    title: "Veranstaltungsschutz",
    description:
      "Sicherheit und reibungsloser Ablauf für Ihre Events, Konzerte und Messen.",
  },
  {
    icon: ShieldExclamationIcon,
    title: "Personenschutz",
    description:
      "Diskreter und professioneller Schutz für Privatpersonen und VIPs.",
  },
  {
    icon: VideoCameraIcon,
    title: "Alarm- & Videotechnik",
    description:
      "Moderne Sicherheitstechnik, Installation und Wartung von Alarmanlagen.",
  },
];

const Services = () => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(44, 165, 141, 0.2)", // Тень с цветом brand.teal
      transition: { duration: 0.3 },
    },
  };

  return (
    <section id="services" className="py-20 bg-brand-lightGray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible" // Анимация срабатывает, когда секция появляется в области видимости
          viewport={{ once: true, amount: 0.2 }} // once: true - анимация один раз, amount: 0.2 - когда 20% секции видно
          variants={sectionVariants}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue mb-4">
            Unsere Sicherheitsdienste
          </h2>
          <p className="text-lg text-brand-darkGray mb-12 max-w-2xl mx-auto">
            Wir bieten ein breites Spektrum an Sicherheitslösungen,
            maßgeschneidert auf Ihre individuellen Bedürfnisse.
          </p>
        </motion.div>

        <motion.div
          variants={sectionVariants} // Можно использовать те же варианты для контейнера карточек
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center"
            >
              <div className="bg-brand-teal text-white p-4 rounded-full mb-6 inline-block">
                <service.icon className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold text-brand-blue mb-3">
                {service.title}
              </h3>
              <p className="text-brand-gray text-sm">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
