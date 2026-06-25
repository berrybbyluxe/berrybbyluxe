
import * as React from 'react';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Truck, Wrench } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Services | Professional Chandelier Installation & Consultation Lagos',
  description: 'Expert interior lighting consultation, professional chandelier installation, and secure nationwide delivery across Nigeria. Trust Berrybby Luxury for your home.',
};

export default function ServicesPage() {
  const services = [
    {
      title: 'Interior Lighting Consultation',
      description: 'Expert advice on choosing the perfect crystal chandeliers and furniture to match your Lagos home\'s unique style.',
      icon: Info,
    },
    {
      title: 'Professional Chandelier Installation',
      description: 'Safe and precise installation for all high-end lighting fixtures by our team of experienced professionals across Nigeria.',
      icon: Wrench,
    },
    {
      title: 'Nationwide Secure Delivery',
      description: 'We deliver our luxury pieces right to your doorstep, anywhere in Nigeria, with maximum care for fragile lighting items.',
      icon: Truck,
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6">Our Premium Services</h1>
            <p className="text-xl text-muted-foreground">Interior Excellence & Expert Installation in Nigeria</p>
            <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow bg-muted/20">
                <CardHeader className="text-center pt-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center pb-8">
                  <p className="text-muted-foreground text-lg leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-headline font-bold mb-6">Ready to transform your space?</h2>
          <p className="text-lg text-muted-foreground mb-8">Contact our experts today for a personalized consultation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/2349063927855" 
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-lg font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get a Quote
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
