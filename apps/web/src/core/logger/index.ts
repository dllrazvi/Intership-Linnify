import getLogger from '@repo/logger';

import env from '@app/config/env.config.ts';

const logger = () => {
  /*
  TODO Enable Logger from AsyncStorage. The AsyncStorage needs to work with Next Request or with Next Server Actions
  const logger = getStore()?.logger;
  if (logger) {
    return logger;
  }*/

  return getLogger({
    gcpProjectId: env.googleCloud?.projectId,
    serviceName: 'web'
  });
};

const info = (message: string, meta?: any) => {
  logger().info(message, meta);
};

const warn = (message: string, meta?: any) => {
  logger().warn(message, meta);
};

const error = (message: string, meta?: any) => {
  logger().error(message, meta);
};

const logging = {
  info,
  warn,
  error
};

export default logging;
