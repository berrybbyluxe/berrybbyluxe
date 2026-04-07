
'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PaymentDialog } from '@/components/payment-dialog';
import { Eye, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = React.useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);
  const image = getPlaceholderImage(product.imageId);

  const whatsappUrl = `https://wa.me/2349063927855?text=${encodeURIComponent(
    `Hello! I'm interested in ordering the ${product.name} (₦${product.price.toLocaleString()})`
  )}`;

  if (!image) return null;

  return (
    <>
      <Card className="group flex flex-col overflow-hidden transition-transform transform hover:-translate-y-2 duration-300 ease-in-out shadow-sm md:shadow-md hover:shadow-xl relative h-full">
        {product.isSoldOut && (
          <div className="absolute top-2 right-2 md:top-4 md:right-4 z-20">
            <Badge variant="destructive" className="text-[10px] md:text-sm px-2 py-0.5 md:px-3 md:py-1 font-bold">
              SOLD OUT
            </Badge>
          </div>
        )}
        
        <div className="absolute top-2 left-2 md:top-4 md:left-4 z-20 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full shadow-lg h-7 w-7 md:h-10 md:w-10"
            onClick={(e) => {
              e.preventDefault();
              setIsLightboxOpen(true);
            }}
          >
            <Eye className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </div>

        <CardHeader className="p-0">
          <div className="aspect-square relative overflow-hidden">
            <Image
              src={image.imageUrl}
              alt={product.name}
              fill
              className={`object-cover transition-transform duration-500 group-hover:scale-110 ${product.isSoldOut ? 'grayscale opacity-70' : ''}`}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={image.imageHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-3 md:p-6 flex-grow flex flex-col gap-1">
          <CardTitle className="font-headline text-sm md:text-xl line-clamp-2 md:line-clamp-1 h-10 md:h-auto">{product.name}</CardTitle>
          <p className="text-muted-foreground text-[10px] md:text-sm line-clamp-1 md:line-clamp-2 mt-1 hidden xs:block">{product.description}</p>
          <span className="font-bold text-sm md:text-lg text-primary mt-auto">₦{product.price.toLocaleString()}</span>
        </CardContent>
        <CardFooter className="p-3 md:p-6 pt-0 md:pt-0 flex flex-col gap-2">
          <div className="flex flex-col md:flex-row gap-2 w-full">
            <Button asChild variant="outline" size="sm" disabled={product.isSoldOut} className="flex-1 text-[10px] md:text-sm h-8 md:h-10 px-1">
              <Link href={product.isSoldOut ? '#' : whatsappUrl} target={product.isSoldOut ? "_blank" : undefined} className={product.isSoldOut ? 'pointer-events-none' : ''}>
                Chat to Order
              </Link>
            </Button>
            <Button 
              size="sm"
              onClick={() => setIsPaymentDialogOpen(true)} 
              disabled={product.isSoldOut}
              className={`flex-1 text-[10px] md:text-sm h-8 md:h-10 ${product.isSoldOut ? 'bg-muted text-muted-foreground' : ''}`}
            >
              {product.isSoldOut ? 'Sold Out' : 'Buy Now'}
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none shadow-none focus-visible:outline-none">
          <DialogHeader className="sr-only">
            <DialogTitle>{product.name} - Image Preview</DialogTitle>
            <DialogDescription>Detailed view of {product.name}</DialogDescription>
          </DialogHeader>
          <div className="relative w-full aspect-square md:aspect-video flex items-center justify-center bg-black/90 rounded-lg overflow-hidden">
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
            <Image
              src={image.imageUrl}
              alt={product.name}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
              <h3 className="text-2xl font-headline font-bold">{product.name}</h3>
              <p className="mt-1 opacity-90">{product.description}</p>
              <p className="mt-2 font-bold text-primary-foreground">₦{product.price.toLocaleString()}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {!product.isSoldOut && isPaymentDialogOpen && (
        <PaymentDialog
          product={product}
          open={isPaymentDialogOpen}
          onOpenChange={setIsPaymentDialogOpen}
        />
      )}
    </>
  );
}
