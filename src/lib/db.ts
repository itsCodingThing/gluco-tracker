import { app } from "./firebase";
import {
  collection,
  addDoc,
  getFirestore,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import { format } from "date-fns";

const firestore = getFirestore(app);
const readingsCollection = collection(firestore, "readings");

export async function getAllUserReadings(userId: string) {
  const q = query(readingsCollection, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const results: {
    reading: string;
    createdAt: string;
    id: string;
  }[] = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    results.push({
      reading: data.reading,
      createdAt: format(data.createdAt, "dd/mm/yyyy"),
      id: doc.id,
    });
  });

  return results;
}

export async function addNewReadings(payload: {
  userId: string;
  reading: string;
  createdAt?: string;
}) {
  await addDoc(readingsCollection, {
    userId: payload.userId,
    reading: payload.reading,
    createdAt: payload.createdAt ?? new Date().toISOString(),
  });
}
