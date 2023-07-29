export class BaseError extends Error {
  name: string;
  httpCode: number;
  isOperational: boolean;
  description: any;

  constructor(name: string, httpCode: number, description: any) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.description = description;

    Error.captureStackTrace(this);
  }
}
