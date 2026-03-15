'use client';

import * as React from 'react';
import Image from 'next/image';
import { products } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { ChevronLeft, ChevronRight, Info, Truck, Wrench, Phone, Mail, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PRODUCTS_PER_PAGE = 9;

export default function Home() {
  const heroImage = getPlaceholderImage('hero-1');
  const [currentPage, setCurrentPage] = React.useState(1);

  // Pagination Logic
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll back to products section
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
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
            Discover exquisite lighting and furniture that brings warmth, style, and personality to your home.
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="#products">Shop Now</Link>
          </Button>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="products" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Catalog</h2>
            <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-2"></div>
            <p className="mt-2 text-lg text-muted-foreground">Handpicked selections for the modern home.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-16 flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    className="w-10"
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next Page"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(startIndex + PRODUCTS_PER_PAGE, products.length)} of {products.length} products
              </p>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square lg:aspect-auto lg:h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxsaXZpbmclMjByb29tJTIwaW50ZXJpb3J8ZW58MHx8fHwxNzcxMjE5OTU0fDA&ixlib.rb-4.1.0&q=80&w=1080"
                alt="About Berrybby"
                fill
                className="object-cover"
                data-ai-hint="living room interior"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">About Berrybby</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Berrybby, we believe that your home is a sanctuary that deserves nothing but the finest touches. Founded with a passion for exquisite design and unmatched quality, we specialize in curating premium lighting and furniture that blend functionality with timeless elegance.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our journey began with a simple mission: to make high-end interior aesthetics accessible to those who appreciate the finer things in life. Every piece in our catalog is handpicked to ensure it meets our rigorous standards of craftsmanship and style.
              </p>
              <div className="flex gap-4 pt-4">
                <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm flex-1">
                  <Info className="h-8 w-8 text-primary mb-2" />
                  <span className="font-semibold text-center">Quality Assured</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm flex-1">
                  <Wrench className="h-8 w-8 text-primary mb-2" />
                  <span className="font-semibold text-center">Handpicked</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">What We Do</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Info className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline">Interior Consultation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Expert advice on how to choose the perfect lighting fixtures and furniture to match your home's unique style.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline">Installation Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Professional installation for all our lighting fixtures to ensure safety and the perfect aesthetic placement in your space.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline">Nationwide Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We deliver our exquisite pieces right to your doorstep, anywhere in the country, with maximum care and safety.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Get In Touch</h2>
            <p className="mt-2 text-lg text-muted-foreground">We'd love to hear from you. Reach out for inquiries or orders.</p>
          </div>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-8 bg-background rounded-lg shadow-md">
              <Phone className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-headline text-xl font-bold mb-2">Call Us</h3>
              <p className="text-muted-foreground">09063927855</p>
            </div>
            <div className="flex flex-col items-center p-8 bg-background rounded-lg shadow-md">
              <Mail className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-headline text-xl font-bold mb-2">Email</h3>
              <p className="text-muted-foreground">berrybbyluxe@gmail.com</p>
            </div>
            <div className="flex flex-col items-center p-8 bg-background rounded-lg shadow-md">
              <MapPin className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-headline text-xl font-bold mb-2">Visit Us</h3>
              <p className="text-muted-foreground text-center">4A, Victor Olaleye Street, Rogo Ishaga, Lagos State</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white">
              <Link href="https://wa.me/2349063927855" target="_blank">
                Contact via WhatsApp
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}