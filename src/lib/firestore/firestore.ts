import { app } from "@/lib/firebase";
import {
  collection,
  getFirestore,
  connectFirestoreEmulator,
} from "firebase/firestore";

export const firestore = getFirestore(app);

if (import.meta.env.MODE === "development" && import.meta.env.DEV) {
  connectFirestoreEmulator(firestore, "127.0.0.1", 8080);
}

export const measurementCollection = collection(firestore, "measurements");
export const measurementDetailsCollection = collection(
  firestore,
  "measurement_details",
);
export const profileCollection = collection(firestore, "profile");
