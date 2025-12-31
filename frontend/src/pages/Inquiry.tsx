import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import api from '../api/axios';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';

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

export function Inquiry() {
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
    api.post('/mail/inquiry', data).catch((error) => {
      toast.error(`Failed to submit inquiry: ${error.message}`);
    });
  }

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Inquiry Form</CardTitle>
        <CardDescription>
          In this form you can send your feedback/question.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id='form-rhf-demo' onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name='title'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='form-rhf-demo-title'>
                    Inquiry Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id='form-rhf-demo-title'
                    aria-invalid={fieldState.invalid}
                    placeholder='Expression of website'
                    autoComplete='off'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='description'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='form-rhf-demo-description'>
                    Description
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id='form-rhf-demo-description'
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
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation='horizontal'>
          <Button type='button' variant='outline' onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type='submit' form='form-rhf-demo'>
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}

export default Inquiry;
