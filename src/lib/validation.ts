import { Result } from "./result";
import { z, ZodError } from "zod";
import { ParseError } from "./errors";

export type ZodInput<T extends z.ZodTypeAny> = z.input<T>;
export type ZodOutput<T extends z.ZodTypeAny> = z.output<T>;

export const zod = z;
export async function parseAsync<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  value: unknown,
): Promise<Result<ZodOutput<TSchema>, ParseError>> {
  try {
    const safeValues = await schema.parseAsync(value);
    return Result.ok(safeValues as ZodOutput<TSchema>);
  } catch (error) {
    if (error instanceof ZodError) {
      const errMessages = error.issues.map(({ message }) => message);
      Result.err(new ParseError({ data: errMessages, msg: "parsing failed" }));
    }

    return Result.err(
      new ParseError({
        msg: "zod parsing failed check the implemention",
      }),
    );
  }
}
