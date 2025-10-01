// Use server directive is required for Genkit Flows.
'use server';

/**
 * @fileOverview An AI-powered copy refinement tool that suggests improved copy variations for the landing page,
 * incorporating SEO keywords and persuasive language to increase conversion rates.
 *
 * - refineCopy - A function that takes the original copy and SEO keywords as input and returns suggested copy variations.
 * - RefineCopyInput - The input type for the refineCopy function.
 * - RefineCopyOutput - The return type for the refineCopy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the copy refinement flow
const RefineCopyInputSchema = z.object({
  originalCopy: z
    .string()
    .describe('The original copy of the landing page section.'),
  seoKeywords: z
    .string()
    .describe(
      'A comma-separated list of SEO keywords to incorporate into the copy.'
    ),
  brandName: z.string().describe('The name of the brand.'),
});
export type RefineCopyInput = z.infer<typeof RefineCopyInputSchema>;

// Define the output schema for the copy refinement flow
const RefineCopyOutputSchema = z.object({
  refinedCopy: z
    .string()
    .describe('The refined copy with incorporated SEO keywords and persuasive language.'),
  explanation: z
    .string()
    .describe('An explanation of the changes made and why they were made.'),
});
export type RefineCopyOutput = z.infer<typeof RefineCopyOutputSchema>;

// Exported function to refine copy
export async function refineCopy(input: RefineCopyInput): Promise<RefineCopyOutput> {
  return refineCopyFlow(input);
}

// Define the prompt for copy refinement
const refineCopyPrompt = ai.definePrompt({
  name: 'refineCopyPrompt',
  input: {schema: RefineCopyInputSchema},
  output: {schema: RefineCopyOutputSchema},
  prompt: `You are a marketing expert with a deep understanding of SEO and persuasive language.
  Your goal is to refine the provided landing page copy to increase conversion rates.

  Here's the original copy:
  {{originalCopy}}

  Here are the SEO keywords you should incorporate:
  {{seoKeywords}}

  Here is the brand name:
  {{brandName}}

  Please provide the refined copy, making it more engaging and persuasive while incorporating the SEO keywords.
  Also, provide a brief explanation of the changes you made and why they were made to increase conversion rates.

  Refined Copy:
  Refined copy should include a call to action, incorporate keywords, explain the value proposition and be persuasive.

  Explanation:
  Explanation should justify the changes that were made to the original copy to be more persuasive.
  `,
});

// Define the Genkit flow for copy refinement
const refineCopyFlow = ai.defineFlow(
  {
    name: 'refineCopyFlow',
    inputSchema: RefineCopyInputSchema,
    outputSchema: RefineCopyOutputSchema,
  },
  async input => {
    const {output} = await refineCopyPrompt(input);
    return output!;
  }
);
