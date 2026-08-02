'use client';

import api from '@/api/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

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
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/shadcn/field';
import { Input } from '@/components/shadcn/input';
import { useAuthStore } from '@/store/auth-store';
import { useMutation } from '@tanstack/react-query';

const formSchema = z.object({
  mail: z.email('Invalid email address'),
  password: z
    .string()
    .min(3, 'Password must be at least 3 characters.')
    .max(100, 'Password must be at most 100 characters.')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Password can only contain letters, numbers, and underscores.'
    ),
});

function LoginForm() {
  const { login } = useAuthStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mail: '',
      password: '',
    },
  });
  const mutation = useMutation({
    mutationFn: (credential: z.infer<typeof formSchema>) => {
      return api.post('/auth/login', credential);
    },
    onError: (error) => {
      toast.error(`Failed to submit login: ${error.message}`, {
        closeButton: true,
        duration: Infinity,
      });
    },
    onSuccess: (data) => {
      login(data.data.expiresAtEpochMs);
      toast.success('Login successful');
    },
  });

  return (
    <Card className='w-full animate-zoom-in'>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Login enables you to access additional features (WIP).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id='login-form'
          onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
        >
          <FieldGroup>
            <Controller
              name='mail'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='login-form-mail'>Email</FieldLabel>
                  <Input
                    {...field}
                    id='login-form-mail'
                    type='email'
                    aria-invalid={fieldState.invalid}
                    placeholder='Enter your email address'
                    autoComplete='off'
                  />
                  {fieldState.invalid && (
                    <FieldError
                      data-testid='login-form-mail-error'
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
            <Controller
              name='password'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='login-form-password'>
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id='login-form-password'
                    type='password'
                    aria-invalid={fieldState.invalid}
                    placeholder='••••••••'
                    autoComplete='off'
                  />
                  {fieldState.invalid && (
                    <FieldError
                      data-testid='login-form-password-error'
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
          <Button type='submit' form='login-form'>
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

LoginForm.displayName = 'LoginForm';
export { LoginForm };
