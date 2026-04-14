import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const crops = await db.crop.findMany({
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json(crops);
  } catch (error) {
    console.error('Error fetching crops:', error);
    return NextResponse.json({ error: 'Failed to fetch crops' }, { status: 500 });
  }
}
