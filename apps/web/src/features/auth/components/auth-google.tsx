import { Button } from '@repo/ui/button';
import { cn } from '@repo/ui/lib';

import { signIn } from '@app/auth/auth';

type AuthGoogleButtonProps = {
  className?: string;
};

export const AuthGoogleButton = ({ className }: AuthGoogleButtonProps) => {
  const action = async () => {
    'use server';

    await signIn('google', { redirect: true });
  };

  return (
    <form action={action} className={'w-fit'}>
      <Button
        variant="outline"
        size={'lg'}
        type={'submit'}
        className={cn('flex w-full items-center justify-center gap-2', className)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="22"
          viewBox="0 0 21 22"
          fill="none"
        >
          <path
            d="M19.74 11.2187C19.74 10.5362 19.6788 9.88 19.565 9.25H10.5V12.9775H15.68C15.4525 14.1762 14.77 15.1912 13.7463 15.8737V18.2975H16.87C18.69 16.6175 19.74 14.15 19.74 11.2187Z"
            fill="#4285F4"
          />
          <path
            d="M10.4997 20.625C13.0985 20.625 15.2772 19.7675 16.8697 18.2975L13.746 15.8737C12.8885 16.4512 11.7947 16.8012 10.4997 16.8012C7.99723 16.8012 5.87098 15.1125 5.10973 12.8375H1.90723V15.3225C3.49098 18.4637 6.73723 20.625 10.4997 20.625Z"
            fill="#34A853"
          />
          <path
            d="M5.11 12.8287C4.9175 12.2512 4.80375 11.6387 4.80375 11C4.80375 10.3612 4.9175 9.74875 5.11 9.17125V6.68625H1.9075C1.25125 7.98125 0.875 9.4425 0.875 11C0.875 12.5575 1.25125 14.0187 1.9075 15.3137L4.40125 13.3712L5.11 12.8287Z"
            fill="#FBBC05"
          />
          <path
            d="M10.4997 5.2075C11.9172 5.2075 13.1772 5.6975 14.1835 6.6425L16.9397 3.88625C15.2685 2.32875 13.0985 1.375 10.4997 1.375C6.73723 1.375 3.49098 3.53625 1.90723 6.68625L5.10973 9.17125C5.87098 6.89625 7.99723 5.2075 10.4997 5.2075Z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </Button>
    </form>
  );
};
