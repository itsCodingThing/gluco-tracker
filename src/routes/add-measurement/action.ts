import { createNewMeasurement } from "@/backend/measurement";
import { createResponse } from "@/lib/response";
import { getLoggedInUser } from "@/backend/auth";
import { ActionFunctionArgs, redirect } from "react-router-dom";
import { parseAsync, zod } from "@/lib/validation";

const CreateMeasurementSchema = zod.object({
  userId: zod.string(),
  measurement: zod.coerce.number(),
  dosage: zod.coerce.number(),
  type: zod.string(),
  createdAt: zod.string().default(() => new Date().toISOString()),
  description: zod.string().default(""),
});

export async function addMeasurementAction({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return createResponse({ msg: "invalid method", status: false, data: "" });
  }

  const user = getLoggedInUser();
  if (user.isErr()) {
    return null
  }

  const formdata = await request.formData();
  const formPayload = Object.fromEntries(formdata);

  const data = await parseAsync(CreateMeasurementSchema, {
    ...formPayload,
    createdAt: formdata.get("date"),
    userId: user.value.userId,
  });
  if (data.isErr()) {
    return createResponse({ msg: "Please check inputs.", status: false, data: data.error })
  }

  const result = await createNewMeasurement(data.value);
  if (result.isErr()) {
    return createResponse({ msg: result.error.errorNameMsg, status: false, data: result.error })
  }

  return redirect("/");
}
