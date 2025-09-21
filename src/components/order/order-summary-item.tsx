'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { OrderItem } from '@/lib/types';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface OrderSummaryItemProps {
  orderItem: OrderItem;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

export function OrderSummaryItem({ orderItem, onUpdateQuantity, onRemoveItem }: OrderSummaryItemProps) {
  const handleQuantityChange = (change: number) => {
    const newQuantity = orderItem.quantity + change;
    if (newQuantity > 0) {
      onUpdateQuantity(orderItem.menuItem.id, newQuantity);
    } else {
      onRemoveItem(orderItem.menuItem.id);
    }
  };

  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="font-semibold">{orderItem.menuItem.name}</p>
        <p className="text-sm text-muted-foreground">${orderItem.menuItem.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(-1)}>
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-6 text-center">{orderItem.quantity}</span>
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(1)}>
          <Plus className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => onRemoveItem(orderItem.menuItem.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
