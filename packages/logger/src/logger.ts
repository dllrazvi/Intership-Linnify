import { LoggingWinston } from '@google-cloud/logging-winston';
import { TransformableInfo } from 'logform';
import winston, { Logger, format, transports } from 'winston';
import TransportStream from 'winston-transport';

type LoggerOptions = {
  gcpProjectId?: string;
  serviceName?: string;
};

const getTransports = (options?: Partial<LoggerOptions>): TransportStream[] => {
  const projectId = options?.gcpProjectId;
  const serviceName = options?.serviceName;

  if (!!projectId && !!serviceName && process.env.NODE_ENV !== 'development') {
    return [
      new LoggingWinston({
        projectId,
        redirectToStdout: true,
        useMessageField: false,
        serviceContext: {
          service: serviceName
        }
      })
    ];
  }

  return [
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: 'HH:mm:ss' }),
        format.errors({ stack: true }),
        format.json(),
        upperCaseLevelFormatter(),
        format.colorize({ level: true }),
        format.printf(({ timestamp, level, message, ...data }) => {
          const formattedMessage = formatMessage(message, data);
          return `[${timestamp}] ${level} ${formattedMessage}`;
        })
      )
    })
  ];
};

const upperCaseLevelFormatter = winston.format((info: TransformableInfo) => {
  info.level = info.level.toUpperCase();
  return info;
});

const formatMessage = (message: string, data: any): string => {
  if (!data || Object.keys(data).length === 0) {
    return message;
  }
  return `${message} \n ${JSON.stringify(data)}`;
};

const getLogger = (options?: Partial<LoggerOptions>): Logger => {
  return winston.createLogger({
    level: 'info',
    transports: getTransports(options)
  });
};

export default getLogger;
