
import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BackToTopButton } from '@/components/back-to-top-button';
import { WhatsAppButton } from '@/components/whatsapp-button';
import './globals.css';

const DOMAIN = 'https://berrybbyluxe.com';
const HERO_IMAGE = `${DOMAIN}/images/products/Hero/berrybby-luxury-lighting-and-furniture-hero-picture.avif`;

export const metadata: Metadata = {
  title: {
    default: 'Berrybby Luxe Living | Architectural Lighting & Premium Furnishing',
    template: '%s | Berrybby Luxe Living'
  },
  description: 'Immersive luxury interiors. Shop architectural lighting, modern Turkish collections, and bespoke crystal chandeliers for distinguished Nigerian residences.',
  keywords: [
    'Berrybby Luxe Living',
    'luxury interiors Lagos',
    'architectural lighting Nigeria',
    'modern furniture showroom',
    'premium home decor Lagos',
    'bespoke chandeliers Nigeria',
    'high-end crystal lighting',
    'modern Turkish furniture Lagos'
  ],
  alternates: {
    canonical: DOMAIN,
  },
  openGraph: {
    title: 'Berrybby Luxe Living | The Art of Modern Living',
    description: 'Cinematic furniture and lighting for high-end Nigerian homes.',
    url: DOMAIN,
    siteName: 'Berrybby Luxe Living',
    locale: 'en_NG',
    type: 'website',
    images: [{ url: HERO_IMAGE, width: 1200, height: 630, alt: 'Berrybby Luxe Living' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Berrybby Luxe Living',
    description: 'Cinematic furniture and lighting for high-end Nigerian homes.',
    images: [HERO_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${DOMAIN}/#business`,
        "name": "Berrybby Luxe Living",
        "image": HERO_IMAGE,
        "logo": `${DOMAIN}/images/products/Brand/berrybby-logo.avif`,
        "url": DOMAIN,
        "telephone": "+2349063927855",
        "priceRange": "₦₦₦",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "4A, Victor Olaleye Street, Rogo Ishaga",
          "addressLocality": "Lagos",
          "addressRegion": "Lagos State",
          "postalCode": "100212",
          "addressCountry": "NG"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "6.6018",
          "longitude": "3.3515"
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:00",
            "closes": "18:00"
          }
        ],
        "sameAs": [
          "https://www.instagram.com/berrybbyluxecollection/",
          "https://www.tiktok.com/@berrybbyluxecollection",
          "https://web.facebook.com/profile.php?id=61557486325687"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${DOMAIN}/#website`,
        "url": DOMAIN,
        "name": "Berrybby Luxe Living",
        "publisher": { "@id": `${DOMAIN}/#business` },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${DOMAIN}/products?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@100..900&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      </head>
      <body suppressHydrationWarning className={cn('min-h-screen bg-background font-body antialiased flex flex-col selection:bg-primary/30')}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <BackToTopButton />
        <WhatsAppButton />
        <Toaster />
      </body>
    </html>
  );
}
