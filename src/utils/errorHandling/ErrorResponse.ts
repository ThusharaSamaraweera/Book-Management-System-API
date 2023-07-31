export class BaseError extends Error {
  name: string;
  httpCode: number;
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


export class BadRequestError extends BaseError {
  constructor(name: string = "Bad request", description: any) {
    super(name, 400, description);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(name: string = "Unauthorized", description: any) {
    super(name, 401, description);
  }
}

export class ForbiddenError extends BaseError {
  constructor(name: string = "Forbidden", description: any) {
    super(name, 403, description);
  }
}

export class NotFoundError extends BaseError {
  constructor(name: string = "Not Found", description: any) {
    super(name, 404, description);
  }
}

export class ServerError extends BaseError {
  constructor(name: string = "Internal server Error", description: any) {
    super(name, 500, description);
  }
}

export class DBError extends BaseError {
  constructor(name: string = "Database Error", description: any) {
    super(name, 500, description);
  }
}
