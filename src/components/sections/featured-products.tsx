'use client';

import { useQuery } from '@tanstack/react-query';
import { useAppStore } from '@/store/app-store';
import { useCartStore } from '@/store/cart-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Leaf, ShoppingCart, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  price: number;
  company: string;
  category: string;
  imageUrl: string;
  description: string;
}

function ProductCard({ product }: { product: Product }) {
  const { navigate, setSelectedProduct } = useAppStore();
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      company: product.company,
      imageUrl: product.imageUrl,
      category: product.category,
    });
    toast.success(`${product.name} added to cart`);
  };

  const handleViewProduct = () => {
    setSelectedProduct(product.id);
    navigate('product-detail');
  };

  const categoryColors: Record<string, string> = {
    pesticide: 'bg-red-100 text-red-800',
    insecticide: 'bg-orange-100 text-orange-800',
    fungicide: 'bg-yellow-100 text-yellow-800',
    herbicide: 'bg-green-100 text-green-800',
  };

  return (
    <Card
      className="product-card overflow-hidden cursor-pointer group"
      onClick={handleViewProduct}
    >
      <div className="aspect-square bg-agriculture/10 relative overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-agriculture/10 to-leaf/10">
            <Leaf className="h-12 w-12 text-agriculture/40" />
          </div>
        )}
        <Badge
          className={`absolute top-2 right-2 ${categoryColors[product.category] || 'bg-gray-100 text-gray-800'}`}
        >
          {product.category}
        </Badge>
      </div>
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground">{product.company}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            ₹{product.price.toLocaleString()}
          </span>
          <Button
            size="sm"
            className="h-8 text-xs"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-3 w-3 mr-1" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-square" />
      <CardContent className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}

export function FeaturedProducts() {
  const { navigate } = useAppStore();

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () =>
      fetch('/api/products?featured=true').then((r) => r.json()),
  });

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Featured Products
            </h2>
            <p className="text-muted-foreground mt-1">
              Top picks for Kashmir&apos;s farmers
            </p>
          </div>
          <Button
            variant="outline"
            className="hidden sm:flex"
            onClick={() => navigate('products')}
          >
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            : products?.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Button
            variant="outline"
            onClick={() => navigate('products')}
          >
            View All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
