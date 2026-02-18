'use client';

import Image from 'next/image';
import type { Product } from '@/lib/types';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WhatsappIcon } from '@/components/icons';
import Link from 'next/link';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const image = getPlaceholderImage(product.imageId);
  const whatsappLink = `https://wa.me/1234567890?text=Hi, I'm interested in ordering the ${encodeURIComponent(
    product.name
  )}.`;

  return (
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
        <span className="font-bold text-lg text-primary">${product.price.toFixed(2)}</span>
        <Button asChild>
          <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <WhatsappIcon className="mr-2 h-4 w-4" />
            Chat to Order
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
