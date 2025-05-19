import { motion, useAnimation, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { UsersIcon, ShieldCheckIcon, CalendarDaysIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

const statsData = [
  { to: 12, icon: CalendarDaysIcon, label: 'Jahre Erfahrung' },
  { to: 500, icon: UsersIcon, label: 'Zufriedene Kunden', suffix: '+' },
  { to: 1000, icon: ShieldCheckIcon, label: 'Erfolgreiche Einsätze', suffix: '+' },
  { to: 80, icon: BuildingOfficeIcon, label: 'Geschützte Objekte', suffix: '+' },
];

function AnimatedStat({ target, suffix, isInView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, target, {
        duration: 3,
        ease: "easeOut",
        onUpdate: (latest) => {
          setCount(Math.round(latest));
        }
      });

      return () => controls.stop();
    }
  }, [isInView, target]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

const Stats = () => {
  const controls = useAnimation();
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (sectionInView) {
      controls.start("visible");
    }
  }, [sectionInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 120, damping: 15 },
    },
  };

  return (
    <section className="py-16 sm:py-20 bg-brand-navy">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={sectionRef}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10"
        >
          {statsData.map((stat, index) => (
            <motion.div key={index} variants={itemVariants} className="text-center">
              <stat.icon className="h-10 w-10 sm:h-12 sm:w-12 text-brand-teal mx-auto mb-3 sm:mb-4" />
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
                <AnimatedStat target={stat.to} suffix={stat.suffix} isInView={sectionInView} />
              </div>
              <p className="text-sm sm:text-base text-gray-300 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;