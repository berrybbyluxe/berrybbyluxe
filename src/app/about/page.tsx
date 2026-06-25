
import * as React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Info, Wrench } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Berrybby Luxury | Premier Lighting & Furniture in Lagos',
  description: 'Learn about Berrybby Luxury, Nigeria\'s leading provider of high-end crystal chandeliers and modern designer furniture. Our mission is to bring elegance to every home.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <section className="py-16 md:py-24 bg-muted/30 pt-32 lg:pt-44">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6">About Berrybby Luxury</h1>
            <p className="text-xl text-muted-foreground">Leading Lighting & Furniture Provider in Nigeria</p>
            <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?crop=entropy&cs=tinysrgb&fit=max&fm=avif&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxsaXZpbmclMjByb29tJTIwaW50ZXJpb3J8ZW58MHx8fHwxNzcxMjE5OTU0fDA&ixlib.rb-4.1.0&q=80&w=1080"
                alt="Exquisite living room showcasing Berrybby Luxury lighting and furniture"
                fill
                className="object-cover"
                data-ai-hint="luxury interior"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-headline font-bold">Our Commitment to Elegance</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Berrybby, we believe that your home is a sanctuary that deserves nothing but the finest touches. As Lagos' premier destination for luxury lighting and furnishing, we specialize in curating high-end chandeliers and modern furniture that blend functionality with timeless elegance.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our journey began with a simple mission: to make premium interior aesthetics accessible to those in Nigeria who appreciate the finer things in life. Every piece in our catalog is handpicked from the best global collections to ensure it meets our rigorous standards of craftsmanship and style.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
                <div className="flex flex-col p-6 bg-white rounded-lg shadow-sm">
                  <Info className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Quality Guaranteed</h3>
                  <p className="text-muted-foreground">We source only the highest grade materials for our lighting and furniture collections.</p>
                </div>
                <div className="flex flex-col p-6 bg-white rounded-lg shadow-sm">
                  <Wrench className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Expert Curation</h3>
                  <p className="text-muted-foreground">Each item is handpicked by interior experts to match modern Nigerian home styles.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-headline font-bold mb-8">Our Vision</h2>
          <p className="text-xl text-muted-foreground leading-relaxed italic">
            "To be the most trusted brand for luxury home interiors in Nigeria, illuminating every space with grace and providing comfort that lasts a lifetime."
          </p>
        </div>
      </section>
    </div>
  );
}
