'use client';

import { useQuery } from '@tanstack/react-query';
import { useAppStore } from '@/store/app-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Package,
  RotateCcw,
  ClipboardList,
  Clock,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';

interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  items: OrderItem[];
  refunds: { id: string; status: string }[];
}

interface Refund {
  id: string;
  orderId: string;
  reason: string;
  description: string;
  refundType: string;
  status: string;
  amount: number;
  createdAt: string;
  order?: { customerName: string };
}

const statusStyles: Record<string, { bg: string; text: string }> = {
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  confirmed: { bg: 'bg-blue-100', text: 'text-blue-800' },
  processing: { bg: 'bg-orange-100', text: 'text-orange-800' },
  shipped: { bg: 'bg-purple-100', text: 'text-purple-800' },
  delivered: { bg: 'bg-green-100', text: 'text-green-800' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-800' },
};

const refundStatusStyles: Record<string, { bg: string; text: string }> = {
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  approved: { bg: 'bg-blue-100', text: 'text-blue-800' },
  rejected: { bg: 'bg-red-100', text: 'text-red-800' },
  completed: { bg: 'bg-green-100', text: 'text-green-800' },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function MyAccountSection() {
  const { navigate, setSelectedOrderId } = useAppStore();

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => fetch('/api/orders').then((r) => r.json()),
  });

  const { data: refunds, isLoading: refundsLoading } = useQuery({
    queryKey: ['refunds'],
    queryFn: () => fetch('/api/refunds').then((r) => r.json()),
  });

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            My Account
          </h2>
          <p className="text-muted-foreground mt-1">
            View your orders and refund requests
          </p>
        </div>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              My Orders
            </TabsTrigger>
            <TabsTrigger value="refunds" className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Refund Requests
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            {ordersLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-40 w-full rounded-xl" />
                ))}
              </div>
            ) : !orders || orders.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <ClipboardList className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="text-muted-foreground mb-4">No orders yet.</p>
                  <Button onClick={() => navigate('products')}>
                    Start Shopping
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {orders.map((order: Order) => {
                  const style = statusStyles[order.status] || statusStyles.pending;
                  const hasRefund = order.refunds && order.refunds.length > 0;
                  return (
                    <Card key={order.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-4 sm:p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm">
                                  Order #{order.id.slice(-8)}
                                </span>
                                <Badge className={`${style.bg} ${style.text}`}>
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {formatDate(order.createdAt)}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-primary">
                                ₹{order.totalAmount.toLocaleString()}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {order.items?.length || 0} item(s)
                              </p>
                            </div>
                          </div>

                          {/* Items */}
                          <div className="space-y-2 mb-4">
                            {order.items?.map((item: OrderItem) => (
                              <div
                                key={item.id}
                                className="flex items-center justify-between text-sm"
                              >
                                <span className="text-muted-foreground">
                                  {item.productName} x{item.quantity}
                                </span>
                                <span className="font-medium">
                                  ₹{(item.price * item.quantity).toLocaleString()}
                                </span>
                              </div>
                            ))}
                          </div>

                          <Separator className="my-3" />

                          <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">
                              {order.customerName} • {order.customerPhone}
                            </p>
                            {!hasRefund && order.status !== 'cancelled' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedOrderId(order.id);
                                  navigate('refund');
                                }}
                              >
                                <RotateCcw className="h-3 w-3 mr-1" />
                                Request Refund
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="refunds">
            {refundsLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full rounded-xl" />
                ))}
              </div>
            ) : !refunds || refunds.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <RotateCcw className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    No refund requests yet.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {refunds.map((refund: Refund) => {
                  const style =
                    refundStatusStyles[refund.status] || refundStatusStyles.pending;
                  return (
                    <Card key={refund.id}>
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm">
                                Refund #{refund.id.slice(-8)}
                              </span>
                              <Badge className={`${style.bg} ${style.text}`}>
                                {refund.status.charAt(0).toUpperCase() + refund.status.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Order #{refund.orderId.slice(-8)} •{' '}
                              {formatDate(refund.createdAt)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-primary">
                              ₹{refund.amount.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {refund.refundType === 'store_credit'
                                ? 'Store Credit'
                                : 'Online Refund'}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 space-y-1">
                          <p className="text-sm">
                            <span className="font-medium">Reason:</span>{' '}
                            {refund.reason.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                          </p>
                          {refund.description && (
                            <p className="text-sm text-muted-foreground">
                              {refund.description}
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
