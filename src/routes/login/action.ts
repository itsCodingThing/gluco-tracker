import { signin } from "@/backend/auth";
import { createResponse } from "@/lib/response";
import { storeUserData } from "@/lib/storage";
import { ActionFunctionArgs, redirect } from "react-router-dom";

export async function loginAction({ request }: ActionFunctionArgs) {
  console.log("login");
  if (request.method !== "POST") {
    return createResponse({ msg: "invalid method", status: false, data: "" })
  }

  const formdata = await request.formData();

  const response = await signin({
    email: (formdata.get("email") as string) ?? "",
    password: (formdata.get("password") as string) ?? "",
  });

  if (!response.status) {
    return createResponse({ msg: "login failed", status: false, data: "" })
  }

  const result = await storeUserData({
    isAuthenticated: true,
    userId: response.data,
  });
  if (result.isErr()) {
    return createResponse({ msg: "login failed", status: false, data: result.error})
  }

  return redirect("/profile");
}
