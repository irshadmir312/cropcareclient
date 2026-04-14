'use client';

import { useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAppStore } from '@/store/app-store';
import { useCartStore } from '@/store/cart-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Leaf, ShoppingCart, Search, PackageOpen } from 'lucide-react';
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

export function ProductsSection() {
  const { searchQuery, selectedCategory, setSearchQuery, setSelectedCategory } =
    useAppStore();

  const buildQuery = useCallback(() => {
    const params = new URLSearchParams();
    if (selectedCategory && selectedCategory !== 'all') {
      params.set('category', selectedCategory);
    }
    if (searchQuery) {
      params.set('search', searchQuery);
    }
    return `/api/products?${params.toString()}`;
  }, [selectedCategory, searchQuery]);

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', selectedCategory, searchQuery],
    queryFn: () => fetch(buildQuery()).then((r) => r.json()),
  });

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Products
          </h2>
          <p className="text-muted-foreground mt-1">
            Browse our complete range of agricultural products
          </p>
        </div>

        {/* Search */}
        <div className="mb-6 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search pesticides, insecticides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Category Tabs */}
        <Tabs
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="mb-8"
        >
          <TabsList className="flex-wrap h-auto gap-1">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pesticide">Pesticides</TabsTrigger>
            <TabsTrigger value="insecticide">Insecticides</TabsTrigger>
            <TabsTrigger value="fungicide">Fungicides</TabsTrigger>
            <TabsTrigger value="herbicide">Herbicides</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : products?.length === 0 ? (
          <div className="text-center py-16">
            <PackageOpen className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No products found
            </h3>
            <p className="text-muted-foreground text-sm">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products?.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
