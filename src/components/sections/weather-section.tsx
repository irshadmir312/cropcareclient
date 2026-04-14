'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  Wind,
  Droplets,
  Thermometer,
  ShieldCheck,
  ShieldAlert,
  CloudSun,
} from 'lucide-react';

interface DayWeather {
  date: string;
  dayName: string;
  tempHigh: number;
  tempLow: number;
  rainProbability: number;
  windSpeed: number;
  condition: string;
  humidity: number;
}

function WeatherIcon({ condition, className }: { condition: string; className?: string }) {
  const cn = className || 'h-8 w-8';
  switch (condition) {
    case 'sunny':
      return <Sun className={`${cn} text-yellow-500`} />;
    case 'partly_cloudy':
      return <CloudSun className={`${cn} text-yellow-400`} />;
    case 'cloudy':
      return <Cloud className={`${cn} text-gray-400`} />;
    case 'rainy':
      return <CloudRain className={`${cn} text-blue-400`} />;
    case 'stormy':
      return <CloudLightning className={`${cn} text-purple-500`} />;
    default:
      return <Sun className={`${cn} text-yellow-500`} />;
  }
}

function isSafeToSpray(day: DayWeather): { safe: boolean; reasons: string[] } {
  const reasons: string[] = [];

  if (day.rainProbability > 60) {
    reasons.push(`High rain probability (${day.rainProbability}%)`);
  }
  if (day.windSpeed > 20) {
    reasons.push(`Strong wind (${day.windSpeed} km/h)`);
  }
  if (day.tempHigh > 35) {
    reasons.push(`Very high temperature (${day.tempHigh}°C)`);
  }

  return { safe: reasons.length === 0, reasons };
}

function SprayAdvisoryCard({ day, isToday }: { day: DayWeather; isToday: boolean }) {
  const { safe, reasons } = isSafeToSpray(day);

  return (
    <Card
      className={`border-2 ${
        safe
          ? 'border-green-200 bg-green-50/50'
          : 'border-red-200 bg-red-50/50'
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {safe ? (
            <ShieldCheck className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
          ) : (
            <ShieldAlert className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-sm">
                {isToday ? 'Today' : day.dayName}
              </span>
              <Badge
                variant={safe ? 'outline' : 'destructive'}
                className={
                  safe
                    ? 'text-green-600 border-green-200 bg-green-100'
                    : ''
                }
              >
                {safe ? 'Safe to Spray' : 'Avoid Spray'}
              </Badge>
            </div>
            {safe ? (
              <p className="text-xs text-muted-foreground">
                Weather conditions are favorable for spraying pesticides and
                insecticides.
              </p>
            ) : (
              <div className="space-y-1">
                {reasons.map((reason) => (
                  <p
                    key={reason}
                    className="text-xs text-red-600"
                  >
                    • {reason}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function WeatherSection() {
  const { data, isLoading } = useQuery({
    queryKey: ['weather'],
    queryFn: () => fetch('/api/weather').then((r) => r.json()),
  });

  if (isLoading) {
    return (
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-10 w-48 mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-xl" />
            ))}
          </div>
          <Skeleton className="h-32 rounded-xl" />
        </div>
      </section>
    );
  }

  const forecast: DayWeather[] = data?.forecast || [];
  const current = data?.current;

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Weather &amp; Spray Advisory
          </h2>
          <p className="text-muted-foreground mt-1">
            5-day forecast for Srinagar, Kashmir
          </p>
        </div>

        {/* Current Weather */}
        {current && (
          <Card className="mb-8 bg-gradient-to-br from-agriculture/5 to-leaf/5">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex items-center gap-4">
                  <WeatherIcon condition={current.condition} className="h-16 w-16" />
                  <div>
                    <p className="text-sm text-muted-foreground">{current.location}</p>
                    <p className="text-4xl font-bold text-foreground">
                      {current.temperature}°C
                    </p>
                    <p className="text-sm capitalize text-muted-foreground">
                      {current.condition.replace(/_/g, ' ')}
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-blue-400" />
                    <span className="text-muted-foreground">{current.humidity}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-gray-400" />
                    <span className="text-muted-foreground">{current.windSpeed} km/h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span className="text-muted-foreground">{current.rainProbability}% rain</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 5-Day Forecast */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {forecast.map((day: DayWeather, index: number) => {
            const { safe } = isSafeToSpray(day);
            return (
              <Card
                key={day.date}
                className={`text-center ${index === 0 ? 'ring-2 ring-primary' : ''}`}
              >
                <CardContent className="p-4">
                  <p className="text-sm font-semibold mb-1">
                    {index === 0 ? 'Today' : day.dayName}
                  </p>
                  <WeatherIcon condition={day.condition} className="h-10 w-10 mx-auto mb-2" />
                  <div className="flex items-center justify-center gap-2 text-sm mb-2">
                    <Thermometer className="h-3 w-3" />
                    <span className="font-medium">
                      {day.tempHigh}° / {day.tempLow}°
                    </span>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center justify-center gap-1">
                      <Droplets className="h-3 w-3" />
                      <span>{day.rainProbability}%</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Wind className="h-3 w-3" />
                      <span>{day.windSpeed} km/h</span>
                    </div>
                  </div>
                  <Badge
                    className={`mt-3 text-[10px] ${
                      safe
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {safe ? '✓ Spray OK' : '✗ Avoid'}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Spray Advisory Details */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Spray Advisory Details
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {forecast.map((day: DayWeather, index: number) => (
              <SprayAdvisoryCard
                key={day.date}
                day={day}
                isToday={index === 0}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <Card className="mt-8">
          <CardContent className="p-4">
            <h4 className="font-semibold text-sm mb-2">Spray Safety Rules</h4>
            <ul className="grid sm:grid-cols-3 gap-2 text-xs text-muted-foreground">
              <li>• Avoid spray if rain probability &gt; 60%</li>
              <li>• Avoid spray if wind speed &gt; 20 km/h</li>
              <li>• Avoid spray if temperature &gt; 35°C</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
