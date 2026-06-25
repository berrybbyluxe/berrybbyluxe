
import * as React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Inspiration Lookbook | Berrybby Luxe Living',
  description: 'Curated architectural interior visions. Explore how Berrybby Luxe Living pieces transform distinguished modern spaces.',
};

export default function LookbookPage() {
  const lookbookItems = [
    {
      id: 1,
      title: 'Monolith Sanctuary',
      description: 'The interplay of dark walnut and K9 crystal in a brutalist living environment.',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?fm=avif&fit=crop&q=80&w=1200',
    },
    {
      id: 2,
      title: 'Ethereal Dining',
      description: 'Grand-scale chandeliers floating above minimalist Italian dining surfaces.',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?fm=avif&fit=crop&q=80&w=1200',
    },
    {
      id: 3,
      title: 'Architectural Rest',
      description: 'Bespoke bedroom suites designed for visual silence and human warmth.',
      image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?fm=avif&fit=crop&q=80&w=1200',
    },
  ];

  return (
    <div className="flex flex-col bg-background">
      <section className="pt-48 pb-32 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl space-y-8">
            <span className="text-[10px] uppercase tracking-[0.6em] text-primary font-bold">Vol. 01</span>
            <h1 className="text-6xl md:text-9xl font-headline font-light italic leading-none">Visions of <br/> Permanent <br/> Grace</h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl">
              Our lookbook is a collection of architectural intersections where light meets form. Explore curated atmospheres designed for the modern distinguished home.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-48 px-4">
        <div className="container mx-auto space-y-48">
          {lookbookItems.map((item, index) => (
            <div key={item.id} className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={`lg:col-span-8 ${index % 2 === 1 ? 'lg:order-2' : ''} relative aspect-video overflow-hidden bg-muted`}>
                <Image 
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className={`lg:col-span-4 ${index % 2 === 1 ? 'lg:order-1' : ''} space-y-8`}>
                <h2 className="text-4xl md:text-6xl font-headline font-light">{item.title}</h2>
                <p className="text-muted-foreground text-lg font-light leading-relaxed">
                  {item.description}
                </p>
                <Link href="/products" className="inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-bold group">
                  Explore items in this look
                  <div className="w-8 h-[1px] bg-foreground transition-all group-hover:w-16" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
