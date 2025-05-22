import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const AccordionItem = ({ title, icon: Icon, children, initiallyOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  const contentVariants = {
    collapsed: { opacity: 0, height: 0, marginTop: 0, marginBottom: 0 },
    expanded: {
      opacity: 1,
      height: "auto",
      marginTop: "1rem", 
      marginBottom: "1rem",
      transition: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }, 
    },
  };

  return (
    <div className="border-b border-gray-700 last:border-b-0">
      {" "}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-4 text-left text-lg font-medium text-brand-teal hover:text-teal-400 focus:outline-none"
        whileHover={{ backgroundColor: "rgba(44, 165, 141, 0.1)" }} 
        transition={{ duration: 0.15 }}
      >
        <span>{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDownIcon className="w-7 h-7 text-brand-teal" />
        </motion.div>
      </motion.button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={contentVariants}
            className="overflow-hidden text-brand-gray pl-2 pr-2" 
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccordionItem;
