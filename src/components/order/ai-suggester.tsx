'use client';

import { intelligentItemSuggestion } from '@/ai/flows/intelligent-item-suggestion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { OrderItem } from '@/lib/types';
import { Sparkles, Lightbulb } from 'lucide-react';
import { useState, useTransition } from 'react';

interface AiSuggesterProps {
  currentOrder: OrderItem[];
}

const availableDeals = "Deal of the day: Get a free drink with any pizza. Combo offer: Spaghetti + Garlic Bread for $20.";
const popularPairings = "Popular: Bruschetta with House Wine. Margherita Pizza with a soft drink. Grilled Salmon is often paired with Mineral Water.";

export function AiSuggester({ currentOrder }: AiSuggesterProps) {
  const [isPending, startTransition] = useTransition();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGetSuggestions = () => {
    if (currentOrder.length === 0) {
      setError("Add items to your order to get suggestions.");
      setSuggestions([]);
      return;
    }

    const orderSummary = currentOrder.map(item => `${item.quantity}x ${item.menuItem.name}`).join(', ');

    startTransition(async () => {
      setError(null);
      setSuggestions([]);
      try {
        const result = await intelligentItemSuggestion({
          orderSummary,
          availableDeals,
          popularPairings,
        });
        setSuggestions(result.suggestions);
      } catch (e) {
        setError("Sorry, I couldn't get suggestions right now. Please try again later.");
        console.error(e);
      }
    });
  };

  return (
    <Card className="bg-secondary/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-lg">
          <Sparkles className="h-5 w-5 text-primary" />
          Intelligent Suggestions
        </CardTitle>
        <CardDescription>
          Let our AI find the perfect additions to your meal.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleGetSuggestions} disabled={isPending} className="w-full">
          {isPending ? 'Thinking...' : 'Get Suggestions'}
        </Button>
        
        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

        {suggestions.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="font-semibold">You might also like:</h4>
            <ul className="list-none space-y-2">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Lightbulb className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
