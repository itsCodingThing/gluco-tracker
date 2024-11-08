// check fp-ts for inspiration https://gcanti.github.io/fp-ts/

/* eslint-disable */
export type Result<T, E> = Ok<T> | Err<E>;

interface IResult<T, E> {
  get isOk(): boolean;
  get isErr(): boolean;
  map<U>(fn: (value: T) => U): Result<U, E>;
  flatMap<U>(fn: (value: T) => Result<U, E>): Result<U, E>;
  /**
   * Returns a value or throw error;
   */
  unwrap(): T;
  unwrapOr(defaultValue: T): T;
  match<U>(onOk: (value: T) => U, onErr: (error: E) => U): U;
}

class Ok<T> implements IResult<T, never> {
  constructor(public readonly value: T) {}

  get isOk() {
    return true;
  }
  get isErr() {
    return false;
  }

  map<U>(fn: (value: T) => U): Result<U, never> {
    return new Ok(fn(this.value));
  }

  flatMap<U, F>(fn: (value: T) => Result<U, F>): Result<U, F> {
    return fn(this.value);
  }

  unwrap(): T {
    return this.value;
  }

  unwrapOr(_defaultValue: T): T {
    return this.value;
  }

  match<U>(onOk: (value: T) => U, _onErr: (error: never) => U): U {
    return onOk(this.value);
  }
}

class Err<E> implements IResult<never, E> {
  constructor(public readonly error: E) {}

  get isOk() {
    return false;
  }
  get isErr() {
    return true;
  }

  map<U>(_fn: (value: never) => U): Result<U, E> {
    return this;
  }

  flatMap<U, F>(_fn: (value: never) => Result<U, F>): Result<U, E> {
    return this;
  }

  unwrap(): never {
    throw new Error("Tried to unwrap an Err");
  }

  unwrapOr<T>(defaultValue: T): T {
    return defaultValue;
  }

  match<U>(_onOk: (value: never) => U, onErr: (error: E) => U): U {
    return onErr(this.error);
  }
}

function ok<T>(value: T): Result<T, never> {
  return new Ok(value);
}

function err<E>(error: E): Result<never, E> {
  return new Err(error);
}

export const Result = {
  ok,
  err,
};
