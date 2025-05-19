// components/BackToTopButton.js
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpIcon } from '@heroicons/react/24/solid';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []); 

  const buttonVariants = {
    initial: { opacity: 0, y: 25, scale: 0.85 }, 
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 18 },
    },
    exit: {
      opacity: 0,
      y: 25,
      scale: 0.85,
      transition: { duration: 0.25, ease: "easeOut" }, 
    },
    hover: {
      scale: 1.12,
      boxShadow: "0px 5px 20px rgba(44, 165, 141, 0.45)", 
    },
  };

  const iconVariants = {
    hover: {
      y: [0, -4, 0, -2, 0], 
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        repeat: Infinity, 
        repeatType: "loop",
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-brand-teal text-white p-3.5 rounded-full shadow-lg z-40 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 focus:ring-offset-brand-navy hover:bg-brand-teal/90 transition-colors duration-200"
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          whileHover="hover"
          whileTap={{
            scale: 0.95,
            boxShadow: "0px 2px 10px rgba(44, 165, 141, 0.3)",
          }} 
          aria-label="Наверх"
        >
          <motion.div
            variants={iconVariants}
          >
            <ArrowUpIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;
