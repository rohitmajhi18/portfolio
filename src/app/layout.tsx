import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#161A1F",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://rohitmajhi.in"),
  title: {
    default: "Rohit Majhi | Cybersecurity Analyst & Penetration Tester",
    template: "%s | Rohit Majhi",
  },
  description:
    "Official portfolio of Rohit Majhi — Cybersecurity professional with hands-on experience in Ethical Hacking, Penetration Testing, Vulnerability Assessment, Network Security, and AI-powered Intrusion Detection Systems. Proficient in Python, Kali Linux, Git, Active Directory, Cloud Security, and security risk assessment.",
  applicationName: "Rohit Majhi Portfolio",
  keywords: [
    "Rohit Majhi",
    "Cybersecurity Analyst",
    "Penetration Tester",
    "Ethical Hacker",
    "Network Security",
    "Cloud SOC",
    "Intrusion Detection Systems",
    "NetSentinel AI",
    "AWS SOC",
    "Kali Linux",
    "Vulnerability Assessment",
    "VAPT",
    "Splunk",
    "SIEM",
    "Incident Response",
    "Threat Hunting",
    "Active Directory Security",
    "Parul University",
    "Brainware University",
    "West Bengal Cybersecurity"
  ],
  authors: [{ name: "Rohit Majhi", url: "https://rohitmajhi.in" }],
  creator: "Rohit Majhi",
  publisher: "Rohit Majhi",
  alternates: {
    canonical: "https://rohitmajhi.in",
  },
  icons: {
    icon: [
      { url: "/image/icon.jpg" },
      { url: "/icon.jpg" },
    ],
    apple: "/image/icon.jpg",
    shortcut: "/image/icon.jpg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rohitmajhi.in",
    siteName: "Rohit Majhi Portfolio",
    title: "Rohit Majhi | Cybersecurity Analyst & Penetration Tester",
    description:
      "Official portfolio of Rohit Majhi — Cybersecurity professional with hands-on experience in Ethical Hacking, Penetration Testing, Vulnerability Assessment, Network Security, and AI-powered Intrusion Detection Systems.",
    images: [
      {
        url: "https://rohitmajhi.in/image/icon.jpg",
        width: 512,
        height: 512,
        alt: "Rohit Majhi — Cybersecurity Analyst & Penetration Tester",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohit Majhi | Cybersecurity Analyst & Penetration Tester",
    description:
      "Securing Networks, Cloud Infrastructure & AI-Driven Defense. Hands-on experience in Ethical Hacking, Vulnerability Assessment, AWS SOC, and AI-IDS.",
    images: ["https://rohitmajhi.in/image/icon.jpg"],
    creator: "@rohitmajhi18",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  classification: "Cybersecurity Portfolio & Threat Intelligence Operations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://rohitmajhi.in/#person",
        name: "Rohit Majhi",
        jobTitle: "Cybersecurity Analyst & Penetration Tester",
        description:
          "Cybersecurity Analyst & Penetration Tester specializing in offensive and defensive security operations, Vulnerability Assessment and Penetration Testing (VAPT), network defense, and AI-powered Intrusion Detection Systems.",
        url: "https://rohitmajhi.in/",
        image: "https://rohitmajhi.in/image/icon.jpg",
        email: "mailto:rohit629510@gmail.com",
        telephone: "+916295103573",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Hooghly",
          addressRegion: "West Bengal",
          postalCode: "712405",
          addressCountry: "IN",
        },
        sameAs: [
          "https://github.com/rohitmajhi18",
          "https://linkedin.com/in/rohit-majhi18/",
        ],
        alumniOf: [
          {
            "@type": "EducationalOrganization",
            name: "Parul University",
            description: "M.Sc. Cyber Security Forensic (PICA)",
          },
          {
            "@type": "EducationalOrganization",
            name: "Brainware University",
            description: "B.Sc. Advanced Networking & Cyber Security",
          },
        ],
        knowsAbout: [
          "Penetration Testing",
          "Ethical Hacking",
          "Vulnerability Assessment (VAPT)",
          "Network Security",
          "Intrusion Detection Systems (IDS)",
          "Cloud Security (AWS SOC)",
          "Splunk SIEM",
          "Python Security Automation",
          "Active Directory Hardening"
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://rohitmajhi.in/#website",
        url: "https://rohitmajhi.in/",
        name: "Rohit Majhi — Cybersecurity Operations & Engineering",
        description: "Official portfolio and technical credentials of Rohit Majhi, Cybersecurity Analyst & Penetration Tester.",
        publisher: {
          "@id": "https://rohitmajhi.in/#person",
        },
      },
      {
        "@type": "ProfilePage",
        "@id": "https://rohitmajhi.in/#profilepage",
        url: "https://rohitmajhi.in/",
        name: "Rohit Majhi Security Profile",
        mainEntity: {
          "@id": "https://rohitmajhi.in/#person",
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} light`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
