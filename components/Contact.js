// components/Contact.js
import { motion } from 'framer-motion';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/solid';

const Contact = () => {
  // Варианты для анимации элементов формы
  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Варианты для контейнера формы (для staggerChildren)
  const containerVariants = {
    hidden: {}, // Можно оставить пустым
    visible: { transition: { staggerChildren: 0.1 } }
  };

  // Обработчик отправки формы
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log('Form data:', data); // Выводим данные в консоль
    alert('Vielen Dank für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.');
    event.target.reset(); // Очистить форму
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue mb-4">
            Nehmen Sie Kontakt auf
          </h2>
          <p className="text-lg text-brand-darkGray max-w-2xl mx-auto">
            Haben Sie Fragen oder wünschen ein individuelles Angebot? Wir freuen uns auf Ihre Nachricht.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start"> {/* Добавил items-start для выравнивания */}
          {/* Контактная информация */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }} // Добавил ease
            className="space-y-8 bg-white p-8 rounded-xl shadow-xl" // Добавил фон и тень как у формы для симметрии
          >
            <div>
              <h3 className="text-2xl font-semibold text-brand-blue mb-6">Sicherheitsfirma Adlerauge</h3> {/* Увеличил mb */}
              <div className="space-y-4"> {/* Добавил space-y для лучшего разделения */}
                <p className="text-brand-darkGray flex items-start">
                  <MapPinIcon className="h-6 w-6 text-brand-teal mr-3 flex-shrink-0 mt-0.5" />
                  <span>Musterstraße 123, 10115 Berlin, Deutschland</span>
                </p>
                <p className="text-brand-darkGray flex items-center">
                  <PhoneIcon className="h-5 w-5 text-brand-teal mr-3 flex-shrink-0" />
                  <a href="tel:+491234567890" className="hover:text-brand-teal transition-colors">+49 (0) 123 456 7890</a>
                </p>
                <p className="text-brand-darkGray flex items-center">
                  <EnvelopeIcon className="h-5 w-5 text-brand-teal mr-3 flex-shrink-0" />
                  <a href="mailto:info@sicherheitsfirma-adlerauge.de" className="hover:text-brand-teal transition-colors">info@sicherheitsfirma-adlerauge.de</a>
                </p>
              </div>
            </div>
            {/* Карта Google Maps (если нужна) */}
            <div className="mt-8 h-64 bg-gray-200 rounded-lg shadow-md flex items-center justify-center text-brand-gray">
               {/* Карта будет здесь (например, iframe от Google Maps) */}
               <span>Google Maps Platzhalter</span>
            </div> 
          </motion.div>

          {/* Форма обратной связи */}
          <motion.form 
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }} // amount 0.1 чтобы анимация началась раньше
            className="space-y-6 bg-brand-navy p-8 rounded-xl shadow-xl" // Ваш стиль фона
          >
            <motion.div variants={formItemVariants}>
              <label
                htmlFor="firstName" // ИСПРАВЛЕНО
                className="block text-lg font-medium text-brand-teal"
              >
                Ihr Vorname
              </label>
              <motion.input
                type="text"
                name="firstName" // ИСПРАВЛЕНО
                id="firstName"   // ИСПРАВЛЕНО
                required
                whileFocus={{
                  scale: 1.02,
                  boxShadow: "0px 0px 8px rgba(44, 165, 141, 0.3)",
                }}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-brand-teal sm:text-sm transition-all"
              />
            </motion.div>

            <motion.div variants={formItemVariants}>
              <label
                htmlFor="lastName" // ИСПРАВЛЕНО
                className="block text-lg font-medium text-brand-teal"
              >
                Ihr Nachname
              </label>
              <motion.input 
                type="text"
                name="lastName" // ИСПРАВЛЕНО
                id="lastName"   // ИСПРАВЛЕНО
                required
                whileFocus={{
                  scale: 1.02,
                  boxShadow: "0px 0px 8px rgba(44, 165, 141, 0.3)",
                }}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-brand-teal sm:text-sm transition-all"
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
                name="email" // name для email
                id="email"   // id для email
                required
                whileFocus={{
                  scale: 1.02,
                  boxShadow: "0px 0px 8px rgba(44, 165, 141, 0.3)",
                }}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-brand-teal sm:text-sm transition-all"
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
                rows="4"
                required
                whileFocus={{
                  scale: 1.01,
                  boxShadow: "0px 0px 8px rgba(44, 165, 141, 0.3)",
                }}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-brand-teal sm:text-sm transition-all"
              ></motion.textarea>
            </motion.div>

            <motion.div variants={formItemVariants}>
              <motion.button 
                type="submit"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#258A74", 
                  boxShadow: "0px 5px 15px rgba(44, 165, 141, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-brand-teal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-teal focus:ring-offset-brand-navy" // Добавил focus:ring-offset-brand-navy
              >
                Nachricht Senden
              </motion.button>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;