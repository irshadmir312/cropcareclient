'use client';

import { useQuery } from '@tanstack/react-query';
import { useAppStore } from '@/store/app-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight, Leaf, Sprout } from 'lucide-react';

interface Crop {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  season: string;
}

const cropGradients: Record<string, string> = {
  apple: 'from-red-100 to-orange-50',
  walnut: 'from-amber-100 to-yellow-50',
  saffron: 'from-purple-100 to-pink-50',
  apricot: 'from-orange-100 to-amber-50',
};

const cropIcons: Record<string, string> = {
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

export function CropsSection() {
  const { navigate, setSelectedCrop } = useAppStore();

  const { data: crops, isLoading } = useQuery({
    queryKey: ['crops'],
    queryFn: () => fetch('/api/crops').then((r) => r.json()),
  });

  const handleLearnMore = (crop: Crop) => {
    setSelectedCrop(crop.id);
    navigate('crop-detail');
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Crop Guides
          </h2>
          <p className="text-muted-foreground mt-1">
            Expert care guides for Kashmir&apos;s major crops
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-72 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {crops?.map((crop: Crop) => {
              const cropType = getCropType(crop.name);
              const gradient =
                cropGradients[cropType] || 'from-agriculture/10 to-leaf/10';
              const emoji = cropIcons[cropType] || '🌱';

              return (
                <Card
                  key={crop.id}
                  className="overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onClick={() => handleLearnMore(crop)}
                >
                  <div
                    className={`aspect-[4/3] bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}
                  >
                    {crop.imageUrl ? (
                      <img
                        src={crop.imageUrl}
                        alt={crop.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                        {emoji}
                      </span>
                    )}
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <div>
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                        {crop.name}
                      </h3>
                      {crop.season && (
                        <p className="text-xs text-muted-foreground">
                          Season: {crop.season}
                        </p>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {crop.description}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLearnMore(crop);
                      }}
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
