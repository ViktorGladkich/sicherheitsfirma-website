import React, { useState, useEffect } from 'react';
import { Cookies, getCookieConsentValue, deleteCookie } from "react-cookie-consent"; 
import Script from 'next/script';
import { motion, AnimatePresence } from 'framer-motion';
import CookieSettingsModal from './CookieSettingsModal';
import { COOKIE_CATEGORIES, GA_MEASUREMENT_ID } from '../utils/cookieConstants';

// Функция для установки дефолтных значений Consent Mode
const setDefaultGtagConsent = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    const initialConsent = {
      'analytics_storage': 'denied',
      'ad_storage': 'denied', 
      'ad_user_data': 'denied',
      'ad_personalization': 'denied', 
      'wait_for_update': 500
    };
    window.gtag('consent', 'default', initialConsent);
  }
};

const CookieConsentBanner = () => {
  const [isClient, setIsClient] = useState(false);
  const [showInitialBanner, setShowInitialBanner] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  
  const [consent, setConsent] = useState(() => {
    if (typeof window === 'undefined') {
      const defaults = {};
      Object.values(COOKIE_CATEGORIES).forEach(key => { defaults[key] = false; });
      return defaults;
    }
    const consentCookieString = Cookies.get("siteCookieConsent");
    if (consentCookieString) {
        try { 
            const parsed = JSON.parse(consentCookieString);
            const completeConsent = {};
            Object.values(COOKIE_CATEGORIES).forEach(categoryKey => {
                completeConsent[categoryKey] = parsed[categoryKey] || false;
            });
            return completeConsent;
        } catch (e) { 
            const defaults = {};
            Object.values(COOKIE_CATEGORIES).forEach(key => { defaults[key] = false; });
            return defaults;
        }
    }
    const defaults = {};
    Object.values(COOKIE_CATEGORIES).forEach(key => { defaults[key] = false; });
    return defaults;
  });

  useEffect(() => {
    setIsClient(true); 
    const userMadeChoice = getCookieConsentValue("siteCookieConsent") !== undefined;

    if (!userMadeChoice) {
      setShowInitialBanner(true); 
    } else {
      setShowInitialBanner(false); 
      const storedConsentString = Cookies.get("siteCookieConsent");
      if (storedConsentString) {
          try {
              const parsed = JSON.parse(storedConsentString);
              const completeConsent = {};
                Object.values(COOKIE_CATEGORIES).forEach(categoryKey => {
                    completeConsent[categoryKey] = parsed[categoryKey] || false;
                });
              setConsent(completeConsent);
          } catch (e) {  }
      }
    }
  }, [isClient]);

  useEffect(() => {
    if (isClient && typeof window !== 'undefined' && window.gtag) {
        updateGtagConsentState(consent);
    }
  }, [consent, isClient]);


  const updateGtagConsentState = (newConsent) => {
    if (typeof window !== 'undefined' && window.gtag) {
      const gtagConsent = {
        'analytics_storage': newConsent[COOKIE_CATEGORIES.ANALYTICS] ? 'granted' : 'denied',
      };
      window.gtag('consent', 'update', gtagConsent);
    }
  };

  const saveConsentPreferences = (newPreferences) => {
    const fullConsentState = {};
    Object.values(COOKIE_CATEGORIES).forEach(categoryKey => {
        fullConsentState[categoryKey] = newPreferences[categoryKey] || false;
    });

    Cookies.set("siteCookieConsent", JSON.stringify(fullConsentState), { expires: 150, path: '/' });
    setConsent(fullConsentState); 
    setShowInitialBanner(false);
    setShowSettingsModal(false);
    document.body.style.overflow = ''; 

    if (newPreferences[COOKIE_CATEGORIES.ANALYTICS] && GA_MEASUREMENT_ID && typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
          page_path: window.location.pathname,
          anonymize_ip: true
      });
    } 
    else if (newPreferences[COOKIE_CATEGORIES.ANALYTICS] === false) {
        deleteCookie('_ga', { path: '/', domain: window.location.hostname });
        if (GA_MEASUREMENT_ID) {
            const gaIdSuffix = GA_MEASUREMENT_ID.split('-')[1];
            if (gaIdSuffix) {
              deleteCookie(`_ga_${gaIdSuffix}`, { path: '/', domain: window.location.hostname });
            }
        }
        deleteCookie('_gid', { path: '/', domain: window.location.hostname });
        if (GA_MEASUREMENT_ID) {
          deleteCookie('_gat_gtag_' + GA_MEASUREMENT_ID.replace(/-/g, '_'), { path: '/', domain: window.location.hostname });
          deleteCookie('_gat', { path: '/', domain: window.location.hostname }); // Более общий _gat
        }
    }
  };

  const handleAcceptAll = () => {
    const allAccepted = {};
    Object.values(COOKIE_CATEGORIES).forEach(categoryKey => { allAccepted[categoryKey] = true; });
    saveConsentPreferences(allAccepted);
  };

  const handleOpenSettings = () => {
    setShowInitialBanner(false); 
    setShowSettingsModal(true);
    document.body.style.overflow = 'hidden'; 
  };

  const handleCloseSettingsModal = () => {
    setShowSettingsModal(false);
    document.body.style.overflow = ''; 
    if (getCookieConsentValue("siteCookieConsent") === undefined) { 
        setShowInitialBanner(true);
    }
  };
  
  const bannerVariants = {
    hidden: { y: "100%", opacity: 0.9, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
    visible: { y: "0%", opacity: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.5 } },
  };

  return (
    <>
      {GA_MEASUREMENT_ID && (
        <Script
          id="gtag-base" strategy="afterInteractive" 
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          onLoad={() => {
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function(){dataLayer.push(arguments);};
            window.gtag('js', new Date());
            setDefaultGtagConsent(); 
            
            const storedConsentString = Cookies.get("siteCookieConsent");
            let storedConsentObject = null;
            if (storedConsentString) {
                try { 
                    const parsed = JSON.parse(storedConsentString);
                    storedConsentObject = {};
                    Object.values(COOKIE_CATEGORIES).forEach(categoryKey => {
                        storedConsentObject[categoryKey] = parsed[categoryKey] || false;
                    });
                } catch(e) { }
            }

            if (storedConsentObject) {
                updateGtagConsentState(storedConsentObject);
                if (storedConsentObject[COOKIE_CATEGORIES.ANALYTICS]) {
                    window.gtag('config', GA_MEASUREMENT_ID, { page_path: window.location.pathname, anonymize_ip: true });
                }
            }
          }}
        />
      )}
      <AnimatePresence>
        {isClient && showInitialBanner && (
          <motion.div 
            key="cookieBannerAnimate" 
            variants={bannerVariants} 
            initial="hidden" 
            animate="visible" 
            exit="hidden" 
            className="fixed bottom-0 left-0 right-0 z-[9990] w-full"
          >
            <div className="CookieConsent">
              <div className="CookieConsent_Content">
                Wir verwenden Cookies auf unserer Website, einschließlich Google Analytics, um die Nutzung unserer Webseite zu analysieren und Ihr Nutzererlebnis zu verbessern. 
                Ihre Einwilligung ist freiwillig und kann jederzeit widerrufen werden. 
                Weitere Informationen und Einstellungsmöglichkeiten finden Sie in unserer{" "}
                <a href="/datenschutz" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-teal hover:underline">
                  Datenschutzerklärung
                </a>.
              </div>
              <div className="CookieConsent_Actions">
                  <button 
                  onClick={handleAcceptAll} 
                  className="text-white bg-brand-teal text-sm font-semibold rounded-md px-5 py-2.5 hover:bg-brand-teal/85 active:bg-brand-teal/95 transition-colors min-w-[140px] text-center"
                >
                  Alle akzeptieren
                </button>
                <button 
                  onClick={handleOpenSettings} 
                  className="text-slate-300 bg-slate-700 hover:bg-slate-600 text-sm font-medium rounded-md px-5 py-2.5 transition-colors min-w-[120px] text-center"
                >
                  Einstellungen
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isClient && showSettingsModal && (
        <CookieSettingsModal 
          currentConsent={consent} 
          onSave={saveConsentPreferences} 
          onClose={handleCloseSettingsModal} 
        />
      )}
    </>
  );
};

export default CookieConsentBanner;