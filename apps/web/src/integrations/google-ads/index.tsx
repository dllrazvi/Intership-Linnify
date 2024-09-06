'use client';

import React from 'react';

import Script from 'next/script';

import config from '@app/config/client.config.ts';

const getAdsPixel = (): string | null => {
  return config.googleAdsPixel ?? null;
};

const ADS_PIXEL = getAdsPixel();

export default function GoogleAds() {
  if (!ADS_PIXEL) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ADS_PIXEL}`}
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
            
            gtag('config', '${ADS_PIXEL}');
        `
        }}
      />
    </>
  );
}
