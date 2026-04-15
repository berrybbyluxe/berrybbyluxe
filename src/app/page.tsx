
'use client';

import * as React from 'react';
import Image from 'next/image';
import { products } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { ChevronLeft, ChevronRight, Info, Truck, Wrench, Search, Filter, MoreHorizontal, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';

const PRODUCTS_PER_PAGE = 12;

const CATEGORY_STRUCTURE = {
  'Furniture': [
    'Bedroom', 
    'Dinning Set', 
    'House Decoratives', 
    'Living Room', 
    'Office', 
    'Side Lamps & Standing Lamps',
    'Turkey Collections',
    'Vass Flowers'
  ],
  'Lighting': [
    'Ceiling & Pop Lighting',
    'Chandelier Lighting',
    'Outdoor Lighting',
    'Pendant & Drop Lighting',
    'Switches & Sockets',
    'Wall Bracket Lighting',
    'Bulb'
  ]
};

export default function Home() {
  const isMobile = useIsMobile();
  const heroImage = getPlaceholderImage('hero-1');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [isFilterDialogOpen, setIsFilterDialogOpen] = React.useState(false);

  const filteredProducts = React.useMemo(() => {
    if (!products || !Array.isArray(products)) return [];
    
    return products.filter((product) => {
      if (!product) return false;
      const name = (product.name || '').toLowerCase();
      const description = (product.description || '').toLowerCase();
      const query = searchQuery.toLowerCase();
      
      const matchesSearch = name.includes(query) || description.includes(query);
      
      let matchesCategory = false;
      if (selectedCategory === 'All') {
        matchesCategory = true;
      } else if (selectedCategory === 'Furniture') {
        matchesCategory = CATEGORY_STRUCTURE.Furniture.includes(product.category);
      } else if (selectedCategory === 'Lighting') {
        matchesCategory = CATEGORY_STRUCTURE.Lighting.includes(product.category);
      } else {
        matchesCategory = product.category === selectedCategory;
      }
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getVisiblePages = () => {
    const maxVisible = isMobile ? 3 : 5;
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end === totalPages) {
      start = Math.max(1, totalPages - maxVisible + 1);
    } else if (start === 1) {
      end = Math.min(totalPages, maxVisible);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const selectCategoryAndClose = (category: string) => {
    setSelectedCategory(category);
    setIsFilterDialogOpen(false);
  };

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
            Discover exquisite lighting and furniture that brings warmth, style, and personality to your home.
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="#products">Shop Now</Link>
          </Button>
        </div>
      </section>

      <section id="products" className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Catalog</h2>
            <div className="w-20 h-1 bg-primary mx-auto mt-4 mb-2"></div>
            <p className="mt-2 text-lg text-muted-foreground">Handpicked selections for the modern home.</p>
          </div>

          <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search products..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full md:w-[300px] justify-between h-10">
                    <span className="truncate mr-2">
                      {selectedCategory === 'All' ? 'Filter by Category' : `Category: ${selectedCategory}`}
                    </span>
                    <Filter className="h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl h-[90vh] sm:h-auto sm:max-h-[85vh] flex flex-col p-0 overflow-hidden">
                  <DialogHeader className="p-6 border-b shrink-0 bg-background z-10">
                    <DialogTitle className="text-2xl font-headline text-center sm:text-left">Select Category</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="flex-grow min-h-0">
                    <div className="p-6 space-y-10">
                      <Button 
                        variant={selectedCategory === 'All' ? 'default' : 'outline'} 
                        onClick={() => selectCategoryAndClose('All')}
                        className="w-full font-bold h-12 shadow-sm"
                      >
                        All Products
                      </Button>

                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                          <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                          <h3 className="text-xl font-headline font-bold text-foreground">Furniture</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <Button 
                            variant={selectedCategory === 'Furniture' ? 'secondary' : 'outline'} 
                            onClick={() => selectCategoryAndClose('Furniture')}
                            className="justify-start font-bold italic h-auto py-3 px-4 border-dashed border-primary/40 col-span-2"
                          >
                            Browse All Furniture
                          </Button>
                          {CATEGORY_STRUCTURE.Furniture.map((cat) => (
                            <Button 
                              key={cat}
                              variant={selectedCategory === cat ? 'default' : 'outline'} 
                              onClick={() => selectCategoryAndClose(cat)}
                              className="justify-start h-auto py-3 px-4 text-left whitespace-normal leading-tight text-xs sm:text-sm shadow-sm"
                            >
                              {cat}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                          <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                          <h3 className="text-xl font-headline font-bold text-foreground">Lighting</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <Button 
                            variant={selectedCategory === 'Lighting' ? 'secondary' : 'outline'} 
                            onClick={() => selectCategoryAndClose('Lighting')}
                            className="justify-start font-bold italic h-auto py-3 px-4 border-dashed border-primary/40 col-span-2"
                          >
                            Browse All Lighting
                          </Button>
                          {CATEGORY_STRUCTURE.Lighting.map((cat) => (
                            <Button 
                              key={cat}
                              variant={selectedCategory === cat ? 'default' : 'outline'} 
                              onClick={() => selectCategoryAndClose(cat)}
                              className="justify-start h-auto py-3 px-4 text-left whitespace-normal leading-tight text-xs sm:text-sm shadow-sm"
                            >
                              {cat}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                  <div className="p-4 border-t bg-muted/30 flex justify-end shrink-0">
                    <Button variant="ghost" onClick={() => setIsFilterDialogOpen(false)}>Close</Button>
                  </div>
                </DialogContent>
              </Dialog>
              {selectedCategory !== 'All' && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setSelectedCategory('All')}
                  className="shrink-0"
                  title="Clear Filter"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          
          {currentProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/20 rounded-lg border-2 border-dashed border-muted">
              <p className="text-xl text-muted-foreground">No products found matching your criteria.</p>
              <Button 
                variant="link" 
                onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
                className="mt-2"
              >
                Clear all filters
              </Button>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-12 md:mt-16 flex flex-col items-center gap-4">
              <div className="flex items-center gap-1 md:gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous Page"
                  className="h-8 w-8 md:h-10 md:w-10"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {visiblePages[0] > 1 && (
                  <>
                    <Button
                      variant="outline"
                      className="hidden sm:flex h-8 w-8 md:h-10 md:w-10 p-0"
                      onClick={() => handlePageChange(1)}
                    >
                      1
                    </Button>
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground mx-1" />
                  </>
                )}

                {visiblePages.map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    className="h-8 w-8 md:h-10 md:w-10 p-0 text-xs md:text-sm"
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                ))}

                {visiblePages[visiblePages.length - 1] < totalPages && (
                  <>
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground mx-1" />
                    <Button
                      variant="outline"
                      className="hidden sm:flex h-8 w-8 md:h-10 md:w-10 p-0"
                      onClick={() => handlePageChange(totalPages)}
                    >
                      {totalPages}
                    </Button>
                  </>
                )}

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next Page"
                  className="h-8 w-8 md:h-10 md:w-10"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(startIndex + PRODUCTS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} results
              </p>
            </div>
          )}
        </div>
      </section>

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
              <h2 className="text-3xl md:text-4xl font-headline font-bold">About Berrybby Luxury Lighting & Furnishing</h2>
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

      <section id="contact" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Get In Touch</h2>
            <p className="mt-2 text-lg text-muted-foreground">We'd love to hear from you. Reach out for inquiries or orders.</p>
          </div>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-8 bg-background rounded-lg shadow-sm">
              <Info className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-headline text-xl font-bold mb-2">Call Us</h3>
              <p className="text-muted-foreground">09063927855</p>
            </div>
            <div className="flex flex-col items-center p-8 bg-background rounded-lg shadow-sm">
              <Info className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-headline text-xl font-bold mb-2">Email</h3>
              <p className="text-muted-foreground">berrybbyluxe@gmail.com</p>
            </div>
            <div className="flex flex-col items-center p-8 bg-background rounded-lg shadow-sm">
              <Info className="h-10 w-10 text-primary mb-4" />
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
