// components/Preloader.js
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowPathIcon } from "@heroicons/react/24/solid"; // Для индикатора формы

const preloaderOverlayVariants = {
  // Для общего фона Preloader/Индикатора
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.3, delay: 0.1 } },
};

// Варианты для основного контента (лого или спиннер)
const contentVariants = {
  initial: { opacity: 0, scale: 0.7, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0 }, 
  exit: { opacity: 0, scale: 0.7, y: -10 },
};

// Варианты для логотипа при загрузке страницы
const pageLoadLogoPulseVariants = {
  animate: {
    opacity: [0.5, 1, 0.5], 
    scale: [0.9, 1.05, 0.9],
    transition: {
      duration: 1.8,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror",
    },
  },
};

const Preloader = ({
  isLoadingPage = false,
  isSendingForm = false,
  message = null,
}) => {
  let content;
  let specificContentVariants = contentVariants;

  if (isLoadingPage) {
    content = (
      <motion.div
        variants={pageLoadLogoPulseVariants} 
        initial="initial"
        animate="animate"
      >
        <Image
          src="/images/LogotipAxma.webp"
          alt="Lade Logo Axma Security"
          width={150}
          height={150}
          className="object-contain"
          priority
        />
      </motion.div>
    );
  } else if (isSendingForm) {
    content = (
      <div className="flex flex-col items-center text-center p-4 bg-brand-navy/30 backdrop-blur-sm rounded-lg shadow-xl">
        {" "}
        {/* Контейнер для спиннера и текста */}
        <ArrowPathIcon className="w-10 h-10 sm:w-12 sm:h-12 text-brand-teal animate-spin mb-4" />
        {message && (
          <p className="text-base text-gray-200 max-w-xs">{message}</p>
        )}
      </div>
    );
    // Для isSendingForm можно использовать те же contentVariants или немного другие, если нужно
    // specificContentVariants = { ... какой-то другой вариант для появления спиннера ... };
  } else {
    return null; // Если ни один флаг не установлен, ничего не показываем
  }

  return (
    <motion.div
      key={isLoadingPage ? "pagePreloader" : "formIndicator"} // Разные ключи для AnimatePresence
      variants={preloaderOverlayVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-navy/80"
      style={{
        backgroundColor: isLoadingPage
          ? "var(--color-brand-navy)"
          : "rgba(5, 26, 48, 0.85)",
      }} 
    >
      <motion.div variants={specificContentVariants}>
        {" "}
        {content}
      </motion.div>
    </motion.div>
  );
};

export default Preloader;
