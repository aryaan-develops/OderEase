import mongoose, { Document, Schema, models, model } from 'mongoose';
import type { OrderItem, MenuItem } from '@/lib/types';

const MenuItemSchema = new Schema<MenuItem>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageId: { type: String, required: true },
}, { _id: false });


const OrderItemSchema = new Schema<OrderItem>({
  menuItem: { type: MenuItemSchema, required: true },
  quantity: { type: Number, required: true },
}, { _id: false });

export interface IOrder extends Document {
  tableNumber: string;
  items: OrderItem[];
  total: number;
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>({
  tableNumber: {
    type: String,
    required: true,
  },
  items: [OrderItemSchema],
  total: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = models.Order || model<IOrder>('Order', OrderSchema);

export default Order;
