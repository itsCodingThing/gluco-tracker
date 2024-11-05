import { signup } from "@/lib/auth";
import { createActionResponse } from "@/lib/response";
import { ActionFunctionArgs, json, redirect } from "react-router-dom";
import { z } from "zod";

const SignUpSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export async function signupAction({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json(createActionResponse({ msg: "invalid form method" }));
  }

  const formdata = await request.formData();

  try {
    const data = await SignUpSchema.parseAsync(Object.fromEntries(formdata));
    await signup(data);
    return redirect("/profile");
  } catch {
    return json(createActionResponse({ msg: "signup failed" }));
  }
}
