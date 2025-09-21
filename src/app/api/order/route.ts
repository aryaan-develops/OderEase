import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { tableNumber, items, total } = body;

    if (!tableNumber || !items || items.length === 0 || total === undefined) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const newOrder = new Order({
      tableNumber,
      items,
      total,
    });

    await newOrder.save();

    return NextResponse.json({ message: 'Order created successfully', order: newOrder }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
