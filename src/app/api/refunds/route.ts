import { NextRequest, NextResponse } from 'next/server';
import { getAllRefunds, createRefund } from '@/lib/static-data';

export async function GET() {
  try {
    const refunds = getAllRefunds();
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

    const refund = createRefund({
      orderId,
      reason,
      description,
      refundType,
      amount,
    });

    return NextResponse.json(refund, { status: 201 });
  } catch (error) {
    console.error('Error creating refund:', error);
    return NextResponse.json({ error: 'Failed to create refund request' }, { status: 500 });
  }
}
