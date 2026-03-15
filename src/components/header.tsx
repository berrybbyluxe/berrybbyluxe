
'use client';

import Link from 'next/link';
import { Sofa, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import * as React from 'react';

const navLinks = [
  { href: '/#home', label: 'Home' },
  { href: '/#products', label: 'Catalog' },
  { href: '/#about', label: 'About' },
  { href: '/#services', label: 'Services' },
  { href: '/#contact', label: 'Contact' },
];

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/#home" className="flex items-center gap-2">
          <Sofa className="h-6 w-6 text-primary flex-shrink-0" />
          <span className="font-bold font-headline text-base md:text-lg leading-tight">
            Berrybby Luxury Lighting & Furnishing
          </span>
        </Link>

        <nav className="hidden xl:flex gap-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'text-sm font-medium text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="xl:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">Access site sections</SheetDescription>
              <div className="flex flex-col gap-4 p-4">
                <Link href="/#home" className="flex items-center gap-2 mb-4" onClick={() => setIsSheetOpen(false)}>
                  <Sofa className="h-6 w-6 text-primary" />
                  <span className="font-bold font-headline text-lg text-left leading-tight">
                    Berrybby Luxury Lighting & Furnishing
                  </span>
                </Link>
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsSheetOpen(false)}
                    className={cn(
                      'text-lg font-medium text-muted-foreground transition-colors hover:text-foreground'
                    )}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
