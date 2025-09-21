import { UtensilsCrossed } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-center px-4 md:px-6">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground">
            DineTable
          </h1>
        </div>
      </div>
    </header>
  );
}
