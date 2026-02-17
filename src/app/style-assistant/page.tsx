import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { StyleAssistantForm } from '@/components/style-assistant-form';

export default function StyleAssistantPage() {
  const heroImage = getPlaceholderImage('style-assistant-hero');
  return (
    <div>
      <section className="relative w-full h-[50vh] text-white">
        <div className="absolute inset-0 bg-black/60 z-10" />
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
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">
            AI Interior Style Assistant
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-neutral-200">
            Unleash your inner designer. Describe your ideal aesthetic, and let our AI find the perfect pieces for you.
          </p>
        </div>
      </section>

      <div className="bg-background">
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
            <StyleAssistantForm />
        </div>
      </div>
    </div>
  );
}
