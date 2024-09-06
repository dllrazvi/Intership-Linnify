import getLogger from '@repo/logger';

import env from '@jobs/config/env.config.ts';

const logger = () => {
  return getLogger({
    gcpProjectId: env.gcpProjectId,
    serviceName: 'jobs'
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
