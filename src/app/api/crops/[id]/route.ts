import { NextRequest, NextResponse } from 'next/server';
import { crops_static } from '@/lib/static-data';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const crop = crops_static.find((c) => c.id === id);

    if (!crop) {
      return NextResponse.json({ error: 'Crop not found' }, { status: 404 });
    }

    return NextResponse.json(crop);
  } catch (error) {
    console.error('Error fetching crop:', error);
    return NextResponse.json({ error: 'Failed to fetch crop' }, { status: 500 });
  }
}
