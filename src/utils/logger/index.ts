import winston from "winston";

const formatter = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.splat(),
  winston.format.printf((info) => {
    const { timestamp, level, message, ...meta } = info;
    return `${timestamp} [${level}]: [${meta[0]}] ${JSON.stringify(message)}`;
  })
);

interface LogPayload {
  serviceName?: string;
  message?: any;
  meta?: string;
}

export class Logger {
  logger;
  _serviceName: string;

  constructor(serviceName: string) {
    this._serviceName = serviceName;

    const transport = new winston.transports.Console({
      format: formatter,
    });
    this.logger = winston.createLogger({
      transports: [transport],
    });
  }

  debug(logPayload: LogPayload) {
    this.logger.debug(logPayload.message!, [this._serviceName]);
  }

  info(logPayload: LogPayload) {
    this.logger.info(logPayload.message!, [this._serviceName]);
  }

  warn(logPayload: LogPayload) {
    this.logger.warn(logPayload.message!, [this._serviceName]);
  }

  error(logPayload: LogPayload) {
    this.logger.error(logPayload.message!, [this._serviceName]);
  }

  fatal(logPayload: LogPayload) {
    this.logger.log(logPayload.message!, [this._serviceName]);
  }
}




