'use client';

import { useAppStore } from '@/store/app-store';
import { HeroSection } from '@/components/sections/hero-section';
import { FeaturedProducts } from '@/components/sections/featured-products';
import { ProductsSection } from '@/components/sections/products-section';
import { ProductDetailSection } from '@/components/sections/product-detail-section';
import { CartSection } from '@/components/sections/cart-section';
import { CheckoutSection } from '@/components/sections/checkout-section';
import { OrderSuccessSection } from '@/components/sections/order-success-section';
import { WeatherSection } from '@/components/sections/weather-section';
import { CropsSection } from '@/components/sections/crops-section';
import { CropDetailSection } from '@/components/sections/crop-detail-section';
import { PriceComparisonSection } from '@/components/sections/price-comparison-section';
import { ShopLocationSection } from '@/components/sections/shop-location-section';
import { MyAccountSection } from '@/components/sections/my-account-section';
import { RefundSection } from '@/components/sections/refund-section';

function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <CropsSection />
      <WeatherPreview />
      <LocationPreview />
    </>
  );
}

function WeatherPreview() {
  return (
    <div className="py-12 md:py-16 bg-gradient-to-br from-agriculture/5 to-leaf/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Weather-Smart Farming
          </h2>
          <p className="text-muted-foreground mt-1">
            Get spray recommendations based on Kashmir&apos;s weather
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-3 gap-4 text-center mb-8">
            {[
              { label: 'Rain Check', value: 'Real-time' },
              { label: 'Wind Speed', value: 'Live data' },
              { label: 'Spray Advisory', value: 'AI-powered' },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-background p-4 border shadow-sm">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="font-semibold text-primary mt-1">{item.value}</p>
              </div>
            ))}
          </div>
          <ViewSectionButton view="weather" label="View Full Forecast" />
        </div>
      </div>
    </div>
  );
}

function LocationPreview() {
  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Visit Our Store
          </h2>
          <p className="text-muted-foreground mt-1">
            Located in the heart of Srinagar, Kashmir
          </p>
        </div>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-muted-foreground mb-6">
            Crop Care Centre, Residency Road, Srinagar, J&amp;K 190001
          </p>
          <ViewSectionButton view="shop-location" label="Get Directions & Contact Us" />
        </div>
      </div>
    </div>
  );
}

function ViewSectionButton({ view, label }: { view: string; label: string }) {
  const { navigate } = useAppStore();
  return (
    <button
      onClick={() => navigate(view as Parameters<typeof navigate>[0])}
      className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
    >
      {label}
    </button>
  );
}

export default function Home() {
  const { currentView } = useAppStore();

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage />;
      case 'products':
        return (
          <div className="view-transition">
            <ProductsSection />
          </div>
        );
      case 'product-detail':
        return (
          <div className="view-transition">
            <ProductDetailSection />
          </div>
        );
      case 'cart':
        return (
          <div className="view-transition">
            <CartSection />
          </div>
        );
      case 'checkout':
        return (
          <div className="view-transition">
            <CheckoutSection />
          </div>
        );
      case 'order-success':
        return (
          <div className="view-transition">
            <OrderSuccessSection />
          </div>
        );
      case 'weather':
        return (
          <div className="view-transition">
            <WeatherSection />
          </div>
        );
      case 'crops':
        return (
          <div className="view-transition">
            <CropsSection />
          </div>
        );
      case 'crop-detail':
        return (
          <div className="view-transition">
            <CropDetailSection />
          </div>
        );
      case 'price-comparison':
        return (
          <div className="view-transition">
            <PriceComparisonSection />
          </div>
        );
      case 'shop-location':
        return (
          <div className="view-transition">
            <ShopLocationSection />
          </div>
        );
      case 'my-account':
        return (
          <div className="view-transition">
            <MyAccountSection />
          </div>
        );
      case 'refund':
        return (
          <div className="view-transition">
            <RefundSection />
          </div>
        );
      default:
        return <HomePage />;
    }
  };

  return <div className="min-h-screen">{renderView()}</div>;
}
