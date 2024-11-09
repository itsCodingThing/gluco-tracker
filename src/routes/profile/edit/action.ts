import { updateProfileByUserId } from "@/lib/firestore/profile";
import { getUserData } from "@/lib/storage";
import { parseAsync, zod } from "@/lib/validation";
import { ActionFunctionArgs, json } from "react-router-dom";

const EditProfileSchema = zod.object({
  name: zod.string(),
  email: zod.string(),
  dob: zod.string(),
  contact: zod.string(),
  medication: zod.string(),
});

export async function editProfileAction({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json({});
  }

  const formdata = await request.formData();
  const result = await parseAsync(
    EditProfileSchema,
    Object.fromEntries(formdata),
  );

  if (result.isErr) {
    return json({});
  }

  const payload = result.unwrap();
  const user = await getUserData();

  await updateProfileByUserId(user.userId, {
    ...payload,
    medication: payload.medication.split(","),
  });
  return json({});
}
