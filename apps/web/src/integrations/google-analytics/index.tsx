'use client';

import React, { useEffect } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

import config from '@app/config/client.config.ts';
import { useUser } from '@app/user/providers/user.provider.tsx';

const getAnalyticsId = (): string | null => {
  return config.googleAnalyticsId ?? null;
};

const sendPageView = (url: string) => {
  const analyticsId = getAnalyticsId();
  if (!analyticsId) {
    return;
  }

  (window as any).gtag('config', analyticsId, {
    page_path: url
  });
};

const sendUserId = (userId: string) => {
  const analyticsId = getAnalyticsId();

  if (!analyticsId) {
    return;
  }

  (window as any).gtag('config', analyticsId, {
    user_id: userId?.toString() ?? undefined
  });
};

export default function GoogleAnalytics() {
  const analyticsId = getAnalyticsId();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const user = useUser();

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ?? '');
    sendPageView(url);
  }, [pathname, searchParams]);

  useEffect(() => {
    const userId = user?.id;
    if (userId === undefined) {
      return;
    }

    sendUserId(userId);
  }, [user?.id]);

  if (!analyticsId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
        strategy="afterInteractive"
      />
      <Script
        id={'googleAnalytics'}
        strategy={'afterInteractive'}
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              
              gtag('js', new Date());
              
              gtag('config', '${analyticsId}', {
                page_path: window.location.pathname,
              });
        `
        }}
      />
    </>
  );
}
