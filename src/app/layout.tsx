import type { Metadata } from 'next';
import { Oswald, Inter } from 'next/font/google';
import './globals.css';
import { portfolioData } from '@/lib/portfolio';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const oswald = Oswald({
  variable: '--font-oswald',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(portfolioData.seo.siteUrl),
  title: {
    default: portfolioData.seo.title,
    template: `%s | ${portfolioData.profile.name}`,
  },
  description: portfolioData.seo.description,
  keywords: portfolioData.seo.keywords,
  authors: [{ name: portfolioData.seo.author, url: portfolioData.seo.siteUrl }],
  creator: portfolioData.seo.author,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: portfolioData.seo.siteUrl,
    title: portfolioData.seo.title,
    description: portfolioData.seo.description,
    siteName: `${portfolioData.profile.name} Portfolio`,
    images: [
      {
        url: portfolioData.seo.ogImage,
        width: 560,
        height: 600,
        alt: portfolioData.profile.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: portfolioData.seo.title,
    description: portfolioData.seo.description,
    creator: portfolioData.seo.twitterHandle,
    images: [portfolioData.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: portfolioData.seo.siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The font variables must live on <html> (:root) so the @theme tokens in
    // globals.css can resolve them; declaring them on <body> silently breaks them.
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="font-sans flex min-h-screen flex-col bg-page text-ink">
        <Navbar navLinks={portfolioData.navLinks} navActions={portfolioData.navActions} />
        <main className="flex-1">{children}</main>
        <Footer socials={portfolioData.socials} copyright={portfolioData.footer.copyright} />
      </body>
    </html>
  );
}
