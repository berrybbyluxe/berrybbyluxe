
'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
      <Card className="flex flex-col overflow-hidden transition-transform transform hover:-translate-y-2 duration-300 ease-in-out shadow-md hover:shadow-xl">
        <CardHeader className="p-0">
          <div className="aspect-video relative">
            {image && (
              <Image
                src={image.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
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
            <Button asChild variant="outline">
              <Link href={whatsappUrl} target="_blank">
                Chat to Order
              </Link>
            </Button>
            <Button onClick={() => setIsPaymentDialogOpen(true)}>Buy Now</Button>
          </div>
        </CardFooter>
      </Card>
      {isPaymentDialogOpen && (
        <PaymentDialog
          product={product}
          open={isPaymentDialogOpen}
          onOpenChange={setIsPaymentDialogOpen}
        />
      )}
    </>
  );
}
