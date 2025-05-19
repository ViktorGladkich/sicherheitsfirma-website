// components/Navbar.js
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: "Startseite", href: "#home" },
    { name: "Dienstleistungen", href: "#services" },
    { name: "Über Uns", href: "#about" },
    { name: "Kontakt", href: "#contact" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut", delay: 0.1 } }
  };

  const logoVariants = {
    hidden: { opacity: 0, x: -25, scale: 0.9 },
    visible: {
      opacity: 1, x: 0, scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 14, delay: 0.4 }
    },
  };

  const navListVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.6,
      },
    },
  };

  const navItemLiVariants = {
    hidden: { opacity: 0, y: -20, x: -10, scale: 0.95 },
    visible: {
      opacity: 1, y: 0, x: 0, scale: 1,
      transition: { type: 'spring', stiffness: 130, damping: 15 }
    },
    hover: {
      scale: 1.08,
      transition: { duration: 0.15, ease: "circOut" }
    }
  };

  const navLinkTextVariants = {
    hover: {
      color: "#2CA58D",
      transition: { duration: 0.15 }
    }
  };

  const menuVariants = {
    open: { opacity: 1, x: 0, transition: { staggerChildren: 0.07, when: "beforeChildren", delayChildren: 0.1 }},
    closed: { opacity: 0, x: "-100%", transition: { when: "afterChildren" }}
  };

  const mobileNavItemVariants = {
    open: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    closed: { opacity: 0, y: 20 }
  };

  return (
    <motion.nav
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className={`fixed w-full top-0 left-0 z-50 transition-colors duration-300 ${
        scrolled || isOpen ? "bg-brand-navy shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            className="flex-shrink-0"
          >
            <Link href="#home" className="flex items-center">
            <Image
    src="/images/LogotipAxma.webp" 
    alt="Логотип"
    width={80}
    height={80}
    className="object-contain"
    priority
  />
            </Link>
          </motion.div>

          <div className="hidden md:block">
            <motion.ul
              className="ml-10 flex items-baseline space-x-1 sm:space-x-2"
              variants={navListVariants}
              initial="hidden"
              animate="visible"
            >
              {navItems.map((item) => (
                <motion.li
                  key={item.name}
                  variants={navItemLiVariants}
                  whileHover="hover"
                >
                  <Link href={item.href}>
                    <motion.span
                      variants={navLinkTextVariants}
                      className="text-gray-300 px-3 py-2.5 rounded-md text-base font-medium block hover:bg-brand-blue/30 transition-colors duration-150"
                    >
                      {item.name}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Анимированная бургер-кнопка */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="focus:outline-none p-2"
              aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
            >
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="transparent"
                xmlns="http://www.w3.org/2000/svg"
                initial={false}
                animate={isOpen ? "opened" : "closed"}
              >
                <motion.path
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={{
                    closed: { d: "M 3 6 L 21 6" },
                    opened: { d: "M 4 4 L 20 20" },
                  }}
                />
                <motion.path
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={{
                    closed: { d: "M 3 12 L 21 12", opacity: 1 },
                    opened: { opacity: 0 },
                  }}
                />
                <motion.path
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={{
                    closed: { d: "M 3 18 L 21 18" },
                    opened: { d: "M 4 20 L 20 4" },
                  }}
                />
              </motion.svg>
            </button>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      <motion.div
        className={`md:hidden ${isOpen ? "block" : "hidden"} bg-brand-navy border-t border-brand-blue`}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <motion.li key={item.name} variants={mobileNavItemVariants}>
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:bg-brand-teal hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all"
              >
                {item.name}
              </Link>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;