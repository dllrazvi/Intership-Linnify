export type ClientConfig = {
  appName: string;
  environment: 'local' | 'testing' | 'production';
  storageUrl: string;
  appUrl: string;

  /**
   * Tracking IDs
   */
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  googleAdsPixel?: string;
  facebookPixel?: string;
  hotjarId?: number;
};

const localConfig: ClientConfig = {
  appName: 'Linnify Starter',
  environment: 'local',
  appUrl: 'http://localhost:3000',
  storageUrl: 'http://localhost:9000/assets' // minio storage
};

const testingConfig: ClientConfig = {
  appName: 'Linnify Starter',
  environment: 'testing',
  appUrl: 'https://exploration.internal.linnify.com',
  storageUrl: 'https://storage.googleapis.com/assets-linnify-stack'
};

const productionConfig: ClientConfig = {
  appName: 'Linnify Starter',
  environment: 'production',
  appUrl: 'https://exploration.internal.linnify.com',
  storageUrl: 'https://storage.googleapis.com/assets-linnify-stack'
};

const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

const getConfig = (): ClientConfig => {
  switch (environment) {
    case 'testing':
      return testingConfig;
    case 'production':
      return productionConfig;
    default:
      return localConfig;
  }
};

const config = getConfig();

export default config;
