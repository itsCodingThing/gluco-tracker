// check fp-ts for inspiration https://gcanti.github.io/fp-ts/

/* eslint-disable */
export type Result<T, E> = Ok<T> | Err<E>;

interface IResult<T, E> {
  isOk(): this is Ok<T>;
  isErr(): this is Err<E>;
  map<U>(fn: (value: T) => U): Result<U, E>;
  flatMap<U>(fn: (value: T) => Result<U, E>): Result<U, E>;
  /**
   * Returns a value or throw error;
   */
  unwrap(): T;
  unwrapOr(defaultValue: T): T;
  match<U>(prop: { onOk: (value: T) => U; onErr: (error: E) => U }): U;
}

class Ok<T> implements IResult<T, never> {
  constructor(public readonly value: T) { }

  isOk(): this is Ok<T> {
    return true;
  }

  isErr(): this is Err<never> {
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

  match<U>(prop: { onOk: (value: T) => U; onErr: (error: never) => U }): U {
    return prop.onOk(this.value);
  }
}

class Err<E> implements IResult<never, E> {
  constructor(public readonly error: E) { }

  isOk(): this is Ok<never> {
    return false;
  }

  isErr(): this is Err<E> {
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

  match<U>(prop: { onOk: (value: never) => U; onErr: (error: E) => U }): U {
    return prop.onErr(this.error);
  }
}

function ok<T>(value: T): Result<T, never> {
  return new Ok(value);
}

function err<E>(error: E): Result<never, E> {
  return new Err(error);
}

function withResult<Fn extends (...args: any[]) => any, E = unknown>(
  fn: Fn,
  ...args: Parameters<Fn>
): Result<ReturnType<Fn>, E> {
  try {
    const result = fn(...args);
    return Result.ok(result);
  } catch (error) {
    return Result.err(error as E);
  }
}

async function withResultAsync<
  Fn extends () => Promise<unknown>,
  E = unknown,
>(
  fn: Fn,
): Promise<Result<Awaited<ReturnType<Fn>>, E>> {
  try {
    const result = await fn();
    return Result.ok(result as Awaited<ReturnType<Fn>>);
  } catch (error) {
    return Result.err(error as E);
  }
}

export const Result = {
  ok,
  err,
  withResult,
  withResultAsync,
};
