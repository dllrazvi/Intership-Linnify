import { Button } from '@repo/ui/button';

import { signIn } from '@app/auth/auth';

type AuthGoogleButtonProps = {
  className?: string;
};

export const AuthFacebookButton = ({ className }: AuthGoogleButtonProps) => {
  return (
    <form
      className={className}
      action={async () => {
        'use server';
        await signIn('facebook', { redirect: true });
      }}
    >
      <Button
        variant="outline"
        size={'lg'}
        className={'flex w-full items-center justify-center gap-2 font-semibold'}
      >
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
          <path
            d="M23.4824 12C23.4824 6.02231 18.4242 1.17645 12.1846 1.17645C5.94494 1.17645 0.886719 6.02231 0.886719 12C0.886719 17.4023 5.01818 21.8801 10.4193 22.692V15.1287H7.55069V12H10.4193V9.61543C10.4193 6.90277 12.106 5.4044 14.6866 5.4044C15.9227 5.4044 17.2157 5.61579 17.2157 5.61579V8.27939H15.791C14.3875 8.27939 13.9499 9.11372 13.9499 9.96967V12H17.0833L16.5824 15.1287H13.9499V22.692C19.351 21.8801 23.4824 17.4023 23.4824 12Z"
            fill="#1877F2"
          />
          <path
            d="M16.5824 15.1287L17.0833 12H13.9499V9.96968C13.9499 9.11374 14.3876 8.27941 15.7911 8.27941H17.2157V5.61581C17.2157 5.61581 15.9228 5.40442 14.6867 5.40442C12.1061 5.40442 10.4194 6.90279 10.4194 9.61545V12H7.55078V15.1287H10.4194V22.692C11.0033 22.7797 11.5936 22.8237 12.1847 22.8235C12.7852 22.8235 13.3747 22.7785 13.9499 22.692V15.1287H16.5824Z"
            fill="white"
          />
        </svg>
        Continue with Facebook
      </Button>
    </form>
  );
};
