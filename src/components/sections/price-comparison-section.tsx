'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowUpDown, Tag } from 'lucide-react';
import { useAppStore } from '@/store/app-store';

type SortKey = 'price' | 'name';
type SortDir = 'asc' | 'desc';

interface Product {
  id: string;
  name: string;
  price: number;
  company: string;
  category: string;
  imageUrl: string;
}

export function PriceComparisonSection() {
  const { setSelectedProduct, navigate } = useAppStore();
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', 'all'],
    queryFn: () => fetch('/api/products').then((r) => r.json()),
  });

  const allProducts: Product[] = products || [];

  const categories = useMemo(() => {
    if (!allProducts.length) return [];
    const cats = [...new Set(allProducts.map((p) => p.category))];
    return cats.sort();
  }, [allProducts]);

  const grouped = useMemo(() => {
    if (!allProducts.length) return {};
    const map: Record<string, Product[]> = {};
    const filtered =
      filterCategory === 'all'
        ? allProducts
        : allProducts.filter((p) => p.category === filterCategory);

    const sorted = [...filtered].sort((a, b) => {
      if (sortKey === 'price') {
        return sortDir === 'asc' ? a.price - b.price : b.price - a.price;
      }
      return sortDir === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });

    sorted.forEach((p) => {
      const key = p.category;
      if (!map[key]) map[key] = [];
      map[key].push(p);
    });

    return map;
  }, [allProducts, sortKey, sortDir, filterCategory]);

  const cheapestPerCategory = useMemo(() => {
    const map: Record<string, number> = {};
    Object.entries(grouped).forEach(([cat, prods]) => {
      if (prods.length > 0) {
        const min = Math.min(...prods.map((p) => p.price));
        map[cat] = min;
      }
    });
    return map;
  }, [grouped]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product.id);
    navigate('product-detail');
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Compare Prices
          </h2>
          <p className="text-muted-foreground mt-1">
            Find the best deals on agricultural products
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            size="sm"
            variant={filterCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setFilterCategory('all')}
          >
            All Categories
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={filterCategory === cat ? 'default' : 'outline'}
              onClick={() => setFilterCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Button>
          ))}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Button
            size="sm"
            variant={sortKey === 'name' ? 'secondary' : 'ghost'}
            onClick={() => handleSort('name')}
          >
            <ArrowUpDown className="h-3 w-3 mr-1" />
            Name {sortKey === 'name' && (sortDir === 'asc' ? '↑' : '↓')}
          </Button>
          <Button
            size="sm"
            variant={sortKey === 'price' ? 'secondary' : 'ghost'}
            onClick={() => handleSort('price')}
          >
            <ArrowUpDown className="h-3 w-3 mr-1" />
            Price {sortKey === 'price' && (sortDir === 'asc' ? '↑' : '↓')}
          </Button>
        </div>

        {isLoading ? (
          <Card>
            <CardContent className="p-6 space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </CardContent>
          </Card>
        ) : Object.keys(grouped).length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Tag className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground">No products to compare.</p>
            </CardContent>
          </Card>
        ) : (
          Object.entries(grouped).map(([category, prods]) => (
            <Card key={category} className="mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg capitalize flex items-center gap-2">
                  <Badge variant="outline">{category}</Badge>
                  {prods.length} product{prods.length !== 1 ? 's' : ''}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>
                          <button
                            onClick={() => handleSort('price')}
                            className="flex items-center gap-1 hover:text-foreground transition-colors"
                          >
                            Price
                            <ArrowUpDown className="h-3 w-3" />
                          </button>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {prods.map((product: Product) => {
                        const isCheapest =
                          cheapestPerCategory[category] === product.price;
                        return (
                          <TableRow
                            key={product.id}
                            className={`cursor-pointer ${
                              isCheapest ? 'bg-green-50/50' : ''
                            }`}
                            onClick={() => handleProductClick(product)}
                          >
                            <TableCell className="font-medium">
                              {product.name}
                              {isCheapest && (
                                <Badge className="ml-2 bg-green-100 text-green-700 text-[10px]">
                                  Best Price
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {product.company}
                            </TableCell>
                            <TableCell className="font-semibold text-primary">
                              ₹{product.price.toLocaleString()}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </section>
  );
}
