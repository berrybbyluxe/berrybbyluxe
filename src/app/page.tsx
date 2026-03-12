import Image from 'next/image';
import { products } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { Paintbrush, Sofa, Truck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const services = [
  {
    icon: <Paintbrush className="h-10 w-10 text-primary" />,
    title: 'Interior Design Consultation',
    description: 'Our expert designers help you create a cohesive and beautiful space that reflects your personal style. From a single room to a full home makeover.',
  },
  {
    icon: <Sofa className="h-10 w-10 text-primary" />,
    title: 'Custom Furniture Design',
    description: 'Have a unique vision? We can bring it to life. Work with our artisans to create bespoke furniture pieces tailored to your exact specifications.',
  },
  {
    icon: <Truck className="h-10 w-10 text-primary" />,
    title: 'White Glove Delivery & Assembly',
    description: "Enjoy a hassle-free experience with our premium delivery service. We'll deliver, unpack, assemble, and place your new furniture for you.",
  },
];

export default function Home() {
  const heroImage = getPlaceholderImage('hero-1');
  const aboutImage = getPlaceholderImage('about-us');
  const servicesImage = getPlaceholderImage('services-1');

  return (
    <div className="flex flex-col">
      <section id="home" className="relative w-full h-[60vh] md:h-[80vh] text-white">
        <div className="absolute inset-0 bg-black/50 z-10" />
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center p-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold tracking-tight">
            Crafted for Comfort
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-neutral-200">
            Discover exquisite furniture that brings warmth, style, and personality to your home.
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="#products">Shop Now</Link>
          </Button>
        </div>
      </section>

      <section id="products" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Featured Products</h2>
            <p className="mt-2 text-lg text-muted-foreground">Handpicked selections for the modern home.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">About Berrybby</h1>
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
                At Berrybby, our philosophy is rooted in the fusion of timeless design and exceptional craftsmanship. We source the finest, sustainably-harvested materials to create pieces that are not only beautiful but also built to be part of your family's story for generations. We are passionate about creating furniture that is both functional and artful, designed to enhance your everyday life.
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
      </section>
      
      <section id="services" className="py-16 md:py-24 bg-background">
         <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Our Services</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Beyond furniture, we offer a range of services to help you create your perfect home.
          </p>
        </div>

        {servicesImage && (
             <div className="relative h-96 w-full max-w-5xl mx-auto my-12 rounded-lg overflow-hidden shadow-xl">
             <Image
              src={servicesImage.imageUrl}
              alt={servicesImage.description}
              fill
              className="object-cover"
              data-ai-hint={servicesImage.imageHint}
            />
             </div>
        )}

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mt-16">
          {services.map((service) => (
            <Card key={service.title} className="text-center flex flex-col items-center p-6">
              <CardHeader>
                {service.icon}
                <CardTitle className="mt-4 font-headline">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      </section>
    </div>
  );
}
