// components/About.js
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const aboutImageUrl = '/images/security-team.png'; // Убедитесь, что изображение на месте

const About = () => {
  // Варианты для основного заголовка секции
  const sectionHeadingVariants = {
    hidden: { opacity: 0, y: -30, skewX: "-5deg" },
    visible: { 
      opacity: 1, y: 0, skewX: "0deg",
      transition: { type: "spring", stiffness: 100, damping: 15, delay: 0.1 }
    }
  };
  const sectionSubheadingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.3 }
    }
  };

  // Контейнер для левой части (текст)
  const textContentContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 }
    }
  };

  // Элементы внутри левой части (заголовок, параграфы, список)
  const textItemVariants = {
    hidden: { opacity: 0, x: -40, filter: "blur(5px)" }, // Добавим блюр
    visible: { 
      opacity: 1, x: 0, filter: "blur(0px)",
      transition: { type: "spring", stiffness: 80, damping: 15 }
    }
  };

  // Отдельно для элементов списка преимуществ (для более тонкой анимации)
  const featureListItemVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.9 },
    visible: (i) => ({ // i - custom prop (индекс)
      opacity: 1, x: 0, scale: 1,
      transition: { 
        type: "spring", stiffness: 120, damping: 12, 
        // delay: i * 0.08 // Кастомная задержка, если не используем staggerChildren на UL
      }
    })
  };
  
  // Варианты для UL списка (чтобы управлять staggerChildren для LI)
  const featureListVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } }
  };


  // Варианты для правой части (изображение)
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.85, rotateY: 30, transformPerspective: '1000px' }, // 3D эффект
    visible: { 
      opacity: 1, scale: 1, rotateY: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 } // Плавный easeOutExpo и небольшая задержка
    },
  };

  const features = [
    "Lizenzierte und geschulte Sicherheitsexperten",
    "Modernste Technologie und Ausrüstung",
    "Individuelle Sicherheitskonzepte",
    "24/7 Erreichbarkeit und schneller Einsatz",
    "Strikte Diskretion und Zuverlässigkeit"
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 sm:mb-16"> {/* Увеличил mb */}
          <motion.h2 
            variants={sectionHeadingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-3xl sm:text-4xl font-extrabold text-brand-blue mb-4"
          >
            Wer wir sind: Ihr Partner für Sicherheit
          </motion.h2>
          <motion.p 
            variants={sectionSubheadingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-lg text-brand-darkGray max-w-3xl mx-auto"
          >
            Sicherheitsfirma Adlerauge steht für höchste Professionalität und maßgeschneiderte Sicherheitslösungen. 
            Wir verstehen die einzigartigen Anforderungen des deutschen Marktes und bieten Ihnen Schutz, auf den Sie sich verlassen können.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center"> {/* Увеличил gap */}
          {/* Левая часть: Текстовый контент */}
          <motion.div
            variants={textContentContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} // amount 0.2 для контейнера
          >
            <motion.h3 
              variants={textItemVariants} // Заголовок внутри блока
              className="text-2xl lg:text-3xl font-semibold text-brand-blue mb-6"
            >
              Unsere Verpflichtung zu Exzellenz
            </motion.h3>
            <motion.p 
              variants={textItemVariants} // Параграф
              className="text-brand-gray mb-6 leading-relaxed"
            >
              Unser Team besteht aus erfahrenen Sicherheitsexperten, die regelmäßig geschult werden, um den höchsten Standards gerecht zu werden. 
              Wir setzen auf proaktive Strategien und modernste Technologie, um Risiken zu minimieren und Ihre Werte effektiv zu schützen. 
              Vertrauen und Transparenz sind die Grundpfeiler unserer Arbeit.
            </motion.p>
            
            {/* Список преимуществ */}
            <motion.ul 
              variants={featureListVariants} // Variants для UL для управления stagger
              // initial и animate здесь не нужны, т.к. управляются textContentContainerVariants
              className="space-y-3 mt-8"
            >
              {features.map((feature, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start"
                  variants={featureListItemVariants} // Variants для каждого LI
                  custom={index} // Передаем индекс для возможной кастомной задержки (если не staggerChildren)
                  // initial и animate здесь не нужны, т.к. управляются featureListVariants
                >
                  <CheckCircleIcon className="h-6 w-6 text-brand-teal mr-3 flex-shrink-0 mt-0.5 sm:mt-1" />
                  <span className="text-brand-darkGray">{feature}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Правая часть: Изображение */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-lg overflow-hidden shadow-2xl aspect-[4/3] md:aspect-auto" // Добавил aspect-ratio для предсказуемости
          >
            <Image
              src={aboutImageUrl}
              alt="Unser Sicherheitsteam im Einsatz"
              width={800}
              height={600}
              layout="responsive"
              objectFit="cover"
              className="transform hover:scale-105 transition-transform duration-500 ease-out"
              priority // Если это изображение важно для LCP (Largest Contentful Paint)
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;