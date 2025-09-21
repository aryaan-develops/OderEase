import type { MenuItem } from '@/lib/types';

export const menuData: MenuItem[] = [
  // Appetizers
  { id: 'app1', name: 'Bruschetta', description: 'Toasted bread with tomatoes, garlic, and basil.', price: 8.99, category: 'Appetizers', imageId: 'appetizer1' },
  { id: 'app2', name: 'Stuffed Mushrooms', description: 'Mushroom caps filled with cheese and herbs.', price: 9.99, category: 'Appetizers', imageId: 'appetizer2' },
  { id: 'app3', name: 'Garlic Bread with Cheese', description: 'Classic garlic bread topped with melted mozzarella.', price: 6.99, category: 'Appetizers', imageId: 'appetizer3' },

  // Main Courses
  { id: 'main1', name: 'Spaghetti Carbonara', description: 'Pasta with creamy egg sauce, pancetta, and parmesan.', price: 15.99, category: 'Main Courses', imageId: 'main1' },
  { id: 'main2', name: 'Margherita Pizza', description: 'Classic pizza with tomato, mozzarella, and basil.', price: 14.99, category: 'Main Courses', imageId: 'main2' },
  { id: 'main3', name: 'Grilled Salmon', description: 'Salmon fillet with a side of roasted vegetables.', price: 18.99, category: 'Main Courses', imageId: 'main3' },
  { id: 'main4', name: 'Chicken Parmesan', description: 'Breaded chicken breast with marinara and mozzarella.', price: 16.99, category: 'Main Courses', imageId: 'main4' },

  // Desserts
  { id: 'des1', name: 'Tiramisu', description: 'Coffee-flavored Italian dessert.', price: 7.99, category: 'Desserts', imageId: 'dessert1' },
  { id: 'des2', name: 'Cheesecake', description: 'Creamy cheesecake with a graham cracker crust.', price: 6.99, category: 'Desserts', imageId: 'dessert2' },
  { id: 'des3', name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a gooey center.', price: 8.50, category: 'Desserts', imageId: 'dessert3' },

  // Drinks
  { id: 'drink1', name: 'Mineral Water', description: 'Still or sparkling.', price: 2.99, category: 'Drinks', imageId: 'drink1' },
  { id: 'drink2', name: 'Soft Drink', description: 'Coke, Pepsi, Sprite.', price: 3.50, category: 'Drinks', imageId: 'drink2' },
  { id: 'drink3', name: 'House Wine', description: 'Red or white.', price: 7.00, category: 'Drinks', imageId: 'drink3' },
];

export const menuCategories = ['Appetizers', 'Main Courses', 'Desserts', 'Drinks'];
