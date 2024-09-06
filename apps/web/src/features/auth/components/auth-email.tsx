'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { Button } from '@repo/ui/button';
import { Form } from '@repo/ui/form';
import { InputControl } from '@repo/ui/form/input';

import { EmailAuth, emailAuthSchema } from '@app/auth/schemas/auth.schema.ts';

export default function AuthEmail() {
  const router = useRouter();
  const form = useForm<EmailAuth>({
    resolver: zodResolver(emailAuthSchema)
  });

  const onSubmit = async (data: EmailAuth) => {
    await signIn('resend', { email: data.email, redirect: false });
    router.push(`/auth/code?email=${data.email}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={'flex w-full flex-col gap-y-3'}>
        <InputControl
          control={form.control}
          name={'email'}
          placeholder={'example@mail.com'}
          className={'w-full bg-white'}
        />

        <Button type={'submit'}>Sign In with Email</Button>
      </form>
    </Form>
  );
}
