import { NextRequest, NextResponse } from 'next/server';
import { getAllOrders, createOrder } from '@/lib/static-data';

export async function GET() {
  try {
    const orders = getAllOrders();
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerPhone,
      customerEmail,
      address,
      city,
      deliveryType,
      paymentMethod,
      notes,
      items,
      totalAmount,
    } = body;

    if (!customerName || !customerPhone || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Name, phone, and items are required' },
        { status: 400 }
      );
    }

    const order = createOrder({
      customerName,
      customerPhone,
      customerEmail,
      address,
      city,
      deliveryType,
      paymentMethod,
      notes,
      items,
      totalAmount,
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
