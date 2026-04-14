import { NextResponse } from 'next/server';
import { crops_static } from '@/lib/static-data';

export async function GET() {
  try {
    return NextResponse.json(crops_static);
  } catch (error) {
    console.error('Error fetching crops:', error);
    return NextResponse.json({ error: 'Failed to fetch crops' }, { status: 500 });
  }
}
