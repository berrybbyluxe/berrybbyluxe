
import * as React from 'react';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Info, MapPin, Phone, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Berrybby Luxury | Inquiries & Showroom Lagos',
  description: 'Contact Berrybby Luxury for premium lighting and furniture orders. Visit our Lagos showroom or reach out via WhatsApp for nationwide delivery inquiries.',
};

export default function ContactPage() {
  const contactInfo = [
    {
      title: 'Call Our Experts',
      value: '09063927855',
      icon: Phone,
      href: 'tel:+2349063927855',
    },
    {
      title: 'Email Support',
      value: 'berrybbyluxe@gmail.com',
      icon: Mail,
      href: 'mailto:berrybbyluxe@gmail.com',
    },
    {
      title: 'Visit Our Showroom',
      value: '4A, Victor Olaleye Street, Rogo Ishaga, Lagos State',
      icon: MapPin,
      href: '#',
    },
  ];

  return (
    <div className="flex flex-col min-h-[70vh]">
      <section className="py-16 md:py-24 bg-muted/30 flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6">Contact Berrybby Luxury</h1>
            <p className="text-xl text-muted-foreground">We'd love to hear from you. Reach out for bespoke luxury lighting or furniture requests.</p>
            <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="flex flex-col items-center p-10 bg-background rounded-xl shadow-sm text-center border border-muted">
                <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                  <info.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-headline text-2xl font-bold mb-3">{info.title}</h3>
                <a href={info.href} className="text-lg text-muted-foreground hover:text-primary transition-colors">
                  {info.value}
                </a>
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <h2 className="text-2xl font-headline font-bold mb-6">Instant Ordering via WhatsApp</h2>
            <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white h-16 px-10 text-xl font-bold rounded-full shadow-lg">
              <a href="https://wa.me/2349063927855" target="_blank" rel="noopener noreferrer">
                Chat with an Expert Now
              </a>
            </Button>
            <p className="mt-4 text-muted-foreground">Available Monday - Saturday, 9am - 6pm</p>
          </div>
        </div>
      </section>
    </div>
  );
}
