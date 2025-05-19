import Head from 'next/head';
import { useRef, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import BackToTopButton from '../components/BackToTopButton';

const SECTION_DEFINITIONS = [
  { id: 'home', threshold: 0.5 }, 
  { id: 'services', threshold: 0.3 },
  { id: 'about', threshold: 0.3 },
  { id: 'stats', threshold: 0.4 },
  { id: 'testimonials', threshold: 0.3 },
  { id: 'contact', threshold: 0.2 }
];

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('home'); 

  const sectionRefs = useRef({}); 
  const sectionsInViewData = SECTION_DEFINITIONS.map(section => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [ref, inView] = useInView({
      threshold: section.threshold,
    });
    sectionRefs.current[section.id] = ref; 
    return { id: section.id, inView };
  });
  
  useEffect(() => {
    let currentActive = '';
    for (const section of sectionsInViewData) {
      if (section.inView) {
        currentActive = section.id;
        break; 
      }
    }
    if (currentActive && activeSection !== currentActive) {
      setActiveSection(currentActive);
    }
  }, [sectionsInViewData, activeSection]); 
  
  const handleNavItemClick = (sectionId) => {
    setActiveSection(sectionId);
  };

  return (
    <>
      <Head>
        <title>Sicherheitsfirma Adlerauge - Ihre Sicherheit ist unsere Priorität</title>
        <meta name="description" content="Professionelle Sicherheitsdienste in Deutschland. Objektschutz, Veranstaltungsschutz, Personenschutz und mehr." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar activeSectionId={activeSection} onNavItemClick={handleNavItemClick} />
      
      <main>
        {/* Оборачиваем каждую секцию в div и передаем ref */}
        <article ref={sectionRefs.current.home} id="home"><Hero /></article>
        <article ref={sectionRefs.current.services} id="services"><Services /></article>
        <article ref={sectionRefs.current.stats} id="stats"><Stats /></article>
        <article ref={sectionRefs.current.about} id="about"><About /></article>
        <article ref={sectionRefs.current.testimonials} id="testimonials"><Testimonials /></article>
        <article ref={sectionRefs.current.contact} id="contact"><Contact /></article>
      </main>

      <Footer />
      <BackToTopButton />
    </>
  );
}