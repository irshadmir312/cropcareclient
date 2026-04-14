import { NextRequest, NextResponse } from 'next/server';
import { products_static } from '@/lib/static-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const cropId = searchParams.get('cropId');

    let result = [...products_static];

    if (category && category !== 'all') {
      result = result.filter((p) => p.category === category);
    }

    if (featured === 'true') {
      result = result.filter((p) => p.featured);
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.company.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (cropId) {
      result = result.filter((p) => p.cropIds.split(',').includes(cropId));
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
