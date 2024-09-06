'use client';

import { useEffect } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

import config from '@app/config/client.config.ts';

const getFacebookPixelId = (): string | null => {
  return config.facebookPixel ?? null;
};

const sendPageView = () => {
  if (!getFacebookPixelId()) {
    return;
  }

  const fbq = (window as any).fbq;
  fbq && fbq('track', 'PageView');
};

const FACEBOOK_PIXEL = getFacebookPixelId();

export default function FacebookPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    sendPageView();
  }, [pathname, searchParams]);

  if (!FACEBOOK_PIXEL) {
    return null;
  }

  return (
    <>
      <Script
        id={'facebook-pixel'}
        strategy={'afterInteractive'}
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${FACEBOOK_PIXEL});
            fbq('track', 'PageView');
          `
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${FACEBOOK_PIXEL}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
