import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const orders = await db.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        items: true,
        refunds: true,
      },
    });

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

    const order = await db.order.create({
      data: {
        customerName,
        customerPhone,
        customerEmail: customerEmail || '',
        address: address || '',
        city: city || 'Srinagar',
        deliveryType: deliveryType || 'home_delivery',
        paymentMethod: paymentMethod || 'cod',
        notes: notes || '',
        totalAmount: totalAmount || 0,
        items: {
          create: items.map((item: { productId: string; productName: string; quantity: number; price: number }) => ({
            productId: item.productId,
            productName: item.productName,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
