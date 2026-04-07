
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
      { url: '/images/berrybby_logo.jpeg', sizes: 'any' },
    ],
    shortcut: '/images/berrybby_logo.jpeg',
    apple: '/images/berrybby_logo.jpeg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
