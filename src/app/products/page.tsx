'use client';

import * as React from 'react';
import { products } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const PRODUCTS_PER_PAGE = 12;

const CATEGORY_STRUCTURE = {
  'Furniture': [
    'Bedroom', 
    'Dining Set', 
    'House Decoratives',
    'Living Room', 
    'Office', 
    'Side Lamps & Standing Lamps',
    'Turkey Collection',
    'Vass Flower'
  ],
  'Lighting': [
    'Bulbs',
    'Ceiling & Pop Lighting', 
    'Chandelier Lighting', 
    'Outdoor Lighting', 
    'Pendant & Drop Lighting', 
    'Switches & Sockets',
    'Wall Bracket Lighting'
  ]
};

export default function ProductsPage() {
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [sortBy, setSortBy] = React.useState('featured');
  const [isFilterDialogOpen, setIsFilterDialogOpen] = React.useState(false);

  const filteredProducts = React.useMemo(() => {
    let result = products.filter((product) => {
      const name = (product.name || '').toLowerCase();
      const description = (product.description || '').toLowerCase();
      const query = searchQuery.toLowerCase();
      const matchesSearch = name.includes(query) || description.includes(query);
      
      let matchesCategory = false;
      if (selectedCategory === 'All') {
        matchesCategory = true;
      } else if (selectedCategory === 'Furniture') {
        matchesCategory = CATEGORY_STRUCTURE.Furniture.includes(product.category || '');
      } else if (selectedCategory === 'Lighting') {
        matchesCategory = CATEGORY_STRUCTURE.Lighting.includes(product.category || '');
      } else {
        matchesCategory = product.category === selectedCategory;
      }
      
      return matchesSearch && matchesCategory;
    });

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => b.id.localeCompare(a.id));
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const currentProducts = filteredProducts.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="flex flex-col bg-background">
      {/* Editorial Header */}
      <section className="pt-32 sm:pt-48 pb-16 sm:pb-24 px-4 border-b border-foreground/5">
        <div className="container mx-auto">
          <div className="max-w-4xl space-y-6 sm:space-y-8">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.6em] sm:tracking-[0.8em] text-primary font-bold">The Catalog</span>
            <h1 className="text-5xl sm:text-6xl md:text-9xl font-headline font-light italic leading-none">Curated <br className="hidden sm:block" /> Masterpieces.</h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-light max-w-2xl leading-relaxed">
              Explore our complete collection of architectural lighting and modern furniture designed for the most distinguished sanctuaries in Nigeria.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Pro Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-center justify-between mb-16 sm:mb-24">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full lg:w-auto">
             <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto rounded-none h-12 px-6 sm:px-8 uppercase text-[10px] tracking-widest font-bold flex items-center justify-center gap-4">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filter {selectedCategory !== 'All' && `(${selectedCategory})`}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-none bg-background">
                <DialogHeader className="p-6 sm:p-10 border-b text-left">
                  <DialogTitle className="text-2xl sm:text-3xl font-headline font-light italic">Refine Selection</DialogTitle>
                </DialogHeader>
                <div className="p-6 sm:p-10 space-y-8 sm:space-y-10">
                   <div className="space-y-4">
                     <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">Filter by Space</span>
                     <Tabs defaultValue="furniture" className="w-full">
                       <TabsList className="bg-muted p-1 rounded-none w-full grid grid-cols-2 h-12">
                         <TabsTrigger value="furniture" className="rounded-none uppercase text-[10px] tracking-widest font-bold">Furniture</TabsTrigger>
                         <TabsTrigger value="lighting" className="rounded-none uppercase text-[10px] tracking-widest font-bold">Lighting</TabsTrigger>
                       </TabsList>
                       <ScrollArea className="h-[250px] sm:h-[300px] mt-6 pr-4">
                         <TabsContent value="furniture" className="m-0 grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {CATEGORY_STRUCTURE.Furniture.map(cat => (
                              <Button key={cat} variant={selectedCategory === cat ? 'default' : 'ghost'} onClick={() => {setSelectedCategory(cat); setIsFilterDialogOpen(false);}} className="justify-start text-left h-auto py-3 px-4 text-xs font-medium">
                                {cat}
                              </Button>
                            ))}
                         </TabsContent>
                         <TabsContent value="lighting" className="m-0 grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {CATEGORY_STRUCTURE.Lighting.map(cat => (
                              <Button key={cat} variant={selectedCategory === cat ? 'default' : 'ghost'} onClick={() => {setSelectedCategory(cat); setIsFilterDialogOpen(false);}} className="justify-start text-left h-auto py-3 px-4 text-xs font-medium">
                                {cat}
                              </Button>
                            ))}
                         </TabsContent>
                       </ScrollArea>
                     </Tabs>
                   </div>
                   <Button variant="outline" className="w-full rounded-none h-14 uppercase text-[10px] tracking-widest font-bold" onClick={() => {setSelectedCategory('All'); setIsFilterDialogOpen(false);}}>
                      Clear All Filters
                   </Button>
                </div>
              </DialogContent>
            </Dialog>

            <div className="relative flex-grow w-full lg:w-[400px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-50" />
              <Input 
                placeholder="Search collection..." 
                className="pl-12 h-12 rounded-none border-foreground/10 focus:border-primary transition-all text-xs tracking-widest bg-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 w-full lg:w-auto">
             <span className="text-[10px] uppercase tracking-widest font-bold opacity-50 whitespace-nowrap hidden sm:block">Sort By</span>
             <Select value={sortBy} onValueChange={setSortBy}>
               <SelectTrigger className="w-full lg:w-[200px] rounded-none h-12 border-foreground/10 text-[10px] uppercase tracking-widest font-bold">
                 <SelectValue placeholder="Sort" />
               </SelectTrigger>
               <SelectContent className="rounded-none border-none shadow-2xl">
                 <SelectItem value="featured" className="text-[10px] uppercase tracking-widest font-bold">Featured</SelectItem>
                 <SelectItem value="newest" className="text-[10px] uppercase tracking-widest font-bold">Newest</SelectItem>
                 <SelectItem value="price-low" className="text-[10px] uppercase tracking-widest font-bold">Price: Low to High</SelectItem>
                 <SelectItem value="price-high" className="text-[10px] uppercase tracking-widest font-bold">Price: High to Low</SelectItem>
               </SelectContent>
             </Select>
          </div>
        </div>
        
        {/* Product Grid */}
        {currentProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-12 gap-y-16 sm:gap-y-32">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 sm:py-48 border border-dashed border-foreground/10">
            <p className="text-2xl sm:text-3xl font-headline font-light italic text-muted-foreground">No masterpieces found.</p>
            <Button variant="link" onClick={() => {setSearchQuery(''); setSelectedCategory('All');}} className="mt-8 uppercase text-[10px] tracking-widest font-bold">
              Return to main collection
            </Button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-24 sm:mt-48 flex justify-center items-center gap-6 sm:gap-16 border-t pt-10 sm:pt-12">
            <Button
              variant="ghost"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="group flex items-center gap-2 sm:gap-4 text-[9px] sm:text-[10px] uppercase tracking-widest font-bold"
            >
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 sm:group-hover:-translate-x-2" />
              <span className="hidden sm:inline">Prev</span>
            </Button>
            <div className="flex items-center gap-2 sm:gap-4">
               <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest opacity-50">Pg</span>
               <span className="text-lg sm:text-xl font-headline italic">{currentPage}</span>
               <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest opacity-30">/</span>
               <span className="text-lg sm:text-xl font-headline italic opacity-50">{totalPages}</span>
            </div>
            <Button
              variant="ghost"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="group flex items-center gap-2 sm:gap-4 text-[9px] sm:text-[10px] uppercase tracking-widest font-bold"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1 sm:group-hover:translate-x-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
