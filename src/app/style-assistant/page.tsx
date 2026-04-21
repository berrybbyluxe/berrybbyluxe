'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function StyleAssistantPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-3xl font-bold font-headline">Feature Unavailable</h1>
      <p className="mt-4 text-muted-foreground max-w-md">
        The AI Interior Style Assistant is currently unavailable. Please browse our catalog for our latest collections.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
