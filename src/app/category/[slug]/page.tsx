
import * as React from 'react';
import type { Metadata } from 'next';
import { products } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { notFound } from 'next/navigation';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const DOMAIN = 'https://berrybbyluxe.com';

const CATEGORY_MAP: Record<string, { title: string; categories: string[]; description: string }> = {
  'bedroom': {
    title: 'Luxury Bedroom Collections',
    categories: ['Bedroom'],
    description: 'Transform your resting space with premium beds, wardrobes, and bedside solutions.',
  },
  'dining-set': {
    title: 'Exquisite Dining Sets',
    categories: ['Dining Set'],
    description: 'Elevate your culinary experience with Italian-designed dining tables and plush seating.',
  },
  'house-decoratives': {
    title: 'Premium House Decoratives',
    categories: ['House Decoratives'],
    description: 'Bespoke artifacts and decorative pieces to add personality and prestige to your home.',
  },
  'living-room': {
    title: 'Designer Living Room Sets',
    categories: ['Living Room'],
    description: 'Architectural sofas and living room ensembles crafted for maximum comfort and style.',
  },
  'office': {
    title: 'Elite Office Furniture',
    categories: ['Office'],
    description: 'Professional executive furniture that blends productivity with high-end aesthetic.',
  },
  'side-standing-lamps': {
    title: 'Side & Standing Lamps',
    categories: ['Side Lamps', 'Standing Lamps'],
    description: 'Versatile accent lighting to set the mood in any room of your sanctuary.',
  },
  'turkey': {
    title: 'Turkey Royal Collections',
    categories: ['Turkey Collections'],
    description: 'Authentic high-end furniture imported from Turkey, featuring royal velvet and gold leaf accents.',
  },
  'bulbs': {
    title: 'Luxury Lighting Bulbs',
    categories: ['Bulbs'],
    description: 'Premium LED and decorative bulbs to illuminate your high-end fixtures perfectly.',
  },
  'ceiling-lighting': {
    title: 'Ceiling & POP Lighting',
    categories: ['Ceiling & Pop Lighting'],
    description: 'Integrated lighting solutions for modern POP ceiling designs and architectural spaces.',
  },
  'chandeliers': {
    title: 'Grand Chandelier Collections',
    categories: ['Chandelier Lighting'],
    description: 'Spectacular crystal and metal chandeliers that serve as the crown of any room.',
  },
  'outdoor-lighting': {
    title: 'Durable Outdoor Lighting',
    categories: ['Outdoor Lighting'],
    description: 'Weather-resistant and stylish lighting for gardens, driveways, and estate perimeters.',
  },
  'pendant-lighting': {
    title: 'Pendant & Drop Lighting',
    categories: ['Pendant & Drop Lighting'],
    description: 'Contemporary drop lights designed for dining islands and modern kitchen spaces.',
  },
  'switches-sockets': {
    title: 'Designer Switches & Sockets',
    categories: ['Switches & Sockets'],
    description: 'Luxury electrical fittings that provide safety and a refined finish to your walls.',
  },
  'wall-brackets': {
    title: 'Elegant Wall Bracket Lighting',
    categories: ['Wall Bracket Lighting'],
    description: 'Sophisticated wall-mounted lighting using K9 crystals and premium finishes.',
  },
};

export async function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = CATEGORY_MAP[slug];

  if (!config) {
    return { title: 'Category Not Found' };
  }

  return {
    title: config.title,
    description: config.description,
    alternates: {
      canonical: `/category/${slug}`,
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url: `${DOMAIN}/category/${slug}`,
    }
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const config = CATEGORY_MAP[slug];

  if (!config) {
    notFound();
  }

  const filteredProducts = products.filter((p) => config.categories.includes(p.category));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "name": config.title,
        "description": config.description,
        "url": `${DOMAIN}/category/${slug}`,
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": filteredProducts.map((p, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `${DOMAIN}/product/${p.id}`
          }))
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
            "name": "Collections",
            "item": `${DOMAIN}/products`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": config.title,
            "item": `${DOMAIN}/category/${slug}`
          }
        ]
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <BreadcrumbNav 
        items={[
          { label: 'Collections', href: '/products' },
          { label: config.title, href: `/category/${slug}` }
        ]}
      />
      
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-light italic mb-6">{config.title}</h1>
        <p className="text-xl text-muted-foreground font-light leading-relaxed">{config.description}</p>
        <div className="w-20 h-[1px] bg-primary mx-auto mt-8"></div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-32">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-muted/20 rounded-none border border-dashed">
          <p className="text-xl text-muted-foreground font-light">No products found in this collection.</p>
        </div>
      )}
    </div>
  );
}
