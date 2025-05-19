// components/Contact.js
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react"; // Добавили useState для formStatus
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";
import AccordionItem from "./AccordionItem";
import Link from "next/link";

const Contact = () => {
  // Состояние для отслеживания статуса отправки формы
  const [formStatus, setFormStatus] = useState({
    isSending: false,
    message: "",
    isError: false,
  });

  const handleSubmit = async (event) => {
    // Сделали handleSubmit асинхронным
    event.preventDefault();
    setFormStatus({
      isSending: true,
      message: "Nachricht wird gesendet...",
      isError: false,
    });

    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      const response = await fetch("/api/contact", {
        // Отправляем на наш API Route
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json(); // Получаем JSON ответ от API

      if (response.ok && result.success) {
        setFormStatus({
          isSending: false,
          message: result.message,
          isError: false,
        });
        event.target.reset(); // Очищаем форму при успехе
        setTimeout(
          () =>
            setFormStatus({ isSending: false, message: "", isError: false }),
          6000
        );
      } else {
        setFormStatus({
          isSending: false,
          message:
            result.message ||
            "Ein Fehler ist beim Senden aufgetreten. Bitte versuchen Sie es später erneut.",
          isError: true,
        });
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setFormStatus({
        isSending: false,
        message:
          "Netzwerkfehler oder der Server ist nicht erreichbar. Bitte überprüfen Sie Ihre Verbindung.",
        isError: true,
      });
    }
  };

  // --- Остальная часть вашего кода (refs, hooks, variants) без изменений ---
  const sectionHeaderRef = useRef(null);
  const { scrollYProgress: lineScrollYProgress } = useScroll({
    target: sectionHeaderRef,
    offset: ["start 0.85", "start 0.1"],
  });
  const pathLength = useTransform(lineScrollYProgress, [0, 1], [0, 1]);
  const opacityLine = useTransform(
    lineScrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0]
  );

  const sectionTitleVariants = {
    hidden: { opacity: 0, y: -25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  const sectionSubtitleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.15 },
    },
  };
  const contactInfoBlockVariants = {
    hidden: { opacity: 0, x: -50, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 16,
        delay: 0.1,
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };
  const leftBlockItemVariants = {
    // Вариант для элементов внутри левого блока
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  const formBlockVariants = {
    hidden: { opacity: 0, x: 50, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 16,
        delay: 0.2,
        staggerChildren: 0.1,
        delayChildren: 0.25,
      },
    },
  };
  const formItemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 130, damping: 15 },
    },
  };
  // --- Конец Variants ---

  return (
    <section id="contact" className="py-20 bg-white">
      {" "}
      {/* Используем bg-white для секции */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции с линией */}
        <div ref={sectionHeaderRef} className="text-center mb-16 relative">
          <motion.h2
            variants={sectionTitleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}
            className="text-3xl sm:text-4xl font-extrabold text-brand-blue mb-2"
          >
            Nehmen Sie Kontakt auf
          </motion.h2>
          <div className="max-w-[800px] h-[5px] mx-auto mb-3 overflow-hidden">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 4"
              preserveAspectRatio="none"
            >
              <motion.line
                x1="0"
                y1="2"
                x2="100"
                y2="2"
                stroke="currentColor"
                className="text-brand-teal"
                strokeWidth="4"
                strokeLinecap="round"
                style={{ pathLength, opacity: opacityLine }}
              />
            </svg>
          </div>
          <motion.p
            variants={sectionSubtitleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}
            className="text-lg text-brand-darkGray max-w-2xl mx-auto"
          >
            Haben Sie Fragen oder wünschen ein individuelles Angebot? Wir freuen
            uns auf Ihre Nachricht.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-stretch">
          {/* Контактная информация и Аккордеон (ЛЕВЫЙ БЛОК) - ВАШ КОД ЗДЕСЬ СОХРАНЕН */}
          <motion.div
            variants={contactInfoBlockVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.1 }}
            className="flex flex-col bg-brand-navy p-6 sm:p-8 rounded-xl shadow-xl text-white"
          >
            <motion.h3
              variants={leftBlockItemVariants} // Анимация для этого заголовка
              className="text-2xl lg:text-3xl font-semibold text-brand-teal mb-6"
            >
              Sicherheitsfirma Adlerauge
            </motion.h3>

            <motion.div // Контейнер для основных контактов
              variants={leftBlockItemVariants} // Анимация для этого блока
              className="space-y-5 mb-8"
            >
              <div className="flex items-start">
                <MapPinIcon className="h-7 w-7 text-brand-teal mr-4 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-100 font-semibold text-lg">
                    Standort
                  </p>
                  <p className="text-brand-gray leading-snug">
                    Musterstraße 123
                    <br />
                    10115 Berlin, Deutschland
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <PhoneIcon className="h-7 w-7 text-brand-teal mr-4 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-100 font-semibold text-lg">
                    Rufen Sie uns an
                  </p>
                  <a
                    href="tel:+491234567890"
                    className="text-brand-gray hover:text-brand-teal transition-colors block hover:underline"
                  >
                    +49 (0) 123 456 7890
                  </a>
                  {/* <p className="text-xs text-gray-400 mt-0.5">Mo - Fr: 08:00 - 18:00 Uhr</p> // Если нужны часы */}
                </div>
              </div>
              <div className="flex items-start">
                <EnvelopeIcon className="h-7 w-7 text-brand-teal mr-4 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-100 font-semibold text-lg">
                    Schreiben Sie uns
                  </p>
                  <a
                    href="mailto:info@sicherheitsfirma-adlerauge.de"
                    className="text-brand-gray hover:text-brand-teal transition-colors block hover:underline"
                  >
                    info@sicherheitsfirma-adlerauge.de
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Аккордеон */}
            <motion.div
              variants={leftBlockItemVariants} // Анимация для всего блока аккордеона
              className="space-y-px mt-auto"
            >
              <AccordionItem title="Unsere Öffnungszeiten">
                <p className="text-sm pt-2 pb-1">
                  Montag - Freitag: 08:00 - 18:00 Uhr
                </p>
                <p className="text-sm pb-1">
                  Samstag: 09:00 - 13:00 Uhr (Notdienst erreichbar)
                </p>
                <p className="text-sm pb-1">
                  Sonntag & Feiertage: Notdienst 24/7 erreichbar
                </p>
              </AccordionItem>
              <AccordionItem title="Antwortprozess">
                <p className="text-sm pt-2 pb-1">
                  Wir bemühen uns, alle Anfragen schnellstmöglich zu bearbeiten.
                  In der Regel erhalten Sie eine Antwort innerhalb von 24
                  Stunden an Werktagen. Für dringende Fälle nutzen Sie bitte
                  unsere Notrufnummer.
                </p>
              </AccordionItem>
              <AccordionItem title="Datenschutzhinweis">
                <div className="text-sm pt-2 pb-1 space-y-2 text-brand-gray">
                  <p>
                    Ihre Daten, die Sie uns über das Kontaktformular oder per
                    E-Mail übermitteln, werden ausschließlich zur Bearbeitung
                    Ihrer Anfrage und für mögliche Anschlussfragen verwendet.
                  </p>
                  <p>
                    Weitere Informationen zum Umgang mit Ihren persönlichen
                    Daten und Ihren Rechten finden Sie in unserer{" "}
                    <Link
                      href="/datenschutz"
                      className="text-brand-teal hover:underline"
                    >
                      Datenschutzerklärung
                    </Link>
                    .
                  </p>
                </div>
              </AccordionItem>
            </motion.div>
          </motion.div>

          {/* Форма обратной связи (ПРАВЫЙ БЛОК) - с изменениями для отправки */}
          <motion.form
            onSubmit={handleSubmit}
            variants={formBlockVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.1 }}
            className="space-y-6 bg-brand-navy p-8 rounded-xl shadow-xl h-full flex flex-col justify-between"
          >
            <div className="space-y-6">
              <motion.div variants={formItemVariants}>
                <label
                  htmlFor="firstName"
                  className="block text-lg font-medium text-brand-teal"
                >
                  Ihr Vorname
                </label>
                <motion.input
                  type="text"
                  name="firstName"
                  id="firstName"
                  required
                  disabled={formStatus.isSending}
                  whileFocus={{
                    scale: 1.02,
                    boxShadow: "0px 0px 8px rgba(44, 165, 141, 0.3)",
                  }}
                  className="mt-1 block w-full px-3 py-2.5 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-brand-teal sm:text-sm transition-all disabled:opacity-70"
                />
              </motion.div>
              <motion.div variants={formItemVariants}>
                <label
                  htmlFor="lastName"
                  className="block text-lg font-medium text-brand-teal"
                >
                  Ihr Nachname
                </label>
                <motion.input
                  type="text"
                  name="lastName"
                  id="lastName"
                  required
                  disabled={formStatus.isSending}
                  whileFocus={{
                    scale: 1.02,
                    boxShadow: "0px 0px 8px rgba(44, 165, 141, 0.3)",
                  }}
                  className="mt-1 block w-full px-3 py-2.5 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-brand-teal sm:text-sm transition-all disabled:opacity-70"
                />
              </motion.div>
              <motion.div variants={formItemVariants}>
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-brand-teal"
                >
                  Ihre E-Mail-Adresse
                </label>
                <motion.input
                  type="email"
                  name="email"
                  id="email"
                  required
                  disabled={formStatus.isSending}
                  whileFocus={{
                    scale: 1.02,
                    boxShadow: "0px 0px 8px rgba(44, 165, 141, 0.3)",
                  }}
                  className="mt-1 block w-full px-3 py-2.5 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-brand-teal sm:text-sm transition-all disabled:opacity-70"
                />
              </motion.div>
              <motion.div variants={formItemVariants}>
                <label
                  htmlFor="message"
                  className="block text-lg font-medium text-brand-teal"
                >
                  Ihre Nachricht
                </label>
                <motion.textarea
                  name="message"
                  id="message"
                  rows="5"
                  required
                  disabled={formStatus.isSending}
                  whileFocus={{
                    scale: 1.01,
                    boxShadow: "0px 0px 8px rgba(44, 165, 141, 0.3)",
                  }}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-brand-teal sm:text-sm transition-all disabled:opacity-70"
                ></motion.textarea>
              </motion.div>
            </div>
            <motion.div variants={formItemVariants} className="mt-auto">
              <motion.button
                type="submit"
                disabled={formStatus.isSending}
                whileHover={
                  !formStatus.isSending
                    ? {
                        scale: 1.05,
                        backgroundColor: "#258A74",
                        boxShadow: "0px 5px 15px rgba(44, 165, 141, 0.4)",
                      }
                    : {}
                }
                whileTap={!formStatus.isSending ? { scale: 0.95 } : {}}
                transition={{ duration: 0.2 }}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-brand-teal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-teal focus:ring-offset-brand-navy disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {formStatus.isSending ? "Wird gesendet..." : "Nachricht Senden"}
              </motion.button>
              {formStatus.message && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5, transition: { duration: 0.2 } }}
                  className={`mt-4 text-sm text-center ${formStatus.isError ? "text-red-400" : "text-green-400"}`} // Цвета для темного фона формы
                >
                  {formStatus.message}
                </motion.p>
              )}
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
