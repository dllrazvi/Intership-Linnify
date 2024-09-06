import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@repo/ui/card';

import { AuthGoogleButton } from '@app/auth/components/auth-google';

export default async function AuthPage() {
  return (
    <div className={'flex h-full w-full'}>
      <div
        className={
          "bg-left-center hidden w-full bg-black bg-[url('/images/login-background.webp')] bg-cover bg-no-repeat md:block"
        }
      />

      <Card className={'relative flex w-full flex-col justify-center px-4'}>
        <CardHeader className={'gap-20 text-center'}>
          <CardTitle className={'mb-2 text-4xl font-bold'}>Sign in to Linnify</CardTitle>
          <CardDescription className={'text-base'}>
            Please log in through Linnify’s single sign-on solution.
          </CardDescription>
        </CardHeader>

        <CardContent className={'mt-4'}>
          <div className={'flex flex-col items-center gap-y-3'}>
            <AuthGoogleButton className={'w-[300px]'} />
          </div>
        </CardContent>

        <CardFooter className={'absolute bottom-0 left-1/2 -translate-x-1/2 text-center'}>
          <CardDescription>© 2024, Linnify. All rights reserved</CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
