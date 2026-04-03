'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/placeholder-images';

export function Footer() {
  const [year, setYear] = React.useState<number | null>(null);
  const logo = getPlaceholderImage('site-logo');

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            {logo && (
              <div className="relative h-8 w-8 overflow-hidden rounded-md">
                <Image
                  src={logo.imageUrl}
                  alt="Berrybby Logo"
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <span className="font-bold font-headline text-lg">Berrybby Luxury Lighting & Furnishing</span>
          </div>
          <div className="text-center md:text-left text-sm text-muted-foreground">
            &copy; {year || '...'} Berrybby Luxury. All rights reserved.
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
          </div>
        </div>
      </div>
    </footer>
  );
}
