import type { Prisma, PrismaClient } from '@prisma/client';
import type {
  Adapter,
  AdapterAccount,
  AdapterAccountType,
  AdapterUser,
  VerificationToken
} from 'next-auth/adapters';

/**
 * Prisma Adapter
 */
export function PrismaAdapter(prisma: PrismaClient): Adapter {
  return {
    createUser: async (adapterUser: AdapterUser): Promise<AdapterUser> => {
      return prisma.user.create({
        data: {
          email: adapterUser.email,
          name: adapterUser.name,
          emailVerified: adapterUser.emailVerified,
          image: adapterUser.image
        }
      });
    },
    getUser: (id: string): Promise<AdapterUser | null> => prisma.user.findUnique({ where: { id } }),
    getUserByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),
    getUserByAccount: async (provider_providerAccountId) => {
      const account = await prisma.account.findUnique({
        where: { provider_providerAccountId },
        select: { user: true }
      });

      if (!account) {
        return null;
      }

      return account.user;
    },
    updateUser: async (
      data: Partial<AdapterUser> & Pick<AdapterUser, 'id'>
    ): Promise<AdapterUser> => {
      return prisma.user.update({
        where: { id: data.id },
        data: {
          email: data.email,
          name: data.name,
          emailVerified: data.emailVerified,
          image: data.image
        }
      });
    },
    deleteUser: async (id) => {
      await prisma.user.delete({ where: { id } });
    },
    linkAccount: async (data) => {
      await prisma.account.create({ data });
    },
    unlinkAccount: (provider_providerAccountId) =>
      prisma.account.delete({
        where: { provider_providerAccountId }
      }) as unknown as AdapterAccount,

    createVerificationToken: (data): Promise<VerificationToken> =>
      prisma.verificationToken.create({ data }),
    useVerificationToken: async (identifier_token): Promise<VerificationToken | null> => {
      try {
        return await prisma.verificationToken.delete({
          where: { identifier_token }
        });
      } catch (error) {
        // If token already used/deleted, just return null
        // https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
        if ((error as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
          return null;
        }

        throw error;
      }
    },
    getAccount: async (providerAccountId, provider): Promise<AdapterAccount | null> => {
      const account = await prisma.account.findUnique({
        where: {
          provider_providerAccountId: {
            providerAccountId,
            provider
          }
        }
      });

      if (!account) {
        return null;
      }

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
