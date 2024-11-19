const ErrorNames = {
  parse: "ParseError",
  api: "ApiError",
  app: "AppError",
  externalService: "ExternalService",
} as const;

export type ErrorName = (typeof ErrorNames)[keyof typeof ErrorNames];
export type ErrorNameMsg = `${ErrorName}: ${string}`;

interface BaseErrorParams {
  name: ErrorName;
  msg?: string;
  data?: unknown;
}

export class BaseError extends Error {
  errorNameMsg: ErrorNameMsg;

  constructor(errorParams: BaseErrorParams) {
    super(errorParams.msg);
    this.errorNameMsg = `${errorParams.name}: ${errorParams.msg}`;

    if (import.meta.env.MODE === "development") {
      console.log(this.errorNameMsg);
      console.log(errorParams?.data)
    }
  }
}

interface ErrorParams {
  msg?: string;
  data?: unknown;
}

export class ParseError extends BaseError {
  constructor(errorParams?: ErrorParams) {
    super({
      name: ErrorNames.parse,
      msg: errorParams?.msg ?? "oh noo !!!!",
      data: errorParams?.data ?? {},
    });
  }
}

export class AppError extends BaseError {
  constructor(errorParams?: ErrorParams) {
    super({
      name: ErrorNames.app,
      msg: errorParams?.msg ?? "oh noo !!!!",
      data: errorParams?.data ?? {},
    });
  }
}

export class ExternalServiceError extends BaseError {
  constructor(errorParams?: ErrorParams) {
    super({
      name: ErrorNames.externalService,
      msg: errorParams?.msg ?? "oh noo !!!!",
      data: errorParams?.data ?? {},
    });
  }
}
