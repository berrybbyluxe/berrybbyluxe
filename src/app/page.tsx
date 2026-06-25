
'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  Star, 
  CheckCircle2, 
  Zap,
  Sofa,
  LampCeiling,
  Lightbulb,
  Flame,
  Grid,
  Power,
  Bed,
  Utensils,
  Flower2,
  Briefcase,
  LampDesk,
  Package,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

const FEATURED_LIMIT = 15;

const CATEGORY_BLOCKS = [
  { name: 'Bedroom', slug: 'bedroom', icon: Bed, subcategories: ['Bedroom'] },
  { name: 'Dining Set', slug: 'dining-set', icon: Utensils, subcategories: ['Dining Set'] },
  { name: 'House Decoratives', slug: 'house-decoratives', icon: Flower2, subcategories: ['House Decoratives'] },
  { name: 'Living Room', slug: 'living-room', icon: Sofa, subcategories: ['Living Room'] },
  { name: 'Office', slug: 'office', icon: Briefcase, subcategories: ['Office'] },
  { name: 'Side Lamps & Standing Lamps', slug: 'side-standing-lamps', icon: LampDesk, subcategories: ['Side Lamps & Standing Lamps'] },
  { name: 'Turkey Collection', slug: 'turkey', icon: Package, subcategories: ['Turkey Collection'] },
  { name: 'Vass Flower', slug: 'vass-flower', icon: Sparkles, subcategories: ['Vass Flower'] },
  { name: 'Bulbs', slug: 'bulbs', icon: Lightbulb, subcategories: ['Bulbs'] },
  { name: 'Ceiling & POP Lighting', slug: 'ceiling-lighting', icon: Grid, subcategories: ['Ceiling & Pop Lighting'] },
  { name: 'Chandelier Lighting', slug: 'chandeliers', icon: LampCeiling, subcategories: ['Chandelier Lighting'] },
  { name: 'Outdoor Lighting', slug: 'outdoor-lighting', icon: Flame, subcategories: ['Outdoor Lighting'] },
  { name: 'Pendant & Drop Lighting', slug: 'pendant-lighting', icon: Lightbulb, subcategories: ['Pendant & Drop Lighting'] },
  { name: 'Switches & Sockets', slug: 'switches-sockets', icon: Power, subcategories: ['Switches & Sockets'] },
  { name: 'Wall Bracket Lighting', slug: 'wall-brackets', icon: Zap, subcategories: ['Wall Bracket Lighting'] },
];

