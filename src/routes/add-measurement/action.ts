import { createNewMeasurement } from "@/lib/firestore";
import { createResponse } from "@/lib/response";
import { ActionFunctionArgs, json } from "react-router-dom";
import { z } from "zod";

const CreateMeasurementSchema = z.object({
  userId: z.string(),
  measurement: z.number(),
  dosage: z.number(),
  type: z.string(),
  createdAt: z.string().default(() => new Date().toISOString()),
  description: z.string().default(""),
});

export async function addMeasurementAction({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json(createResponse({ msg: "invalid method" }));
  }

  try {
    const formdata = await request.formData();
    const data = await CreateMeasurementSchema.parseAsync(
      Object.fromEntries(formdata),
    );
    await createNewMeasurement({ ...data });

    return json(createResponse({ msg: "successfull added." }));
  } catch (error) {
    return json(createResponse({ msg: "failed to add.", status: false }));
  }
}
