'use client';

import { useQuery } from '@tanstack/react-query';
import { useAppStore } from '@/store/app-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ArrowLeft,
  Leaf,
  Clock,
  Calendar,
  ShoppingCart,
  Bug,
  AlertTriangle,
  ShieldCheck,
} from 'lucide-react';

interface CropDisease {
  name: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
}

interface Crop {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  diseases: string;
  recommendedProducts: string;
  sprayTiming: string;
  season: string;
}

const severityStyles: Record<string, { bg: string; text: string; border: string }> = {
  high: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
  medium: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
  low: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
};

const cropGradients: Record<string, string> = {
  apple: 'from-red-200 to-orange-100',
  walnut: 'from-amber-200 to-yellow-100',
  saffron: 'from-purple-200 to-pink-100',
  apricot: 'from-orange-200 to-amber-100',
};

const cropEmojis: Record<string, string> = {
  apple: '🍎',
  walnut: '🌰',
  saffron: '🌸',
  apricot: '🍑',
};

function getCropType(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes('apple')) return 'apple';
  if (lower.includes('walnut')) return 'walnut';
  if (lower.includes('saffron')) return 'saffron';
  if (lower.includes('apricot')) return 'apricot';
  return 'default';
}

export function CropDetailSection() {
  const { selectedCropId, navigate, setSelectedProduct } = useAppStore();

  const { data: crop, isLoading } = useQuery({
    queryKey: ['crop', selectedCropId],
    queryFn: () =>
      selectedCropId
        ? fetch(`/api/crops/${selectedCropId}`).then((r) => r.json())
        : null,
    enabled: !!selectedCropId,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton className="h-64 w-full rounded-xl mb-8" />
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-24 w-full mb-8" />
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-48 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!crop) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="text-muted-foreground">Crop not found.</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate('crops')}>
          Back to Crops
        </Button>
      </div>
    );
  }

  const cropType = getCropType(crop.name);
  const gradient = cropGradients[cropType] || 'from-agriculture/20 to-leaf/10';
  const emoji = cropEmojis[cropType] || '🌱';

  let diseases: CropDisease[] = [];
  try {
    diseases = crop.diseases ? JSON.parse(crop.diseases) : [];
  } catch {
    diseases = [];
  }

  let recommendedProductIds: string[] = [];
  if (crop.recommendedProducts) {
    recommendedProductIds = crop.recommendedProducts
      .split(',')
      .map((s: string) => s.trim())
      .filter(Boolean);
  }

  let sprayTimingSteps: string[] = [];
  if (crop.sprayTiming) {
    try {
      sprayTimingSteps = JSON.parse(crop.sprayTiming);
    } catch {
      sprayTimingSteps = crop.sprayTiming.split('\n').filter(Boolean);
    }
  }

  return (
    <div className="view-transition">
      {/* Hero Banner */}
      <div
        className={`bg-gradient-to-br ${gradient} relative overflow-hidden`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <button
            onClick={() => navigate('crops')}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Crops
          </button>
          <div className="flex items-center gap-4">
            {crop.imageUrl ? (
              <img
                src={crop.imageUrl}
                alt={crop.name}
                className="w-20 h-20 rounded-xl object-cover"
              />
            ) : (
              <span className="text-5xl">{emoji}</span>
            )}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {crop.name}
              </h1>
              {crop.season && (
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Season: {crop.season}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">About {crop.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {crop.description}
            </p>
          </CardContent>
        </Card>

        {/* Diseases */}
        {diseases.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Bug className="h-5 w-5 text-primary" />
              Common Diseases
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {diseases.map((disease: CropDisease) => {
                const style = severityStyles[disease.severity] || severityStyles.low;
                return (
                  <Card key={disease.name} className={`border-2 ${style.border}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-sm">{disease.name}</h3>
                        <Badge className={`${style.bg} ${style.text}`}>
                          {disease.severity === 'high' && (
                            <AlertTriangle className="h-3 w-3 mr-1" />
                          )}
                          {disease.severity === 'low' && (
                            <ShieldCheck className="h-3 w-3 mr-1" />
                          )}
                          {disease.severity.charAt(0).toUpperCase() + disease.severity.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {disease.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Recommended Products */}
        {recommendedProductIds.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              Recommended Products
            </h2>
            <RecommendedProductCards productIds={recommendedProductIds} />
          </div>
        )}

        {/* Spray Timing */}
        {sprayTimingSteps.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Spray Timing Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sprayTimingSteps.map((step: string, index: number) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                        {index + 1}
                      </div>
                      {index < sprayTimingSteps.length - 1 && (
                        <div className="w-px flex-1 bg-border mt-2" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground pb-4">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function RecommendedProductCards({ productIds }: { productIds: string[] }) {
  const { setSelectedProduct, navigate } = useAppStore();

  const { data: products } = useQuery({
    queryKey: ['products', 'recommended', productIds],
    queryFn: () => fetch('/api/products').then((r) => r.json()),
  });

  const filtered = products?.filter((p: { id: string }) =>
    productIds.includes(p.id)
  );

  if (!filtered || filtered.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Recommended products coming soon.
      </p>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filtered.map((product: { id: string; name: string; price: number; company: string; category: string }) => (
        <Card
          key={product.id}
          className="cursor-pointer hover:shadow-md transition-all"
          onClick={() => {
            setSelectedProduct(product.id);
            navigate('product-detail');
          }}
        >
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-agriculture/10 flex items-center justify-center shrink-0">
              <Leaf className="h-7 w-7 text-agriculture/40" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm truncate">{product.name}</h4>
              <p className="text-xs text-muted-foreground">{product.company}</p>
              <p className="text-sm font-bold text-primary mt-1">
                ₹{product.price.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
