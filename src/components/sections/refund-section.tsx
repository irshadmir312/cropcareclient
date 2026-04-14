'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/app-store';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, Loader2, CheckCircle, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

export function RefundSection() {
  const { selectedOrderId, navigate } = useAppStore();
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [refundType, setRefundType] = useState('store_credit');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: () => fetch('/api/orders').then((r) => r.json()),
  });

  const selectedOrder = orders?.find(
    (o: { id: string }) => o.id === selectedOrderId
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) {
      toast.error('Please select a reason');
      return;
    }
    if (!selectedOrderId) {
      toast.error('No order selected');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/refunds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: selectedOrderId,
          reason,
          description,
          refundType,
          amount: selectedOrder?.totalAmount || 0,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit refund');

      setSuccess(true);
      toast.success('Refund request submitted successfully!');
    } catch {
      toast.error('Failed to submit refund request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              Refund Request Submitted!
            </h2>
            <p className="text-muted-foreground mb-6">
              We&apos;ll review your request and get back to you shortly. You can
              check the status in My Account.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => navigate('my-account')}>
                View My Account
              </Button>
              <Button variant="outline" onClick={() => navigate('home')}>
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('my-account')}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to My Account
        </button>

        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Request Refund
            </h2>
            <p className="text-muted-foreground">
              Submit a refund request for your order
            </p>
          </div>

          {/* Order Info */}
          {selectedOrder && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Order</p>
                    <p className="font-semibold">
                      #{selectedOrder.id.slice(-8)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="font-bold text-primary">
                      ₹{selectedOrder.totalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  Refund Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Reason */}
                <div className="space-y-2">
                  <Label>Reason for Refund *</Label>
                  <Select value={reason} onValueChange={setReason}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="damaged">Damaged Product</SelectItem>
                      <SelectItem value="wrong_product">Wrong Product</SelectItem>
                      <SelectItem value="not_needed">Not Needed</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="refund-desc">Description</Label>
                  <Textarea
                    id="refund-desc"
                    placeholder="Please describe the issue in detail..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Refund Type */}
                <div className="space-y-3">
                  <Label>Refund Type</Label>
                  <RadioGroup
                    value={refundType}
                    onValueChange={setRefundType}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="store_credit" id="store_credit" />
                      <Label htmlFor="store_credit" className="font-normal">
                        Store Credit (Faster processing)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="online_refund" id="online_refund" />
                      <Label htmlFor="online_refund" className="font-normal">
                        Online Refund (Original payment method)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Refund Amount */}
                {selectedOrder && (
                  <div className="rounded-lg bg-muted p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Refund Amount</span>
                      <span className="text-lg font-bold text-primary">
                        ₹{selectedOrder.totalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={loading || !selectedOrderId}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Refund Request'
                  )}
                </Button>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </section>
  );
}
