'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing intelligent item suggestions
 * to customers based on their current order, available deals, and popular pairings.
 *
 * @exports intelligentItemSuggestion - An async function that takes an order summary as input
 * and returns a list of suggested items or combinations.
 * @exports IntelligentItemSuggestionInput - The input type for the intelligentItemSuggestion function.
 * @exports IntelligentItemSuggestionOutput - The output type for the intelligentItemSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentItemSuggestionInputSchema = z.object({
  orderSummary: z
    .string()
    .describe('A summary of the customer\'s current order, including items and quantities.'),
  availableDeals: z
    .string()
    .optional()
    .describe('A list of available deals or promotions.'),
  popularPairings: z
    .string()
    .optional()
    .describe('A list of popular item pairings or combinations.'),
});
export type IntelligentItemSuggestionInput = z.infer<
  typeof IntelligentItemSuggestionInputSchema
>;

const IntelligentItemSuggestionOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('A list of suggested menu items or combinations.'),
});
export type IntelligentItemSuggestionOutput = z.infer<
  typeof IntelligentItemSuggestionOutputSchema
>;

export async function intelligentItemSuggestion(
  input: IntelligentItemSuggestionInput
): Promise<IntelligentItemSuggestionOutput> {
  return intelligentItemSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentItemSuggestionPrompt',
  input: {schema: IntelligentItemSuggestionInputSchema},
  output: {schema: IntelligentItemSuggestionOutputSchema},
  prompt: `You are a helpful restaurant assistant. A customer has the following order:

Order Summary: {{{orderSummary}}}

Based on their order, suggest additional items or combinations that would complement their meal. Consider the following information when making your suggestions:

Available Deals: {{{availableDeals}}}

Popular Pairings: {{{popularPairings}}}

Suggestions:`,
});

const intelligentItemSuggestionFlow = ai.defineFlow(
  {
    name: 'intelligentItemSuggestionFlow',
    inputSchema: IntelligentItemSuggestionInputSchema,
    outputSchema: IntelligentItemSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
