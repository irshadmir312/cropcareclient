'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/store/app-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ShoppingBag, ClipboardList } from 'lucide-react';

export function OrderSuccessSection() {
  const { selectedOrderId, navigate } = useAppStore();

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
            className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="h-10 w-10 text-green-600" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Order Placed Successfully!
            </h2>
            <p className="text-muted-foreground mb-6">
              Thank you for your order. We&apos;ll process it shortly.
            </p>

            {selectedOrderId && (
              <Card className="mb-8">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                  <p className="text-lg font-mono font-semibold text-primary">
                    {selectedOrderId}
                  </p>
                </CardContent>
              </Card>
            )}

            <p className="text-sm text-muted-foreground mb-8">
              You can track your order status in &quot;My Account&quot; section.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => navigate('products')}>
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
              <Button variant="outline" onClick={() => navigate('my-account')}>
                <ClipboardList className="mr-2 h-4 w-4" />
                View My Orders
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
