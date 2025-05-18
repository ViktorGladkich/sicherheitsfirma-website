// components/About.js
import { motion } from 'framer-motion';
import Image from 'next/image'; // Для оптимизированных изображений
import { CheckCircleIcon } from '@heroicons/react/24/solid';

// Используйте свое изображение или бесплатное с unsplash.com, pexels.com
// Поместите изображение в папку public, например, public/images/security-team.jpg
const aboutImageUrl = '/images/image.png'; // Замените на реальный путь, если используете

const About = () => {
  const textContainerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.2 } 
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, x: 50 },
    visible: { 
      opacity: 1, 
      scale: 1,
      x: 0, 
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 } 
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
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
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl font-extrabold text-brand-blue mb-4"
          >
            Wer wir sind: Ihr Partner für Sicherheit
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-brand-darkGray max-w-3xl mx-auto"
          >
            Sicherheitsfirma Adlerauge steht für höchste Professionalität und maßgeschneiderte Sicherheitslösungen. 
            Wir verstehen die einzigartigen Anforderungen des deutschen Marktes und bieten Ihnen Schutz, auf den Sie sich verlassen können.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h3 className="text-2xl font-semibold text-brand-blue mb-6">Unsere Verpflichtung zu Exzellenz</h3>
            <p className="text-brand-gray mb-6 leading-relaxed">
              Unser Team besteht aus erfahrenen Sicherheitsexperten, die regelmäßig geschult werden, um den höchsten Standards gerecht zu werden. 
              Wir setzen auf proaktive Strategien und modernste Technologie, um Risiken zu minimieren und Ihre Werte effektiv zu schützen. 
              Vertrauen und Transparenz sind die Grundpfeiler unserer Arbeit.
            </p>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start"
                  variants={listItemVariants} // Применяем к каждому элементу списка
                >
                  <CheckCircleIcon className="h-6 w-6 text-brand-teal mr-3 flex-shrink-0 mt-1" />
                  <span className="text-brand-darkGray">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-lg overflow-hidden shadow-2xl"
            // Добавим эффект параллакса при скролле для изображения (необязательно, но красиво)
            // style={{ y: useScrollYProgress() }} // Это требует доп. настройки, пока уберем для простоты
          >
            {/* 
              Создайте папку `public` в корне проекта, если ее нет.
              Внутри `public` создайте папку `images`.
              Поместите изображение `security-team.jpg` (или ваше) в `public/images/`.
              Размер изображения для примера: 800x600px.
            */}
            <Image
              src={aboutImageUrl}
              alt="Unser Sicherheitsteam im Einsatz"
              width={800}
              height={600}
              layout="responsive" // Адаптивное изображение
              objectFit="cover" // Как изображение должно заполнять контейнер
              className="transform hover:scale-105 transition-transform duration-500 ease-out"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;