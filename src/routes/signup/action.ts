import { signup } from "@/backend/auth";
import { createResponse } from "@/lib/response";
import { parseAsync, zod } from "@/lib/validation";
import { ActionFunctionArgs, json } from "react-router-dom";

const SignUpSchema = zod.object({
  name: zod.string(),
  email: zod.string(),
  password: zod.string(),
});

export async function signupAction({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json(
      createResponse({ msg: "invalid form method", status: false, data: "" }),
    );
  }

  const formdata = await request.formData();
  const data = await parseAsync(SignUpSchema, Object.fromEntries(formdata));
  if (data.isErr()) {
    return createResponse({ msg: "Fill form properly", status: false, data: "" });
  }

  const signupResult = await signup(data.value);
  if (signupResult.isErr()) {
    return createResponse({ msg: "Signup failed.", status: false, data: signupResult.error });
  }
}
