import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import AccordionItem from './AccordionItem'; 
import { unsereWerteData } from "../data/werteData"; 
import {
  CheckCircleIcon as DefaultAccordionIcon, 
  ShieldCheckIcon,
  LightBulbIcon,
  UsersIcon,
  HandThumbUpIcon,
  SparklesIcon, 
} from "@heroicons/react/24/solid";

const werteIconMap = {
  Professionalität: ShieldCheckIcon,
  Integrität: SparklesIcon,
  Zuverlässigkeit: UsersIcon,
  Diskretion: HandThumbUpIcon,
  Innovation: LightBulbIcon,
};

const aboutImageUrl = "/images/security-team.png";


const About = () => {
  // --- VARIANTS АНИМАЦИЙ ---
  const sectionHeadingVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
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
        default: { type: "spring", stiffness: 90, damping: 16 }, 
        filter: { duration: 0.5, ease: "easeOut" },          
        staggerChildren: 0.15, 
        delayChildren: 0.1   
      }
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

  // --- Логика для Scroll-linked анимации линии под заголовком секции ---
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
        {/* --- Заголовок секции "Wer wir sind" --- */}
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
          {/* Левая колонка */}
          <motion.div
            variants={leftTextColumnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.1 }}
          >
            {/* Подсекция: Наша Миссия */}
            <motion.div
              variants={contentSubSectionVariants}
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
                className="text-darkGray leading-relaxed break-words"
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
              className="mb-8 md:mb-0" 
            >
              <motion.h3
                variants={innerContentItemVariants}
                className="text-2xl lg:text-3xl font-semibold text-brand-blue mb-3"
              >
                Unsere Werte
              </motion.h3>
              <motion.div variants={innerContentItemVariants} className="space-y-3"> 
                {unsereWerteData.map((wert, index) => {
                  const IconComponent = werteIconMap[wert.title] || DefaultAccordionIcon;
                  return (
                    <div key={index} className="flex items-start space-x-3 py-1">
                      <div className="w-8 h-8 rounded-full bg-brand-teal/10 flex items-center justify-center flex-shrink-0 mt-3.5"> 
                        <IconComponent 
                          className="h-5 w-5 text-brand-teal"
                          aria-hidden="true" 
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <AccordionItem 
                          title={wert.title} 
                          initiallyOpen={index === 0} 
                        >
                          <p className="text-sm text-brand-darkGray py-2 break-words">
                            {wert.content}
                          </p>
                        </AccordionItem>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Правая колонка: Изображение с текстом */}
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
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/70 via-black/40 to-transparent text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }} 
              viewport={{ }} 
            >
              <h4 className="text-lg sm:text-xl font-semibold mb-1">Unser Team – Ihre Sicherheit</h4>
              <p className="text-xs sm:text-sm">Professionell. Diskret. Zuverlässig.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;