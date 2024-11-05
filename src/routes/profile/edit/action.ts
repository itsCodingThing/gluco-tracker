import { updateProfileByUserId } from "@/lib/firestore/profile";
import { getUserData } from "@/lib/storage";
import { ActionFunctionArgs, json } from "react-router-dom";

export async function editProfileAction({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json({});
  }

  const formdata = await request.formData();
  const payload = Object.fromEntries(formdata);
  const user = await getUserData();

  await updateProfileByUserId(user.userId, payload);
  return json({});
}
