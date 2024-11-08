
# Result Class and Utility Methods

This document summarizes the enhanced `Result` class, which is a functional-style container for handling success (`Ok`) and error (`Err`) states. It provides methods to manipulate and transform the result, handle side effects, and manage asynchronous operations.

---

## Types

### `Result<T, E>`
The `Result` type is a union of `Ok` and `Err`.

- **`Ok<T>`**: Represents a successful operation, containing a value of type `T`.
- **`Err<E>`**: Represents a failed operation, containing an error of type `E`.

```ts
type Result<T, E> = Ok<T> | Err<E>;
```

### `Ok<T>` and `Err<E>`
These are the classes that define the result types.

```ts
class Ok<T> {
  readonly isError = false;
  constructor(public readonly value: T) {}
}

class Err<E> {
  readonly isError = true;
  constructor(public readonly error: E) {}
}
```

---

## `Result` Utility Methods

### 1. `map`
Transforms the value if it's an `Ok`.

```ts
map: <T, E, U>(result: Result<T, E>, fn: (value: T) => U): Result<U, E>;
```

### 2. `mapError`
Transforms the error if it's an `Err`.

```ts
mapError: <T, E, F>(result: Result<T, E>, fn: (error: E) => F): Result<T, F>;
```

### 3. `flatMap`
Chains another `Result`-returning function if the result is an `Ok`.

```ts
flatMap: <T, E, U>(result: Result<T, E>, fn: (value: T) => Result<U, E>): Result<U, E>;
```

### 4. `mapAsync`
Async version of `map` to transform the value asynchronously.

```ts
mapAsync: async <T, E, U>(result: Result<T, E>, fn: (value: T) => Promise<U>): Promise<Result<U, E>>;
```

### 5. `flatMapAsync`
Async version of `flatMap` to chain asynchronous operations that return `Result`.

```ts
flatMapAsync: async <T, E, U>(result: Result<T, E>, fn: (value: T) => Promise<Result<U, E>>): Promise<Result<U, E>>;
```

### 6. `match`
Pattern-matching-like utility for `Result`, applying different functions for `Ok` and `Err`.

```ts
match: <T, E, U>(result: Result<T, E>, onOk: (value: T) => U, onErr: (error: E) => U): U;
```

### 7. `getOrElse`
Returns a default value if the result is an `Err`.

```ts
getOrElse: <T, E>(result: Result<T, E>, defaultValue: T): T;
```

### 8. `unwrapOrElse`
Calls a function to provide a default value if the result is an `Err`.

```ts
unwrapOrElse: <T, E>(result: Result<T, E>, fn: (error: E) => T): T;
```

### 9. `mapBothAsync`
Async version of `mapBoth` for both `Ok` and `Err` cases.

```ts
mapBothAsync: async <T, E, U, F>(result: Result<T, E>, onOk: (value: T) => Promise<U>, onErr: (error: E) => Promise<F>): Promise<Result<U, F>>;
```

### 10. `getOrThrow`
Throws if the result is an `Err`; otherwise, returns the `Ok` value.

```ts
getOrThrow: <T, E>(result: Result<T, E>): T;
```

### 11. `getOrThrowAsync`
Async version of `getOrThrow`.

```ts
getOrThrowAsync: async <T, E>(result: Result<T, E>): Promise<T>;
```

---

## Advanced Methods

### 12. `isOk` / `isErr`
Checks if the result is `Ok` or `Err`.

```ts
isOk: <T, E>(result: Result<T, E>): boolean;
isErr: <T, E>(result: Result<T, E>): boolean;
```

### 13. `fold`
Applies one of two functions based on whether the result is `Ok` or `Err`.

```ts
fold: <T, E, U>(result: Result<T, E>, onOk: (value: T) => U, onErr: (error: E) => U): U;
```

### 14. `combine`
Combines multiple `Result` values into one. Returns the first `Err` encountered or an `Ok` with all values if successful.

```ts
combine: <T, E>(results: Result<T, E>[]): Result<T[], E>;
```

### 15. `tap`
Performs side effects on the value without altering it.

```ts
tap: <T, E>(result: Result<T, E>, fn: (value: T) => void): Result<T, E>;
```

### 16. `tryCatch`
Wraps a function in a `Result`, catching errors and returning them as `Err`.

```ts
tryCatch: <T, E>(fn: () => T, onError: (error: any) => E): Result<T, E>;
```

### 17. `matchAsync`
Async version of `match` for handling async operations.

```ts
matchAsync: async <T, E, U>(result: Result<T, E>, onOk: (value: T) => Promise<U>, onErr: (error: E) => Promise<U>): Promise<U>;
```

---

## Example Usage

```ts
// Example with synchronous functions:
const result = Result.Ok(5);
const mappedResult = Result.map(result, (x) => x * 2); // Ok(10)

// Handling errors:
const errorResult = Result.Err('Some error');
const defaultValue = Result.getOrElse(errorResult, 42); // 42

// Combining multiple results:
const combinedResult = Result.combine([Result.Ok(1), Result.Ok(2), Result.Err('Error')]); // Err('Error')

// Async handling:
const asyncResult = await Result.mapAsync(result, async (x) => x * 2); // Ok(10)

// Handling with side effects:
Result.tap(result, (value) => console.log('Value:', value)); // Logs 'Value: 5'
```

---

## Conclusion

This enhanced `Result` class provides a comprehensive set of utilities for handling both synchronous and asynchronous computations. By combining functional patterns such as `map`, `flatMap`, and `fold` with error handling capabilities like `tryCatch` and `combine`, you can create more robust and maintainable code. Use these methods to better handle success and failure cases, manage side effects, and work with both sync and async code in a functional way.
