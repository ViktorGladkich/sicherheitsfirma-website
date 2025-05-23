// components/Navbar.js
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";

const Navbar = ({ activeSectionId, onNavItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  const isHomePage = router.pathname === "/";

  const navItems = [
    { id: "home", name: "Startseite", href: isHomePage ? "#home" : "/" },
    { id: "services", name: "Dienstleistungen", href: isHomePage ? "#services" : "/#services" },
    { id: "stats", name: "Statistiken", href: isHomePage ? "#stats" : "/#stats" },
    { id: "about", name: "Über Uns", href: isHomePage ? "#about" : "/#about" },
    { id: "testimonials", name: "Kunden", href: isHomePage ? "#testimonials" : "/#testimonials" },
    { id: "contact", name: "Kontakt", href: isHomePage ? "#contact" : "/#contact" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (isHomePage) {
        setScrolled(window.scrollY > 50);
      }
    };
    if (!isHomePage) {
      setScrolled(true); 
    } else {
      handleScroll();
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut", delay: 0.1 } }
  };
  const logoVariants = {
    hidden: { opacity: 0, x: -25, scale: 0.9 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 14, delay: 0.4 } },
  };
  const navListVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.6, }},
  };
  const navItemLiVariants = {
    hidden: { opacity: 0, y: -20, x: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, x: 0, scale: 1, transition: { type: 'spring', stiffness: 130, damping: 15 } },
    hover: { scale: 1.08, transition: { duration: 0.15, ease: "circOut" } }
  };
  const navLinkTextVariants = {
    hover: { color: "#2CA58D", transition: { duration: 0.15 } }
  };
  
  
  const menuVariants = {
    open: { opacity: 1, x: 0, transition: { staggerChildren: 0.07, when: "beforeChildren", delayChildren: 0.1 }},
    closed: { opacity: 0, x: "-100%", transition: { when: "afterChildren" }}
  };
  const mobileNavItemVariants = {
    open: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    closed: { opacity: 0, y: 20 }
  };
  // --- Конец Variants ---

  const isNavbarOpaque = scrolled || isOpen || !isHomePage;

  const handleNavClick = (item) => {
    const performNavigation = () => {
      if (isHomePage && onNavItemClick) {
        onNavItemClick(item.id);
      } else {
        router.push(item.href); 
      }
    };

    if (isOpen) {
      setIsOpen(false);
      setTimeout(performNavigation, 300);
    } else {
      performNavigation(); 
    }
  };

  return (
    <motion.nav
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className={`fixed w-full top-0 left-0 z-50 transition-colors duration-300 ${
        isNavbarOpaque ? "bg-brand-navy shadow-lg" : "bg-transparent"
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
            <Link href="/" className="flex items-center">
              <Image
                src="/images/LogotipAxma.webp"
                alt="Axma Sicherheitsdienst Log"
                width={80}
                height={80}
                className="object-contain"
                priority
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <motion.ul
              className="ml-10 flex items-baseline space-x-1 sm:space-x-2"
              variants={navListVariants}
              initial="hidden"
              animate="visible"
            >
              {navItems.map((item) => (
                <motion.li
                  key={item.id}
                  variants={navItemLiVariants}
                  whileHover="hover"
                >
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      if (isHomePage) {
                        e.preventDefault();
                      }
                      handleNavClick(item);
                    }}
                    className="block"
                  >
                    <motion.span
                      variants={navLinkTextVariants}
                      className={`relative px-3 py-2.5 text-base font-medium block transition-colors duration-150 after:absolute after:bottom-1 after:left-0 after:h-[2px] after:rounded-full after:transition-all after:duration-300 ${
                        activeSectionId === item.id && isHomePage
                          ? "text-white after:w-full after:bg-brand-teal"
                          : "text-gray-300 hover:text-white after:w-0 hover:after:w-full after:bg-brand-teal"
                      }`}
                    >
                      {item.name}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="focus:outline-none p-2 text-white" 
              aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
            >
              <motion.svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" initial={false} animate={isOpen ? "opened" : "closed"} transition={{duration: 0.3}}>
                <motion.path stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" variants={{ closed: { d: "M 3 6 L 21 6" }, opened: { d: "M 5 5 L 19 19" }}} transition={{duration: 0.3}}/>
                <motion.path stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" d="M 3 12 L 21 12" variants={{ closed: { opacity: 1 }, opened: { opacity: 0 }}} transition={{duration: 0.15}}/>
                <motion.path stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" variants={{ closed: { d: "M 3 18 L 21 18" }, opened: { d: "M 5 19 L 19 5" }}} transition={{duration: 0.3}}/>
              </motion.svg>
            </button>
          </div>
        </div>
      </div>

      <motion.div
        className={`md:hidden ${isOpen ? "block" : "hidden"} bg-brand-navy border-t border-brand-blue`} 
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants} 
      >
        <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <motion.li key={item.id} variants={mobileNavItemVariants}> 
              <Link
                href={item.href}
                onClick={(e) => { 
                  if (isHomePage) {
                    e.preventDefault();
                  }
                  handleNavClick(item);
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all ${
                  activeSectionId === item.id && isHomePage
                    ? "text-white bg-brand-teal"
                    : "text-gray-300 hover:bg-brand-teal hover:text-white" // Ваш стиль для мобильного hover
                }`}
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