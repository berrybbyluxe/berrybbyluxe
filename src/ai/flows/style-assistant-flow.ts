
'use server';

/**
 * @fileOverview AI Interior Style Assistant Flow
 * Recommends furniture and lighting from the catalog based on user style preferences.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { products } from '@/lib/products';

const RecommendationInputSchema = z.object({
  aesthetic: z.string().describe('The user’s desired home aesthetic or room characteristics.'),
  roomType: z.string().optional().describe('The type of room being decorated (e.g., Living Room, Bedroom).'),
});

export type RecommendationInput = z.infer<typeof RecommendationInputSchema>;

const RecommendationOutputSchema = z.object({
  analysis: z.string().describe('AI analysis of the requested style.'),
  recommendations: z.array(z.object({
    productId: z.string().describe('The ID of the recommended product.'),
    reason: z.string().describe('Why this specific piece fits the user’s aesthetic.'),
  })).describe('List of product recommendations from our catalog.'),
  tips: z.string().describe('General interior design tips for this style.'),
});

export type RecommendationOutput = z.infer<typeof RecommendationOutputSchema>;

const stylePrompt = ai.definePrompt({
  name: 'styleAssistantPrompt',
  input: { schema: RecommendationInputSchema },
  output: { schema: RecommendationOutputSchema },
  prompt: `You are an expert Interior Design Assistant for Berrybby Luxury Lighting & Furnishing.
  
  Your goal is to help customers choose the perfect items from our catalog based on their style preferences.
  
  USER INPUT:
  Aesthetic: {{{aesthetic}}}
  Room Type: {{{roomType}}}
  
  CATALOG DATA:
  Here are the available products in our catalog:
  {{#each products}}
  - ID: {{id}}, Name: {{name}}, Category: {{category}}, Description: {{description}}, Price: ₦{{price}}
  {{/each}}
  
  INSTRUCTIONS:
  1. Analyze the user's aesthetic and room type.
  2. Select 3-5 products from the CATALOG DATA that best match their description.
  3. Provide a brief analysis of their style.
  4. For each recommended product, give a specific reason why it fits.
  5. Offer some professional design tips for achieving their desired look.
  
  Be sophisticated, encouraging, and helpful in your tone.`,
});

export async function getStyleRecommendations(input: RecommendationInput): Promise<RecommendationOutput> {
  const recommendationFlow = ai.defineFlow(
    {
      name: 'recommendationFlow',
      inputSchema: RecommendationInputSchema,
      outputSchema: RecommendationOutputSchema,
    },
    async (input) => {
      const { output } = await stylePrompt({
        ...input,
        products: products.map(p => ({
          id: p.id,
          name: p.name,
          category: p.category,
          description: p.description,
          price: p.price
        }))
      });
      return output!;
    }
  );

  return recommendationFlow(input);
}
