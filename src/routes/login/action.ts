import { signin } from "@/backend/auth";
import { createResponse } from "@/lib/response";
import { storeUserData } from "@/lib/storage";
import { ActionFunctionArgs, json, redirect } from "react-router-dom";

export async function loginAction({ request }: ActionFunctionArgs) {
  console.log("login");
  if (request.method !== "POST") {
    return json(
      createResponse({ msg: "invalid method", status: false, data: "" }),
    );
  }

  const formdata = await request.formData();

  const response = await signin({
    email: (formdata.get("email") as string) ?? "",
    password: (formdata.get("password") as string) ?? "",
  });

  if (!response.status) {
    return json(
      createResponse({ msg: "login failed", status: false, data: "" }),
    );
  }

  const result = await storeUserData({
    isAuthenticated: true,
    userId: response.data,
  });
  if (result.isErr) {
    return json(
      createResponse({ msg: "login failed", status: false, data: "" }),
    );
  }

  return redirect("/profile");
}
