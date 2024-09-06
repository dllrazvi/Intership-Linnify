'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import Hotjar from '@hotjar/browser';

import config from '@app/config/client.config.ts';
import { useUser } from '@app/user/providers/user.provider.tsx';

const getHotJarId = (): number | null => {
  return config.hotjarId ?? null;
};

export default function HotJar() {
  const [isReady, setIsReady] = useState<boolean>(false);
  const pathname = usePathname();
  const user = useUser();

  const userId = user?.id ?? null;
  const userEmail = user?.email ?? null;

  useEffect(() => {
    const hotJarId = getHotJarId();
    if (!hotJarId) {
      return;
    }

    Hotjar.init(hotJarId, 6, { debug: true });
    setIsReady(true);
  }, [setIsReady]);

  useEffect(() => {
    if (!isReady || userId === null || userEmail === null) {
      return;
    }

    Hotjar.identify(userId.toString(), { email: userEmail });
  }, [isReady, userId]);

  useEffect(() => {
    if (!isReady || !pathname) {
      return;
    }
    Hotjar.stateChange(pathname);
  }, [isReady, pathname]);

  return null;
}
