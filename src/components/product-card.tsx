'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Star, Zap, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PaymentDialog } from '@/components/payment-dialog';

type ProductCardProps = {
  product: Product;
};

const FALLBACK_IMAGE = "/images/products/berrybby-luxury-lighting-and-furniture-hero-picture.avif";

export function ProductCard({ product }: ProductCardProps) {
  const [isPaymentOpen, setIsPaymentOpen] = React.useState(false);
  const [imgSrc, setImgSrc] = React.useState(product.images?.[0] || FALLBACK_IMAGE);
  
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : null;

  const whatsappUrl = `https://wa.me/2349063927855?text=${encodeURIComponent(
    `Hello! I'm interested in ordering the ${product.name} (₦${product.price.toLocaleString()})`
  )}`;

  return (
    <div className="group relative bg-white rounded-xl border border-muted/50 overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col h-full">
      {/* Image Section */}
      <Link href={`/product/${product.id}`} className="relative aspect-square overflow-hidden bg-stone-50 flex items-center justify-center p-8">
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {discount && (
            <span className="bg-rose-50 text-rose-500 text-[10px] font-bold px-2 py-1 rounded-md">
              -{discount}%
            </span>
          )}
          <span className="bg-amber-50 text-amber-600 text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
            <Zap className="h-3 w-3 fill-amber-600" /> Premium
          </span>
        </div>

        <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-110">
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            className={cn(
              "object-contain p-4 transition-opacity duration-300",
              product.isSoldOut && "grayscale opacity-60"
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImgSrc(FALLBACK_IMAGE)}
            loading="lazy"
          />
        </div>
        
        {product.isSoldOut && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center z-20">
            <span className="bg-black text-white px-6 py-2 text-[10px] font-bold tracking-widest uppercase rounded-full">
              Sold Out
            </span>
          </div>
        )}
      </Link>

      {/* Details Section */}
      <div className="p-4 space-y-3 flex flex-col flex-grow">
        <div className="space-y-1">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-bold text-sm md:text-base hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-[11px] text-muted-foreground font-medium">
            {product.category} • {product.stock || 5} left
          </p>
        </div>
        
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">
              ₦{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through decoration-muted-foreground/50">
                ₦{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={cn(
                    "h-3 w-3",
                    i < Math.floor(product.rating || 5) ? "fill-primary text-primary" : "text-muted fill-muted"
                  )} 
                />
              ))}
            </div>
            <span className="text-[10px] font-bold text-muted-foreground">
              ({product.reviews || 0})
            </span>
          </div>
        </div>

        <div className="mt-2 space-y-2">
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "w-full py-2.5 rounded-lg flex items-center justify-center gap-2 bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all text-xs font-bold uppercase tracking-wider",
              product.isSoldOut && "opacity-50 pointer-events-none grayscale bg-muted text-muted-foreground"
            )}
          >
            <MessageCircle className="h-4 w-4" />
            {product.isSoldOut ? 'Sold Out' : 'Chat to Order'}
          </a>

          <Button 
            onClick={() => setIsPaymentOpen(true)}
            disabled={product.isSoldOut}
            variant="default"
            className="w-full py-2.5 h-auto text-xs font-bold uppercase tracking-wider rounded-lg"
          >
            Buy Now
          </Button>
        </div>
      </div>

      <PaymentDialog 
        product={product} 
        open={isPaymentOpen} 
        onOpenChange={setIsPaymentOpen} 
      />
    </div>
  );
}
