import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  COOKIE_CATEGORIES,
  COOKIE_CATEGORY_DETAILS_MAP,
} from "../utils/cookieConstants";
import { CheckIcon as NecessaryCheckIcon } from "@heroicons/react/24/outline";
import {
  MinusIcon,
  CheckIcon as ToggleCheckIcon,
} from "@heroicons/react/20/solid"; 

const modalBackdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};
const modalContentVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 180, damping: 22, delay: 0.05 },
  },
  exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.15 } },
};

const CookieSettingsModal = ({ currentConsent, onSave, onClose }) => {
  const [localConsent, setLocalConsent] = useState({});

  useEffect(() => {
    const initialLocalConsent = {};
    Object.values(COOKIE_CATEGORIES).forEach((categoryKey) => {
      initialLocalConsent[categoryKey] = currentConsent[categoryKey] || false;
    });
    setLocalConsent(initialLocalConsent);
  }, [currentConsent]);

  const handleToggle = (categoryKey) => {
    setLocalConsent((prev) => ({ ...prev, [categoryKey]: !prev[categoryKey] }));
  };

  const handleSavePreferences = () => {
    onSave(localConsent);
  };
  const handleAcceptAllInModal = () => {
    const allAccepted = {};
    Object.values(COOKIE_CATEGORIES).forEach((categoryKey) => {
      allAccepted[categoryKey] = true;
    });
    onSave(allAccepted);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="cookieSettingsBackdrop"
        variants={modalBackdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9995] flex items-center justify-center p-4"
      >
        <motion.div
          key="cookieSettingsModal"
          variants={modalContentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-lg shadow-2xl w-full max-w-md md:max-w-lg overflow-hidden flex flex-col border border-gray-200/70"
        >
          {/* Хедер */}
          <div className="flex justify-between items-center p-5 sm:p-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg sm:text-xl font-semibold text-brand-blue">
              Cookie-Einstellungen
            </h3>
            <motion.button
              onClick={onClose}
              className="text-gray-400 hover:text-brand-teal p-1 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-1"
              whileHover={{ scale: 1.15, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <XMarkIcon className="h-6 w-6" />
            </motion.button>
          </div>

          {/* Контент */}
          <div className="p-5 sm:p-6 space-y-5 overflow-y-auto max-h-[60vh] sm:max-h-[65vh] text-gray-700">
            <div className="p-4 rounded-lg bg-gray-100 border border-gray-200">
              <h4 className="font-semibold text-brand-blue mb-1.5">
                Technisch Notwendige Cookies
              </h4>
              <p className="text-sm text-gray-600 mb-2.5">
                Diese Cookies sind für die Grundfunktionen der Webseite zwingend
                erforderlich und können nicht deaktiviert werden.
              </p>
              <label className="flex items-center opacity-80 cursor-not-allowed">
                <div className="w-5 h-5 flex items-center justify-center rounded-md border-gray-400 bg-gray-300 mr-2.5">
                  <NecessaryCheckIcon className="w-3.5 h-3.5 text-gray-700" />
                </div>
                <span className="text-sm text-gray-700">Immer aktiv</span>
              </label>
            </div>

            {Object.values(COOKIE_CATEGORY_DETAILS_MAP).map((categoryInfo) => {
              if (!categoryInfo) return null;
              const isEnabled = localConsent[categoryInfo.key] || false;
              return (
                <div
                  key={categoryInfo.key}
                  className="p-4 rounded-lg border border-gray-200 hover:border-brand-teal/60 transition-colors duration-200 bg-white hover:shadow-sm"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="mr-3 flex-grow pr-2">
                      <h4 className="font-semibold text-brand-blue mb-1">
                        {categoryInfo.label}
                      </h4>
                      {categoryInfo.description && (
                        <p className="text-sm text-gray-600">
                          {categoryInfo.description}
                        </p>
                      )}
                    </div>
                    {/* УЛУЧШЕННЫЙ TOGGLE */}
                    <button
                      type="button"
                      role="switch"
                      aria-checked={isEnabled}
                      onClick={() => handleToggle(categoryInfo.key)}
                      className={`flex-shrink-0 group relative inline-flex items-center h-6 w-11 cursor-pointer rounded-full transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2
                                          ${isEnabled ? "bg-brand-teal" : "bg-gray-300"}`}
                    >
                      <span className="sr-only">
                        Toggle {categoryInfo.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`${isEnabled ? "translate-x-[1.375rem]" : "translate-x-[0.125rem]"} 
                                            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg 
                                            ring-0 transition ease-in-out duration-200 flex items-center justify-center`}
                      >
                        {isEnabled ? (
                          <ToggleCheckIcon className="h-3.5 w-3.5 text-brand-teal" />
                        ) : (
                          <MinusIcon className="h-3.5 w-3.5 text-gray-500" />
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Футер с кнопками */}
          <div className="p-5 sm:p-6 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row sm:justify-center items-center gap-3">
            <button
              onClick={handleSavePreferences}
              className="px-6 h-[42px] border-2 border-brand-teal flex items-center justify-center text-sm font-medium text-brand-teal rounded-md hover:bg-brand-teal/10  active:bg-brand-teal/95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-1 w-full sm:w-auto order-1 sm:order-2 transition-colors duration-150"
            >
              Auswahl speichern
            </button>
            <button
              onClick={handleAcceptAllInModal}
              className="px-5 h-[42px] flex items-center justify-center text-sm bg-brand-teal font-medium text-white rounded-md hover:bg-brand-teal/85 active:bg-brand-teal/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-1 w-full sm:w-auto order-2 sm:order-1 transition-colors duration-150"
            >
              Alle optionalen akzeptieren
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieSettingsModal;
