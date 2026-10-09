'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  LampCeiling, 
  Sofa, 
  Grid, 
  Bed, 
  Utensils, 
  Zap,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const POPULAR_CATEGORIES = [
  {
    name: 'Chandeliers',
    desc: 'Crystal & Modern',
    slug: 'chandeliers',
    icon: LampCeiling,
  },
  {
    name: 'Living Room',
    desc: 'Turkish Sets',
    slug: 'living-room',
    icon: Sofa,
  },
  {
    name: 'POP Lighting',
    desc: 'Ceiling & Recessed',
    slug: 'ceiling-lighting',
    icon: Grid,
  },
  {
    name: 'Bedroom',
    desc: 'Sanctuary Luxury',
    slug: 'bedroom',
    icon: Bed,
  },
  {
    name: 'Dining Sets',
    desc: 'Italian & Marble',
    slug: 'dining-set',
    icon: Utensils,
  },
  {
    name: 'Wall Brackets',
    desc: 'Architectural Accent',
    slug: 'wall-brackets',
    icon: Zap,
  },
];

export function NewArrivalsPopup() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const startPopupTimer = React.useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsOpen(false);
    timerRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 3000); // 3 seconds after landing on home
  }, []);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Trigger popup 3 seconds after landing on home or returning home
  React.useEffect(() => {
    if (pathname === '/') {
      startPopupTimer();
    } else {
      setIsOpen(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [pathname, startPopupTimer]);

  // Also listen for clicks on "Home" navigation links (e.g. logo or home icon)
  React.useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const homeLink = target?.closest('a[href="/"]');
      if (homeLink) {
        startPopupTimer();
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [startPopupTimer]);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  // Listen for Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  // Lock background scroll when open on mobile
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isMounted || !isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      {/* Modal Container: responsive bounded dimensions to ensure zero cutoff */}
      <div 
        className="relative w-full max-w-lg md:max-w-xl max-h-[min(90dvh,680px)] flex flex-col bg-stone-950 text-stone-100 rounded-2xl sm:rounded-3xl border border-amber-500/20 shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Luxury Gold Shimmer Bar */}
        <div className="h-1 sm:h-1.5 w-full bg-gradient-to-r from-amber-600 via-primary to-amber-300" />

        {/* Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Dismiss Button */}
        <button
          onClick={handleClose}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-30 p-2 sm:p-2.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Close notification"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto overscroll-contain px-5 py-6 sm:px-8 sm:py-8 space-y-4 sm:space-y-6 scrollbar-thin scrollbar-thumb-stone-800 scrollbar-track-transparent">
          {/* Header Badge & Title */}
          <div className="space-y-2 text-left pr-8 sm:pr-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-amber-500/15 text-primary border border-primary/30">
              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span>New Catalog Arrivals</span>
            </div>

            <h2 id="popup-title" className="text-2xl sm:text-3xl font-headline font-light tracking-tight text-white leading-tight">
              Fresh Luxury Pieces <br />
              <span className="italic text-primary font-normal">Just Added to Showroom</span>
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              We&apos;ve just expanded our catalog with exclusive new architectural lighting, bespoke chandeliers, and modern Turkish furnishings. Explore our curated categories below.
            </p>
          </div>

          {/* Quick Category Grid */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-stone-400">
              <span>Popular Categories to Browse:</span>
              <span className="text-primary text-[10px] hidden sm:inline">Tap to explore</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
              {POPULAR_CATEGORIES.map((cat) => {
                const IconComponent = cat.icon;
                return (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    onClick={handleClose}
                    className="group flex flex-col p-2.5 sm:p-3 rounded-xl bg-stone-900/70 hover:bg-stone-800/90 border border-stone-800 hover:border-primary/50 transition-all text-left shadow-sm"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-stone-800 group-hover:bg-primary/20 flex items-center justify-center shrink-0 transition-colors">
                        <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-300 group-hover:text-primary transition-colors" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-primary transition-colors truncate">
                        {cat.name}
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-stone-400 font-medium truncate">
                      {cat.desc}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Value Prop Highlights */}
          <div className="flex items-center gap-2 py-2 px-3 rounded-xl bg-white/5 border border-white/5 text-[11px] sm:text-xs text-stone-300">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
            <span className="truncate">Instant checkout & nationwide delivery across Nigeria</span>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-1">
            <Button
              asChild
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-11 sm:h-12 rounded-full uppercase tracking-widest text-[10px] sm:text-xs shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all"
            >
              <Link href="/products" onClick={handleClose}>
                Explore All Products <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="w-full bg-stone-900 hover:bg-stone-800 text-stone-200 border-stone-700/80 rounded-full h-10 sm:h-11 uppercase tracking-widest text-[9px] sm:text-[10px] font-bold"
            >
              <Link href="/#categories" onClick={handleClose}>
                Browse All 15 Categories
              </Link>
            </Button>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={handleClose}
                className="text-[11px] text-stone-400 hover:text-stone-200 transition-colors underline-offset-4 hover:underline py-1"
              >
                Continue browsing website
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
