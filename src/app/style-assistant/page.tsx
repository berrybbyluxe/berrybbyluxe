
'use client';

import * as React from 'react';
import { Sparkles, Loader2, ArrowRight, Home, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { products } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { getStyleRecommendations, type RecommendationOutput } from '@/ai/flows/style-assistant-flow';
import { useToast } from '@/hooks/use-toast';

export default function StyleAssistantPage() {
  const { toast } = useToast();
  const [aesthetic, setAesthetic] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<RecommendationOutput | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aesthetic.trim()) {
      toast({
        title: "Please describe your style",
        description: "Tell us a bit about what you're looking for to get recommendations.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const data = await getStyleRecommendations({ aesthetic });
      setResult(data);
    } catch (error) {
      console.error(error);
      toast({
        title: "Something went wrong",
        description: "We couldn't generate recommendations right now. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const recommendedProducts = React.useMemo(() => {
    if (!result) return [];
    return result.recommendations
      .map(rec => {
        const product = products.find(p => p.id === rec.productId);
        if (!product) return null;
        return { ...product, reason: rec.reason };
      })
      .filter((p): p is any => p !== null);
  }, [result]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-semibold uppercase tracking-wider">AI Powered</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">Interior Style Assistant</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Describe your dream space, and our AI will curate a collection of Berrybby pieces tailored to your aesthetic.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <Card className="sticky top-24 shadow-lg border-primary/20">
            <CardHeader>
              <CardTitle className="font-headline">Describe Your Vision</CardTitle>
              <CardDescription>
                Mention colors, moods, or specific room types (e.g., "A moody industrial office" or "Warm minimalist living room").
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Textarea
                  placeholder="Tell us about the space you want to create..."
                  className="min-h-[200px] resize-none text-base"
                  value={aesthetic}
                  onChange={(e) => setAesthetic(e.target.value)}
                />
                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing Style...
                    </>
                  ) : (
                    <>
                      Get Expert Recommendations
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-7">
          {result ? (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <section className="bg-muted/30 p-8 rounded-2xl border border-muted">
                <h2 className="text-2xl font-headline font-bold mb-4 flex items-center gap-2">
                  <Home className="h-6 w-6 text-primary" />
                  Design Analysis
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {result.analysis}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-headline font-bold mb-8 flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  Curated for You
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {recommendedProducts.map((product) => (
                    <div key={product.id} className="space-y-4">
                      <ProductCard product={product} />
                      <div className="bg-primary/5 p-4 rounded-lg border border-primary/10 text-sm italic">
                        <strong>Why it works:</strong> {product.reason}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-primary text-primary-foreground p-8 rounded-2xl">
                <h2 className="text-2xl font-headline font-bold mb-4 flex items-center gap-2">
                  <Lightbulb className="h-6 w-6" />
                  Pro Styling Tips
                </h2>
                <p className="text-lg leading-relaxed opacity-90">
                  {result.tips}
                </p>
              </section>

              <div className="text-center pt-8">
                <Button variant="outline" onClick={() => {setResult(null); setAesthetic('');}}>
                  Start a New Consultation
                </Button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-muted rounded-2xl min-h-[400px]">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
                <Sparkles className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-headline font-semibold mb-2">Ready to Dazzle?</h3>
              <p className="text-muted-foreground max-w-sm">
                Fill out the form to the left to see personalized recommendations from our luxury collection.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
