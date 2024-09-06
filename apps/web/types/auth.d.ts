import { SessionUser } from '@app/auth/auth.types';
import { User } from '@app/user/types/user.types';

declare module 'next-auth' {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: SessionUser;
  }

  interface AdapterUser extends User {}
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id: string;
    email: string;
    name?: string | null;
    picture?: string | null;
  }
}
