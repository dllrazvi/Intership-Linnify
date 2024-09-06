import logger from '@jobs/logger';
import { testJob } from '@jobs/test.job';

/**
 * Jobs entry pont. Based on argument choose the job type
 */
const main = async (): Promise<void> => {
  const jobType = process.argv.find((arg) => arg.startsWith('--jobType='))?.split('=')[1];

  switch (jobType) {
    case 'test':
      logger.info('Running upload products job ...');
      await testJob();
      break;
    default:
      logger.warn(`Unknown job type "${jobType}"`);
  }

  process.exit(0);
};

main();
