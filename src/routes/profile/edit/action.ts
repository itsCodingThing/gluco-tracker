import { getLoggedInUser } from "@/backend/auth";
import { updateProfileByUserId } from "@/backend/profile";
import { createResponse } from "@/lib/response";
import { parseAsync, zod } from "@/lib/validation";
import { ActionFunctionArgs, redirect } from "react-router-dom";

const EditProfileSchema = zod.object({
  name: zod.string(),
  email: zod.string(),
  dob: zod.string(),
  contact: zod.string(),
  medication: zod.string(),
});

export async function editProfileAction({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return createResponse({ msg: "wrong method", status: false, data: "" })
  }

  const formdata = await request.formData();
  const parseResult = await parseAsync(
    EditProfileSchema,
    Object.fromEntries(formdata),
  );

  if (parseResult.isErr()) {
    return createResponse({ msg: "check the fields", status: false, data: "" })
  }

  const user = getLoggedInUser();
  if (user.isErr()) {
    return redirect("/login");
  }

  const response = await updateProfileByUserId(user.value.userId, {
    ...parseResult.value,
    medication: parseResult.value.medication.split(","),
  });

  if (response.isErr()) {
    return createResponse({ msg: response.error.errorNameMsg, status: false, data: response.error })
  }

  return redirect("/profile");
}
