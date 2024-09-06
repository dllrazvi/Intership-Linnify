import 'server-only';

import { z } from 'zod';

export enum Environment {
  LOCAL = 'local',
  TESTING = 'testing',
  PRODUCTION = 'production'
}

const envSchema = z.object({
  EMAIL_DISABLED: z
    .enum(['TRUE', 'True', 'true', 'FALSE', 'False', 'false'])
    .default('false')
    .transform((value) => value.toLowerCase() === 'true'),

  STRIPE_API_KEY: z.string().default('apiKey'),
  STRIPE_WEBHOOK_SECRET: z.string().default('webhook'),

  GCP_PROJECT: z.string().optional(),
  GCP_LOCATION: z.string().default('europe-west3'),
  GCP_SERVICE_ACCOUNT: z.string().optional()
});

export type EnvConfig = {
  environment: Environment;
  email: {
    disabled: boolean;
  };
  stripe: {
    apiKey: string;
    webhookSecret: string;
  };

  googleCloud?: {
    projectId: string;
    bucket: string;
    location: string;
    serviceName: string;
    serviceAccount: string;
  };
};

type EnvData = z.infer<typeof envSchema>;

const getEnvironment = (): Environment => {
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;
  switch (environment) {
    case 'testing':
      return Environment.TESTING;
    case 'production':
      return Environment.PRODUCTION;
    default:
      return Environment.LOCAL;
  }
};

const getGoogleCloudConfig = (environment: Environment, env: EnvData): EnvConfig['googleCloud'] => {
  if (!env.GCP_PROJECT || !env.GCP_SERVICE_ACCOUNT) {
    return undefined;
  }

  switch (environment) {
    case Environment.TESTING:
      return {
        bucket: 'testing-bucket',
        projectId: env.GCP_PROJECT,
        location: 'europe-west3',
        serviceName: 'web',
        serviceAccount: env.GCP_SERVICE_ACCOUNT
      };
    case Environment.PRODUCTION:
      return {
        bucket: 'testing-bucket',
        projectId: env.GCP_PROJECT,
        location: 'europe-west3',
        serviceName: 'web',
        serviceAccount: env.GCP_SERVICE_ACCOUNT
      };
  }
};

const parseConfigSchema = (): EnvConfig => {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error(result.error.issues);
    throw new Error('There is an error with the server environment variables');
  }

  const env = result.data;
  const environment = getEnvironment();

  return {
    environment,
    email: {
      disabled: env.EMAIL_DISABLED
    },
    stripe: {
      apiKey: env.STRIPE_API_KEY,
      webhookSecret: env.STRIPE_WEBHOOK_SECRET
    },
    googleCloud: getGoogleCloudConfig(environment, env)
  };
};

const globalConfig = global as unknown as {
  config: EnvConfig | undefined;
};

const env: EnvConfig = globalConfig.config ?? parseConfigSchema();

if (process.env.NODE_ENV !== 'production') {
  globalConfig.config = env;
}

export default env;
