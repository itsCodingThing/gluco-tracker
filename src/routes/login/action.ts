import { login } from "@/backend/auth";
import { createResponse } from "@/lib/response";
import { parseAsync, zod } from "@/lib/validation";
import { ActionFunctionArgs, redirect } from "react-router-dom";

const LoginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string()
});
export async function loginAction({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return createResponse({ msg: "invalid method", status: false, data: "" })
  }

  const formdata = await request.formData();
  const payload = await parseAsync(LoginSchema, Object.fromEntries(formdata));

  if (payload.isErr()) {
    return createResponse({ msg: "please check inputs", status: false, data: payload.error })
  }

  const response = await login(payload.value);

  if (response.isErr()) {
    return createResponse({ msg: "login failed", status: false, data: response.error })
  }

  return redirect("/profile");
}
