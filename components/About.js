import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import AccordionItem from './AccordionItem';

const aboutImageUrl = "/images/security-team.png";
const unsereWerteData = [
  {
    title: "Professionalität",
    content: "Höchste Standards in Ausbildung und Durchführung aller unserer Sicherheitsdienstleistungen. Regelmäßige Schulungen und Zertifizierungen unserer Mitarbeiter sind für uns selbstverständlich."
  },
  {
    title: "Integrität",
    content: "Ehrliches, ethisches und transparentes Handeln bildet die Grundlage unserer Beziehungen zu Kunden, Mitarbeitern und Partnern. Auf uns können Sie sich verlassen."
  },
  {
    title: "Zuverlässigkeit",
    content: "Wir sind da, wenn Sie uns brauchen – 24 Stunden am Tag, 7 Tage die Woche. Pünktlichkeit, Engagement und die konsequente Einhaltung von Absprachen zeichnen uns aus."
  },
  {
    title: "Diskretion",
    content: "Vertraulichkeit und der Schutz Ihrer Privatsphäre sowie sensibler Informationen sind für uns von höchster Bedeutung in allen Aspekтах unserer Arbeit."
  },
  {
    title: "Innovation",
    content: "Stetige Anpassung an neue Sicherheitsherausforderungen durch den Einsatz moderner Technologien und die kontinuierliche Weiterentwicklung unserer Methoden und Prozesse."
  }
];

const About = () => {
  const sectionHeadingVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transform: "skewX(0deg)",
      transition: { type: "spring", stiffness: 100, damping: 15, delay: 0.1 },
    },
  };
  const sectionSubheadingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.25 },
    },
  };
  const leftTextColumnVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.2,
      },
    },
  };
  const contentSubSectionVariants = {
    hidden: { opacity: 0, x: -40, filter: "blur(3px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 16,
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };
  const innerContentItemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "circOut" },
    },
  };
  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.85,
      rotateY: 25,
      x: 50,
      transformPerspective: "1000px",
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      x: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
    },
  };


  // --- Логика для Scroll-linked анимации линии ---
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

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={sectionHeaderRef}
          className="text-center mb-14 sm:mb-16 relative"
        >
          <motion.h2
            variants={sectionHeadingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}
            style={{ transform: "skewX(-5deg)" }}
            className="text-3xl sm:text-4xl font-extrabold text-brand-blue mb-4"
          >
            Wer wir sind: Ihr Partner für Sicherheit
          </motion.h2>
          <div className="max-w-[800px] h-[5px] mx-auto mb-3 overflow-hidden">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 120 5"
              preserveAspectRatio="none"
            >
              <motion.line
                x1="0"
                y1="2.5"
                x2="120"
                y2="2.5"
                stroke="currentColor"
                className="text-brand-teal"
                strokeWidth="5"
                strokeLinecap="round"
                style={{ pathLength: pathLength, opacity: opacityLine }}
              />
            </svg>
          </div>
          <motion.p
            variants={sectionSubheadingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}
            className="text-lg text-brand-darkGray max-w-3xl mx-auto"
          >
            Sicherheit ist Vertrauenssache. Deshalb setzen wir auf transparente
            Kommunikation, individuelle Beratung und partnerschaftliche
            Zusammenarbeit – für Lösungen, die wirklich schützen.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <motion.div
            variants={leftTextColumnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.1 }}
          >
            {/* Подсекция: Наша Миссия */}
            <motion.div
              variants={contentSubSectionVariants}
              style={{ filter: "blur(4px)" }}
              className="mb-8"
            >
              <motion.h3
                variants={innerContentItemVariants}
                className="text-2xl lg:text-3xl font-semibold text-brand-blue mb-4"
              >
                Unsere Mission
              </motion.h3>
              <motion.p
                variants={innerContentItemVariants}
                className="text-darkGray leading-relaxed"
              >
                Unsere Mission ist es, durch proaktive Sicherheitsmaßnahmen und
                den Einsatz modernster Technologien ein Höchstmaß an Sicherheit
                für unsere Kunden zu gewährleisten. Wir streben danach,
                Bedrohungen frühzeitig zu erkennen und Risiken effektiv zu
                minimieren, um Menschen, Werte und Reputation zu schützen.
              </motion.p>
            </motion.div>

            {/* Подсекция: Наши Ценности */}
            <motion.div
              variants={contentSubSectionVariants}
              style={{ filter: "blur(4px)" }}
              className="mb-8"
            >
              <motion.h3
                variants={innerContentItemVariants}
                className="text-2xl lg:text-3xl font-semibold text-brand-blue mb-3"
              >
                Unsere Werte
              </motion.h3>
              <motion.div variants={innerContentItemVariants} className="space-y-1"> 
                {unsereWerteData.map((wert, index) => (
                  <AccordionItem key={index} title={wert.title} initiallyOpen={index === 0}> {/* Первый элемент открыт по умолчанию */}
                    <p className="text-sm text-brand-darkGray py-2"> {/* Добавил padding для текста в аккордеоне */}
                      {wert.content}
                    </p>
                  </AccordionItem>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Правая часть: Изображение */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}
            className="relative rounded-lg overflow-hidden shadow-2xl w-full h-72 sm:h-80 md:h-96 lg:h-[480px]"
          >
            <Image
              src={aboutImageUrl}
              alt="Unser Sicherheitsteam im Einsatz"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
              priority={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
