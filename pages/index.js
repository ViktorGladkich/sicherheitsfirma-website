// pages/index.js
import Head from "next/head";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "@/components/Services";
import Stats from '../components/Stats';
import About from "../components/About";
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact'; 
import Footer from '../components/Footer';
import BackToTopButton from '../components/BackToTopButton';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>
          Sicherheitsfirma Adlerauge - Ihre Sicherheit ist unsere Priorität
        </title>
        <meta
          name="description"
          content="Professionelle Sicherheitsdienste in Deutschland. Objektschutz, Veranstaltungsschutz, Personenschutz und mehr."
        />
        <link rel="icon" href="/favicon.ico" />{" "}
        {/* Замените на свою иконку favicon */}
      </Head>

      <Navbar />

      <main>
        <Hero />
        <Services />
        <Stats />
        <About />
        <Testimonials />
        <Contact />
      </main>

       <Footer /> 
      <BackToTopButton/>
    </>
  );
}
