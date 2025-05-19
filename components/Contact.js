// components/Contact.js
import { motion } from "framer-motion";
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";

const Contact = () => {
  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  // Обработчик отправки формы (пока просто выводит в консоль)
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Form data:", data);
    alert(
      "Vielen Dank für Ihre Nachricht! Wir werden uns bald bei Ihnen melden."
    );
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
            Haben Sie Fragen oder wünschen ein individuelles Angebot? Wir freuen
            uns auf Ihre Nachricht.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Контактная информация */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold text-brand-blue mb-4">
                Sicherheitsfirma Adlerauge
              </h3>
              <p className="text-brand-gray flex items-start mb-3">
                <MapPinIcon className="h-6 w-6 text-brand-teal mr-3 flex-shrink-0 mt-1" />
                <span>Musterstraße 123, 10115 Berlin, Deutschland</span>
              </p>
              <p className="text-brand-gray flex items-center mb-3">
                <PhoneIcon className="h-5 w-5 text-brand-teal mr-3 flex-shrink-0" />
                <a
                  href="tel:+491234567890"
                  className="hover:text-brand-teal transition-colors"
                >
                  +49 (0) 123 456 7890
                </a>
              </p>
              <p className="text-brand-gray flex items-center">
                <EnvelopeIcon className="h-5 w-5 text-brand-teal mr-3 flex-shrink-0" />
                <a
                  href="mailto:info@sicherheitsfirma-adlerauge.de"
                  className="hover:text-brand-teal transition-colors"
                >
                  info@sicherheitsfirma-adlerauge.de
                </a>
              </p>
            </div>
            {/* Можно добавить карту Google Maps сюда, если нужно. Это потребует API ключа.
            <div className="h-64 bg-gray-300 rounded-lg shadow-md">
               Карта будет здесь
            </div> 
            */}
          </motion.div>

          {/* Форма обратной связи */}
          <motion.form
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6 bg-white p-8 rounded-xl shadow-xl"
          >
            <motion.div variants={formItemVariants}>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-brand-darkGray"
              >
                Ihr Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm"
              />
            </motion.div>
            <motion.div variants={formItemVariants}>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-brand-darkGray"
              >
                Ihre E-Mail-Adresse
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm"
              />
            </motion.div>
            <motion.div variants={formItemVariants}>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-brand-darkGray"
              >
                Ihre Nachricht
              </label>
              <textarea
                name="message"
                id="message"
                rows="4"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm"
              ></textarea>
            </motion.div>
            <motion.div variants={formItemVariants}>
              <motion.button
                type="submit"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#258A74" /* Темнее brand.teal */,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-teal hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-teal"
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
