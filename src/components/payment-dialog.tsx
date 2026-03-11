
'use client';

import * as React from 'react';
import type { Product } from '@/lib/types';
import { usePaystackScript } from '@/hooks/use-paystack-script';

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
import { Loader2 } from 'lucide-react';

interface PaystackOptions {
  key: string;
  email: string;
  amount: number;
  ref: string;
  onClose?: () => void;
  callback?: (response: any) => void;
}

declare global {
  interface Window {
    PaystackPop?: {
      setup(options: PaystackOptions): {
        openIframe(): void;
      };
    };
  }
}

type PaymentDialogProps = {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function PaymentDialog({ product, open, onOpenChange }: PaymentDialogProps) {
  const { toast } = useToast();
  const [email, setEmail] = React.useState('');
  const [scriptLoaded, scriptError] = usePaystackScript();

  const handlePayment = () => {
    if (!email || !email.includes('@')) {
      toast({
        title: 'Valid Email Required',
        description: 'Please enter a valid email address to receive your receipt.',
        variant: 'destructive',
      });
      return;
    }

    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

    if (!publicKey || publicKey.startsWith('YOUR_')) {
      toast({
        title: 'Configuration Error',
        description: 'Payment gateway is not properly configured. Please check your Paystack key.',
        variant: 'destructive',
      });
      return;
    }
    
    if (scriptError) {
      toast({
        title: 'Script Error',
        description: 'Could not load payment script. Please check your connection and try again.',
        variant: 'destructive',
      });
      return;
    }

    if (!scriptLoaded || !window.PaystackPop) {
      return;
    }

    const paystack = window.PaystackPop.setup({
      key: publicKey,
      email: email.trim(),
      amount: Math.round(product.price * 100),
      ref: new Date().getTime().toString(),
      onClose: () => {
        console.log('Payment popup closed by user');
      },
      callback: (response) => {
        window.location.href = `/payment-successful?reference=${response.reference}`;
      },
    });

    onOpenChange(false);
    paystack.openIframe();
  };
  
  const isButtonDisabled = !scriptLoaded || scriptError;
  
  const getButtonText = () => {
    if (!scriptLoaded && !scriptError) return 'Initializing...';
    if (scriptError) return 'Payment unavailable';
    return `Pay ₦${product.price.toLocaleString()}`;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
          <>
            <DialogHeader>
              <DialogTitle>Complete Your Purchase</DialogTitle>
              <DialogDescription>
                You are buying <strong>{product.name}</strong> for <strong>₦{product.price.toLocaleString()}</strong>.
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
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="customer@example.com"
                  className="col-span-3"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                onClick={handlePayment}
                disabled={isButtonDisabled}
                className="w-full"
              >
                {!scriptLoaded && !scriptError && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {getButtonText()}
              </Button>
            </DialogFooter>
          </>
      </DialogContent>
    </Dialog>
  );
}
