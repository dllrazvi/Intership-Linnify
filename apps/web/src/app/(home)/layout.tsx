import React from 'react';

import { redirect } from 'next/navigation';

import { HomeNav } from '@app/home/components/home-nav';
import { getCurrentUser } from '@app/lib/session';
import UserMenu from '@app/user/components/user-menu';

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  if (!user.onboardedAt) {
    return redirect('/onboarding');
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="bg-background sticky top-0 z-40 border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <HomeNav />
          <UserMenu user={user} />
        </div>
      </header>
      <main className="container flex w-full flex-1 flex-col overflow-hidden">{children}</main>
    </div>
  );
}
