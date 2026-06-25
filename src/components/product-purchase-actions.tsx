'use client';

import * as React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Product } from '@/lib/types';

interface ProductPurchaseActionsProps {
  product: Product;
}

export function ProductPurchaseActions({ product }: ProductPurchaseActionsProps) {
  const whatsappUrl = `https://wa.me/2349063927855?text=${encodeURIComponent(
    `Hello! I'm interested in ordering the ${product.name} (₦${product.price.toLocaleString()})`
  )}`;

  return (
    <div className="flex flex-col gap-4 mb-8">
      <Button 
        size="lg" 
        className="w-full h-16 text-lg font-bold rounded-xl"
        disabled={product.isSoldOut}
        asChild={!product.isSoldOut}
      >
        {product.isSoldOut ? (
          <span>Out of Stock</span>
        ) : (
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-3 h-6 w-6" />
            Chat to Order Now
          </a>
        )}
      </Button>
      <p className="text-[10px] text-center uppercase tracking-widest font-bold text-muted-foreground">
        Secure ordering via WhatsApp Business
      </p>
    </div>
  );
}