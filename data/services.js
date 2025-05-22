import {
  BuildingOffice2Icon,
  UserGroupIcon,
  ShieldExclamationIcon,
  ShieldCheckIcon,
  ClockIcon,
  VideoCameraIcon as DetailVideoIcon,
  UsersIcon as DetailUsersIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";

export const servicesData = [
  {
    id: "objektschutz",
    icon: BuildingOffice2Icon,
    title: "Objektschutz",
    description:
      "Zuverlässiger Schutz für Ihre Immobilien, Firmengelände und Baustellen.",
    details: [
      {
        type: "paragraph",
        content:
          "Unser Objektschutz umfasst eine umfassende Risikoanalyse, die Erstellung maßgeschneiderter Sicherheitskonzepte und den Einsatz qualifizierter Sicherheitskräfte. Wir sichern sowohl private als auch gewerbliche Objekte, Produktionsstätten, Lagerhallen und Baustellen durch Patrouillen, Zugangskontrollen und modernste Überwachungstechnik. Ziel ist die Prävention von Diebstahl, Vandalismus und unbefugtem Zutritt.",
      },
      { type: "heading", content: "Unsere Leistungen im Detail:" },
      {
        type: "listItem",
        icon: ClockIcon,
        content: "24/7 Besetzung und Überwachung",
      },
      {
        type: "listItem",
        icon: DetailVideoIcon,
        content: "Installation und Wartung von Überwachungssystemen",
      },
      {
        type: "listItem",
        icon: DetailUsersIcon,
        content: "Professionelle Zugangskontrollen und Pfortendienste",
      },
      {
        type: "listItem",
        icon: ListBulletIcon,
        content: "Regelmäßige Streifengänge und Zustandskontrollen",
      },
    ],
    image: "/images/services/objekschutz.png",
  },
  {
    id: "veranstaltungsschutz",
    icon: UserGroupIcon,
    title: "Veranstaltungsschutz",
    description:
      "Sicherheit und reibungsloser Ablauf für Ihre Events, Konzerte und Messen.",
    details: [
      {
        type: "paragraph",
        content:
          "Wir gewährleisten die Sicherheit Ihrer Veranstaltung von der Planung bis zur Durchführung. Unsere Leistungen umfassen Einlasskontrollen, Crowd Management, Bühnen- und Backstage-Sicherheit sowie den Schutz von VIP-Gästen.",
      },
      {
        type: "paragraph",
        content:
          "Jedes Konzept wird individuell auf die Art und Größe Ihrer Veranstaltung zugeschnitten, um einen störungsfreien und sicheren Ablauf zu garantieren.",
      },
      { type: "heading", content: "Geeignet für:" },
      {
        type: "listItem",
        icon: DetailUsersIcon,
        content: "Konzerte, Festivals und öffentliche Feiern",
      },
      {
        type: "listItem",
        icon: BuildingOffice2Icon,
        content: "Messen, Kongresse und Firmenveranstaltungen",
      },
      {
        type: "listItem",
        icon: ShieldCheckIcon,
        content: "Private Feiern und VIP-Events",
      },
    ],
    image: "/images/services/veranstaltungsschutz.jpg",
  },
  {
    id: "personenschutz",
    icon: ShieldExclamationIcon,
    title: "Personenschutz",
    description:
      "Diskreter und professioneller Schutz für Privatpersonen und VIPs.",
    details: [
      {
        type: "paragraph",
        content:
          "Unser professionelles Personenschutzteam bietet diskreten und effektiven Schutz für gefährdete Personen, Geschäftsleute und Prominente. Wir erstellen individuelle Schutzkonzepte basierend auf einer detaillierten Gefährdungsanalyse.",
      },
      {
        type: "paragraph",
        content:
          "Unsere Mitarbeiter begleiten Sie sicher im Alltag, auf Reisen oder bei öffentlichen Auftritten. Ihre Sicherheit und Privatsphäre haben oberste Priorität.",
      },
    ],
    image: "/images/services/personenschutz.png",
  },
  {
    id: "fluechtlingsunterkuenfte",
    icon: ShieldCheckIcon,
    title: "Sicherheit für Flüchtlingsunterkünfte",
    description:
      "Gewährleistung von Sicherheit und Ordnung in Unterkünften für Geflüchtete.",
    details: [
      {
        type: "paragraph",
        content:
          "Wir bieten spezialisierte Sicherheitsdienste für Flüchtlingsunterkünfte, die sowohl den Schutz der Bewohner als auch die Aufrechterhaltung von Ordnung und Sicherheit gewährleisten.",
      },
      {
        type: "paragraph",
        content:
          "Unsere geschulten Mitarbeiter agieren sensibel und deeskalierend, führen Zugangskontrollen durch, übernehmen Patrouillendienste und unterstützen bei der Konfliktprävention und -lösung. Wir arbeiten eng mit Betreibern und Behörden zusammen.",
      },
      { type: "heading", content: "Schwerpunkte unserer Arbeit:" },
      {
        type: "listItem",
        icon: DetailUsersIcon,
        content: "Konfliktmanagement und Deeskalation",
      },
      {
        type: "listItem",
        icon: BuildingOffice2Icon,
        content: "Objektsicherung und Zugangskontrolle",
      },
      {
        type: "listItem",
        icon: ClockIcon,
        content: "Nachtwachen und regelmäßige Kontrollgänge",
      },
    ],
    image: "/images/services/fluchtlings.jpg",
  },
];
