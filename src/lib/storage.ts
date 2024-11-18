import { AppError } from "./errors";
import { Result } from "./result";
import { parseAsync, zod, ZodInput, ZodOutput } from "./validation";

const UserSchema = zod.object({
  userId: zod.string().min(1),
  isAuthenticated: zod.boolean(),
});

export type UserData = ZodOutput<typeof UserSchema>;

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

export async function getUserData() {
  const data = JSON.parse(localStorage.getItem("user") ?? "{}");
  const result = await parseAsync(UserSchema, data);

  return result;
}

export function removeStoreData() {
  localStorage.removeItem("user");
}
