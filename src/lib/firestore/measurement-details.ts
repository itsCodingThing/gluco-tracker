import { getDocs, query, where } from "firebase/firestore";
import { measurementDetailsCollection } from "../firestore";
import { MeasurementDetails } from "@/types/measurement-details";

export async function getMeasurementDetailsByUserId(userId: string) {
  const q = query(measurementDetailsCollection, where("userId", "==", userId));
  const docSnaps = await getDocs(q);

  if (docSnaps.docs.length === 0) {
    return null;
  }

  const data = docSnaps.docs[0].data() as MeasurementDetails;
  return data;
}
