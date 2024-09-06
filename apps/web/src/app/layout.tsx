import React, { Suspense } from 'react';

import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

import '@repo/tailwind-config/styles';

import config from '@app/config/client.config';
import FacebookPixel from '@app/integrations/facebook';
import GoogleAds from '@app/integrations/google-ads';
import GoogleAnalytics from '@app/integrations/google-analytics';
import GoogleTagManager from '@app/integrations/google-tag-manager';
import HotJar from '@app/integrations/hotjar';
import AppProvider from '@app/providers/app.provider.tsx';

const appFont = Montserrat({
  variable: '--font-fans',
  display: 'swap',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: {
    default: config.appName,
    template: `%s | ${config.appName}`
  },
  description: 'Metadata Description'
};

export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <html lang="en">
      <body className={appFont.className}>
        <AppProvider>
          <Suspense>
            <GoogleAnalytics />
            <GoogleAds />
            <GoogleTagManager />
            <FacebookPixel />
            <HotJar />
          </Suspense>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
