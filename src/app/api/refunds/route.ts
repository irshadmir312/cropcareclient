import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const refunds = await db.refund.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        order: true,
      },
    });

    return NextResponse.json(refunds);
  } catch (error) {
    console.error('Error fetching refunds:', error);
    return NextResponse.json({ error: 'Failed to fetch refunds' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, reason, description, refundType, amount } = body;

    if (!orderId || !reason) {
      return NextResponse.json(
        { error: 'Order ID and reason are required' },
        { status: 400 }
      );
    }

    const refund = await db.refund.create({
      data: {
        orderId,
        reason,
        description: description || '',
        refundType: refundType || 'store_credit',
        amount: amount || 0,
      },
    });

    return NextResponse.json(refund, { status: 201 });
  } catch (error) {
    console.error('Error creating refund:', error);
    return NextResponse.json({ error: 'Failed to create refund request' }, { status: 500 });
  }
}
