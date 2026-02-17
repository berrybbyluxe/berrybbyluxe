import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Paintbrush, Sofa, Truck } from 'lucide-react';
import Image from "next/image";
import { getPlaceholderImage } from "@/lib/placeholder-images";


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
    description: 'Enjoy a hassle-free experience with our premium delivery service. We\'ll deliver, unpack, assemble, and place your new furniture for you.',
  },
];

export default function ServicesPage() {
    const servicesImage = getPlaceholderImage('services-1');
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
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
    </div>
  );
}
