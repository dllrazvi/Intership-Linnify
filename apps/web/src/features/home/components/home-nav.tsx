import React from 'react';

import Link from 'next/link';

import config from '@app/config/client.config';

type HomeRoute = {
  title: string;
  href: string;
};

export function HomeNav() {
  const routes: HomeRoute[] = [];

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <div className={'flex items-center gap-x-2'}>
          <div
            className={
              "size-8 rounded-lg bg-gray-800 bg-[url('/logo/logo.png')] bg-cover bg-no-repeat"
            }
          />
          <div className="text-xl font-semibold">{config.appName}</div>
        </div>
      </Link>
      <nav className="hidden gap-6 md:flex">
        {routes.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={'hover:text-foreground/80 flex items-center font-medium transition-colors'}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
