export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageId: string;
}

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
}
