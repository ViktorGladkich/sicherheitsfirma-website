import '../styles/globals.css';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Preloader from '../components/Preloader';     

function MyApp({ Component, pageProps, router }) {
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 2800); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait"> 
      {isPageLoading ? (
        <Preloader key="pageLoader" isLoadingPage={true} /> 
      ) : (
        <motion.div 
          key="pageContent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.1 } }} 
        >
          <Component {...pageProps} key={router.asPath} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MyApp;