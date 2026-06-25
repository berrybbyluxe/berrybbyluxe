'use client';

import * as React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    fill="currentColor"
    className={className}
  >
    <path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25V349.38A162.55 162.55 0 1 1 185 188.31V278.2a74.62 74.62 0 1 0 52.23 71.18V0l88 0a121.18 121.18 0 0 0 1.86 22.17A122.18 122.18 0 0 0 381 102.39a121.43 121.43 0 0 0 67 20.14Z" />
  </svg>
);

export function Footer() {
  const [year, setYear] = React.useState<number | null>(null);

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-[#111] text-white pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 mb-24">
          {/* Brand Identity & Story */}
          <div className="space-y-8">
            <h2 className="text-3xl font-headline font-bold">Berrybby</h2>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-xs font-light">
              Lagos' most trusted luxury lighting and furnishing sanctuary. Shop architectural collections, support Nigerian excellence, and experience world-class service.
            </p>
            <div className="flex items-center gap-3">
              <Link href="https://www.instagram.com/berrybbyluxecollection/" className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="https://web.facebook.com/profile.php?id=61557486325687" className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="https://www.tiktok.com/@berrybbyluxecollection" className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <TikTokIcon className="h-4 w-4" />
              </Link>
              <Link href="mailto:berrybbyluxe@gmail.com" className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Mail className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.6em] font-bold text-primary">Quick Links</h4>
            <ul className="space-y-4 text-xs uppercase tracking-widest font-bold text-neutral-500">
              <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* SHOP Collections */}
          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.6em] font-bold text-primary">Shop</h4>
            <ul className="space-y-4 text-xs uppercase tracking-widest font-bold text-neutral-500">
              <li><Link href="/category/furniture" className="hover:text-white transition-colors">Furniture</Link></li>
              <li><Link href="/category/chandeliers" className="hover:text-white transition-colors">Chandeliers</Link></li>
              <li><Link href="/category/wall-brackets" className="hover:text-white transition-colors">Wall Brackets</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Bulbs</Link></li>
            </ul>
          </div>

          {/* NEWSLETTER & TRUST */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.6em] font-bold text-primary">Newsletter</h4>
              <p className="text-xs text-neutral-400 font-light">Get deals & new arrivals in your inbox</p>
              <div className="space-y-2">
                <Input 
                  type="email" 
                  placeholder="your@email.com" 
                  className="bg-white/5 border-white/10 text-white rounded-none h-12 focus:border-primary text-xs uppercase tracking-widest placeholder:text-neutral-600 outline-none"
                />
                <Button className="w-full rounded-none bg-primary hover:bg-primary/90 text-white text-[10px] uppercase tracking-widest font-bold h-12 transition-all">
                  Subscribe
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.6em] font-bold text-neutral-600">We Accept</h4>
              <div className="flex flex-wrap gap-2">
                {['Visa', 'Mastercard', 'Bank Transfer'].map((method) => (
                  <span key={method} className="text-[9px] px-3 py-1.5 bg-white/5 text-neutral-500 border border-white/10 uppercase tracking-widest font-bold">
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] uppercase tracking-[0.4em] text-neutral-600 font-bold">
          <div className="text-center md:text-left">
            &copy; {year || '2025'} Berrybby Luxury Lighting & Furnishing. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <Link href="/services" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/services" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/services" className="hover:text-white transition-colors">Cookies</Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}