import { signin } from "@/lib/auth";
import { createActionResponse } from "@/lib/response";
import { ActionFunctionArgs, json, redirect } from "react-router-dom";

export async function loginAction({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json(createActionResponse({ msg: "invalid form method" }));
  }

  const formdata = await request.formData();

  try {
    await signin({
      email: (formdata.get("email") as string) ?? "",
      password: (formdata.get("password") as string) ?? "",
    });

    return redirect("/profile");
  } catch {
    return json(createActionResponse({ msg: "login failed" }));
  }
}
