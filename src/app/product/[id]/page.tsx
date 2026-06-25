import * as React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { products } from '@/lib/products';
import { ShieldCheck, Truck, Ruler, Package, Star, MessageSquare } from 'lucide-react';
import { ProductPurchaseActions } from '@/components/product-purchase-actions';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

const DOMAIN = 'https://berrybbyluxe.com';
const FALLBACK_IMAGE = "/images/products/berrybby-luxury-lighting-and-furniture-hero-picture.avif";

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.name} | Luxury ${product.category}`,
    description: product.description,
    alternates: { canonical: `/product/${id}` },
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.images[0] || FALLBACK_IMAGE, alt: product.name }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.images[0] || FALLBACK_IMAGE],
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) notFound();

  const mainImage = product.images?.[0] || FALLBACK_IMAGE;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "name": product.name,
        "image": product.images,
        "description": product.description,
        "sku": product.id,
        "brand": {
          "@type": "Brand",
          "name": "Berrybby Luxe Living"
        },
        "offers": {
          "@type": "Offer",
          "url": `${DOMAIN}/product/${product.id}`,
          "priceCurrency": "NGN",
          "price": product.price,
          "availability": product.isSoldOut ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "12"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": DOMAIN
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Catalog",
            "item": `${DOMAIN}/products`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": product.name,
            "item": `${DOMAIN}/product/${product.id}`
          }
        ]
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="container mx-auto px-4 pt-32 pb-24">
        <BreadcrumbNav 
          items={[
            { label: 'Catalog', href: '/products' },
            { label: product.name, href: `/product/${product.id}` }
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-7 space-y-8">
            <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden group">
              <Image
                src={mainImage}
                alt={`${product.name} - Architectural Detail`}
                fill
                className="object-cover transition-transform duration-[3s] group-hover:scale-110"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              {product.isSoldOut && (
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center">
                   <span className="bg-black text-white px-12 py-5 text-sm font-bold tracking-[0.8em] uppercase">Sold Out</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {product.images.slice(1).map((img, i) => (
                <div key={i} className="relative aspect-square bg-stone-100">
                  <Image 
                    src={img} 
                    alt={`${product.name} alternative view ${i + 1}`} 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 30vw"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col sticky top-32 h-fit space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-[0.8em] text-primary font-bold">{product.category}</span>
                <div className="h-[1px] w-8 bg-primary/30" />
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                  ))}
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-headline font-light leading-tight italic">{product.name}</h1>
              <p className="text-3xl font-bold tracking-tight">₦{product.price.toLocaleString()}</p>
              <div className="h-[1px] w-full bg-foreground/5" />
              <p className="text-xl text-muted-foreground font-light leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="space-y-8">
               <div className="grid grid-cols-2 gap-8">
                 {product.dimensions && (
                   <div className="space-y-2">
                     <span className="text-[9px] uppercase tracking-[0.4em] font-bold opacity-50 flex items-center gap-2">
                       <Ruler className="h-3 w-3" /> Dimensions
                     </span>
                     <p className="text-sm font-medium">{product.dimensions}</p>
                   </div>
                 )}
                 {product.material && (
                   <div className="space-y-2">
                     <span className="text-[9px] uppercase tracking-[0.4em] font-bold opacity-50 flex items-center gap-2">
                       <Package className="h-3 w-3" /> Material
                     </span>
                     <p className="text-sm font-medium">{product.material}</p>
                   </div>
                 )}
               </div>

               <ProductPurchaseActions product={product} />
            </div>

            <div className="grid grid-cols-1 gap-6 pt-8 border-t border-foreground/5">
              <div className="flex items-start gap-4">
                <Truck className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1">Nationwide White-Glove Delivery</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">Our specialist logistics team ensures safe transport and placement within your home across Nigeria.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <ShieldCheck className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1">Authenticity Guaranteed</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">Every object comes with a certificate of authenticity and a premium craftsmanship warranty.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-stone-50 py-32 md:py-48">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
            <div className="space-y-10">
              <span className="text-[10px] uppercase tracking-[0.6em] text-primary font-bold">Details</span>
              <h2 className="text-4xl md:text-6xl font-headline font-light">The Narrative <br/> of Design</h2>
              <div className="space-y-6 text-muted-foreground font-light leading-relaxed">
                 <p>At Berrybby Luxe Living, we believe the technical specifications of a piece are as important as its silhouette. This {product.name} is a testament to architectural precision.</p>
                 <p>Each material has been selected for its ability to age gracefully and its interaction with ambient light. This is not just a {product.category.toLowerCase()}, but a permanent addition to your sanctuary.</p>
              </div>
            </div>
            <div className="bg-white p-12 space-y-8 border border-foreground/5 shadow-sm">
               <h3 className="text-xl font-bold uppercase tracking-widest flex items-center gap-4">
                 <MessageSquare className="h-5 w-5 text-primary" /> Care Guide
               </h3>
               <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
                 <p>To preserve the pristine finish of your {product.name}, we recommend regular dusting with a clean, microfibre cloth.</p>
                 <p>Avoid the use of harsh chemical cleaners. For {product.material?.toLowerCase()} surfaces, a slightly damp cloth followed immediately by a dry one will maintain the natural lustre.</p>
                 <p>Professional installation is included for all chandelier collections to ensure structural integrity.</p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
