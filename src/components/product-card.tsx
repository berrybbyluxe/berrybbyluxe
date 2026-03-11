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

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = React.useState(false);
  const image = getPlaceholderImage(product.imageId);

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `I'm interested in ordering the ${product.name}`
  )}`;

  return (
    <>
      <Card className="flex flex-col overflow-hidden transition-transform transform hover:-translate-y-2 duration-300 ease-in-out shadow-md hover:shadow-xl relative">
        {product.isSoldOut && (
          <div className="absolute top-4 right-4 z-20">
            <Badge variant="destructive" className="text-sm px-3 py-1 font-bold">
              SOLD OUT
            </Badge>
          </div>
        )}
        <CardHeader className="p-0">
          <div className="aspect-video relative">
            {image && (
              <Image
                src={image.imageUrl}
                alt={product.name}
                fill
                className={`object-cover ${product.isSoldOut ? 'grayscale opacity-70' : ''}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-ai-hint={image.imageHint}
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-6 flex-grow">
          <CardTitle className="font-headline text-xl">{product.name}</CardTitle>
          <p className="mt-2 text-muted-foreground text-sm">{product.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <span className="font-bold text-lg text-primary">₦{product.price.toLocaleString()}</span>
          <div className="flex gap-2">
            <Button asChild variant="outline" disabled={product.isSoldOut}>
              <Link href={product.isSoldOut ? '#' : whatsappUrl} target={product.isSoldOut ? undefined : "_blank"} className={product.isSoldOut ? 'pointer-events-none' : ''}>
                Chat to Order
              </Link>
            </Button>
            <Button 
              onClick={() => setIsPaymentDialogOpen(true)} 
              disabled={product.isSoldOut}
              className={product.isSoldOut ? 'bg-muted text-muted-foreground' : ''}
            >
              {product.isSoldOut ? 'Sold Out' : 'Buy Now'}
            </Button>
          </div>
        </CardFooter>
      </Card>
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
