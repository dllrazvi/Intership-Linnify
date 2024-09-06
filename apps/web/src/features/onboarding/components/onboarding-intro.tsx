'use client';

import { Loader2 } from 'lucide-react';

import { Button } from '@repo/ui/button';

import { useActionState } from '@app/hooks/use-action.hook.ts';
import { completeUserOnboarding } from '@app/user/actions/user-onboarding.actions';

export const OnboardingIntro = () => {
  const [run, { loading }] = useActionState(completeUserOnboarding);

  const onComplete = async () => {
    await run();
  };

  return (
    <div>
      <Button disabled={loading} onClick={() => onComplete()}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Complete
      </Button>
    </div>
  );
};
