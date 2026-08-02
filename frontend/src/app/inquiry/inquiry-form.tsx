'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import api from '@/api/axios';

import { Button } from '@/components/shadcn/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/shadcn/field';
import { Input } from '@/components/shadcn/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/shadcn/input-group';
import { useMutation } from '@tanstack/react-query';

const formSchema = z.object({
  title: z
    .string()
    .min(1, 'Title must be given.')
    .max(64, 'Title must be at most 64 characters.'),
  description: z
    .string()
    .min(1, 'Description must be given.')
    .max(1000, 'Description must be at most 1000 characters.'),
});

export function InquiryForm() {
  const mutation = useMutation({
    mutationFn: (newInquiry: z.infer<typeof formSchema>) => {
      return api.post('/mail/inquiry', newInquiry);
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast('You submitted the following values:', {
      description: (
        <pre className='bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4'>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: 'bottom-right',
      classNames: {
        content: 'flex flex-col gap-2',
      },
      style: {
        '--border-radius': 'calc(var(--radius)  + 4px)',
      } as React.CSSProperties,
    });
    // TODO: loading and error handling
    mutation.mutate(data);
  }

  return (
    <Card className='w-full animate-zoom-in'>
      <CardHeader>
        <CardTitle>Inquiry</CardTitle>
        <CardDescription>Send your feedback/question</CardDescription>
      </CardHeader>
      <CardContent>
        <form id='inquiry-form' onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name='title'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='inquiry-form-title'>
                    Inquiry Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id='inquiry-form-title'
                    aria-invalid={fieldState.invalid}
                    placeholder='Expression of website'
                    autoComplete='off'
                  />
                  {fieldState.invalid && (
                    <FieldError
                      data-testid='inquiry-form-title-error'
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
            <Controller
              name='description'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='inquiry-form-description'>
                    Description
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id='inquiry-form-description'
                      placeholder="The features I'd like to see are..."
                      rows={6}
                      className='min-h-24 resize-none'
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align='block-end'>
                      <InputGroupText className='tabular-nums'>
                        {field.value.length}/1000 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>
                    Your feedback is valuable to motivate me making a web app.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError
                      data-testid='inquiry-form-description-error'
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation='horizontal'>
          <Button type='submit' form='inquiry-form'>
            Submit
          </Button>
          <Button type='button' variant='outline' onClick={() => form.reset()}>
            Reset
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}

export default InquiryForm;
