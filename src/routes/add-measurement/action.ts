import { createNewMeasurement } from "@/backend/measurement";
import { createResponse } from "@/lib/response";
import { getUserData } from "@/lib/storage";
import { ActionFunctionArgs, json, redirect } from "react-router-dom";
import { z } from "zod";

const CreateMeasurementSchema = z.object({
  userId: z.string(),
  measurement: z.coerce.number(),
  dosage: z.coerce.number(),
  type: z.string(),
  createdAt: z.string().default(() => new Date().toISOString()),
  description: z.string().default(""),
});

export async function addMeasurementAction({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json(
      createResponse({ msg: "invalid method", status: false, data: "" }),
    );
  }

  const user = await getUserData();
  if (user.isErr()) {
    return redirect("/login");
  }

  try {
    const formdata = await request.formData();
    const formPayload = Object.fromEntries(formdata);

    const data = await CreateMeasurementSchema.parseAsync({
      ...formPayload,
      createdAt: formdata.get("date"),
      userId: user.unwrap().userId,
    });
    await createNewMeasurement({ ...data });

    return redirect("/measurement");
  } catch {
    return json(
      createResponse({ msg: "failed to add.", status: false, data: "" }),
    );
  }
}
