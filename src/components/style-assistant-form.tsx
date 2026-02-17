'use client';

import { useActionState, useEffect, useRef } from 'react';
import { getStyleRecommendation } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const initialState = {
  furnitureRecommendations: [],
  decorRecommendations: [],
  designRationale: '',
  error: null,
};

export function StyleAssistantForm() {
  const [state, formAction, isPending] = useActionState(getStyleRecommendation, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(!isPending && !state.error && state.timestamp) {
      formRef.current?.reset();
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state, isPending]);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Wand2 className="h-6 w-6 text-primary" />
            Describe Your Dream Room
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction} className="space-y-4">
            <div>
              <Label htmlFor="description" className="text-lg">Your Vision</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="e.g., 'I want a cozy, minimalist living room with natural light, plants, and a comfortable reading corner. I love neutral colors like beige and grey, with a touch of warmth from wood elements.'"
                rows={6}
                className="mt-2"
                required
                minLength={10}
              />
               <p className="text-sm text-muted-foreground mt-2">The more detail, the better the recommendation!</p>
            </div>
            <Button type="submit" disabled={isPending} className="w-full md:w-auto bg-accent hover:bg-accent/90">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Ideas...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Get Recommendations
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {isPending && (
         <div className="flex justify-center items-center flex-col gap-4 text-center p-8">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <h3 className="text-xl font-semibold text-muted-foreground">Our AI is styling your space...</h3>
          </div>
      )}

      {state.error && (
        <Alert variant="destructive">
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {!isPending && !state.error && state.furnitureRecommendations.length > 0 && (
        <div ref={resultsRef} className="space-y-8 animate-in fade-in-50 duration-500">
          <h2 className="text-3xl font-headline font-bold text-center">Your Style Recommendations</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Furniture Picks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  {state.furnitureRecommendations.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Decor Ideas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  {state.decorRecommendations.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Design Rationale</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{state.designRationale}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
