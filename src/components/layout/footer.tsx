'use client';

import { Leaf, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/app-store';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const { navigate } = useAppStore();

  return (
    <footer className="mt-auto bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground text-primary">
                <Leaf className="h-5 w-5" />
              </div>
              <span className="font-bold text-lg">Crop Care Centre</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Kashmir&apos;s trusted agricultural store. We provide quality pesticides,
              insecticides, and crop care products to help farmers grow healthier
              crops in the beautiful valley of Kashmir.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              {[
                { label: 'Products', view: 'products' as const },
                { label: 'Weather & Spray Advisory', view: 'weather' as const },
                { label: 'Crop Guides', view: 'crops' as const },
                { label: 'Compare Prices', view: 'price-comparison' as const },
                { label: 'Shop Location', view: 'shop-location' as const },
                { label: 'My Account', view: 'my-account' as const },
              ].map((link) => (
                <button
                  key={link.view}
                  onClick={() => navigate(link.view)}
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Contact Us</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span className="text-sm text-primary-foreground/80">
                  Residency Road, Srinagar, J&amp;K 190001
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span className="text-sm text-primary-foreground/80">
                  +91 194 234 5678
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span className="text-sm text-primary-foreground/80">
                  info@cropcarecentre.in
                </span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Store Hours</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0" />
                <span className="text-sm text-primary-foreground/80">
                  Mon - Sat: 9:00 AM - 7:00 PM
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0" />
                <span className="text-sm text-primary-foreground/80">
                  Sunday: Closed
                </span>
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="mt-2"
              onClick={() => navigate('shop-location')}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Get Directions
            </Button>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/70">
          <p>&copy; {new Date().getFullYear()} Crop Care Centre. All rights reserved.</p>
          <p>Serving Kashmir&apos;s farmers with quality agricultural products.</p>
        </div>
      </div>
    </footer>
  );
}
