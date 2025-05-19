import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import {
  ClockIcon,
  VideoCameraIcon as DetailVideoIcon,
  UserGroupIcon as DetailUsersIcon,
  ListBulletIcon,
  CheckCircleIcon as DefaultDetailIcon,
} from "@heroicons/react/24/outline";

// Варианты для самого модального окна (карточки)
const modalCardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 130,
      damping: 20,
      staggerChildren: 0.07, 
      delayChildren: 0.1, 
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

// Варианты для фона
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25, delay: 0.05 } },
};

// Варианты для кнопки закрытия (крестика)
const closeButtonVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -135 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 250, damping: 15 }, 
  },
  hover: {
    scale: 1.15,
    color: "#2CA58D", 
    transition: { duration: 0.15 },
  },
  tap: {
    scale: 0.9,
  },
};

// Общие варианты для появления основных блоков контента (изображение, заголовок, блок деталей)
const contentBlockVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "circOut" } },
};

// Варианты для появления каждого пункта списка (LI) в details
const detailListItemVariants = {
  hidden: { opacity: 0, x: -25, filter: "blur(2px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 160,
      damping: 18,
      staggerChildren: 0.06, 
    },
  },
};

const detailListItemContentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

const ServiceModal = ({ service, onClose }) => {
  if (!service) return null;

  const iconMap = {
    ClockIcon,
    DetailVideoIcon,
    DetailUsersIcon,
    ListBulletIcon,
  };

  const renderDetailContent = (item, index) => {
    if (typeof item === "string") {
      return item.split("\n").map(
        (paragraph, pIndex) =>
          paragraph.trim() !== "" && (
            <motion.p key={`p-${pIndex}`} variants={contentBlockVariants}>
              {paragraph}
            </motion.p>
          )
      );
    }

    switch (item.type) {
      case "paragraph":
        return (
          <motion.p key={index} variants={contentBlockVariants}>
            {item.content}
          </motion.p>
        );
      case "heading":
        return (
          <motion.h4
            key={index}
            variants={contentBlockVariants}
            className="text-lg font-semibold text-brand-blue mt-5 mb-2.5"
          >
            {item.content}
          </motion.h4>
        );
      case "listItem":
        const IconComponent =
          typeof item.icon === "function"
            ? item.icon
            : iconMap[item.icon] || DefaultDetailIcon;
        return (
          <motion.div
            key={index}
            variants={detailListItemVariants}
            className="flex items-start space-x-3 mb-2.5"
          >
            <motion.div variants={detailListItemContentVariants}>
              <IconComponent className="h-5 w-5 text-brand-teal mt-0.5 flex-shrink-0" />
            </motion.div>
            <motion.span
              variants={detailListItemContentVariants}
              className="text-brand-darkGray"
            >
              {item.content}
            </motion.span>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {service && (
        <motion.div
          key="backdrop" 
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          className="fixed inset-0 bg-black/75 z-[60] flex items-center justify-center p-4 cursor-pointer"
        >
          <motion.div
            key={service.title || "modalCard"}
            variants={modalCardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl relative" // Убрали max-h и overflow-y отсюда
          >
            <motion.button
              onClick={onClose}
              variants={closeButtonVariants} 
              whileHover="hover"
              whileTap="tap"
              className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-500 p-1.5 bg-white/60 hover:bg-gray-100 rounded-full shadow z-[70] transition-colors" // Добавил фон и тень кнопке
              aria-label="Modal schließen"
            >
              <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />{" "}
            </motion.button>
            <div className="max-h-[85vh] sm:max-h-[88vh] overflow-y-auto p-6 md:p-8 pt-10 md:pt-12">
              {service.image && (
                <motion.div
                  variants={contentBlockVariants} 
                  className="relative w-full h-56 md:h-72 mb-6 rounded-lg overflow-hidden"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 670px" // Настройте sizes
                    style={{ objectFit: "cover" }}
                    priority={true}
                  />
                </motion.div>
              )}

              <motion.h2
                variants={contentBlockVariants} 
                className="text-2xl md:text-3xl font-bold text-brand-blue mb-4"
              >
                {service.title}
              </motion.h2>

              <motion.div
                variants={contentBlockVariants}
                className="prose prose-slate dark:prose-invert prose-sm sm:prose-base max-w-none text-brand-darkGray leading-relaxed"
              >
                {Array.isArray(service.details)
                  ? service.details.map(renderDetailContent)
                  : typeof service.details === "string"
                  ? renderDetailContent(service.details, 0)
                  : null}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;
