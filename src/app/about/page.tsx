import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/placeholder-images';

export default function AboutPage() {
  const aboutImage = getPlaceholderImage('about-us');

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">About BerryHaven</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            We believe that home is more than just a place; it's a feeling. Our journey began with a simple idea: to create beautiful, lasting furniture that turns houses into homes.
          </p>
        </div>

        {aboutImage && (
          <div className="relative h-96 w-full max-w-5xl mx-auto my-12 rounded-lg overflow-hidden shadow-xl">
            <Image
              src={aboutImage.imageUrl}
              alt={aboutImage.description}
              fill
              className="object-cover"
              data-ai-hint={aboutImage.imageHint}
            />
          </div>
        )}

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 mt-16">
          <div>
            <h2 className="text-3xl font-headline font-semibold text-foreground">Our Philosophy</h2>
            <p className="mt-4 text-muted-foreground">
              At BerryHaven, our philosophy is rooted in the fusion of timeless design and exceptional craftsmanship. We source the finest, sustainably-harvested materials to create pieces that are not only beautiful but also built to be part of your family's story for generations. We are passionate about creating furniture that is both functional and artful, designed to enhance your everyday life.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-headline font-semibold text-foreground">Our Mission</h2>
            <p className="mt-4 text-muted-foreground">
              Our mission is to inspire beautiful living. We strive to provide our customers with high-quality furniture and an exceptional shopping experience. From our design process to our customer service, we are committed to excellence, integrity, and creating a positive impact on the homes and lives of our customers. We aim to be more than just a furniture store; we want to be your partner in creating a space you love.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
