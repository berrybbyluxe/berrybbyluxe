
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import * as React from 'react';

const navLinks = [
  { href: '/#home', label: 'Home' },
  { href: '/#products', label: 'Catalog' },
  { href: '/style-assistant', label: 'AI Assistant', icon: Sparkles },
  { href: '/#about', label: 'About' },
  { href: '/#services', label: 'Services' },
  { href: '/#contact', label: 'Contact' },
];

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const logo = getPlaceholderImage('site-logo');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/#home" className="flex items-center gap-3">
          {logo && (
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image
                src={logo.imageUrl}
                alt="Berrybby Luxury Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          <span className="font-bold font-headline text-base md:text-lg leading-tight">
            Berrybby Luxury
          </span>
        </Link>

        <nav className="hidden lg:flex gap-6">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'text-sm font-medium text-muted-foreground transition-colors hover:text-foreground whitespace-nowrap flex items-center gap-1.5'
              )}
            >
              {Icon && <Icon className="h-3.5 w-3.5 text-primary" />}
              {label}
            </Link>
          ))}
        </nav>

        <div className="lg:hidden">
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
                <Link href="/#home" className="flex items-center gap-3 mb-6" onClick={() => setIsSheetOpen(false)}>
                  {logo && (
                    <div className="relative h-8 w-8 overflow-hidden rounded-full">
                      <Image
                        src={logo.imageUrl}
                        alt="Berrybby Luxury Logo"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <span className="font-bold font-headline text-lg text-left leading-tight">
                    Berrybby Luxury
                  </span>
                </Link>
                {navLinks.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsSheetOpen(false)}
                    className={cn(
                      'text-lg font-medium text-muted-foreground transition-colors hover:text-foreground flex items-center gap-2'
                    )}
                  >
                    {Icon && <Icon className="h-4 w-4 text-primary" />}
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
