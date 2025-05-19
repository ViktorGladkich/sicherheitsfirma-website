// components/Footer.js
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const linkVariants = {
    initial: { color: "#9CA3AF" }, // text-gray-400
    hover: { 
      color: "#2CA58D", // brand-teal
      letterSpacing: "0.05em", // Небольшое увеличение межбуквенного интервала
      transition: { duration: 0.25 }
    }
  };

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.5 }} // Добавил delay
      className="bg-brand-navy text-gray-400 py-10 sm:py-12" // Увеличил padding
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="mb-4 text-sm">
          Sicherheitsfirma Adlerauge © {currentYear}. Alle Rechte vorbehalten.
        </p>
        <div className="space-x-6">
          <motion.a 
            href="/impressum" // Убедитесь, что у вас есть pages/impressum.js
            variants={linkVariants}
            initial="initial"
            whileHover="hover"
            className="text-xs" // Базовый цвет убран, управляется variants
          >
            Impressum
          </motion.a>
          <motion.a 
            href="/datenschutz" // Убедитесь, что у вас есть pages/datenschutz.js
            variants={linkVariants}
            initial="initial"
            whileHover="hover"
            className="text-xs"
          >
            Datenschutz
          </motion.a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;