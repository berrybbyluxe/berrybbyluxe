import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BackToTopButton } from '@/components/back-to-top-button';
import { WhatsAppButton } from '@/components/whatsapp-button';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Berrybby Luxury Lighting & Furnishing',
  description: 'Exquisite furniture and premium lighting for your modern home.',
  icons: {
    icon: [
      { url: '/images/berrybby_logo.jpeg?v=1', type: 'image/jpeg' },
      { url: '/images/berrybby_logo.jpeg?v=1', sizes: '32x32', type: 'image/jpeg' },
    ],
    shortcut: '/images/berrybby_logo.jpeg?v=1',
    apple: '/images/berrybby_logo.jpeg?v=1',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased flex flex-col')} suppressHydrationWarning>
        {/* Google Analytics tracking code */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Q9022R8581"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-Q9022R8581');
          `}
        </Script>

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
