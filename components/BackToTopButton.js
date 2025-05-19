// components/BackToTopButton.js
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpIcon } from '@heroicons/react/24/solid';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Показать кнопку, когда страница прокручена (например, на 300px)
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Плавная прокрутка наверх
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    // Очистка слушателя при размонтировании компонента
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []); // Пустой массив зависимостей означает, что эффект запустится один раз после монтирования

  const buttonVariants = {
    initial: { opacity: 0, y: 25, scale: 0.85 }, // Начальное состояние (скрыто)
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 18 }, // Анимация появления
    },
    exit: {
      opacity: 0,
      y: 25,
      scale: 0.85,
      transition: { duration: 0.25, ease: "easeOut" }, // Анимация исчезновения
    },
    hover: {
      // Состояние при наведении на кнопку
      scale: 1.12,
      boxShadow: "0px 5px 20px rgba(44, 165, 141, 0.45)", // brand.teal с альфа
      // transition здесь не нужен, Framer Motion сам плавно перейдет
    },
    // tap состояние будет применено через whileTap пропс напрямую
  };

  const iconVariants = {
    // initial состояние для иконки не нужно, т.к. она всегда видима, если кнопка видима
    hover: {
      // Это состояние будет применено к иконке, когда родитель (кнопка) в состоянии hover
      y: [0, -4, 0, -2, 0], // Эффект "подпрыгивания"
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        repeat: Infinity, // Повторять анимацию, пока наведено
        repeatType: "loop",
      },
    },
    // Если нужно вернуть иконку в исходное положение, когда hover заканчивается,
    // Framer Motion сделает это автоматически, если у иконки есть 'initial' или 'animate' состояние без смещения по Y.
    // В данном случае, когда hover кнопки заканчивается, анимация иконки просто остановится.
    // Для явного возврата, можно определить 'animate' состояние для иконки:
    // animate: { y: 0, transition: { duration: 0.2 } }
    // Но это усложнит, проще оставить как есть - анимация прервется.
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
          }} // Эффект при нажатии
          aria-label="Наверх"
        >
          {/* Оборачиваем иконку в motion.div, чтобы применить к ней свои variants */}
          <motion.div
            variants={iconVariants}
            // initial="initial" // Необязательно, если нет специфичного начального состояния для иконки
            // animate="animate"   // Необязательно, если нет специфичного анимированного состояния для иконки
            // Hover-анимация иконки будет активирована через whileHover родительской кнопки
          >
            <ArrowUpIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;
