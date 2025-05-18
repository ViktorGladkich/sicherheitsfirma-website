// components/Footer.js
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="bg-brand-navy text-gray-400 py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="mb-4 text-sm">
          Sicherheitsfirma Adlerauge © {currentYear}. Alle Rechte vorbehalten.
        </p>
        <div className="space-x-6">
          <a href="/impressum" className="hover:text-brand-teal transition-colors text-xs">Impressum</a>
          <a href="/datenschutz" className="hover:text-brand-teal transition-colors text-xs">Datenschutz</a>
        </div>
        {/* Для страниц Impressum и Datenschutz нужно будет создать отдельные страницы или секции */}
        {/* Например, pages/impressum.js и pages/datenschutz.js */}
      </div>
    </motion.footer>
  );
};

export default Footer;