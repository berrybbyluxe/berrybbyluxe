'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function StyleAssistantForm() {
  return (
    <Card className="p-8">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-3xl font-headline font-semibold text-foreground">Describe your Style</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="style-name">Full Name</Label>
            <Input id="style-name" placeholder="Your Name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="style-email">Email Address</Label>
            <Input id="style-email" type="email" placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="style-description">Style Description</Label>
            <Textarea id="style-description" placeholder="e.g., 'A modern, minimalist living room with a touch of industrial chic...'" rows={5} />
          </div>
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90">Get Recommendations</Button>
        </form>
      </CardContent>
    </Card>
  );
}
