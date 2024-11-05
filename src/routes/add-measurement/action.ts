import { createNewMeasurement } from "@/lib/firestore/measurement";
import { createActionResponse } from "@/lib/response";
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
    return json(createActionResponse({ msg: "invalid method" }));
  }

  try {
    const user = await getUserData();
    const formdata = await request.formData();
    const data = await CreateMeasurementSchema.parseAsync({
      ...Object.fromEntries(formdata),
      userId: user.userId,
    });
    await createNewMeasurement({ ...data });

    return redirect("/measurement");
  } catch {
    return json(createActionResponse({ msg: "failed to add.", status: false }));
  }
}
