import {
  collection,
  getFirestore,
  connectFirestoreEmulator,
  runTransaction,
  Transaction,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";

const config = JSON.parse(import.meta.env.VITE_FIREBASE);

const app = initializeApp(config);
const firestore = getFirestore(app);
const auth = getAuth(app);

if (import.meta.env.MODE === "development") {
  connectFirestoreEmulator(firestore, "127.0.0.1", 8080);
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
}

const measurementCollection = collection(firestore, "measurements");
const measurementDetailsCollection = collection(
  firestore,
  "measurement_details",
);
const profileCollection = collection(firestore, "profile");

export default {
  auth,
  transaction: async <T>(fn: (t: Transaction) => Promise<T>) =>
    await runTransaction<T>(firestore, fn),
  collection: {
    measurementCollection,
    measurementDetailsCollection,
    profileCollection,
  },
};
