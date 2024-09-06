import { redirect } from 'next/navigation';

import { getCurrentUser } from '@app/lib/session';
import { OnboardingIntro } from '@app/onboarding/components/onboarding-intro';

export default async function OnboardingPage() {
  const user = await getCurrentUser();

  if (user.onboardedAt) {
    return redirect('/');
  }

  return (
    <div className={'container mt-20 flex flex-col gap-y-2 text-center'}>
      <h3>This is the onboarding page</h3>
      <p>Click on the bellow button to complete your onboarding</p>

      <OnboardingIntro />
    </div>
  );
}
