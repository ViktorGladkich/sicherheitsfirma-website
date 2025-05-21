import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const linkVariants = {
    initial: { color: "#9CA3AF" }, 
    hover: { 
      color: "#2CA58D",
      letterSpacing: "0.05em", 
      transition: { duration: 0.25 }
    }
  };

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.5 }} 
      className="bg-brand-navy text-gray-400 py-10 sm:py-12 animated-hero-gradient" 
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="mb-4 text-sm">
          Sicherheitsfirma Adlerauge © {currentYear}. Alle Rechte vorbehalten.
        </p>
        <div className="space-x-6">
          <motion.a 
            href="/impressum"
            variants={linkVariants}
            initial="initial"
            whileHover="hover"
            className="text-sm" 
          >
            Impressum
          </motion.a>
          <motion.a 
            href="/datenschutz" 
            variants={linkVariants}
            initial="initial"
            whileHover="hover"
            className="text-sm"
          >
            Datenschutz
          </motion.a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;