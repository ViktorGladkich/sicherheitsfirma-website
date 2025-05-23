// pages/datenschutz.js
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link'; // Для внутренних ссылок

export default function DatenschutzPage() {
  // Функция для открытия настроек куки (та же, что и в футере)
  const handleOpenCookieSettings = () => {
    if (typeof document !== 'undefined') {
      document.cookie = "siteCookieConsent=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
      window.location.reload();
    }
  };

  return (
    <>
      <Head>
        <title>Datenschutzerklärung - Sicherheitsfirma Adlerauge</title>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <Navbar /> {/* Navbar будет непрозрачным здесь */}
      <main className="pt-24 pb-12 bg-brand-lightGray min-h-screen">
        <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-blue mb-8 border-b pb-4">Datenschutzerklärung</h1>
          
          <div className="prose prose-slate lg:prose-lg max-w-none text-brand-darkGray leading-relaxed">
            {/* Общие положения о защите данных, ответственный и т.д. - это у вас уже должно быть */}
            <p>Wir legen größten Wert auf den Schutz Ihrer Daten und die Wahrung Ihrer Privatsphäre. Nachstehend informieren wir Sie gemäß Art. 13 Datenschutzgrundverordnung (DSGVO) über die Erhebung und Verarbeitung personenbezogener Daten bei Nutzung unserer Webseite.</p>
            
            <h2>Verantwortlicher</h2>
            <p>
              [Полное название вашей фирмы]<br />
              [Адрес]<br />
              [Email]<br />
              [Телефон]<br />
              (Im Folgenden wir oder uns)
            </p>

            {/* ... (другие стандартные разделы: Ihre Rechte, Datenlöschung и т.д.) ... */}

            <h2>Cookies</h2>
            <p>Unsere Webseite verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden und die Ihr Browser speichert. Sie dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Die meisten der von uns verwendeten Cookies sind so genannte „Session-Cookies“. Sie werden nach Ende Ihres Besuchs automatisch gelöscht. Andere Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese löschen. Diese Cookies ermöglichen es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen.</p>
            <p>Wir unterscheiden zwischen technisch notwendigen Cookies, die für den grundlegenden Betrieb der Webseite erforderlich sind, und optionalen Cookies (z.B. für Statistik- und Analysezwecke).</p>
            <p>Beim ersten Besuch unserer Webseite werden Sie über einen Cookie-Banner um Ihre Einwilligung zur Verwendung von optionalen Cookies gebeten. Technisch notwendige Cookies werden auch ohne Ihre explizite Einwilligung gesetzt, da sie für die Funktionalität der Seite unerlässlich sind. Ihre Einwilligung für optionale Cookies können Sie jederzeit mit Wirkung für die Zukunft widerrufen oder Ihre Einstellungen anpassen. Nutzen Sie hierfür bitte folgenden Link:</p>
            <p>
              <button onClick={handleOpenCookieSettings} className="text-brand-teal hover:underline focus:outline-none font-medium">
                Cookie-Einstellungen ändern
              </button>
            </p>
            <p>Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.</p>
            <p>Rechtsgrundlage für die Verarbeitung personenbezogener Daten mittels technisch notwendiger Cookies ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse). Rechtsgrundlage für die Verarbeitung personenbezogener Daten mittels optionaler Cookies ist Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.</p>

            <h2>Google Analytics (mit Google Consent Mode)</h2>
            <p>Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland („Google“), sofern Sie uns hierzu Ihre Einwilligung erteilt haben.</p>
            <p>Google Analytics verwendet Cookies, die eine Analyse der Benutzung der Website durch Sie ermöglichen. Die durch das Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Wir haben auf dieser Webseite die IP-Anonymisierung aktiviert. Dadurch wird Ihre IP-Adresse von Google innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum vor der Übermittlung in die USA gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den USA übertragen und dort gekürzt. Im Auftrag des Betreibers dieser Website wird Google diese Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um Reports über die Websiteaktivitäten zusammenzustellen und um weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen gegenüber dem Websitebetreiber zu erbringen.</p>
            <p>Wir nutzen Google Analytics in Verbindung mit dem Google Consent Mode. Dieser Modus ermöglicht es uns, das Verhalten von Google Analytics basierend auf Ihrer Cookie-Einwilligung anzupassen. Wenn Sie Cookies für Statistikzwecke nicht zustimmen, werden von Google Analytics nur aggregierte und anonymisierte Daten (sogenannte Cookieless Pings) erhoben, um grundlegende Messungen und Modellierungen durchzuführen, ohne dass personenbezogene Cookies gesetzt oder ausgelesen werden.</p>
            <p>Die im Rahmen von Google Analytics von Ihrem Browser übermittelte IP-Adresse wird nicht mit anderen Daten von Google zusammengeführt. Die Rechtsgrundlage für den Einsatz von Google Analytics ist Ihre Einwilligung gemäß Art. 6 Abs. 1 S. 1 lit. a DSGVO. Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie Ihre <button onClick={handleOpenCookieSettings} className="text-brand-teal hover:underline focus:outline-none font-medium">Cookie-Einstellungen</button> ändern.</p>
            <p>Weitere Informationen zum Datenschutz im Zusammenhang mit Google Analytics finden Sie etwa in der Google Analytics-Hilfe <a href="https://support.google.com/analytics/answer/6004245?hl=de" target="_blank" rel="noopener noreferrer" className="text-brand-teal hover:underline">Support-Google-Analytics</a>.</p>
            <p>Wir haben mit Google einen Vertrag zur Auftragsverarbeitung abgeschlossen und setzen die strengen Vorgaben der deutschen Datenschutzbehörden bei der Nutzung von Google Analytics vollständig um.</p>
            
            {/* ... другие разделы, если нужны (контактная форма, серверные лог-файлы и т.д.) ... */}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}