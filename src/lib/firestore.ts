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
  updateDoc,
} from "firebase/firestore";
import { formatDate } from "./date";
import type { Measurement } from "@/types/measurement";
import { Profile } from "@/types/profile";

const firestore = getFirestore(app);

if (import.meta.env.MODE === "development" && import.meta.env.DEV) {
  connectFirestoreEmulator(firestore, "127.0.0.1", 8080);
}

const measurementCollection = collection(firestore, "measurements");
const profileCollection = collection(firestore, "profile");

// measurement methods
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

// profile method
export async function createProfile(payload: Omit<Profile, "id">) {
  const docRef = doc(profileCollection);
  const saveData: Profile = {
    ...payload,
    id: docRef.id,
    userId: payload.userId,
  };
  await setDoc(docRef, saveData);
}

export async function getProfile(userId: string) {
  const q = query(profileCollection, where("userId", "==", userId));
  const results = await getDocs(q);

  const profile: Profile[] = [];
  results.forEach((doc) => {
    profile.push(doc.data() as Profile);
  });

  if (profile[0]) {
    return profile[0];
  }
  return null;
}

export async function updateProfileByUserId(
  userId: string,
  update: Partial<Omit<Profile, "id" | "userId">>,
) {
  const q = query(profileCollection, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);

  for (const snapDoc of querySnapshot.docs) {
    const docRef = doc(profileCollection, snapDoc.id);
    await updateDoc(docRef, update);
  }
}
