'use client';

import * as React from 'react';
// import { usePaystack } from 'use-paystack';
import type { Product } from '@/lib/types';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

type PaymentDialogProps = {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function PaymentDialog({ product, open, onOpenChange }: PaymentDialogProps) {
  const { toast } = useToast();
  const [email, setEmail] = React.useState('');

  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount: Math.round(product.price * 100), // Amount in kobo
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
  };

  const initializePayment = usePaystack(config);

  const onSuccess = (reference: any) => {
    console.log(reference);
    toast({
      title: 'Payment Successful',
      description: `Thank you for your purchase of ${product.name}.`,
    });
    onOpenChange(false);
  };

  const onClose = () => {
    console.log('closed');
  };

  const handlePayment = () => {
    if (!email) {
      toast({
        title: 'Email Required',
        description: 'Please enter your email address to proceed.',
        variant: 'destructive',
      });
      return;
    }
    if (!config.publicKey) {
      toast({
          title: "Paystack key is missing",
          description: "The Paystack public key is not configured. Please contact support.",
          variant: "destructive",
      });
      console.error("Paystack public key is missing. Make sure NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY is set in your .env file.");
      return;
    }
    initializePayment(onSuccess, onClose);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Your Purchase</DialogTitle>
          <DialogDescription>
            You are about to buy <strong>{product.name}</strong> for <strong>${product.price.toFixed(2)}</strong>.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="me@example.com"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handlePayment}>Pay with Paystack</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
