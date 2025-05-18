import { motion } from 'framer-motion';
import { ShieldCheckIcon } from '@heroicons/react/24/solid'; // Пример иконки

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { type: 'spring', stiffness: 100, damping: 10, delay: 0.5 },
    },
  };
  
  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 8px rgb(44,165,141)", // brand-teal
      transition: { duration: 0.3, yoyo: Infinity }
    },
    tap: { scale: 0.95 }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-brand-navy text-white overflow-hidden">
      {/* Фоновые анимированные элементы (необязательно, для сложности) */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-brand-blue opacity-20 rounded-full filter blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 20, 0, -20, 0],
          y: [0, -10, 0, 10, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-brand-teal opacity-10 rounded-lg filter blur-2xl"
        animate={{
          rotate: [0, 360],
          scale: [1, 0.8, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={iconVariants} className="mb-8 flex justify-center">
            <ShieldCheckIcon className="h-24 w-24 text-brand-teal" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
          >
            <span className="block animate-tracking-in-expand">Ihre Sicherheit.</span>
            <span className="block text-brand-teal animate-text-focus-in ">Unsere Priorität.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Professionelle Sicherheitslösungen für Unternehmen und Privatpersonen in Deutschland.
            Vertrauen Sie auf Erfahrung und modernste Technologie.
          </motion.p>

          <motion.div variants={itemVariants}>
            <motion.a
              href="#contact"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="bg-brand-teal hover:bg-opacity-80 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-lg transition-colors duration-300 inline-block"
            >
              Jetzt Kontakt aufnehmen
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;