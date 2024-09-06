'use client';

import { useEffect } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

import config from '@app/config/client.config.ts';
import { useUser } from '@app/user/providers/user.provider.tsx';

type WindowWithDataLayer = Window & {
  dataLayer: Record<string, any>[];
};

declare const window: WindowWithDataLayer;

const getGoogleTagManagerId = (): string | null => {
  return config.googleTagManagerId ?? null;
};

const sendPageView = (url: string) => {
  const isEnabled = !!getGoogleTagManagerId();

  if (!isEnabled) {
    return;
  }

  window.dataLayer.push({
    event: 'pageview',
    page: url
  });
};

const sendUserData = (userId: string, userEmail: string) => {
  const isEnabled = !!getGoogleTagManagerId();

  if (!isEnabled) {
    return;
  }

  window.dataLayer.push({
    user_id: userId,
    user_email: userEmail
  });
};

export default function GoogleTagManager() {
  const gtmId = getGoogleTagManagerId();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const user = useUser();

  useEffect(() => {
    if (!gtmId || !pathname) {
      return;
    }

    sendPageView(pathname);
  }, [pathname, searchParams, gtmId]);

  useEffect(() => {
    const userId = user?.id;
    const userEmail = user?.email;

    if (userId === undefined || userEmail === undefined) {
      return;
    }

    sendUserData(userId, userEmail);
  }, [user?.id]);

  if (!gtmId) {
    return null;
  }

  return (
    <>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer', '${gtmId}');
  `
        }}
      />
    </>
  );
}
