import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { PageTransition } from "@/components/layout/PageTransition";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Cursor } from "@/components/ui/Cursor";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-dmsans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "creative technology agency",
    "digital transformation",
    "web development",
    "ERP systems",
    "UI/UX design",
    "brand identity",
    "digital marketing",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#182D4C",
  width: "device-width",
  initialScale: 1,
};

/**
 * Adds `html.anim` before first paint unless the user prefers reduced motion.
 * Fail-safe: if scripts never run (blocked, slow, errored) the flag is removed
 * after 4s so content is never left hidden.
 */
const animFlag = `try{document.documentElement.classList.add('anim');setTimeout(function(){if(!document.documentElement.dataset.motion)document.documentElement.classList.remove('anim')},4000)}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: animFlag }} />
      </head>
      <body className="min-h-svh antialiased">
        <a
          href="#main"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-champagne px-5 py-3 text-sm font-semibold text-navy focus:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <PageTransition>
            <ScrollProgress />
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <Cursor />
          </PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
