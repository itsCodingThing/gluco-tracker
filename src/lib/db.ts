import { app } from "./firebase";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { formatDate } from "./date";
import { wait } from "./utils";

const firestore = getFirestore(app);
const measurementCollection = collection(firestore, "measurements");

export async function getMeasurements(userId: string) {
  // const q = query(measurementCollection, where("userId", "==", userId));
  // const querySnapshot = await getDocs(q);
  const results: {
    reading: string;
    createdAt: string;
    id: string;
    status: string;
  }[] = [];

  const { faker } = await import("@faker-js/faker");

  Array.from({ length: 1000 }).forEach(() => {
    const reading = Math.floor(Math.random() * 500);

    results.push({
      id: crypto.randomUUID() + "-" + userId,
      reading: reading.toString(),
      createdAt: formatDate(faker.date.past(), "dd/MM/yyyy"),
      status: reading >= 150 ? "high" : reading <= 60 ? "low" : "normal",
    });
  });

  await wait(1000);
  return results;

  // querySnapshot.forEach((doc) => {
  //   const data = doc.data();
  //   results.push({
  //     reading: data.reading,
  //     createdAt: format(data.createdAt, "dd/mm/yyyy"),
  //     id: doc.id,
  //   });
  // });
  //
  // return results;
}

export async function createNewMeasurement(payload: {
  userId: string;
  reading: string;
  createdAt?: string;
}) {
  await addDoc(measurementCollection, {
    userId: payload.userId,
    reading: payload.reading,
    createdAt: payload.createdAt ?? new Date().toISOString(),
  });
}
