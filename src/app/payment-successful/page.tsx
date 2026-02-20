import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, ArrowLeft } from 'lucide-react';

export default function PaymentSuccessfulPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] bg-background px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <svg
            className="checkmark-svg mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark-circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark-check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-headline font-bold text-primary">
          Payment Successful!
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Thank you for your purchase. Your transaction was processed successfully.
        </p>

        <Card className="mt-12 text-left">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              What happens next?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Check your email</h3>
                <p className="text-muted-foreground">
                  We've sent a receipt for your purchase to the email address you provided.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button asChild size="lg" className="mt-12">
          <Link href="/">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
