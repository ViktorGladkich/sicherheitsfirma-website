// pages/datenschutz.js
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DatenschutzPage() {
  const pageTitle = "Datenschutzerklärung - Axma Sicherheitsdienst";
  const siteUrl = "https://sicherheitsfirma-website.vercel.app/datenschutz";
  return (
    <>
      <Head>
      <title>{pageTitle}</title>
      <meta name="robots" content="noindex, follow" />
      <link rel="canonical" href={siteUrl} />
      </Head>
      <Navbar />
      <main className="pt-24 pb-12 bg-brand-lightGray min-h-screen">
        <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-4xl font-extrabold text-brand-blue mb-8 border-b pb-4">Datenschutzerklärung</h1>
          
          <div className="space-y-6 text-brand-darkGray leading-relaxed">
            {/* 
              Здесь должен быть ПОДРОБНЫЙ текст вашей политики конфиденциальности.
              Он должен соответствовать GDPR (DSGVO). 
              Основные пункты, которые должны быть освещены:
              1.  Имя и контактные данные ответственного лица (Verantwortlicher).
              2.  Контактные данные уполномоченного по защите данных (Datenschutzbeauftragter), если есть.
              3.  Цели обработки персональных данных и правовые основания.
              4.  Категории обрабатываемых персональных данных (например, контактные данные при использовании формы, IP-адреса, Cookies).
              5.  Получатели или категории получателей персональных данных (например, хостинг-провайдер, аналитические службы).
              6.  Передача данных в третьи страны (если применимо).
              7.  Сроки хранения данных.
              8.  Права субъектов данных (право на информацию, исправление, удаление, ограничение обработки, возражение, переносимость данных, отзыв согласия, жалоба в надзорный орган).
              9.  Информация об использовании Cookies.
              10. Информация об использовании инструментов анализа (например, Google Analytics, если используете).
              11. Информация об использовании плагинов социальных сетей (если используете).
              12. Шифрование SSL/TLS.
              
              Настоятельно рекомендуется использовать актуальный шаблон от юриста или надежного генератора (например, eRecht24, activeMind).
              Ниже приведен очень УПРОЩЕННЫЙ пример структуры. НЕ ИСПОЛЬЗУЙТЕ ЕГО В ПРОДАШЕНЕ БЕЗ ДОРАБОТКИ!
            */}
            <section>
              <h2 className="text-2xl font-semibold text-brand-blue mb-3">1. Allgemeines</h2>
              <p>
                Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TMG). In diesen Datenschutzinformationen informieren wir Sie über die wichtigsten Aspekte der Datenverarbeitung im Rahmen unserer Website.
              </p>
              <p>Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:</p>
              <p>
                <strong>[Полное название вашей фирмы]</strong><br />
                [Адрес]<br />
                [E-Mail]<br />
                [Телефон]
              </p>
              {/* <p>Unseren Datenschutzbeauftragten erreichen Sie unter: [Kontaktdaten Datenschutzbeauftragter, falls vorhanden]</p> */}
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-brand-blue mb-3">2. Ihre Rechte</h2>
              <p>
                Ihnen stehen grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch zu. Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt oder Ihre datenschutzrechtlichen Ansprüche sonst in einer Weise verletzt worden sind, können Sie sich bei der Aufsichtsbehörde beschweren. In Deutschland sind dies die Landesdatenschutzbehörden.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-brand-blue mb-3">3. Erhebung und Verarbeitung von Daten</h2>
              <h3 className="text-xl font-medium text-brand-blue mt-4 mb-2">a) Server-Log-Dateien</h3>
              <p>
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. f DSGVO, der die Verarbeitung von Daten zur Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen gestattet, sowie unser berechtigtes Interesse an der technisch fehlerfreien Darstellung und Optimierung unserer Website.
              </p>
              <h3 className="text-xl font-medium text-brand-blue mt-4 mb-2">b) Kontaktformular</h3>
              <p>
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Die Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt somit ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie können diese Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitungsvorgänge bleibt vom Widerruf unberührt. Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z.B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.
              </p>
               <h3 className="text-xl font-medium text-brand-blue mt-4 mb-2">c) Cookies</h3>
              <p>
                Unsere Webseite verwendet sogenannte Cookies. Dabei handelt es sich um kleine Textdateien, die mit Hilfe des Browsers auf Ihrem Endgerät abgelegt werden. Sie richten keinen Schaden an. Wir nutzen Cookies dazu, unser Angebot nutzerfreundlich zu gestalten. Einige Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese löschen. Sie ermöglichen es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen. Wenn Sie dies nicht wünschen, so können Sie Ihren Browser so einrichten, dass er Sie über das Setzen von Cookies informiert und Sie dies nur im Einzelfall erlauben. Bei der Deaktivierung von Cookies kann die Funktionalität unserer Website eingeschränkt sein.
                {/* Здесь нужно уточнить, какие именно Cookies используются (технически необходимые, аналитические, маркетинговые) и как получить согласие (Cookie Banner). Framer Motion или Next.js сами по себе не ставят много cookies, но если вы добавите аналитику, это изменится. */}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-brand-blue mb-3">4. SSL- bzw. TLS-Verschlüsselung</h2>
              <p>
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL-bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von “http://” auf “https://” wechselt und an dem Schloss-Symbol in Ihrer Browserzeile. Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
              </p>
            </section>
            
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}