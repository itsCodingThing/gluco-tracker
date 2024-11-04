import { app } from "./firebase";
import {
  collection,
  getFirestore,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  connectFirestoreEmulator,
} from "firebase/firestore";
import { formatDate } from "./date";
import type { Measurement } from "@/types/measurement";

const firestore = getFirestore(app);

if (import.meta.env.MODE === "development" && import.meta.env.DEV) {
  connectFirestoreEmulator(firestore, "127.0.0.1", 8080);
}

const measurementCollection = collection(firestore, "measurements");

export async function getMeasurements(userId: string) {
  const q = query(measurementCollection, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const results: Partial<Omit<Measurement, "userId">>[] = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();

    results.push({
      id: doc.id,
      measurement: data.measurement,
      dosage: data.dosage,
      createdAt: formatDate(data.createdAt, "dd/MM/yyyy"),
      status: data.status,
    });
  });

  return results;
}

type MeasurementPayload = Partial<
  Omit<Measurement, "id" | "userId" | "measurement">
> & {
  userId: string;
  dosage: number;
  measurement: number;
};
export async function createNewMeasurement(payload: MeasurementPayload) {
  const docRef = doc(measurementCollection);

  const saveData = { id: docRef.id, status: "normal", ...payload };
  await setDoc(docRef, saveData);
}
