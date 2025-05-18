import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: "Startseite", href: "#home" },
    { name: "Dienstleistungen", href: "#services" },
    { name: "Über Uns", href: "#about" },
    { name: "Kontakt", href: "#contact" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const menuVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: { staggerChildren: 0.1, when: "beforeChildren" },
    },
    closed: {
      opacity: 0,
      x: "-100%",
      transition: { when: "afterChildren" },
    },
  };

  const mobileNavItemVariants = {
    open: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    closed: { opacity: 0, y: 20 },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
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
            <Link
              href="#home"
              className="text-2xl font-bold text-white hover:text-brand-teal transition-colors"
            >
              Sicherheitsfirma Adlerauge
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <motion.ul
              className="ml-10 flex items-baseline space-x-4"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
              }}
              initial="hidden"
              animate="visible"
            >
              {navItems.map((item, index) => (
                <motion.li key={item.name} variants={navItemVariants}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:bg-brand-blue hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none p-2"
            >
              <span className="sr-only">Menü öffnen</span>
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`md:hidden ${
          isOpen ? "block" : "hidden"
        } bg-brand-navy border-t border-brand-blue`}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <motion.li key={item.name} variants={mobileNavItemVariants}>
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)} // Close menu on click
                className="text-gray-300 hover:bg-brand-blue hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all"
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
