
'use client';

import * as React from 'react';
import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, ArrowLeft, Hash, CheckCircle2 } from 'lucide-react';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const reference = searchParams ? searchParams.get('reference') : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] bg-background px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-primary/10 p-4">
            <CheckCircle2 className="h-16 w-16 text-primary animate-in zoom-in duration-500" />
          </div>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline">
          Payment Successful!
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Thank you for your purchase. Your transaction was processed successfully.
        </p>

        <Card className="mt-12 text-left border-muted shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-xl">
              What happens next?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {reference && (
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <Hash className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Transaction Reference</h3>
                  <p className="font-mono text-sm bg-muted p-2 rounded-md mt-1 break-all">
                    {reference}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Check your email</h3>
                <p className="text-muted-foreground text-sm">
                  We've sent a receipt for your purchase to your email address. 
                  Please check your spam folder if you don't see it.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 flex flex-col gap-4">
          <Button asChild size="lg" className="w-full sm:w-auto mx-auto">
            <Link href="/products">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Catalog
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessfulPage() {
  return (
    <div className="min-h-[60vh]">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      }>
        <PaymentSuccessContent />
      </Suspense>
    </div>
  );
}
