'use client';

import { useQuery } from '@tanstack/react-query';
import { useAppStore } from '@/store/app-store';
import { useCartStore } from '@/store/cart-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  ShoppingCart,
  Leaf,
  Minus,
  Plus,
  Zap,
  Package,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  price: number;
  company: string;
  category: string;
  imageUrl: string;
  description: string;
  usage: string;
  inStock: boolean;
  featured: boolean;
}

export function ProductDetailSection() {
  const { selectedProductId, navigate } = useAppStore();
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', selectedProductId],
    queryFn: () =>
      selectedProductId
        ? fetch(`/api/products/${selectedProductId}`).then((r) => r.json())
        : null,
    enabled: !!selectedProductId,
  });

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        company: product.company,
        imageUrl: product.imageUrl,
        category: product.category,
      });
    }
    toast.success(`${product.name} (x${quantity}) added to cart`);
  };

  const handleBuyNow = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        company: product.company,
        imageUrl: product.imageUrl,
        category: product.category,
      });
    }
    navigate('checkout');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="text-muted-foreground">Product not found.</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate('products')}>
          Back to Products
        </Button>
      </div>
    );
  }

  const categoryColors: Record<string, string> = {
    pesticide: 'bg-red-100 text-red-800',
    insecticide: 'bg-orange-100 text-orange-800',
    fungicide: 'bg-yellow-100 text-yellow-800',
    herbicide: 'bg-green-100 text-green-800',
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate('products')}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </button>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="aspect-square rounded-xl overflow-hidden bg-agriculture/10 relative">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-agriculture/10 to-leaf/10">
              <Leaf className="h-24 w-24 text-agriculture/30" />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <Badge className={`mb-3 ${categoryColors[product.category] || 'bg-gray-100 text-gray-800'}`}>
              {product.category}
            </Badge>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {product.name}
            </h1>
            <p className="text-muted-foreground mt-1">by {product.company}</p>
          </div>

          <div className="text-3xl font-bold text-primary">
            ₹{product.price.toLocaleString()}
          </div>

          <div className="flex items-center gap-2">
            {product.inStock ? (
              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                <Package className="h-3 w-3 mr-1" />
                In Stock
              </Badge>
            ) : (
              <Badge variant="destructive">Out of Stock</Badge>
            )}
            {product.featured && (
              <Badge variant="secondary">
                <Zap className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Usage Instructions</h3>
            <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
              {product.usage}
            </p>
          </div>

          <Separator />

          {/* Quantity + Actions */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-sm text-muted-foreground">
                Total: ₹{(product.price * quantity).toLocaleString()}
              </span>
            </div>

            <div className="flex gap-3">
              <Button
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button
                variant="secondary"
                className="flex-1"
                onClick={handleBuyNow}
                disabled={!product.inStock}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
