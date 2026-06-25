
'use client';

import * as React from 'react';
import Link from 'next/link';
import { 
  Menu, 
  Search, 
  User, 
  Heart, 
  Home, 
  Flame, 
  LampCeiling, 
  Sofa, 
  Zap,
  Bed,
  Utensils,
  Flower2,
  Lightbulb,
  Grid,
  Power
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';

const categories = [
  { label: 'Living Room', href: '/category/living-room', icon: Sofa },
  { label: 'Bedroom', href: '/category/bedroom', icon: Bed },
  { label: 'Dining Set', href: '/category/dining-set', icon: Utensils },
  { label: 'Decoratives', href: '/category/house-decoratives', icon: Flower2 },
  { label: 'Chandeliers', href: '/category/chandeliers', icon: LampCeiling },
  { label: 'Wall Brackets', href: '/category/wall-brackets', icon: Zap },
  { label: 'Outdoor Lighting', href: '/category/outdoor-lighting', icon: Flame },
  { label: 'Pendant & Drop', href: '/category/pendant-lighting', icon: Lightbulb },
  { label: 'POP Lighting', href: '/category/ceiling-lighting', icon: Grid },
  { label: 'Switches', href: '/category/switches-sockets', icon: Power },
  { label: 'Bulbs', href: '/category/bulbs', icon: Lightbulb },
];

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 z-50 w-full flex flex-col shadow-sm">
      {/* Announcement Bar */}
      <div className="w-full bg-[#111] text-white py-2 px-4 text-center">
        <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold flex items-center justify-center gap-2">
          Nigeria's Premium Destination for Lighting & Furnishing
        </p>
      </div>

      <header 
        className={cn(
          "w-full transition-all duration-500 bg-background/95 backdrop-blur-md border-b flex items-center",
          scrolled ? "min-h-[3.5rem]" : "min-h-[4rem] sm:min-h-[5rem]"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-4 sm:gap-8">
          {/* Logo */}
          <Link href="/" className="flex flex-col flex-shrink-0 group">
            <span className="font-headline text-lg sm:text-xl md:text-2xl font-light tracking-tight text-foreground line-clamp-1">
              Berrybby Luxury Lighting & Furniture
            </span>
          </Link>

          {/* Search Bar - Hidden on small screens */}
          <div className="hidden lg:flex flex-grow max-w-xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-50" />
            <Input 
              placeholder="Search for products here..." 
              className="w-full bg-muted/50 border-none rounded-full pl-12 h-10 text-xs tracking-wider"
            />
          </div>

          {/* Icons Row */}
          <div className="flex items-center gap-1 sm:gap-4 md:gap-6 text-foreground">
            <Link href="/" className="p-2 hover:text-primary transition-colors hidden sm:block">
              <Home className="h-5 w-5" />
            </Link>
            <Link href="/products" className="p-2 hover:text-primary transition-colors">
              <Heart className="h-5 w-5" />
            </Link>
            <Link href="/contact" className="p-2 hover:text-primary transition-colors hidden sm:block">
              <User className="h-5 w-5" />
            </Link>
            
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 lg:hidden hover:text-primary transition-colors">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background border-none p-6 sm:p-12 w-full sm:max-w-md">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <nav className="flex flex-col gap-6 sm:gap-8 mt-12">
                   {categories.map((cat) => (
                     <Link 
                       key={cat.label} 
                       href={cat.href} 
                       className="text-3xl sm:text-4xl font-headline italic hover:text-primary transition-colors"
                     >
                       {cat.label}
                     </Link>
                   ))}
                   <div className="mt-8 pt-8 border-t border-muted">
                     <Link href="/contact" className="text-xl font-headline italic hover:text-primary transition-colors block mb-4">Contact & Support</Link>
                     <Link href="/about" className="text-xl font-headline italic hover:text-primary transition-colors block">Our Story</Link>
                   </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Category Navigation Bar - Wraps onto multiple lines */}
      <nav className="w-full bg-background/95 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-6 lg:gap-x-8 py-1.5 sm:py-3">
          {categories.map((cat) => (
            <Link 
              key={cat.label} 
              href={cat.href} 
              className="flex items-center gap-1.5 text-[7px] sm:text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold text-muted-foreground hover:text-primary transition-all group border-b border-transparent hover:border-primary py-1 sm:py-1.5 whitespace-nowrap"
            >
              <cat.icon className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 transition-transform group-hover:scale-110" />
              {cat.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
