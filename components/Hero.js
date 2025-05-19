import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ShieldCheckIcon } from '@heroicons/react/24/solid';
import { useEffect, useRef, useState, useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; 

const Hero = () => {
  // --- Код для параллакса контента ---
  const [isMouseOver, setIsMouseOver] = useState(false);
  const heroRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100, mass: 0.5 };
  const springMouseX = useSpring(mouseX, springConfig);
  const springMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;

    const handleMouseMove = (event) => {
      if (isMouseOver) {
        const rect = heroElement.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    const handleMouseEnter = () => setIsMouseOver(true);
    const handleMouseLeave = () => {
      setIsMouseOver(false);
      mouseX.set(0);
      mouseY.set(0);
    };
    
    heroElement.addEventListener('mousemove', handleMouseMove);
    heroElement.addEventListener('mouseenter', handleMouseEnter);
    heroElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      heroElement.removeEventListener('mousemove', handleMouseMove);
      heroElement.removeEventListener('mouseenter', handleMouseEnter);
      heroElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMouseOver, mouseX, mouseY]);

  const transformContentX = useTransform(springMouseX, (val) => val / 50);
  const transformContentY = useTransform(springMouseY, (val) => val / 40);
  // --- Код для частиц ---
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
  }, []);

  const particlesOptions = {
    fullScreen: {
      enable: false, 
      zIndex: 0 
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'grab', 
        },
        onClick: {
          enable: true,
          mode: 'push',
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 0.7,
          }
        },
        bubble: { 
          distance: 200,
          size: 20,
          duration: 2,
          opacity: 0.8,
        },
        repulse: { 
          distance: 100,
          duration: 0.4,
        },
        push: {
          quantity: 2,
        },
        remove: { 
          quantity: 2,
        },
      },
    },
    particles: { 
      color: {
        value: '#2CA58D', 
      },
      links: {
        color: '#A0AEC0', 
        distance: 150,
        enable: true,
        opacity: 0.4,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: {
            default: 'bounce',
        },
        random: false,
        speed: 1.5,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 60,
      },
      opacity: {
        value: 0.5,
        animation: {
            enable: true,
            speed: 0.5,
            minimumValue: 0.1,
            sync: false
        }
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 1, max: 4 },
        animation: {
            enable: true,
            speed: 3,
            minimumValue: 0.1,
            sync: false
        }
      },
    },
    detectRetina: true,
  };

  // --- Варианты анимации Framer Motion для контента ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const iconContainerVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -90 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: 'spring', stiffness: 120, damping: 10, delay: 0.8 },
    },
  };
  
  const buttonVariants = {
    hover: {
      scale: 1.1,
      boxShadow: "0px 0px 15px rgba(44,165,141, 0.7)",
      textShadow: "0px 0px 8px rgba(255,255,255,0.3)",
      transition: { duration: 0.2, yoyo: 0 }
    },
    tap: { scale: 0.9 }
  };

  return (
    <section 
      id="home" 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center bg-brand-navy text-white overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={particlesOptions}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        />
      </div>

      <motion.div 
        className="relative z-10 max-w-4xl mx-auto text-center px-4"
        style={{ x: transformContentX, y: transformContentY }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={iconContainerVariants}
            className="mb-6 sm:mb-8 flex justify-center"
          >
            <ShieldCheckIcon className="h-20 w-20 sm:h-24 sm:w-24 text-brand-teal drop-shadow-[0_0_15px_rgba(44,165,141,0.8)]" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight"
            style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}
          >
            <span className="block animate-tracking-in-expand">Ihre Sicherheit.</span>
            <span className="block text-brand-teal animate-text-focus-in ">Unsere Priorität.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto"
          >
            Professionelle Sicherheitslösungen für Unternehmen und Privatpersonen in Deutschland.
            Vertrauen Sie auf Erfahrung und modernste Technologie.
          </motion.p> 

          <motion.div variants={itemVariants}>
            <motion.a
              href="#contact"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="bg-brand-teal text-white font-semibold py-3 px-6 sm:px-8 rounded-lg text-md sm:text-lg shadow-xl hover:shadow-brand-teal/50 transition-all duration-300 inline-block"
            >
              Jetzt Kontakt aufnehmen
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;