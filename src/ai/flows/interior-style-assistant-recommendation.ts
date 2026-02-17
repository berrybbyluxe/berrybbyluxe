'use server';
/**
 * @fileOverview An AI interior style assistant that recommends furniture and decor based on user input.
 *
 * - interiorStyleAssistantRecommendation - A function that handles the style recommendation process.
 * - InteriorStyleAssistantRecommendationInput - The input type for the recommendation function.
 * - InteriorStyleAssistantRecommendationOutput - The return type for the recommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InteriorStyleAssistantRecommendationInputSchema = z.object({
  description: z
    .string()
    .describe('A detailed description of the desired home aesthetic or room characteristics.'),
});
export type InteriorStyleAssistantRecommendationInput = z.infer<
  typeof InteriorStyleAssistantRecommendationInputSchema
>;

const InteriorStyleAssistantRecommendationOutputSchema = z.object({
  furnitureRecommendations: z
    .array(z.string())
    .describe('A list of recommended furniture pieces that match the described style.'),
  decorRecommendations: z
    .array(z.string())
    .describe('A list of recommended decor combinations or items that match the described style.'),
  designRationale: z
    .string()
    .describe('An explanation of why these recommendations were made based on the provided description.'),
});
export type InteriorStyleAssistantRecommendationOutput = z.infer<
  typeof InteriorStyleAssistantRecommendationOutputSchema
>;

export async function interiorStyleAssistantRecommendation(
  input: InteriorStyleAssistantRecommendationInput
): Promise<InteriorStyleAssistantRecommendationOutput> {
  return interiorStyleAssistantRecommendationFlow(input);
}

const recommendationPrompt = ai.definePrompt({
  name: 'interiorStyleAssistantRecommendationPrompt',
  input: {schema: InteriorStyleAssistantRecommendationInputSchema},
  output: {schema: InteriorStyleAssistantRecommendationOutputSchema},
  prompt: `You are an expert interior design assistant for a furniture brand named Berrybby. Your goal is to provide personalized furniture and decor recommendations based on a user's desired home aesthetic or specific room characteristics.

Based on the following description, recommend suitable furniture pieces and decor combinations. Also, provide a brief rationale for your recommendations.

Description: {{{description}}}`,
});

const interiorStyleAssistantRecommendationFlow = ai.defineFlow(
  {
    name: 'interiorStyleAssistantRecommendationFlow',
    inputSchema: InteriorStyleAssistantRecommendationInputSchema,
    outputSchema: InteriorStyleAssistantRecommendationOutputSchema,
  },
  async input => {
    const {output} = await recommendationPrompt(input);
    if (!output) {
      throw new Error('Failed to generate interior style recommendations.');
    }
    return output;
  }
);
