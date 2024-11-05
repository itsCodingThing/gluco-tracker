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
  runTransaction,
} from "firebase/firestore";
import { formatDate } from "./date";
import type { Measurement } from "@/types/measurement";
import { Profile } from "@/types/profile";
import { MeasurementDetails } from "@/types/measurement-details";

const firestore = getFirestore(app);

if (import.meta.env.MODE === "development" && import.meta.env.DEV) {
  connectFirestoreEmulator(firestore, "127.0.0.1", 8080);
}

export const measurementCollection = collection(firestore, "measurements");
export const measurementDetailsCollection = collection(
  firestore,
  "measurement_details",
);
export const profileCollection = collection(firestore, "profile");

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

type MeasurementPayload = Partial<Measurement> & {
  userId: string;
  dosage: number;
  measurement: number;
  type: string;
  createdAt: string;
};
export async function createNewMeasurement(payload: MeasurementPayload) {
  // save measurement in details collection
  const detailsDocSnap = await getDocs(
    query(measurementDetailsCollection, where("userId", "==", payload.userId)),
  );

  try {
    await runTransaction(firestore, async (transaction) => {
      // no details found create one
      if (detailsDocSnap.docs.length === 0) {
        const detailsDocRef = doc(measurementDetailsCollection);
        const details: MeasurementDetails = {
          id: detailsDocRef.id,
          userId: payload.userId,
          latestMeasurement: {
            measuremnt: payload.measurement,
            dosage: payload.dosage,
            type: payload.type,
            date: payload.createdAt,
          },
          maxMeasurement: {
            measuremnt: 0,
            dosage: 0,
            type: "",
            date: "",
          },
          minMeasurement: {
            measuremnt: 0,
            dosage: 0,
            type: "",
            date: "",
          },
        };

        transaction.set(detailsDocRef, details);
      } else {
        const detailsDocRef = detailsDocSnap.docs[0].ref;
        transaction.update(detailsDocRef, {
          latestMeasurement: {
            measuremnt: payload.measurement,
            dosage: payload.dosage,
            type: payload.type,
            date: payload.createdAt,
          },
        });
      }

      // save measurement
      const docRef = doc(measurementCollection);
      const saveData = { id: docRef.id, status: "normal", ...payload };
      transaction.set(docRef, saveData);
    });
  } catch (error) {
    console.log(error);
  }
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
