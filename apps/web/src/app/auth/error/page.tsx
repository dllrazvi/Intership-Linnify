'use client';

import { useParams, useSearchParams } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/card';

enum Error {
  Configuration = 'Configuration'
}

const errorMap = {
  [Error.Configuration]: (
    <p>
      There was a problem when trying to authenticate. Please contact us if this error persists.
      Unique error code: <code className="rounded-sm bg-slate-100 p-1 text-xs">Configuration</code>
    </p>
  )
};

export default function AuthErrorPage() {
  const search = useSearchParams();
  const error = search.get('error') as Error;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Something went wrong</CardTitle>
        </CardHeader>
        <CardContent>{errorMap[error] || 'Please contact us if this error persists.'}</CardContent>
      </Card>
    </div>
  );
}
