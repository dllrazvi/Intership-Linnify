import { Firestore } from '@google-cloud/firestore';
import type {
  Adapter,
  AdapterAccount,
  AdapterAccountType,
  AdapterUser,
  VerificationToken
} from 'next-auth/adapters';

import { UserRole } from '@app/user/types/enums/user-role.enum.ts';

export function FirestoreAdapter(firestore: Firestore): Adapter {
  return {
    createUser: async (user: AdapterUser): Promise<AdapterUser> => {
      const doc = await firestore.collection('users').add({
        email: user.email,
        name: user.name,
        image: user.image,
        role: UserRole.LINNIFIAN
      });

      return {
        ...user,
        id: doc.id
      };
    },
    getUser: async (id: string): Promise<AdapterUser | null> => {
      const doc = await firestore.collection('users').doc(id).get();

      if (!doc.data()) {
        return null;
      }

      return {
        id: doc.id,
        ...doc.data()
      } as AdapterUser;
    },
    getUserByEmail: async (email: string): Promise<AdapterUser | null> => {
      const query = await firestore.collection('users').where('email', '==', email).get();

      if (query.empty) {
        return null;
      }

      const doc = query.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      } as AdapterUser;
    },
    getUserByAccount: async (
      data: Pick<AdapterAccount, 'provider' | 'providerAccountId'>
    ): Promise<AdapterUser | null> => {
      const query = await firestore
        .collection('authAccounts')
        .where('provider', '==', data.provider)
        .where('providerAccountId', '==', data.providerAccountId)
        .get();

      const userId = query.docs?.[0]?.data()?.userId ?? null;

      if (!userId) {
        return null;
      }

      const doc = await firestore.collection('users').doc(userId).get();
      if (!doc.data()) {
        return null;
      }

      return {
        id: doc.id,
        ...doc.data()
      } as AdapterUser;
    },
    updateUser: async (
      user: Partial<AdapterUser> & Pick<AdapterUser, 'id'>
    ): Promise<AdapterUser> => {
      await firestore.collection('users').doc(user.id).update({
        email: user.email,
        name: user.name,
        emailVerified: user.emailVerified,
        image: user.image
      });
      const doc = await firestore.collection('users').doc(user.id).get();

      return {
        id: doc.id,
        ...doc.data()
      } as AdapterUser;
    },
    deleteUser: async (id: string): Promise<void> => {
      await firestore.collection('users').doc(id).delete();
    },
    linkAccount: async (account: AdapterAccount): Promise<AdapterAccount | null | undefined> => {
      const doc = await firestore.collection('authAccounts').add(account);
      return {
        id: doc.id,
        ...account
      };
    },

    unlinkAccount: async (
      data: Pick<AdapterAccount, 'provider' | 'providerAccountId'>
    ): Promise<void> => {
      const query = await firestore
        .collection('authAccounts')
        .where('provider', '==', data.provider)
        .where('providerAccountId', '==', data.providerAccountId)
        .get();

      if (query.empty) {
        return;
      }
      const doc = query.docs[0];
      await firestore.collection('authAccounts').doc(doc.id).delete();
    },
    createVerificationToken: async (
      verificationToken: VerificationToken
    ): Promise<VerificationToken | null | undefined> => {
      const doc = await firestore.collection('authVerificationTokens').add(verificationToken);
      const data = await doc.get();
      return data.data() as VerificationToken;
    },

    useVerificationToken: async (data: {
      identifier: string;
      token: string;
    }): Promise<VerificationToken | null> => {
      const query = await firestore
        .collection('authVerificationTokens')
        .where('identifier', '==', data.identifier)
        .where('token', '==', data.token)
        .get();

      if (query.empty) {
        return null;
      }
      const doc = query.docs[0];
      await firestore.collection('authVerificationTokens').doc(doc.id).delete();
      return null;
    },
    getAccount: async (
      providerAccountId: AdapterAccount['providerAccountId'],
      provider: AdapterAccount['provider']
    ): Promise<AdapterAccount | null> => {
      const query = await firestore
        .collection('authAccounts')
        .where('provider', '==', provider)
        .where('providerAccountId', '==', providerAccountId)
        .get();

      if (query.empty) {
        return null;
      }
      const doc = query.docs[0];
      const account = doc.data();

      return {
        userId: account.userId,
        provider: account.provider,
        providerAccountId: account.providerAccountId,
        expires_at: account.expires_at ?? undefined,
        access_token: account.access_token ?? undefined,
        refresh_token: account.refresh_token ?? undefined,
        scope: account.scope ?? undefined,
        id_token: account.id_token ?? undefined,
        token_type: (account.token_type ?? undefined) as 'bearer' | 'dpop' | Lowercase<string>,
        type: account.type as AdapterAccountType
      };
    },

    createAuthenticator: async (authenticator) => {
      throw new Error('Not implemented');
    },
    getAuthenticator: (credentialID) => {
      throw new Error('Not implemented');
    },
    listAuthenticatorsByUserId: (userId) => {
      throw new Error('Not implemented');
    },
    updateAuthenticatorCounter: (credentialID, counter) => {
      throw new Error('Not implemented');
    },
    getSessionAndUser: () => {
      throw new Error('Not implemented');
    },
    createSession: () => {
      throw new Error('Not implemented');
    },
    updateSession: () => {
      throw new Error('Not implemented');
    },
    deleteSession: () => {
      throw new Error('Not implemented');
    }
  };
}
