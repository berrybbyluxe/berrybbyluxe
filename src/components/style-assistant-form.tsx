'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card } from './ui/card';

const styleAssistantSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().min(10, 'Please enter a valid phone number.'),
  styleDescription: z.string().min(10, 'Please describe your style in at least 10 characters.'),
});

type StyleAssistantFormValues = z.infer<typeof styleAssistantSchema>;

export function StyleAssistantForm() {
  const { toast } = useToast();
  const form = useForm<StyleAssistantFormValues>({
    resolver: zodResolver(styleAssistantSchema),
    defaultValues: {
      email: '',
      phone: '',
      styleDescription: '',
    },
  });

  const onSubmit = async (data: StyleAssistantFormValues) => {
    // Simulate sending email to the vendor. In a real application, you would
    // make an API call to a backend service that handles sending emails.
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('Style Assistant data:', data);

    toast({
      title: 'Style Submitted!',
      description: 'Our experts will review your request and get in touch with you shortly.',
    });
    form.reset();
  };

  return (
    <Card className="p-8">
      <h2 className="text-3xl font-headline font-semibold text-foreground mb-6">Describe Your Dream Style</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+1 (234) 567-890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="styleDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Custom Style</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tell us about the colors, materials, and furniture pieces you love..." rows={5} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting} className="w-full bg-accent hover:bg-accent/90">
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit My Style'
            )}
          </Button>
        </form>
      </Form>
    </Card>
  );
}
