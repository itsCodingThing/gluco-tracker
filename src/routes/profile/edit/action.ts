import { updateProfileByUserId } from "@/backend/profile";
import { createResponse } from "@/lib/response";
import { getUserData } from "@/lib/storage";
import { parseAsync, zod } from "@/lib/validation";
import { ActionFunctionArgs, json, redirect } from "react-router-dom";

const EditProfileSchema = zod.object({
  name: zod.string(),
  email: zod.string(),
  dob: zod.string(),
  contact: zod.string(),
  medication: zod.string(),
});

export async function editProfileAction({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json(
      createResponse({ msg: "wrong method", status: false, data: "" }),
    );
  }

  const formdata = await request.formData();
  const result = await parseAsync(
    EditProfileSchema,
    Object.fromEntries(formdata),
  );

  if (result.isErr) {
    return json(
      createResponse({ msg: "check the fields", status: false, data: "" }),
    );
  }

  const payload = result.unwrap();

  const user = await getUserData();
  if (user.isErr) {
    return redirect("/login");
  }

  const response = await updateProfileByUserId(user.unwrap().userId, {
    ...payload,
    medication: payload.medication.split(","),
  });

  if (!response.status) {
    return json(createResponse({ ...response }));
  }
}