export default function Home() {
  const heroImage = getPlaceholderImage('hero-1');
  const [currentPage, setCurrentPage] = React.useState(1);

  const totalPages = Math.max(1, Math.ceil(products.length / FEATURED_LIMIT));
  const featuredProducts = products.slice((currentPage - 1) * FEATURED_LIMIT, currentPage * FEATURED_LIMIT);

  const spaces = React.useMemo(() => [
    { 
      name: 'Living Room', 
      id: 'armani-cassa-set',
      slug: 'living-room' 
    },
    { 
      name: 'Bedroom', 
      id: 'comfortable-and-stylish-bed',
      slug: 'bedroom' 
    },
    { 
      name: 'Dining', 
      id: 'six-seater-grey-italian-bursa',
      slug: 'dining-set' 
    },
    { 
      name: 'Lighting', 
      id: 'modern-led-crystal-190',
      slug: 'chandeliers' 
    },
  ].map(space => {
    const imgData = getPlaceholderImage(space.id);
    return {
      ...space,
      image: imgData?.imageUrl || ''
    };
  }), []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const featuredSection = document.getElementById('featured');
    if (featuredSection) {
      const offset = 150;
      const elementPosition = featuredSection.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  const categoryStats = React.useMemo(() => {
    return CATEGORY_BLOCKS.map(block => ({
      ...block,
      count: products.filter(p => block.subcategories.includes(p.category)).length
    }));
  }, []);

  return (
    <div className="flex flex-col bg-background pt-44 sm:pt-48 md:pt-52 lg:pt-64">
      {/* Marketplace Style Hero Section */}
      <section className="container mx-auto px-4 py-4 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-stone-900 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden min-h-[500px] lg:min-h-[600px] text-white shadow-2xl relative">
          
          {/* Immersive Background Image */}
          {heroImage && (
            <div className="absolute inset-0 z-0">
              <Image 
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover opacity-30 lg:opacity-40 mix-blend-overlay"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-black via-black/60 lg:via-black/40 to-transparent" />
            </div>
          )}

          {/* Left: Content */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 z-10 p-6 sm:p-10 lg:p-16 text-left">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-primary font-bold flex items-center gap-2">
               <CheckCircle2 className="h-4 w-4 shrink-0" /> Premium Nigerian Interiors
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-headline font-light italic leading-tight">
              Elevate Your <br className="hidden sm:block" /> Sanctuary with <br className="hidden sm:block" /> <span className="text-primary italic">Permanent Luxury.</span>
            </h1>
            <p className="text-base sm:text-lg text-neutral-400 font-light max-w-lg leading-relaxed">
              Discover exquisite high-end lighting and furniture pieces from trusted global brands. Expertly delivered across Lagos, Abuja, and nationwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2 sm:pt-4">
              <Button asChild size="lg" className="rounded-full bg-primary text-white hover:bg-primary/90 h-12 sm:h-14 px-8 sm:px-10 uppercase text-[9px] sm:text-[10px] tracking-widest font-bold">
                <Link href="/products">Shop Collection</Link>
              </Button>
            </div>
            
            {/* Trust Badges */}
            <div className="hidden sm:flex flex-wrap gap-3 pt-6 sm:pt-8">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-[8px] sm:text-[9px] uppercase tracking-widest font-bold">
                <ShieldCheck className="h-3 w-3 text-primary" /> Verified Quality
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-[8px] sm:text-[9px] uppercase tracking-widest font-bold">
                <Truck className="h-3 w-3 text-primary" /> Support Service
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-[8px] sm:text-[9px] uppercase tracking-widest font-bold">
                <Zap className="h-3 w-3 text-primary" /> Secure Payment
              </div>
            </div>
          </div>

          {/* Right: Grid of Spaces */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4 h-full z-10 p-6 sm:p-8 lg:p-8">
            {spaces.map((space) => (
              <Link key={space.name} href={`/category/${space.slug}`} className="group relative aspect-square lg:aspect-auto lg:h-full rounded-xl sm:rounded-2xl overflow-hidden border border-white/5 shadow-lg bg-stone-800">
                {space.image && (
                  <Image
                    src={space.image}
                    alt={space.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 right-4 sm:right-6">
                   <p className="text-[7px] sm:text-[8px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-bold text-primary mb-1 lg:opacity-0 lg:group-hover:opacity-100 transition-all">Explore</p>
                   <p className="text-lg sm:text-xl font-headline italic font-light">{space.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Feature Bar */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 py-8 sm:py-10 border-y border-foreground/5">
          {[
            { icon: Truck, title: 'Fast Delivery', desc: 'Local & International' },
            { icon: ShieldCheck, title: 'Secure Payment', desc: 'Paystack protected gateway' },
            { icon: Star, title: 'Loyalty Rewards', desc: 'Earn on every referral' }
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-0.5 sm:mb-1">{feature.title}</p>
                <p className="text-[9px] sm:text-[10px] text-muted-foreground">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Collections Section */}
      <section id="featured" className="py-16 sm:py-24 bg-stone-50/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 sm:mb-12 gap-4">
            <div className="space-y-2 text-left">
              <h2 className="text-3xl md:text-4xl font-headline font-bold flex items-center gap-3">
                Featured Collections
              </h2>
              <p className="text-muted-foreground text-sm font-medium">Mouth watering offers for your sanctuary.</p>
            </div>
            <Link href="/products" className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
              View all products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 sm:mt-20 flex flex-col items-center gap-8 border-t pt-10 sm:pt-12 border-foreground/5">
              <div className="flex items-center gap-4 sm:gap-6">
                <Button
                  variant="ghost"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="group flex items-center gap-2 text-[10px] sm:text-xs font-bold px-3 sm:px-4 h-9 sm:h-10 border rounded-lg disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Prev</span>
                </Button>
                
                <div className="flex gap-1.5 sm:gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={cn(
                        "w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300",
                        currentPage === i + 1 ? "bg-primary w-6 sm:w-8" : "bg-muted hover:bg-muted-foreground"
                      )}
                      aria-label={`Go to page ${i + 1}`}
                    />
                  ))}
                </div>

                <Button
                  variant="ghost"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="group flex items-center gap-2 text-[10px] sm:text-xs font-bold px-3 sm:px-4 h-9 sm:h-10 border rounded-lg disabled:opacity-30"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Browse Categories Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-10 sm:mb-12 text-left">
            <h2 className="text-3xl sm:text-4xl font-headline font-bold text-foreground">Browse Categories</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {categoryStats.map((cat) => (
              <Link 
                key={cat.name} 
                href={`/category/${cat.slug}`}
                className="group flex flex-col items-center justify-center p-6 sm:p-8 bg-white border border-stone-200 rounded-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6 flex items-center justify-center bg-stone-50 rounded-full group-hover:bg-primary/10 transition-colors">
                  <cat.icon className="h-8 w-8 sm:h-10 sm:w-10 text-stone-700 group-hover:text-primary transition-colors" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm sm:text-lg font-bold mb-1 sm:mb-2 group-hover:text-primary transition-colors line-clamp-1">
                  {cat.name}
                </h3>
                <p className="text-[10px] sm:text-sm text-stone-500 font-medium">
                  {cat.count} products
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="bg-stone-900 text-white py-16 sm:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-24 items-center">
            <div className="relative aspect-video lg:aspect-square rounded-2xl sm:rounded-3xl overflow-hidden border border-white/5 order-2 lg:order-1">
              <Image 
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?fm=avif&fit=crop&q=80&w=1200"
                alt="Mastery Detail"
                fill
                className="object-cover opacity-60 transition-transform duration-[3s] hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-900/50 to-transparent" />
            </div>
            <div className="space-y-8 sm:space-y-12 order-1 lg:order-2 text-left">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.6em] sm:tracking-[0.8em] text-primary font-bold">Our Mastery</span>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-headline font-light leading-tight">
                Details that <br className="hidden sm:block" /> Define <br className="hidden sm:block" /> <span className="italic text-primary">Prestige.</span>
              </h2>
              <p className="text-lg sm:text-xl text-neutral-400 font-light leading-relaxed max-w-lg">
                From the spectral brilliance of our K9 crystals to the hand-tufted Turkish fabrics, every object is engineered for a legacy. This is the luxury of meticulous intention.
              </p>
              <Button asChild size="lg" className="rounded-full bg-white text-black px-10 sm:px-12 h-14 sm:h-16 uppercase text-[9px] sm:text-[10px] tracking-widest font-bold hover:bg-white/90 hover:text-black">
                <Link href="/about">Discover Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
