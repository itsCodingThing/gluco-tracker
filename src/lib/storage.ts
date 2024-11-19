import { AppError } from "./errors";
import { Result } from "./result";
import { parseAsync, zod, ZodInput, ZodOutput } from "./validation";

const UserSchema = zod.object({
  userId: zod.string().min(1),
  isAuthenticated: zod.boolean(),
});

type UserData = ZodOutput<typeof UserSchema>;

export async function storeUserData(
  payload: ZodInput<typeof UserSchema>,
): Promise<Result<void, AppError>> {
  const parseResult = await parseAsync(UserSchema, payload);
  if (parseResult.isErr()) {
    return Result.err(new AppError({ msg: "Parsing failed" }));
  }

  try {
    const stringifyData = JSON.stringify(parseResult.unwrap());
    localStorage.setItem("user", stringifyData);

    return Result.ok(undefined);
  } catch {
    return Result.err(new AppError({ msg: "Parsing failed" }));
  }
}

export async function getUserData(): Promise<Result<UserData, AppError>> {
  let data;
  try {
    data = JSON.parse(localStorage.getItem("user") ?? "{}");
  } catch {
    return Result.err(new AppError({msg: "unable to get user from localstorage"}));
  }

  const result = await parseAsync(UserSchema, data);
  if (result.isErr()) {
    return Result.err(
      new AppError({ msg: "unable to get user from localstorage" }),
    );
  }

  return Result.ok(result.value);
}

export function removeStoreData() {
  localStorage.removeItem("user");
}
