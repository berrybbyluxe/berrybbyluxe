'use server';

import {
  interiorStyleAssistantRecommendation,
  type InteriorStyleAssistantRecommendationOutput,
} from '@/ai/flows/interior-style-assistant-recommendation';

type FormState = InteriorStyleAssistantRecommendationOutput & {
  error?: string | null;
  timestamp?: number;
};

export async function getStyleRecommendation(prevState: FormState, formData: FormData): Promise<FormState> {
  const description = formData.get('description') as string;
  if (!description || description.trim().length < 10) {
    return {
      furnitureRecommendations: [],
      decorRecommendations: [],
      designRationale: '',
      error: 'Please enter a more detailed description (at least 10 characters).',
    };
  }

  try {
    const result = await interiorStyleAssistantRecommendation({ description });
    return { ...result, error: null, timestamp: Date.now() };
  } catch (error) {
    console.error(error);
    return {
      furnitureRecommendations: [],
      decorRecommendations: [],
      designRationale: '',
      error: 'Sorry, we couldn\'t generate recommendations at this time. Please try again later.',
    };
  }
}
