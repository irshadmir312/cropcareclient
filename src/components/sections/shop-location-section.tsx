'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  Send,
  ExternalLink,
} from 'lucide-react';
import { toast } from 'sonner';

export function ShopLocationSection() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [sending, setSending] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.message.trim()) {
      toast.error('Please fill in name and message');
      return;
    }
    setSending(true);
    // Simulate sending
    await new Promise((r) => setTimeout(r, 1000));
    toast.success('Message sent! We\'ll get back to you soon.');
    setContactForm({ name: '', email: '', message: '' });
    setSending(false);
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Shop Location
          </h2>
          <p className="text-muted-foreground mt-1">
            Visit us at our store in Srinagar, Kashmir
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <div className="aspect-[4/3] w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.5!2d74.7973!3d34.0837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sResidency+Road%2C+Srinagar!5e0!3m2!1sen!2sin!4v1609459200000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Crop Care Centre Location"
                />
              </div>
            </Card>

            <Button asChild className="w-full">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=34.0837,74.7973"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation className="mr-2 h-4 w-4" />
                Get Directions
                <ExternalLink className="ml-2 h-3 w-3" />
              </a>
            </Button>
          </div>

          {/* Shop Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Shop Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
                  <div>
                    <p className="font-medium">Crop Care Centre</p>
                    <p className="text-sm text-muted-foreground">
                      Residency Road, Srinagar, J&amp;K 190001
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                  <a
                    href="tel:+911942345678"
                    className="text-sm hover:text-primary transition-colors"
                  >
                    +91 194 234 5678
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                  <a
                    href="mailto:info@cropcarecentre.in"
                    className="text-sm hover:text-primary transition-colors"
                  >
                    info@cropcarecentre.in
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">Mon - Sat:</span> 9:00 AM - 7:00 PM
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Sunday:</span>{' '}
                      <Badge variant="destructive" className="text-[10px]">
                        Closed
                      </Badge>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Send className="h-5 w-5 text-primary" />
                  Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Name</Label>
                    <Input
                      id="contact-name"
                      placeholder="Your name"
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm((p) => ({ ...p, name: e.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email (Optional)</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="your@email.com"
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm((p) => ({ ...p, email: e.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea
                      id="contact-message"
                      placeholder="How can we help you?"
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm((p) => ({ ...p, message: e.target.value }))
                      }
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={sending}>
                    {sending ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
