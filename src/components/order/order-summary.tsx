'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import type { OrderItem } from '@/lib/types';
import { OrderSummaryItem } from './order-summary-item';
import { AiSuggester } from './ai-suggester';

interface OrderSummaryProps {
  orderItems: OrderItem[];
  tableNumber: string;
  onTableNumberChange: (table: string) => void;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onPlaceOrder: () => void;
}

export function OrderSummary({
  orderItems,
  tableNumber,
  onTableNumberChange,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
}: OrderSummaryProps) {
  const total = orderItems.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Your Order</CardTitle>
        <CardDescription>Review your items and place your order.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="table-number" className="font-semibold">Table Number</Label>
          <Input
            id="table-number"
            type="text"
            placeholder="e.g., 12"
            value={tableNumber}
            onChange={(e) => onTableNumberChange(e.target.value)}
            className="mt-2"
          />
        </div>

        <Separator />
        
        {orderItems.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">Your order is empty.</p>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
            {orderItems.map((item) => (
              <OrderSummaryItem
                key={item.menuItem.id}
                orderItem={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemoveItem={onRemoveItem}
              />
            ))}
          </div>
        )}

        {orderItems.length > 0 && (
          <>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </>
        )}
        
        <Separator />
        
        <AiSuggester currentOrder={orderItems} />

      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          size="lg" 
          onClick={onPlaceOrder}
          disabled={orderItems.length === 0 || !tableNumber}
        >
          Place Dine-in Order
        </Button>
      </CardFooter>
    </Card>
  );
}
