import { signup } from "@/backend/auth";
import { createResponse } from "@/lib/response";
import { ActionFunctionArgs, json, redirect } from "react-router-dom";
import { z } from "zod";

const SignUpSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export async function signupAction({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json(
      createResponse({ msg: "invalid form method", status: false, data: "" }),
    );
  }

  const formdata = await request.formData();

  try {
    const data = await SignUpSchema.parseAsync(Object.fromEntries(formdata));
    await signup(data);
    return redirect("/profile");
  } catch {
    return json(
      createResponse({ msg: "signup failed", status: false, data: "" }),
    );
  }
}
