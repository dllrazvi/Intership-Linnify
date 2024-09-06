'use client';

import React from 'react';

import { z } from 'zod';

import { Toaster } from '@repo/ui/toaster';
import { TooltipProvider } from '@repo/ui/tooltip';

import { GlobalProvider } from '@app/providers/global.provider';
import { QueryProvider } from '@app/providers/query.provider';
import { UserProvider } from '@app/user/providers/user.provider';
import { getValidationMessages } from '@app/utils/validation.utils';

z.setErrorMap(getValidationMessages);

export default function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <GlobalProvider>
      <UserProvider>
        <QueryProvider>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
        </QueryProvider>
      </UserProvider>
    </GlobalProvider>
  );
}
