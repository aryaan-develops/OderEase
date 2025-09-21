'use client';

import { useState } from 'react';
import { menuData, menuCategories } from '@/data/menu';
import type { MenuItem, OrderItem } from '@/lib/types';
import { Header } from '@/components/layout/header';
import { MenuItemCard } from '@/components/menu/menu-item-card';
import { OrderSummary } from '@/components/order/order-summary';
import { useToast } from '@/hooks/use-toast';
import { ChefHat } from 'lucide-react';

export default function DineTablePage() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [tableNumber, setTableNumber] = useState('');
  const { toast } = useToast();

  const handleAddToOrder = (itemToAdd: MenuItem) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.menuItem.id === itemToAdd.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.menuItem.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { menuItem: itemToAdd, quantity: 1 }];
    });
    toast({
      title: "Added to order",
      description: `${itemToAdd.name} has been added to your order.`,
    });
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    setOrderItems((prevItems) =>
      prevItems.map((item) =>
        item.menuItem.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setOrderItems((prevItems) => prevItems.filter((item) => item.menuItem.id !== itemId));
  };

  const handlePlaceOrder = () => {
    // Here you would typically send the order to the backend API POST /api/order
    toast({
      title: "✅ Order Placed Successfully!",
      description: `Your order for table ${tableNumber} has been sent to the kitchen.`,
      variant: 'default',
      duration: 5000,
    });
    // Reset state after placing order
    setOrderItems([]);
    setTableNumber('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2 space-y-12">
            {menuCategories.map((category) => {
              const items = menuData.filter((item) => item.category === category);
              if (items.length === 0) return null;
              return (
                <section key={category} id={category.toLowerCase().replace(' ', '-')}>
                  <div className="flex items-center gap-3 mb-6">
                    <ChefHat className="h-8 w-8 text-accent" />
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">
                      {category}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {items.map((item) => (
                      <MenuItemCard key={item.id} item={item} onAddToOrder={handleAddToOrder} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
          <aside className="lg:col-span-1 mt-12 lg:mt-0">
            <OrderSummary
              orderItems={orderItems}
              tableNumber={tableNumber}
              onTableNumberChange={setTableNumber}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onPlaceOrder={handlePlaceOrder}
            />
          </aside>
        </div>
      </main>
    </div>
  );
}
