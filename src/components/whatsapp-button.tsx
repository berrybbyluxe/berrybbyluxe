'use client';

import * as React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function WhatsAppButton() {
  const whatsappNumber = '2349063927855'; 
  const message = encodeURIComponent("Hello! I'm interested in Berrybby's products.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <Button
      asChild
      size="icon"
      className={cn(
        'fixed bottom-20 right-4 z-50 rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:bg-[#128C7E] w-14 h-14'
      )}
      aria-label="Contact on WhatsApp"
    >
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="h-8 w-8 fill-current" />
      </a>
    </Button>
  );
}