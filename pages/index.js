import Head from "next/head";
import { useState, useEffect, useCallback } from "react"; // Добавил useCallback

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import BackToTopButton from "../components/BackToTopButton";
import SectionObserver from "../components/SectionObserver";

const SECTION_DEFINITIONS = [
  {
    id: "home",
    threshold: 0.4,
    component: <Hero />,
    rootMargin: "-30% 0px -30% 0px",
  },
  { id: "services", threshold: 0.3, component: <Services /> },
  { id: "stats", threshold: 0.4, component: <Stats /> },
  { id: "about", threshold: 0.3, component: <About /> },
  { id: "testimonials", threshold: 0.3, component: <Testimonials /> },
  { id: "contact", threshold: 0.2, component: <Contact /> },
];

export default function HomePage() {
  
  const siteTitle =
    "Axma Sicherheitsdienst - Ihr Partner für Sicherheit in Dresden";
  const siteDescription =
    "Professionelle Sicherheitslösungen von Axma: Objektschutz, Veranstaltungsschutz, Personenschutz und mehr. Vertrauen Sie auf Erfahrung und Kompetenz für Ihre Sicherheit.";
  const siteUrl = "https://sicherheitsfirma-website.vercel.app";
  const siteImage = `${siteUrl}/images/LogotipAxma.webp`;

  const [activeSection, setActiveSection] = useState(
    SECTION_DEFINITIONS[0]?.id || ""
  );

  const [sectionsVisibility, setSectionsVisibility] = useState(
    SECTION_DEFINITIONS.reduce((acc, section) => {
      acc[section.id] = false;
      return acc;
    }, {})
  );

  const handleInViewChange = useCallback((id, inView) => {
    setSectionsVisibility((prev) => {
      if (prev[id] !== inView) {
        return { ...prev, [id]: inView };
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    let currentActive = "";
    let highestVisibleSectionY = Infinity;

    const hash = window.location.hash.substring(1);
    if (hash && sectionsVisibility[hash]) {
      currentActive = hash;
    } else {
      for (const sectionDef of SECTION_DEFINITIONS) {
        if (sectionsVisibility[sectionDef.id]) {
          currentActive = sectionDef.id;
          break;
        }
      }
    }

    if (currentActive && activeSection !== currentActive) {
      setActiveSection(currentActive);
    } else if (
      !currentActive &&
      window.scrollY < window.innerHeight * 0.3 &&
      SECTION_DEFINITIONS.length > 0
    ) {
      if (activeSection !== SECTION_DEFINITIONS[0].id) {
        setActiveSection(SECTION_DEFINITIONS[0].id);
      }
    }
  }, [sectionsVisibility, activeSection]);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash && SECTION_DEFINITIONS.some((s) => s.id === hash)) {
      setActiveSection(hash);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          const navbarHeight =
            document.querySelector("nav")?.offsetHeight || 100; 
          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight - 20; 

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 150);
    }
  }, []);

  const handleNavItemClick = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = document.querySelector("nav")?.offsetHeight || 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Axma Sicherheitsdienst",
    image: siteImage,
    "@id": siteUrl,
    url: siteUrl,
    telephone: "+491234567890",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Musterstraße 123",
      addressLocality: "Dresden",
      postalCode: "01067",
      addressCountry: "DE",
    },
    description: siteDescription,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:00",
      },
    ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: "51.076717",
      longitude: "13.607778",
    },
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={siteImage} />
        <meta property="og:locale" content="de_DE" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={siteUrl} />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={siteImage} />
        <link rel="canonical" href={siteUrl} />
        <meta
          name="keywords"
          content="sicherheitsdienst dresden, objektschutz dresden, veranstaltungsschutz dresden, personenschutz dresden, axma security"
        />
      </Head>

      <Navbar
        activeSectionId={activeSection}
        onNavItemClick={handleNavItemClick}
      />

      <main>
        {SECTION_DEFINITIONS.map((section) => (
          <SectionObserver
            key={section.id}
            id={section.id}
            onInViewChange={handleInViewChange}
            threshold={section.threshold}
            rootMargin={section.rootMargin}
          >
            {section.component}
          </SectionObserver>
        ))}
      </main>

      <Footer />
      <BackToTopButton />
    </>
  );
}
