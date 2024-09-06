import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@repo/ui/card';

import { AuthFacebookButton } from '@app/auth/components/auth-facebook';
import { AuthGoogleButton } from '@app/auth/components/auth-google';

export default async function AuthPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center">
      <div className={'flex h-[600px] w-full max-w-5xl rounded-lg'}>
        <div
          className={
            "hidden w-full rounded-l-lg bg-black bg-[url('/images/auth-background.webp')] bg-contain bg-center bg-no-repeat md:block"
          }
        />

        <Card className={'relative flex w-full flex-col justify-center px-4'}>
          <CardHeader className={'text-center'}>
            <CardTitle className={'mb-2 text-2xl'}>Welcome back</CardTitle>
            <CardDescription className={'text-base'}>
              Continue with one of the bellow options to securely login to your account.
            </CardDescription>
          </CardHeader>

          <CardContent className={'mt-4'}>
            <div className={'flex flex-col items-center gap-y-3'}>
              <AuthGoogleButton className={'w-[300px]'} />
              <AuthFacebookButton className={'w-[300px]'} />
            </div>
          </CardContent>

          <CardFooter className={'absolute bottom-0'}>
            <CardDescription>
              By signing in you agree to our{' '}
              <a className={'font-semibold text-blue-600 hover:underline'} href={'/'}>
                Terms of Service
              </a>{' '}
              and Privacy policy.
            </CardDescription>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
