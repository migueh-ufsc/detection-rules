import { createLogger, transports, format } from 'winston';
import { Config } from './config';

export const logger = createLogger({
  level: Config.logLevel,
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize(),
    format.splat(),
    format.metadata(),
    format.timestamp(),
    format.printf(({ timestamp, level, message, metadata }) => {
      return `[${timestamp}] ${level}: ${message}. ${JSON.stringify(metadata)}`;
    }),
  ),
});
